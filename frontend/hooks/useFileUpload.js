// hooks/useR2VideoUpload.js
import { useState, useCallback } from "react";

export function useR2VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedKey, setUploadedKey] = useState(null);

  const uploadVideo = useCallback(async (file, onProgress = null) => {
    if (!file) {
      setError("No file provided");
      return { success: false, error: "No file provided" };
    }

    if (!file.type.startsWith("video/")) {
      setError("Please select a video file");
      return { success: false, error: "Please select a video file" };
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);
    setUploadedKey(null);

    try {
      // Step 1: Get presigned URL from Next.js API route
      const response = await fetch("/api/r2-signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get signed URL");
      }

      const { signedUrl, key } = await response.json();

      // Step 2: Upload directly to R2 with progress tracking
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
          if (onProgress) onProgress(progress);
        }
      });

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error("Upload network error"));
        xhr.ontimeout = () => reject(new Error("Upload timeout"));
      });

      xhr.open("PUT", signedUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.timeout = 300000; // 5 minutes timeout
      xhr.send(file);

      await uploadPromise;

      setUploadedKey(key);
      return {
        success: true,
        key,
        url: `https://${
          process.env.NEXT_PUBLIC_R2_CUSTOM_DOMAIN || "your-domain.com"
        }/${key}`,
      };
    } catch (err) {
      const errorMessage = err.message || "Upload failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const resetUpload = useCallback(() => {
    setUploading(false);
    setUploadProgress(0);
    setError(null);
    setUploadedKey(null);
  }, []);

  return {
    uploadVideo,
    uploading,
    uploadProgress,
    error,
    uploadedKey,
    resetUpload,
  };
}
