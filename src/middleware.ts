import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as ethers from "ethers";
import { createClient } from "redis";
import { Repository } from "redis-om";
import {
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

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

async function prepare() {
  const redis = createClient({ url: process.env.REDIS_URL });
  redis.on("error", (err) => console.log("Redis Client Error", err));
  await redis.connect();

  await Promise.all(
    [
      new Repository(generationSchema, redis),
      new Repository(requestSchema, redis),
      new Repository(imageSchema, redis),
      new Repository(imageDataSchema, redis),
      new Repository(uploadSchema, redis),
      new Repository(videoSchema, redis),
      new Repository(transcodeSchema, redis),
    ].map((repo) => repo.createIndex())
  );
}

prepare().catch((err) => console.error(err));

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hello-from-middleware1", "hello");

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("x-hello-from-middleware2", "hello");
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/generation",
};
