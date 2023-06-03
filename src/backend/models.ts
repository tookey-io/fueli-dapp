import {
  Schema,
  SchemaDefinition
} from "redis-om";

const CREATED_AT_FIELD: SchemaDefinition = {
  createAt: { type: "date" },
};
const UPDATED_AT_FIELD: SchemaDefinition = {
  updateAt: { type: "date" },
};

const createSchema = (name: string, schema: SchemaDefinition) =>
  new Schema(name, {
    ...CREATED_AT_FIELD,
    ...UPDATED_AT_FIELD,
    ...schema,
  });

export const createEntity = (entity: Record<string, any>) => ({
  createAt: new Date(),
  updateAt: new Date(),
  ...entity,
});

export const imageDataSchema = createSchema("imageData", {
  data: { type: "string" },
});

export const requestSchema = createSchema("request", {
  nick: { type: "string" },
  tokenId: { type: "number" },
  message: { type: "string" },
  prompt: { type: "string" },
  value: { type: "string" },
});

export const imageSchema = createSchema("image", {
  prompts: { type: "string[]" },
  engine: { type: "string" },
  steps: { type: "string" },
  preset: { type: "string" },
});

export const uploadSchema = new Schema("upload", {
  id: { type: "string" },
  variants: { type: "string[]" },
  requireSignedURLs: { type: "boolean" },
});

export const videoSchema = createSchema("video", {
  id: { type: "string" },
  status: { type: "string" },
  url: { type: "string" },
  snapshotUrl: { type: "string" },
  templateId: { type: "string" },
  width: { type: "number" },
  height: { type: "number" },
});

export const transcodeSchema = createSchema("transcode", {
  id: { type: "string" },
  serviceAccountId: { type: "string" },
  playbackUrl: { type: "string" },
  playerUrl: { type: "string" },
  progress: { type: "number" },
  state: { type: "string" },
  subState: { type: "string" },
  drm: { type: "string" },
});

// export type GenerationModel =
export const generationSchema = createSchema("generation", {
  status: { type: "number" },
  tokenId: { type: "number" },
  videoUrl: { type: "string" },
  imageUrl: { type: "string" },
  transcodeId: { type: "string" },
  transcodeAccountId: { type: "string" }
});

export enum GenerationStatus {
  initialized,
  requestCollected,
  imageGenerated,
  imageUploadeed,
  renderingVideoInitialized,
  renderingVideoFinished,
  transcodingVideoInitialized,
  transcodingVideoFinished,
  injectingMetadata,
  done,
}
