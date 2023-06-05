import {
  MintEventEntity,
  PriceEntity,
  createEntity,
  mintEventSchema,
  priceSchema,
} from "@/backend/models";
import withRedis from "@/backend/withRedis";
import { withJsonAnswer } from "@/backend/withJsonAnswer";
import axios from "axios";
import * as ethers from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { RedisConnection, Repository } from "redis-om";

const PRICE_UPDATE_DELAY = 1000 * 60 * 30; // 30 minutes

const currentPrice = <TToken extends string, TCurrency extends string>(
  token: TToken,
  currency: TCurrency
) => {
  return axios
    .get<{
      [k1 in TToken]: {
        [k2 in TCurrency]: number;
      };
    }>(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${currency}`
    )
    .then((response) => response.data[token][currency]);
};

export const buildStats = async (redis: RedisConnection) => {
  const eventsRespository = new Repository(mintEventSchema, redis!);
  const priceRepository = new Repository(priceSchema, redis!);

  const events = (await eventsRespository
    .search()
    .all()) as Array<MintEventEntity>;

  let current = (await priceRepository.fetch("CURRENT")) as PriceEntity;

  if (
    typeof current.price !== "number" ||
    !(current.createdAt instanceof Date) ||
    current.createdAt.getTime() + PRICE_UPDATE_DELAY < Date.now()
  ) {
    console.log("update price!!!!!!!!!!");
    current = (await priceRepository.save(
      "CURRENT",
      createEntity({
        price: await currentPrice("theta-fuel", "usd"),
      })
    )) as PriceEntity;
  }

  const totalFuel = Number(
    ethers.utils.formatEther(
      events.reduce(
        (acc, event) => acc + BigInt(event.value as string),
        BigInt(0)
      )
    )
  );
  const totalUsd = Number(totalFuel) * (current.price as number);
  const richies = Array.from(new Set(events.map((e) => e.minter))).length;

  return {
    totalFuel,
    totalUsd,
    richies,
  };
};

const handler = (
  redis: RedisConnection,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return buildStats(redis);
};

export default withJsonAnswer(withRedis(handler));
