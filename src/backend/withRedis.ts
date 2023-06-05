import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { RedisConnection } from "redis-om";
import { BadGateway } from "@curveball/http-errors";

let connecting = false;
let connected = false;
const redis: RedisConnection = createClient({ url: process.env.REDIS_URL });

redis.on("error", (err) => {
  console.log("Redis Client Error", err);
  connected = false;
  connecting = false;
});

redis.on("end", () => {
  connected = false;
  connecting = false;
});


redis.on("connect", () => {
  connected = true;
  connecting = false;
});

export const getRedisConnection = async () => {
  try {
    if (!connected && !connecting) {
      console.log(
        "Redis Client is not connected and not connecting -> connecting"
      );
      connecting = true;
      await redis.connect();
    }
  } catch (err: any) {
    throw new BadGateway(err.toString());
  }

  return redis;
};

export default function withRedis<T>(
  handler: (
    redis: RedisConnection,
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<T>
) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    getRedisConnection().then((connection) => handler(connection, req, res));
}
