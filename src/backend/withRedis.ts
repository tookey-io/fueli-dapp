import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { RedisConnection } from "redis-om";
import { ToString, error, success } from "./response.util";

export function withJsonAnswer<T extends ToString>(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const start = performance.now();
    try {
      const result = await handler(req, res);
      return success(res, result, performance.now() - start);
    } catch (err) {
      return error(res, error, 500, performance.now() - start);
    }
  };
}

export default function withRedis<T>(
  handler: (
    redis: RedisConnection,
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<T>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const redis = createClient({ url: process.env.REDIS_URL });
    redis.on("error", (err) => console.log("Redis Client Error", err));
    await redis.connect();

    try {
      const result = await handler(redis, req, res);
      return result;
    } finally {
      redis.disconnect();
    }
  };
}
