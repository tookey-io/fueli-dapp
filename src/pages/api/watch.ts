import {
  GenerationStatus,
  createEntity,
  generationSchema,
  mintEventSchema,
  watcherSchema,
} from "@/backend/models";
import { success } from "@/backend/response.util";
import withRedis from "@/backend/withRedis";
import { withJsonAnswer } from "@/backend/withJsonAnswer";
import { provider } from "@/middleware";
import { FueliPicliMinter__factory } from "@/types";
import { filterDefined } from "@/utils/defined";
import { deployments } from "@/wagmi/deployments";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { Entity, EntityData, RedisConnection, Repository } from "redis-om";

const handler = async (redis: RedisConnection, req: NextApiRequest, res: NextApiResponse) => {
  const { chainId } = await provider.getNetwork();
  const deployment = deployments[chainId];

  if (!deployment) {
    throw new Error(`No deployment found for ${chainId}`);
  }

  const { minter: minterAddress, startBlock } = deployment;

  if (!minterAddress) {
    throw new Error(`Cannot find minter address in chain ${chainId}`);
  }

  const minter = FueliPicliMinter__factory.connect(
    minterAddress,
    provider as any
  );

  const blockNumber = await provider.getBlockNumber();
  const requests: Array<{
    tx: string;
    token: number;
  }> = [];

  const stateRepository = new Repository(generationSchema, redis);
  const watcherRepository = new Repository(watcherSchema, redis);
  const eventsRespository = new Repository(mintEventSchema, redis);

  let watcherState = await watcherRepository.fetch(chainId.toString());

  if (typeof watcherState.latestBlock !== "number") {
    watcherState = await createEntity({
      latestBlock: startBlock,
      batchSize: Number(process.env.BATCH_SIZE!),
    });
    await watcherRepository.save(chainId.toString(), watcherState);
  }

  if (
    typeof watcherState.latestBlock === "number" &&
    typeof watcherState.batchSize === "number"
  ) {
    while (blockNumber > watcherState.latestBlock) {
      const to = Math.min(
        blockNumber,
        watcherState.latestBlock + watcherState.batchSize
      );
      const logs = await minter.queryFilter(
        minter.filters.MintingRequest(),
        watcherState.latestBlock,
        to
      );

      const models = logs.map(
        ({
          transactionHash: tx,
          blockNumber: block,
          logIndex,
          args: { tokenId, minter, prompt, message, value, privacy },
        }) =>
          createEntity({
            // tx: { type: "string" },
            tx,
            // block: { type: "number" },
            block,
            // logIndex: { type: "number" },
            logIndex,
            // tokenId: { type: "number" },
            tokenId: tokenId.toNumber(),
            // minter: { type: "string" },
            minter,
            // prompt: { type: "string" },
            prompt,
            // message: { type: "string" },
            message,
            // value: { type: "string" },
            value: value.toString(),
            // privacy: { type: "boolean" },
            privacy,
          })
      );

      requests.push(...models.map(({ tx, tokenId: token }) => ({ tx, token })));

      await Promise.all(
        models.map((model) => eventsRespository.save(model.tx, model))
      );
      watcherState.latestBlock = to;
      await watcherRepository.save(watcherState);
    }
  }

  await eventsRespository.createIndex();

  const processing = await eventsRespository
    .search()
    .allIds()
    .then((ids) =>
      Promise.all(
        ids.map(async (tx) => ({ tx, state: await stateRepository.fetch(tx) }))
      ).then((records) =>
        records.filter(({ state }) => state.status !== GenerationStatus.done)
      )
    );

  return {
    processing,
    newEvents: requests,
  };
};

export default withJsonAnswer(withRedis(handler));
