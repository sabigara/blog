import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    S3_ENDPOINT: z.string().url(),
    S3_PUBLIC_URL: z.string().url(),
    S3_BUCKET_NAME: z.string().min(1),
    PAAPI_PROXY_URL: z.string().url(),
    PAAPI_PROXY_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_PUBLIC_URL: process.env.S3_PUBLIC_URL,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    PAAPI_PROXY_URL: process.env.PAAPI_PROXY_URL,
    PAAPI_PROXY_API_KEY: process.env.PAAPI_PROXY_API_KEY,
  },
});
