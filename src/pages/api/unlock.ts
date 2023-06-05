import { GenerationEntity, generationSchema } from "@/backend/models";
import { withJsonAnswer } from "@/backend/withJsonAnswer";
import withRedis from "@/backend/withRedis";
import { BadRequest } from "@curveball/http-errors";
import { NextApiRequest, NextApiResponse } from "next";
import { RedisConnection, Repository } from "redis-om";

const handler = async (
  redis: RedisConnection,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new BadRequest("Id should be a transaction hash");
  }

  const stateRepository = new Repository(generationSchema, redis);
  const state = (await stateRepository.fetch(id)) as GenerationEntity;
  const lastLocked = state.lockedUntil;
  state.lockedUntil = new Date();
  await stateRepository.save(state);

  return {
    ...state,
    lastLocked
  };
};

export default withJsonAnswer(withRedis(handler));
