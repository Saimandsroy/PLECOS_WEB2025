import { useState, useCallback, useRef, useEffect } from "react";
import api from "@/api/axios.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const useVideoUpload = () => {
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    progress: 0,
    error: null,
    uploadId: null,
    status: "idle",
  });

  const xhrRef = useRef(null);
  const uploadIdRef = useRef(null);

  // Cancel in-flight upload
  const cancelUpload = useCallback(() => {
    if (xhrRef.current && uploadState.isUploading) {
      xhrRef.current.abort();
    }
  }, [uploadState.isUploading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (xhrRef.current) xhrRef.current.abort();
    };
  }, []);

  const uploadFileToR2 = (file, presignedUrl, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

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

      xhr.addEventListener("error", () =>
        reject(new Error("Upload failed due to network error"))
      );
      xhr.addEventListener("abort", () =>
        reject(new Error("Upload was aborted"))
      );

      xhr.open("PUT", presignedUrl);
      // Only set Content-Type if your presign expects it.
      // xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };

  const uploadVideo = useCallback(async (file, metadata = {}) => {
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
      uploadId: null,
      status: "uploading",
    });

    try {
      const token = localStorage.getItem("token");
      const decoded = token ? jwt.decode(token) : null;
      const email = decoded?.email;
      if (!email) throw new Error("Not authenticated");

      // Phase 1: Initiate upload
      const fileKey = uuid(); // backend should use this key when presigning
      const initiateResponse = await api.post(
        "/videos/",
        {
          email,
          fileName: fileKey,
          fileSize: file.size,
          fileType: file.type,
          ...metadata,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { video, presignedUrl, objectUrl } =
        initiateResponse.data?.data || {};
      const uploadId = video?.video_id;
      if (!uploadId || !presignedUrl)
        throw new Error("Invalid initiate response");

      uploadIdRef.current = uploadId;
      setUploadState((prev) => ({ ...prev, uploadId }));

      // Prefer server objectUrl; fallback to stripping query (may not be public)
      const fileUrl = objectUrl || presignedUrl.split("?")[0];

      // Phase 2: Upload to R2
      await uploadFileToR2(file, presignedUrl, (progress) => {
        setUploadState((prev) => ({ ...prev, progress }));
      });

      // Phase 3: Finalize on backend
      const completeResponse = await api.patch(
        `/videos/${uploadId}`,
        { email, videoUrl: fileUrl, status: "active" },
        { headers: { Authorization: `Bearer ${token}` } }
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
      setUploadState((prev) => ({
        isUploading: false,
        progress: 0,
        error: error?.response?.data?.error || error.message,
        uploadId: uploadIdRef.current || prev.uploadId,
        status: "error",
      }));
      throw error;
    } finally {
      xhrRef.current = null;
    }
  }, []);

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
    cancelUpload,
    resetUpload,
    ...uploadState,
  };
};

export default useVideoUpload;
