import { NextApiRequest, NextApiResponse } from "next";
import { stepTreeUpload, stepTwoGenerateImage } from "./generation";
import { error, success } from "@/backend/response.util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, preset, seed } = req.query;

  if (typeof prompt !== "string")
    return error(res, `Invalid prompt type: ${prompt}`, 502);

    if (typeof seed !== "string" && !Number.isNaN(Number(seed)))
      return error(res, `Invalid seed type: ${seed}`, 502);

  if (typeof preset !== "string")
    return error(res, `Invalid preset type: ${preset}`, 502);

  const generation = await stepTwoGenerateImage(prompt, preset, 150, Number(seed));
  const upload = await stepTreeUpload(generation.data);


  res.status(200);
  res.send(upload.variants[0]);
  res.end();
};

export default handler;
