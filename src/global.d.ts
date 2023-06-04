declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_RPC_URL: string;
    NEXT_PUBLIC_FUELI: `0x${string}`;
    NEXT_PUBLIC_PICLI: `0x${string}`;
    NEXT_PUBLIC_GOVERNANCE: `0x${string}`;
    NEXT_PUBLIC_MINTER: `0x${string}`;

    REDIS_URL: string;

    STABILITY_API_KEY: string;
    STABILITY_URL: string;
    STABILITY_ENGINE: string;

    CLOUDFLARE_UPLOAD_URL: string;
    CLOUDFLARE_API_TOKEN: string;

    CREATOMATE_API_URL: string;
    CREATOMATE_API_TOKEN: string;
    CREATOMATE_TEMPLATE: string;
    CREATOMATE_TITLE: string;

    NEXT_PUBLIC_THETA_VIDEO_USER: string;
    NEXT_PUBLIC_THETA_VIDEO_SRVA: string;
    THETAVIDEO_API_URL: string;
    THATEVIDEO_API_ID: string;
    THATEVIDEO_API_SECRET: string;

    INJECTOR_PRIVATE_KEY: string;

    [key: string]: never;
  }
}
