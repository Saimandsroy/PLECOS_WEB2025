"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import axios from "@/api/axios";

const UploadContext = createContext(null);

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const filesRef = useRef(new Map());
  const xhrRef = useRef(new Map());
  const persistTimerRef = useRef(null);

  const safeDecode = () => {
    const token = localStorage.getItem("token");
    if (!token) return { token: null, email: null };
    const decoded = jwt.decode(token);
    return { token, email: decoded?.email || null };
  };

  const persistUploads = useCallback((list) => {
    const sanitized = list.map(({ file, xhr, ...rest }) => rest);
    localStorage.setItem("activeUploads", JSON.stringify(sanitized));
  }, []);

  const schedulePersist = useCallback(
    (list) => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        persistUploads(list);
      }, 400);
    },
    [persistUploads]
  );

  useEffect(() => {
    const saved = localStorage.getItem("activeUploads");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUploads(parsed);
        parsed.forEach((upload) => {
          if (upload.status === "phase1-complete" && upload.presignedUrl) {
            const file = filesRef.current.get(upload.id);
            if (file) {
              resumeUpload({ ...upload, file, metadata: upload.metadata }); // ✅ Pass metadata
            } else {
              updateUpload(upload.id, {
                status: "error",
                error:
                  "Cannot resume upload: original file not available. Please retry and reselect the file.",
              });
            }
          }
        });
      } catch {
        localStorage.removeItem("activeUploads");
      }
    }
    return () => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      xhrRef.current.forEach((xhr) => {
        try {
          xhr.abort();
        } catch {}
      });
      xhrRef.current.clear();
      filesRef.current.clear();
    };
  }, []);

  useEffect(() => {
    schedulePersist(uploads);
  }, [uploads, schedulePersist]);

  const addUpload = (uploadData) => {
    const id = uuid();
    const newUpload = {
      id,
      ...uploadData,
      createdAt: new Date().toISOString(),
    };
    setUploads((prev) => [...prev, newUpload]);
    return id;
  };

  const updateUpload = (id, updates) => {
    setUploads((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
  };

  const removeUpload = (id) => {
    setUploads((prev) => prev.filter((u) => u.id !== id));
    filesRef.current.delete(id);
    const xhr = xhrRef.current.get(id);
    if (xhr) {
      try {
        xhr.abort();
      } catch {}
      xhrRef.current.delete(id);
    }
  };

  const uploadFileToR2 = (id, file, presignedUrl, onProgress) => {
    return new Promise((resolve, reject) => {
      console.log(`🚀 Starting R2 upload for ${id}:`, {
        fileName: file.name,
        fileSize: file.size,
        presignedUrlPreview: presignedUrl.substring(0, 100) + "...",
      });

      const xhr = new XMLHttpRequest();
      xhrRef.current.set(id, xhr);

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          console.log(`📊 Upload progress for ${id}: ${percentComplete}%`);
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        console.log(
          `✅ R2 upload completed for ${id} with status:`,
          xhr.status
        );
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          console.error(
            `❌ R2 upload failed for ${id}:`,
            xhr.status,
            xhr.statusText
          );
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", (e) => {
        console.error(`❌ Network error for upload ${id}:`, e);
        reject(new Error("Upload failed due to network error"));
      });

      xhr.addEventListener("abort", () => {
        console.log(`⏹️ Upload aborted for ${id}`);
        reject(new Error("Upload was aborted"));
      });

      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", file.type); // ✅ Set content type
      xhr.send(file);
    }).finally(() => {
      xhrRef.current.delete(id);
    });
  };

  const initiateUpload = async (file, metadata) => {
    console.log("🚀 Initiating upload with metadata:", metadata);

    const id = addUpload({
      fileName: file.name,
      fileSize: file.size,
      status: "initiating",
      progress: 0,
      metadata,
      phase: 1,
    });

    filesRef.current.set(id, file);

    try {
      updateUpload(id, { status: "phase1-uploading" });

      const initiateResponse = await axios.post("/videos/", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        ...metadata,
      });

      console.log("✅ Phase 1 response:", initiateResponse);

      const { video, presignedUrl, objectUrl } =
        initiateResponse?.data?.data || {};
      if (!video?.video_id || !presignedUrl) {
        throw new Error("Invalid initiate response");
      }
      const fileUrl = objectUrl || presignedUrl.split("?")[0];

      updateUpload(id, {
        status: "phase1-complete",
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
      });

      const f = filesRef.current.get(id);
      if (!f) {
        updateUpload(id, {
          status: "error",
          error: "Cannot start upload: file reference missing. Please retry.",
        });
        return id;
      }

      // ✅ Pass metadata to resumeUpload
      await resumeUpload({
        id,
        file: f,
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
        metadata, // ✅ Include metadata here
      });

      return id;
    } catch (error) {
      console.error("❌ Phase 1 failed:", error);
      updateUpload(id, {
        status: "error",
        error:
          error?.response?.data?.error || error?.message || "Upload failed",
      });
      throw error;
    }
  };

  // ✅ Fixed resumeUpload function
  const resumeUpload = async (uploadData) => {
    const { id, file, presignedUrl, fileUrl, videoId, metadata } = uploadData; // ✅ Destructure metadata

    console.log("🔄 Resuming upload for:", id, "with metadata:", metadata);

    try {
      if (!file) {
        updateUpload(id, {
          status: "error",
          error:
            "Cannot resume upload: original file not available. Please retry and reselect the file.",
        });
        return;
      }

      updateUpload(id, { status: "phase2-uploading", phase: 2 });
      console.log("📤 Starting Phase 2: R2 Upload for", id);

      // Phase 2: Upload to R2
      await uploadFileToR2(id, file, presignedUrl, (progress) => {
        updateUpload(id, { progress });
      });

      console.log("✅ Phase 2 completed for", id);
      updateUpload(id, { status: "phase3-uploading", phase: 3, progress: 95 });
      console.log("📤 Starting Phase 3: Finalizing upload for", id);

      // ✅ Phase 3: Complete upload with metadata
      const patchData = {
        videoUrl: fileUrl,
        status: "active",
      };

      // ✅ Add metadata fields to patch request
      if (metadata) {
        if (metadata.title) patchData.title = metadata.title;
        if (metadata.description) patchData.description = metadata.description;
        if (metadata.category) patchData.category = metadata.category;
        if (metadata.tags) patchData.tags = metadata.tags;
        if (metadata.duration) patchData.duration = metadata.duration;
        if (metadata.thumbnailKey)
          patchData.thumbnailKey = metadata.thumbnailKey;
        if (metadata.uploadDate) patchData.uploadDate = metadata.uploadDate;
      }

      console.log("📤 Phase 3: PATCH request data:", {
        videoUrl: fileUrl,
        status: "active",
      });

      await axios.patch(`/videos/${videoId}`, {
        videoUrl: fileUrl,
        status: "active",
      });

      console.log("✅ Phase 3 completed successfully for", id);
      updateUpload(id, {
        status: "completed",
        progress: 100,
        phase: 3,
      });

      setTimeout(() => {
        console.log("🗑️ Removing completed upload:", id);
        removeUpload(id);
      }, 5000);
    } catch (error) {
      console.error("❌ Resume upload failed for", id, ":", error);
      updateUpload(id, {
        status: "error",
        error:
          error?.response?.data?.error || error?.message || "Upload failed",
      });
    }
  };

  const retryUpload = async (id) => {
    const upload = uploads.find((u) => u.id === id);
    if (!upload || upload.status !== "error") return;

    const file = filesRef.current.get(id);
    const hasPresigned = !!upload.presignedUrl;

    if (hasPresigned && file) {
      await resumeUpload({ ...upload, file, metadata: upload.metadata }); // ✅ Pass metadata
    } else if (file) {
      removeUpload(id);
      await initiateUpload(file, upload.metadata || {});
    } else {
      updateUpload(id, {
        error:
          "Cannot retry: original file not available. Please start a new upload and select the file again.",
      });
    }
  };

  const cancelAllUploads = useCallback(() => {
    xhrRef.current.forEach((xhr) => {
      try {
        xhr.abort();
      } catch {}
    });
    xhrRef.current.clear();
    filesRef.current.clear();
    setUploads([]);
    localStorage.removeItem("activeUploads");
  }, []);

  const cancelUpload = useCallback((id) => {
    const xhr = xhrRef.current.get(id);
    if (xhr) {
      try {
        xhr.abort();
      } catch {}
      xhrRef.current.delete(id);
    }
    filesRef.current.delete(id);
    removeUpload(id);
  }, []);

  return (
    <UploadContext.Provider
      value={{
        uploads,
        addUpload,
        updateUpload,
        removeUpload,
        initiateUpload,
        resumeUpload,
        retryUpload,
        cancelAllUploads,
        cancelUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
