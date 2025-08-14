import { useState, useCallback } from "react";
import axios from "axios";

const useVideoUpload = () => {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    uploadId: null,
    status: "idle",
  });

  const uploadVideo = useCallback(async (file, metadata = {}) => {
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      uploadId: null,
      status: "uploading",
    });

    try {
      // Phase 1: Initiate upload and get presigned URL
      const initiateResponse = await axios.post(
        "/videos/",
        {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          ...metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { uploadId, presignedUrl } = initiateResponse.data;

      setUploadState((prev) => ({
        ...prev,
        uploadId,
      }));

      // Phase 2: Upload file directly to R2
      await uploadFileToR2(file, presignedUrl, (progress) => {
        setUploadState((prev) => ({
          ...prev,
          progress,
        }));
      });

      // Phase 3: Notify backend of completion
      const completeResponse = await axios.post(
        `/api/uploads/${uploadId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        uploadId,
        status: "completed",
      });

      return completeResponse.data;
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.response?.data?.error || error.message,
        uploadId: uploadState.uploadId,
        status: "error",
      });
      throw error;
    }
  }, []);

  const uploadFileToR2 = (file, presignedUrl, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed due to network error"));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload was aborted"));
      });

      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };

  const resetUpload = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      uploadId: null,
      status: "idle",
    });
  }, []);

  return {
    uploadVideo,
    resetUpload,
    ...uploadState,
  };
};

export default useVideoUpload;
