import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./s3Client.js";

const sanitizeFileName = (name) => {
  return name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w.-]/g, "")
    .toLowerCase();
};

export const uploadBufferToS3 = async (file, folder) => {
  const safeName = sanitizeFileName(file.originalname); // 👈 Clean it
  const key = `${folder}${Date.now()}-${safeName}`; // 👈 Use the cleaned name

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
