declare namespace NodeJS {
  export interface ProcessEnv {
    RPC_URL: string;
    FUELI: string;
    PICLI: string;
    GOVERNANCE: string;
    MINTER: string;

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

    THETAVIDEO_API_URL: string;
    THATEVIDEO_API_ID: string;
    THATEVIDEO_API_SECRET: string;

    INJECTOR_PRIVATE_KEY: string;
  }
}
