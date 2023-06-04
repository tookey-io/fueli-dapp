import { toUnix } from "@/utils/toUnix";
import { Schema, SchemaDefinition } from "redis-om";

type FieldType<TField> = TField extends { type: infer TType }
  ? TType extends "string"
    ? string
    : TType extends "number"
    ? number
    : TType extends "date"
    ? Date
    : TType extends "boolean"
    ? boolean
    : TType extends "string[]"
    ? string[]
    : never
  : never;

type CollectTypes<T> = T extends Record<
  infer TKeys,
  { type: "string" | "number" | "date" | "boolean" | "string[]" }
>
  ? {
      [key in TKeys]: FieldType<T[key]>;
    }
  : never;

type TypedEntity<T> = CollectTypes<T> &
  CollectTypes<typeof baseEntitySchemaDef>;

const CREATED_AT_FIELD = {
  createdAt: { type: "date" },
} as const;
const UPDATED_AT_FIELD = {
  updatedAt: { type: "date" },
} as const;

const baseEntitySchemaDef = {
  ...CREATED_AT_FIELD,
  ...UPDATED_AT_FIELD,
} as const;

const createSchema = (name: string, schema: SchemaDefinition) =>
  new Schema(name, {
    ...CREATED_AT_FIELD,
    ...UPDATED_AT_FIELD,
    ...schema,
  });

export const updateEntity = <T extends {}>(entity: T) => ({
  ...entity,
  updatedAt: toUnix(new Date()),
});

export const createEntity = <T extends {}>(entity: T) => ({
  createdAt: toUnix(new Date()),
  updatedAt: toUnix(new Date()),
  ...entity,
});

const imageDataSchemaDef = {
  data: { type: "string" },
} as const;
export const imageDataSchema = createSchema("imageData", imageDataSchemaDef);
export type ImageDataEntity = TypedEntity<typeof imageDataSchemaDef>;

const requestSchemaDef = {
  nick: { type: "string" },
  tokenId: { type: "number" },
  message: { type: "string" },
  prompt: { type: "string" },
  value: { type: "string" },
} as const;
export const requestSchema = createSchema("request", requestSchemaDef);
export type RequestEntity = TypedEntity<typeof requestSchemaDef>;

const imageSchemaDef = {
  prompts: { type: "string[]" },
  engine: { type: "string" },
  steps: { type: "string" },
  preset: { type: "string" },
} as const;
export const imageSchema = createSchema("image", imageSchemaDef);
export type ImageEntity = TypedEntity<typeof imageSchemaDef>;

const uploadSchemaDef = {
  id: { type: "string" },
  variants: { type: "string[]" },
  requireSignedURLs: { type: "boolean" },
} as const;
export const uploadSchema = new Schema("upload", uploadSchemaDef);
export type UploadEntity = TypedEntity<typeof uploadSchemaDef>;

const videoSchemaDef = {
  id: { type: "string" },
  status: { type: "string" },
  url: { type: "string" },
  snapshotUrl: { type: "string" },
  templateId: { type: "string" },
  width: { type: "number" },
  height: { type: "number" },
} as const;
export const videoSchema = createSchema("video", videoSchemaDef);
export type VideoEntity = TypedEntity<typeof videoSchemaDef>;

const transcodeSchemaDef = {
  id: { type: "string" },
  serviceAccountId: { type: "string" },
  playbackUrl: { type: "string" },
  playerUrl: { type: "string" },
  progress: { type: "number" },
  state: { type: "string" },
  subState: { type: "string" },
  drm: { type: "string" },
} as const;
export const transcodeSchema = createSchema("transcode", transcodeSchemaDef);
export type TranscodeEntity = TypedEntity<typeof transcodeSchemaDef>;

const generationSchemaDef = {
  status: { type: "number" },
  tokenId: { type: "number" },
  videoUrl: { type: "string" },
  imageUrl: { type: "string" },
  transcodeId: { type: "string" },
  transcodeAccountId: { type: "string" },
  lockedUntil: { type: "date" },
} as const;
// export type GenerationModel =
export const generationSchema = createSchema("generation", generationSchemaDef);
export type GenerationEntity = TypedEntity<typeof generationSchemaDef>;

const mintEventSchemaDef = {
  tx: { type: "string" },
  block: { type: "number" },
  logIndex: { type: "number" },

  tokenId: { type: "number" },
  minter: { type: "string" },
  prompt: { type: "string" },
  message: { type: "string" },
  value: { type: "string" },
  privacy: { type: "boolean" },
} as const;
export const mintEventSchema = createSchema("mintEvent", mintEventSchemaDef);
export type MintEventEntity = TypedEntity<typeof mintEventSchemaDef>;

const watcherSchemaDef = {
  latestBlock: { type: "number" },
  batchSize: { type: "number" },
} as const;
export const watcherSchema = createSchema("watcher", watcherSchemaDef);
export type WatcherEntity = TypedEntity<typeof watcherSchemaDef>;

const priceSchemaDef = {
  price: { type: "number" },
} as const;
export const priceSchema = createSchema("price", priceSchemaDef);
export type PriceEntity = TypedEntity<typeof priceSchemaDef>;

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
