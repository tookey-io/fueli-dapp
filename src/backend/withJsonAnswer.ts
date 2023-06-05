import { NextApiRequest, NextApiResponse } from "next";
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
