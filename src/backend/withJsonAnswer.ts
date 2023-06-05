import { NextApiRequest, NextApiResponse } from "next";
import { ToString, error, success } from "./response.util";
import { isHttpProblem } from "@curveball/http-errors";

export function withJsonAnswer<T extends ToString>(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<T>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const start = performance.now();
    try {
      const result = await handler(req, res);
      return success(res, result, performance.now() - start);
    } catch (err: any) {
      if (isHttpProblem(err)) {
        return error(
          res,
          {
            ...err,
          },
          err.httpStatus,
          performance.now() - start
        );
      }

      console.error(err)
      return error(res, err.toString(), 500, performance.now() - start);
    }
  };
}
