import { NextApiResponse } from "next";

interface ToString {
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
  code: number = 500
) {
  try {
    return answer(
      res,
      betterJson({
        status: "error",
        error,
      }),
      code
    );
  } catch (err) {
    return answer(
      res,
      betterJson({
        status: "error",
        error: err,
        meta: error.toString(),
      }),
      500
    );
  }
}

export function success<T extends ToString>(res: NextApiResponse, data: T) {
  try {
    return answer(
      res,
      betterJson({
        status: "ok",
        data,
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
      }),
      500
    );
  }
}
