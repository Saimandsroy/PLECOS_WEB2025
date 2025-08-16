import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  region: process.env.R2_REGION || "auto",
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    const contentType = searchParams.get("contentType");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Extract file extension from original filename
    const fileExtension = filename.split(".").pop();

    // Generate UUID-based filename
    const uuidFilename = `${uuidv4()}.${fileExtension}`;

    // Create key with uploads directory + UUID filename
    const key = `course-thumbnail/${uuidFilename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      ContentType: contentType || "application/octet-stream",
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return NextResponse.json({
      signedUrl,
      key,
      originalFilename: filename,
      uuidFilename: uuidFilename,
      success: true,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
