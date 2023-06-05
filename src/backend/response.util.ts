import { NextApiResponse } from "next";

export interface ToString {
  toString(): string;
}

function betterJson<T>(obj: T): string {
    return JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v)
}

function answer(response: NextApiResponse, message: string, code: number) {
  response.status(code);
  response.send(message);
  response.end();
}

export function error<T extends ToString>(
  res: NextApiResponse,
  error: T,
  code: number = 500, 
  elapsed?: number
) {
  try {
    return answer(
      res,
      betterJson({
        status: "error",
        error,
        code,
        elapsed
      }),
      code
    );
  } catch (err) {
    return answer(
      res,
      betterJson({
        status: "error",
        error: err,
        code,
        meta: error.toString(),
        elapsed
      }),
      500
    );
  }
}

export function success<T extends ToString>(res: NextApiResponse, data: T, elapsed?: number) {
  try {
    return answer(
      res,
      betterJson({
        status: "ok",
        data,
        code: 200,
        elapsed
      }),
      200
    );
  } catch (err) {
    return answer(
      res,
      betterJson({
        status: "error",
        error: err,
        meta: data.toString(),
        elapsed
      }),
      500
    );
  }
}
