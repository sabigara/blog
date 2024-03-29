import { promises as fs } from "node:fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import clipboardy from "clipboardy";
import dotenv from "dotenv";
import sizeOf from "image-size";
import { nanoid } from "nanoid";
import yargs from "yargs";

dotenv.config({
  path: ".env.local",
});

const { env } = require("@/env");

async function uploadImageToS3(filePath: string): Promise<void> {
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
    Bucket: env.S3_BUCKET_NAME,
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
