import {
  MintEventEntity,
  createEntity,
  mintEventSchema,
  priceSchema,
} from "@/backend/models";
import { success } from "@/backend/response.util";
import axios from "axios";
import * as ethers from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { Repository } from "redis-om";

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

export const buildStats = async () => {
  const redis = createClient({ url: process.env.REDIS_URL });
  redis.on("error", (err) => console.log("Redis Client Error", err));
  await redis.connect();
  const eventsRespository = new Repository(mintEventSchema, redis);
  const priceRepository = new Repository(priceSchema, redis);

  const events = (await eventsRespository
    .search()
    .all()) as Array<MintEventEntity>;

  let current = await priceRepository.fetch("CURRENT");
  if (
    typeof current.price !== "number" ||
    !(current.createdAt instanceof Date) ||
    current.createdAt.getTime() < Date.now() + PRICE_UPDATE_DELAY
  ) {
    console.log("update price!!!!!!!!!!");
    // current = await priceRepository.save(
    //   "CURRENT",
    //   createEntity({
    //     price: await currentPrice("theta-fuel", "usd"),
    //   })
    // );
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  success(res, await buildStats());
};

export default handler;
