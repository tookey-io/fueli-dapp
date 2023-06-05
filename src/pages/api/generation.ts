import {
  GenerationEntity,
  GenerationStatus,
  createEntity,
  generationSchema,
  imageDataSchema,
  imageSchema,
  requestSchema,
  transcodeSchema,
  uploadSchema,
  videoSchema,
} from "@/backend/models";
import withRedis from "@/backend/withRedis";
import { withJsonAnswer } from "@/backend/withJsonAnswer";
import { provider } from "@/middleware";
import { FueliPicliMinter__factory, Picli__factory } from "@/types";
import { defined } from "@/utils/defined";
import { deployments } from "@/wagmi/deployments";
import {
  BadRequest,
  InternalServerError,
  NotFound,
} from "@curveball/http-errors";
import axios, { AxiosError } from "axios";
import { Wallet, ethers } from "ethers";
import FormData from "form-data";
import { NextApiRequest, NextApiResponse } from "next";
import { inspect } from "node:util";
import { RedisConnection, Repository } from "redis-om";
// import { connect, fetchEnsName } from "@wagmi/core";
// import { InjectedConnector } from "@wagmi/core/connectors/injected";

export async function stepOneObtainRequest(id: string) {
  //collect transaction
  const tx = await provider.getTransactionReceipt(id);

  if (!tx) {
    throw new Error("Transaction not found");
  }

  const parsedLogs = tx.logs
    .map((log) => {
      try {
        return new FueliPicliMinter__factory().interface.parseLog({
          topics: [...log.topics],
          data: log.data,
        });
      } catch (err) {
        console.error(err);
        return undefined;
      }
    })
    .filter(defined);

  //collect token id
  const mintingRequest = parsedLogs.find(
    (log) => log?.name === "MintingRequest"
  );
  if (!mintingRequest) {
    throw new Error("Minting request not found");
  }

  // const redis = createClient({ url: process.env.REDIS_URL });
  const request: {
    minter: string; // address
    tokenId: bigint;
    prompt: string;
    message: string;
    value: bigint;
  } = {
    minter: mintingRequest.args.minter,
    tokenId: mintingRequest.args.tokenId,
    prompt: mintingRequest.args.prompt,
    message: mintingRequest.args.message,
    value: mintingRequest.args.value,
  };

  return request;
}

export async function stepTwoGenerateImage(
  prompt: string,
  preset: string,
  steps: number = 150,
  seed: number = 0,
  engine: string | undefined = process.env.STABILITY_ENGINE
) {
  if (typeof engine === "undefined") {
    throw new Error("engine is required");
  }

  const prompts = [
    {
      text: "cute cartoon bright rabbit " + prompt,
      weight: 1,
    },
  ];

  const response = await axios.post<{
    artifacts: Array<{
      base64: "string";
      seed: number;
      finishReason: "SUCCESS";
    }>;
  }>(
    `${process.env.STABILITY_URL}/v1/generation/${process.env.STABILITY_ENGINE}/text-to-image`,
    {
      text_prompts: prompts,
      samples: 1,
      seed,
      steps,
      style_preset: preset,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
    }
  );

  if (response.data && response.data.artifacts.length) {
    return {
      data: response.data.artifacts[0].base64,
      engine,
      preset,
      prompts: prompts.map((p) => `${p.text}::${p.weight}`),
      steps,
    };
  } else {
    console.error(response.data);
    throw new Error("Something went wrong with the generation");
  }
}

export async function stepTreeUpload(imageData: string) {
  const buffer = Buffer.from(imageData, "base64");
  const formData = new FormData();
  formData.append("file", buffer, {
    filename: "picture.png",
    contentType: "image/png",
  });

  const upload = await axios<{
    result?: {
      id: string;
      filename: string;
      uploaded: string;
      requireSignedURLs: boolean;
      variants: string[];
    };
    success: boolean;
    errors: any[];
    messages: any[];
  }>({
    method: "post",
    url: process.env.CLOUDFLARE_UPLOAD_URL,
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
    data: formData,
  });

  if (
    upload.data &&
    upload.data.success &&
    upload.data.result?.variants.length
  ) {
    return {
      // id: { type: "string" },
      id: upload.data.result.id,
      // variants: { type: "string[]" },
      variants: upload.data.result.variants,
      // requireSignedURLs: { type: "boolean" },
      requireSignedURLs: upload.data.result.requireSignedURLs,
    };
  } else {
    throw new Error("Something went wrong with the upload");
  }
}

export async function stepFourGenerateVideo(
  minter: string,
  message: string,
  value: string,
  bgImage: string
) {
  const data = {
    template_id: process.env.CREATOMATE_TEMPLATE,
    modifications: {
      Nick: minter,
      Title: message,
      Amount: value,
      Program: process.env.CREATOMATE_TITLE,
      "Background Image": bgImage,
    },
  };
  const response = await axios
    .post<
      Array<{
        id: string;
        status: "planned";
        url: string;
        snapshot_url: string;
        template_id: string;
      }>
    >(process.env.CREATOMATE_API_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.CREATOMATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        console.error(err.message, err.response?.data);
      }

      throw err;
    });

  if (response.data.length) {
    const {
      id,
      status,
      url,
      snapshot_url: snapshotUrl,
      template_id: templateId,
    } = response.data[0];
    return {
      id,
      status,
      url,
      snapshotUrl,
      templateId,
    };
  } else {
    console.log(inspect(response.data, true, undefined, true));
    throw new Error("Video rendering doesnt work properly");
  }
}

export async function stepFiveWaitForVideo(id: string, attempt: number = 1) {
  const response = await axios
    .get<{
      id: string;
      status: "succeeded" | "planned";
      url: string;
      snapshot_url: string;
      template_id: string;
      width: number;
      height: number;
      frame_rate: number;
      duration: number;
      file_size: number;
    }>(process.env.CREATOMATE_API_URL + "/" + id, {
      headers: {
        Authorization: `Bearer ${process.env.CREATOMATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        console.error(err.message, err.response?.data);
      }

      throw err;
    });

  if (response.data.status === "succeeded") {
    const {
      id,
      status,
      url,
      snapshot_url: snapshotUrl,
      template_id: templateId,
      width,
      height,
    } = response.data;
    return {
      url,
      status,
      snapshotUrl,
      templateId,
      id,
      width,
      height,
    };
  } else {
    if (attempt > Number(process.env.CREATOMATE_ATTEMPTS))
      throw new Error(`Attempt ${attempt} is last. Failed rendering`);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s
    console.log("Attempt " + ++attempt);
    console.log(response.data);
    return stepFiveWaitForVideo(id, attempt);
  }
}

export async function stepSixTranscodeInitialization(videoUrl: string) {
  const response = await axios.post<{
    body: {
      videos: Array<{
        id: string;
        service_account_id: string;
        create_time: string;
        duration: null;
        error: null;
        file_name: null;
        metadata: {};
        playback_uri: null;
        progress: 0;
        resolution: null;
        state: "created";
        sub_state: "none";
        update_time: string;
        use_drm: null | string;
      }>;
    };
    status: "success";
  }>(
    process.env.THETAVIDEO_API_URL,
    {
      source_uri: videoUrl,
      playback_policy: "public",
    },
    {
      headers: {
        "x-tva-sa-id": process.env.THATEVIDEO_API_ID,
        "x-tva-sa-secret": process.env.THATEVIDEO_API_SECRET,
      },
    }
  );

  if (
    response.data.body &&
    response.data.body.videos &&
    response.data.body.videos.length
  ) {
    const {
      body: {
        videos: [
          {
            id,
            progress,
            state,
            sub_state: subState,
            use_drm: drm,
            service_account_id: serviceAccountId,
          },
        ],
      },
    } = response.data;

    return {
      id,
      progress,
      state,
      subState,
      drm,
      serviceAccountId,
    };
  } else {
    console.log(response.data);
    throw new Error("initialization of transcode is failed");
  }
}

export async function stepSevenTranscodeAwait(id: string, attempt: number = 1) {
  const response = await axios.get<{
    body: {
      videos: Array<{
        id: string;
        service_account_id: string;
        create_time: string;
        update_time: string;
        duration: string;
        error: null;
        file_name: null;
        metadata: {};
        progress: number;
        resolution: null;
        state: "success";
        sub_state: "none";
        use_drm: null | string;
        playback_uri: string;
        player_uri: string;
      }>;
    };
    status: "success";
  }>(process.env.THETAVIDEO_API_URL + "/" + id, {
    headers: {
      "x-tva-sa-id": process.env.THATEVIDEO_API_ID,
      "x-tva-sa-secret": process.env.THATEVIDEO_API_SECRET,
    },
  });

  if (
    response.data &&
    response.data.body &&
    response.data.body.videos &&
    response.data.body.videos.length
  ) {
    const {
      data: {
        body: {
          videos: [
            {
              id,
              progress,
              state,
              sub_state: subState,
              use_drm: drm,
              service_account_id: serviceAccountId,
              playback_uri: playbackUrl,
              player_uri: playerUrl,
            },
          ],
        },
      },
    } = response;

    if (state === "success") {
      return {
        id,
        progress,
        state,
        subState,
        drm,
        serviceAccountId,
        playbackUrl,
        playerUrl,
      };
    } else {
      if (attempt > Number(process.env.THATEVIDEO_ATTEMPTS))
        throw new Error(`Attempt ${attempt} is last. Failed transcoding`);

      await new Promise((resolve) => setTimeout(resolve, 3000)); // wait 1s
      console.log("Attempt " + ++attempt);
      console.log(response.data);
      return stepSevenTranscodeAwait(id, attempt);
    }
  } else {
    console.log(response);
    throw new Error(`Transcode failed`);
  }
}

export async function stepEightInjectMeta(
  tokenId: number,
  imageUrl: string,
  transcodeId: string,
  videoUrl: string
) {
  const { chainId } = await provider.getNetwork();
  const picliAddress = deployments[chainId]?.picli;
  if (!picliAddress) {
    throw new Error(`Cannot find picli address in chain ${chainId}`);
  }
  const wallet = new Wallet(process.env.INJECTOR_PRIVATE_KEY, provider);
  console.log(wallet.address);
  const picli = Picli__factory.connect(picliAddress, wallet);

  const currentMeta = await picli.meta(tokenId);
  if (currentMeta.image !== imageUrl || currentMeta.videoId !== transcodeId) {
    console.log("require inject");
    await picli.inject(tokenId, imageUrl, transcodeId);

    return true;
  }
  return false;
}

const handler = async (
  redis: RedisConnection,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GenerationEntity & { locked?: true }> => {
  const { id } = req.query;

  if (typeof id !== "string") {
    throw new BadRequest("Id should be a transaction hash");
  }

  const stateRepository = new Repository(generationSchema, redis);
  const requestRepository = new Repository(requestSchema, redis);
  const imageRepository = new Repository(imageSchema, redis);
  const imageDataRepository = new Repository(imageDataSchema, redis);
  const uploadRepository = new Repository(uploadSchema, redis);
  const videoRepository = new Repository(videoSchema, redis);
  const transcodeRepository = new Repository(transcodeSchema, redis);

  // Initialize generation state
  if (!(await redis.exists("generation:" + id))) {
    await stateRepository.save(
      id,
      createEntity({
        status: GenerationStatus.initialized,
      })
    );
  }

  const state = (await stateRepository.fetch(id)) as GenerationEntity;

  if (state.lockedUntil instanceof Date) {
    const difference = state.lockedUntil.getTime() - Date.now() - 5000;
    console.log(difference);
    if (difference > 0) {
      await redis.disconnect();
      return { ...state, locked: true };
    }
  }

  state.lockedUntil = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
  await stateRepository.save(state);

  // if ((state.status as number) > GenerationStatus.initialized) {
  //   const request = await requestRepository.fetch(id);
  //   request.tokenId = state.tokenId;
  //   await requestRepository.save(request);
  // }

  if (state.status === GenerationStatus.initialized) {
    // Collect request information
    const request = await stepOneObtainRequest(id);
    await requestRepository.save(
      id,
      createEntity({
        // nick: { type: "string" },
        nick: request.minter,
        // tokenId: { type: "string" },
        tokenId: Number(request.tokenId),
        // message: { type: "string" },
        message: request.message,
        // prompt: { type: "string" },
        prompt: request.prompt,
        // value: { type: "string" },
        value: [
          ethers.utils.formatEther(request.value),
          process.env.NATIVE_SYMBOL,
        ].join(" "),
      })
    );

    state.status = GenerationStatus.requestCollected;
    state.tokenId = Number(request.tokenId);
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);

    return state;
  } else if (state.status === GenerationStatus.requestCollected) {
    const request = await requestRepository.fetch(id);

    if (typeof request.prompt !== "string") {
      throw new NotFound("Request promot not found");
    }

    const seed = Number(BigInt(id) % BigInt(Number.MAX_SAFE_INTEGER));
    const generation = await stepTwoGenerateImage(
      request.prompt,
      "anime",
      150,
      seed
    );

    await imageRepository.save(
      id,
      createEntity({
        // prompts: { type: "string[]" },
        prompts: generation.prompts,
        // engine: { type: "number" },
        engine: generation.engine,
        // steps: { type: "number" },
        steps: generation.steps,
        // preset: { type: "number" },
        preset: generation.preset,
      })
    );

    await imageDataRepository.save(id, {
      data: generation.data,
    });

    state.status = GenerationStatus.imageGenerated;
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);
    return state;
  } else if (state.status === GenerationStatus.imageGenerated) {
    const { data: imageData } = await imageDataRepository.fetch(id);

    if (typeof imageData !== "string") {
      throw new InternalServerError(
        `Image data corrupted... please try again later`
      );
    }
    const uploadResult = await stepTreeUpload(imageData);

    await uploadRepository.save(
      id,
      createEntity({
        ...uploadResult,
      })
    );

    state.status = GenerationStatus.imageUploadeed;
    state.imageUrl = uploadResult.variants[0];
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);

    await stateRepository.save(state);

    return state;
  } else if (state.status === GenerationStatus.imageUploadeed) {
    const request = await requestRepository.fetch(id);
    const { nick: minter, message, value } = request;

    if (typeof minter !== "string")
      throw new InternalServerError("Minter isn't defined..");
    if (typeof message !== "string")
      throw new InternalServerError("Message isn't defined..");
    if (typeof value !== "string")
      throw new InternalServerError("Value isn't defined..");
    if (typeof state.imageUrl !== "string")
      throw new InternalServerError("Image url isn't defined..");

    const generationRequestResult = await stepFourGenerateVideo(
      minter,
      message,
      value,
      state.imageUrl
    );

    await videoRepository.save(
      id,
      createEntity({
        ...generationRequestResult,
      })
    );

    state.status = GenerationStatus.renderingVideoInitialized;
    state.videoUrl = generationRequestResult.url;
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);
  } else if (state.status === GenerationStatus.renderingVideoInitialized) {
    const video = await videoRepository.fetch(id);

    if (typeof video.id !== "string")
      throw new Error("Video record is corrupt");

    const {
      status,
      id: videoId,
      width,
      height,
      snapshotUrl,
      url,
      templateId,
    } = await stepFiveWaitForVideo(video.id);

    video.status = status;
    video.id = videoId;
    video.width = width;
    video.height = height;
    video.snapshotUrl = snapshotUrl;
    video.url = url;
    video.templateId = templateId;

    await videoRepository.save(video);

    state.status = GenerationStatus.renderingVideoFinished;
    state.videoUrl = url;
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);
  } else if (state.status === GenerationStatus.renderingVideoFinished) {
    if (typeof state.videoUrl !== "string") {
      throw new InternalServerError(
        `VideoUrl must be a string. State corrupted`
      );
    }

    const response = await stepSixTranscodeInitialization(state.videoUrl);

    await transcodeRepository.save(
      id,
      createEntity({
        ...response,
      })
    );

    state.status = GenerationStatus.transcodingVideoInitialized;
    state.transcodeId = response.id;
    state.transcodeAccountId = response.serviceAccountId;
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);
  } else if (state.status === GenerationStatus.transcodingVideoInitialized) {
    const transcode = await transcodeRepository.fetch(id);
    if (typeof transcode.id !== "string")
      throw new InternalServerError(
        `transcode.id must be a string. State corrupted`
      );

    if (state.transcodeId !== transcode.id)
      throw new InternalServerError(
        `Invalid transcode id: ${transcode.id} != ${state.transcodeId}`
      );

    const {
      id: transcodeId,
      progress,
      state: transcodeState,
      subState,
      drm,
      serviceAccountId,
      playbackUrl,
      playerUrl,
    } = await stepSevenTranscodeAwait(transcode.id);

    (transcode.id = transcodeId), (transcode.progress = progress);
    transcode.state = transcodeState;
    transcode.subState = subState;
    transcode.drm = drm;
    transcode.playbackUrl = playbackUrl;
    transcode.playerUrl = playerUrl;
    transcode.serviceAccountId = serviceAccountId;

    state.status = GenerationStatus.transcodingVideoFinished;
    state.transcodeId = transcodeId;
    state.transcodeAccountId = serviceAccountId;
    state.updatedAt = new Date();
    state.lockedUntil = new Date(0);
    await stateRepository.save(state);
  } else if (
    state.status === GenerationStatus.transcodingVideoFinished ||
    state.status === GenerationStatus.done
  ) {
    const { tokenId, transcodeId, imageUrl, videoUrl } = state;
    if (typeof tokenId !== "number")
      throw new Error(`Invalid token id: ${tokenId}`);
    if (typeof transcodeId !== "string")
      throw new Error(`Invalid transcode id: ${transcodeId}`);
    if (typeof imageUrl !== "string")
      throw new Error(`Invalid image url: ${imageUrl}`);
    if (typeof videoUrl !== "string")
      throw new Error(`Invalid video url: ${videoUrl}`);
    if (await stepEightInjectMeta(tokenId, imageUrl, transcodeId, videoUrl)) {
      state.status = GenerationStatus.done;
      state.updatedAt = new Date();
      state.lockedUntil = new Date(0);
      await stateRepository.save(state);
    }
  }

  state.lockedUntil = new Date(0);
  await stateRepository.save(state);
  await redis.quit();
  return state;
};

export default withJsonAnswer(withRedis(handler));
