"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "@/api/axios.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

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
  // In-memory maps for non-serializable/transient fields
  const filesRef = useRef(new Map()); // id -> File
  const xhrRef = useRef(new Map()); // id -> XMLHttpRequest

  // Debounced persistence timer
  const persistTimerRef = useRef(null);

  const safeDecode = () => {
    const token = localStorage.getItem("token");
    if (!token) return { token: null, email: null };
    const decoded = jwt.decode(token);
    return { token, email: decoded?.email || null };
  };

  const persistUploads = useCallback((list) => {
    // Strip transient fields before persisting
    const sanitized = list.map(({ file, xhr, ...rest }) => rest);
    localStorage.setItem("activeUploads", JSON.stringify(sanitized));
  }, []);

  const schedulePersist = useCallback(
    (list) => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        persistUploads(list);
      }, 400); // debounce 400ms
    },
    [persistUploads]
  );

  // Load uploads from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("activeUploads");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUploads(parsed);
        // Attempt auto-resume only for items that have file in-memory (after SPA navigation),
        // not after hard refresh (file will not be present).
        parsed.forEach((upload) => {
          if (upload.status === "phase1-complete" && upload.presignedUrl) {
            // Only resume if we still have the File in memory
            const file = filesRef.current.get(upload.id);
            if (file) {
              resumeUpload({ ...upload, file });
            } else {
              // Mark as needs file to resume
              updateUpload(upload.id, {
                status: "error",
                error:
                  "Cannot resume upload: original file not available. Please retry and reselect the file.",
              });
            }
          }
        });
      } catch {
        // corrupted storage - clear it
        localStorage.removeItem("activeUploads");
      }
    }
    return () => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      // abort any in-flight XHRs
      xhrRef.current.forEach((xhr) => {
        try {
          xhr.abort();
        } catch {}
      });
      xhrRef.current.clear();
      filesRef.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save uploads to localStorage whenever uploads change (debounced)
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
    // cleanup transient maps
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
      const xhr = new XMLHttpRequest();
      xhrRef.current.set(id, xhr);

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
      // Set only if your backend presign expects Content-Type
      // xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    }).finally(() => {
      // clear the xhr ref for this id
      xhrRef.current.delete(id);
    });
  };

  const initiateUpload = async (file, metadata) => {
    const id = addUpload({
      fileName: file.name,
      fileSize: file.size,
      status: "initiating",
      progress: 0,
      metadata,
      phase: 1,
    });

    // store file in memory only
    filesRef.current.set(id, file);

    try {
      updateUpload(id, { status: "phase1-uploading" });

      const { token, email } = safeDecode();
      if (!email || !token) throw new Error("Not authenticated");

      // Phase 1: Get presigned URL
      const initiateResponse = await axios.post(
        "/videos/",
        {
          email,
          fileName: file.name, // consider using a uuid key server-side if desired
          fileSize: file.size,
          fileType: file.type,
          ...metadata,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { video, presignedUrl, objectUrl } =
        initiateResponse?.data?.data || {};
      if (!video?.video_id || !presignedUrl) {
        throw new Error("Invalid initiate response");
      }
      const fileUrl = objectUrl || presignedUrl.split("?")[0];

      // Update with phase 1 complete data (do NOT store file in persisted state)
      updateUpload(id, {
        status: "phase1-complete",
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
      });

      // Start phase 2 automatically (file from in-memory map)
      const f = filesRef.current.get(id);
      if (!f) {
        updateUpload(id, {
          status: "error",
          error: "Cannot start upload: file reference missing. Please retry.",
        });
        return id;
      }

      await resumeUpload({
        id,
        file: f,
        presignedUrl,
        fileUrl,
        videoId: video.video_id,
      });

      return id;
    } catch (error) {
      updateUpload(id, {
        status: "error",
        error:
          error?.response?.data?.error || error?.message || "Upload failed",
      });
      throw error;
    }
  };

  const resumeUpload = async (uploadData) => {
    const { id, file, presignedUrl, fileUrl, videoId } = uploadData;

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

      // Phase 2: Upload to R2
      await uploadFileToR2(id, file, presignedUrl, (progress) => {
        updateUpload(id, { progress });
      });

      updateUpload(id, { status: "phase3-uploading", phase: 3, progress: 95 });

      // Phase 3: Complete upload
      const { token, email } = safeDecode();
      if (!email || !token) throw new Error("Not authenticated");

      await axios.patch(
        `/videos/${videoId}`,
        { email, videoUrl: fileUrl, status: "active" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateUpload(id, {
        status: "completed",
        progress: 100,
        phase: 3,
      });

      // Optionally move to history UI instead of removing, or make this configurable
      setTimeout(() => {
        removeUpload(id);
      }, 5000);
    } catch (error) {
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

    // If we have file and presignedUrl, try resuming; else re-initiate
    if (hasPresigned && file) {
      await resumeUpload({ ...upload, file });
    } else if (file) {
      // Restart from phase 1 with existing metadata
      removeUpload(id);
      await initiateUpload(file, upload.metadata || {});
    } else {
      // No file available: prompt user to reselect (surface error)
      updateUpload(id, {
        error:
          "Cannot retry: original file not available. Please start a new upload and select the file again.",
      });
    }
  };

  const cancelAllUploads = useCallback(() => {
    // Abort all XHRs
    xhrRef.current.forEach((xhr) => {
      try {
        xhr.abort();
      } catch {}
    });
    xhrRef.current.clear();
    filesRef.current.clear();

    // Clear local state and storage
    setUploads([]);
    localStorage.removeItem("activeUploads");
  }, []);

  // Optional: cancel a single upload
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
