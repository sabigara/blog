import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import clipboardy from "clipboardy";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import sizeOf from "image-size";
import { nanoid } from "nanoid";
import yargs from "yargs";

dotenv.config({
  path: ".env.local",
});

const env = {
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_PUBLIC_URL: process.env.S3_PUBLIC_URL,
};

async function uploadImageToS3(filePath: string): Promise<void> {
  assertIsEnvConfig(env);

  console.log("🟠 Uploading...");

  const s3Client = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: "auto",
  });

  const fileContent = await fs.readFile(filePath);

  const dimensions = sizeOf(filePath);
  if (!dimensions.width || !dimensions.height) {
    throw new Error("Unable to determine image dimensions.");
  }

  const ext = filePath.split(".").pop() || "jpg";
  const key = `uploads/${nanoid(8)}_${dimensions.width}x${
    dimensions.height
  }.${ext}`;

  const uploadParams = {
    Bucket: env.BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: `image/${ext}`,
    ACL: "public-read",
  } as const;

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));

    const publicUrl = `${env.S3_PUBLIC_URL}/${key}`;
    clipboardy.writeSync(`![](${publicUrl})`);
    console.log("🟢 Successfully uploaded to:", publicUrl);
  } catch (error) {
    console.error("Error uploading to S3:", error);
  }
}

type EnvVars = {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  BUCKET_NAME: string;
  S3_ENDPOINT: string;
  S3_PUBLIC_URL: string;
};

function assertIsEnvConfig(obj: any): asserts obj is EnvVars {
  const expectedKeys: (keyof EnvVars)[] = [
    "BUCKET_NAME",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "S3_ENDPOINT",
    "S3_PUBLIC_URL",
  ];

  for (const key of expectedKeys) {
    if (!obj[key] || typeof obj[key] !== "string") {
      throw new Error(`${key} is not defined or is not a string`);
    }
  }
}

yargs
  .command({
    command: "$0 <file>",
    describe: "Upload an image to S3",
    handler: async (argv) => {
      if (typeof argv.file === "string") {
        await uploadImageToS3(argv.file);
      }
    },
  })
  .strict()
  .help().argv;
