"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "@/api/axios.js";
import jwt from "jsonwebtoken";

const UploadContext = createContext();

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);

  // Load uploads from localStorage on mount
  useEffect(() => {
    const savedUploads = localStorage.getItem("activeUploads");
    if (savedUploads) {
      const parsedUploads = JSON.parse(savedUploads);
      setUploads(parsedUploads);

      // Resume any pending uploads
      parsedUploads.forEach((upload) => {
        if (upload.status === "phase1-complete" && upload.presignedUrl) {
          resumeUpload(upload);
        }
      });
    }
  }, []);

  // Save uploads to localStorage whenever uploads change
  useEffect(() => {
    localStorage.setItem("activeUploads", JSON.stringify(uploads));
  }, [uploads]);

  const addUpload = (uploadData) => {
    const newUpload = {
      id: Date.now().toString(),
      ...uploadData,
      createdAt: new Date().toISOString(),
    };

    setUploads((prev) => [...prev, newUpload]);
    return newUpload.id;
  };

  const updateUpload = (id, updates) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, ...updates } : upload
      )
    );
  };

  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== id));
  };

  const initiateUpload = async (file, metadata) => {
    const uploadId = addUpload({
      fileName: file.name,
      fileSize: file.size,
      status: "initiating",
      progress: 0,
      metadata,
      phase: 1,
    });

    try {
      updateUpload(uploadId, { status: "phase1-uploading" });

      // Phase 1: Get presigned URL
      const token = localStorage.getItem("token");
      const initiateResponse = await axios.post(
        "/videos/",
        {
          email: jwt.decode(token).email,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          ...metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { video, presignedUrl } = initiateResponse.data.data;
      const fileUrl = presignedUrl.split("?")[0];

      // Update with phase 1 complete data
      updateUpload(uploadId, {
        status: "phase1-complete",
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
        file: file, // Store file for later upload
      });

      // Start phase 2 automatically
      resumeUpload({
        id: uploadId,
        file,
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
      });

      return uploadId;
    } catch (error) {
      updateUpload(uploadId, {
        status: "error",
        error: error.response?.data?.error || error.message,
      });
      throw error;
    }
  };

  const resumeUpload = async (uploadData) => {
    const { id, file, presignedUrl, fileUrl, videoId } = uploadData;

    try {
      updateUpload(id, { status: "phase2-uploading", phase: 2 });

      // Phase 2: Upload to R2
      await uploadFileToR2(file, presignedUrl, (progress) => {
        updateUpload(id, { progress });
      });

      updateUpload(id, { status: "phase3-uploading", phase: 3, progress: 95 });

      // Phase 3: Complete upload
      const token = localStorage.getItem("token");
      await axios.patch(
        `/videos/${videoId}`,
        {
          email: jwt.decode(token).email,
          videoUrl: fileUrl,
          status: "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateUpload(id, {
        status: "completed",
        progress: 100,
        phase: 3,
      });

      // Remove from active uploads after a delay
      setTimeout(() => {
        removeUpload(id);
      }, 5000);
    } catch (error) {
      updateUpload(id, {
        status: "error",
        error: error.response?.data?.error || error.message,
      });
    }
  };

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
      xhr.send(file);
    });
  };

  const retryUpload = (id) => {
    const upload = uploads.find((u) => u.id === id);
    if (upload && upload.status === "error") {
      if (upload.presignedUrl) {
        resumeUpload(upload);
      } else {
        // Restart from phase 1
        initiateUpload(upload.file, upload.metadata);
        removeUpload(id);
      }
    }
  };

  return (
    <UploadContext.Provider
      value={{
        uploads,
        addUpload,
        updateUpload,
        removeUpload,
        initiateUpload,
        retryUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
