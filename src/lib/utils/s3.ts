'use client';

import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY_ID as string;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string;

export const client = new S3Client({
  credentials: {
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKeyId
  },
  region: 'us-east-1'
});

export const signedUrl = async (key: string, type: string | null) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: key,
      ...(type && {
        ResponseContentType: type
      })
    });
    return await getSignedUrl(client, command, { expiresIn: 900 });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signedUrlFromPublicBucket = async (
  key: string,
  type: string | null,
  contentDisposition: string | null
) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_OPEN_BUCKET,
      Key: key,
      ...(type && {
        ResponseContentType: type
      }),
      ...(contentDisposition && {
        ResponseContentDisposition: contentDisposition
      })
    });
    return await getSignedUrl(client, command, { expiresIn: 900 });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadFileWithKeyAndBuffer = async (key: string, data: Buffer) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: key,
      Body: data
    };
    const command = new PutObjectCommand(params);
    await client.send(command);
    return await signedUrl(key, '');
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const uploadPublicFileWithKeyAndBuffer = async (key: string, data: Buffer) => {
  try {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_OPEN_BUCKET,
      Key: key,
      Body: data
    };
    const command = new PutObjectCommand(params);
    await client.send(command);
    return `${process.env.NEXT_PUBLIC_PUBLIC_BUCKET_URL}/${key}`;
  } catch (error) {
    console.log(error);
    return null;
  }
};
