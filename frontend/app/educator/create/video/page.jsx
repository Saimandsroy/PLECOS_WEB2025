"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  Play,
  FileVideo,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Tag,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useUploadContext } from "@/contexts/UploadContext";
import "./page.css";

const MAX_VIDEO_SIZE = 2_000 * 1024 * 1024; // 2GB
const MAX_THUMB_SIZE = 5 * 1024 * 1024; // 5MB

const categories = [
  "Education",
  "Technology",
  "Science",
  "Business",
  "Arts & Design",
  "Health & Fitness",
  "Programming",
  "Mathematics",
];

export default function UploadForm() {
  const router = useRouter();
  const { initiateUpload, uploads } = useUploadContext(); // ✅ Get uploads to track status

  const [step, setStep] = useState(1);
  const [isInitiating, setIsInitiating] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [err, setErr] = useState("");
  const [uploadId, setUploadId] = useState(null); // ✅ Track current upload ID

  const thumbInputRef = useRef(null);
  const videoRef = useRef(null);

  const [form, setForm] = useState({
    video: null,
    thumbnail: null,
    category: "",
    tags: "",
    title: "",
    description: "",
  });

  // State for tracking thumbnail upload (only during submit)
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  // ✅ Monitor upload progress and completion
  useEffect(() => {
    if (uploadId) {
      const currentUpload = uploads.find(u => u.id === uploadId);

      if (currentUpload) {
        console.log("Upload status:", currentUpload.status, "Progress:", currentUpload.progress);

        // ✅ Only redirect when upload is truly completed
        if (currentUpload.status === "completed") {
          console.log("✅ Upload completed successfully! Redirecting...");

          // Reset form
          setForm({
            video: null,
            thumbnail: null,
            category: "",
            tags: "",
            title: "",
            description: "",
          });
          setStep(1);
          setUploadId(null);
          setIsInitiating(false);

          // Redirect after successful completion
          router.push("/educator/create");
        } else if (currentUpload.status === "error") {
          console.error("❌ Upload failed:", currentUpload.error);
          setErr(currentUpload.error || "Upload failed");
          setIsInitiating(false);
          setUploadId(null);
        }
      }
    }
  }, [uploads, uploadId, router]);

  // Upload thumbnail function (called only on submit)
  const uploadThumbnailToR2 = async (file) => {
    setThumbnailUploading(true);

    try {
      // 1. Get signed URL from your Next.js backend
      const response = await fetch(
        `/api/image-upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}&fileSize=${file.size}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get signed URL');
      }

      const { signedUrl, key, uuidFilename } = await response.json();

      // 2. Upload the file directly to R2 using the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (uploadResponse.ok) {
        console.log('✅ Thumbnail upload successful!');
        return key; // Return the R2 key
      } else {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }
    } catch (error) {
      console.error('Thumbnail upload error:', error);
      throw error; // Re-throw to be handled in submit function
    } finally {
      setThumbnailUploading(false);
    }
  };

  // Stable object URL for video to avoid reloads on re-render
  const videoUrl = useMemo(() => {
    if (!form.video) return null;
    return URL.createObjectURL(form.video);
  }, [form.video]);

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const onLoadedMetadata = (e) => {
    try {
      const secs = Math.max(0, Math.floor(e.target.duration || 0));
      setVideoDuration(secs);
    } catch {
      setVideoDuration(0);
    }
  };

  const tagList = useMemo(
    () =>
      form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [form.tags]
  );

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "video/*": [] },
    maxFiles: 1,
    maxSize: MAX_VIDEO_SIZE,
    disabled: isInitiating,
    multiple: false,
    onDrop: (files) => {
      const file = files?.[0];
      if (!file) return;
      if (file.size > MAX_VIDEO_SIZE) {
        setErr("Video is larger than 2GB. Please choose a smaller file.");
        return;
      }
      setErr("");
      setField("video", file);
    },
  });

  // Modified to NOT upload immediately - just store the file
  const onSelectThumb = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_THUMB_SIZE) {
      setErr("Thumbnail is larger than 5MB.");
      return;
    }

    setErr("");
    setField("thumbnail", file); // Just store the file, don't upload yet
  };

  const openThumbPicker = () => {
    if (!isInitiating && !thumbnailUploading && thumbInputRef.current) {
      thumbInputRef.current.click();
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  const canNext = !!form.video && !isInitiating && !thumbnailUploading;
  const canPublish =
    !!form.video &&
    !!form.title.trim() &&
    !!form.category &&
    !isInitiating &&
    !thumbnailUploading;

  // ✅ Fixed submit function
  const submit = async () => {
    if (!canPublish) return;
    setErr("");
    setIsInitiating(true);

    try {
      let thumbnailKey = null;

      // Upload thumbnail only when submitting
      if (form.thumbnail) {
        try {
          console.log("📤 Starting thumbnail upload...");
          thumbnailKey = await uploadThumbnailToR2(form.thumbnail);
          console.log("✅ Thumbnail uploaded with key:", thumbnailKey);
        } catch (error) {
          setErr(`Thumbnail upload failed: ${error.message}`);
          setIsInitiating(false);
          return;
        }
      }

      const metadata = {
        title: form.title,
        description: form.description,
        category: form.category,
        tags: tagList,
        duration: videoDuration || 0,
        uploadDate: new Date().toISOString(),
        thumbnailKey: thumbnailKey, // Use the uploaded key
      };

      console.log("📤 Starting video upload with metadata:", metadata);

      // ✅ Store the upload ID to track its progress
      const uploadId = await initiateUpload(form.video, metadata);
      setUploadId(uploadId);

      console.log("📤 Upload initiated with ID:", uploadId);

      // ✅ DON'T redirect here - let the useEffect handle it when upload completes

    } catch (e) {
      console.error("❌ Submit error:", e);
      setErr(
        e?.response?.data?.error ||
        e?.message ||
        "Failed to start upload. Please try again."
      );
      setIsInitiating(false);
      setUploadId(null);
    }
    // ✅ Don't set setIsInitiating(false) here - let useEffect handle it
  };

  // ✅ Get current upload for display
  const currentUpload = uploadId ? uploads.find(u => u.id === uploadId) : null;

  return (
    <div className="uplx-page">
      <div className="uplx-container">
        <header className="uplx-header">
          <div className="uplx-head-left">
            <button
              className="uplx-btn-ghost"
              onClick={() => router.back()}
              disabled={isInitiating || thumbnailUploading}
              title="Back"
            >
              <ChevronLeft size={18} />
              Back
            </button>
            <div className="uplx-steps">
              <div className={`uplx-step ${step >= 1 ? "active" : ""}`}>1</div>
              <div className={`uplx-step ${step >= 2 ? "active" : ""}`}>2</div>
            </div>
            <h1 className="uplx-title">Upload new video</h1>
          </div>
          <div className="uplx-head-right">
            <button
              className={`uplx-btn ${canPublish ? "uplx-btn-primary" : "uplx-btn-disabled"}`}
              onClick={submit}
              disabled={!canPublish}
            >
              {isInitiating || thumbnailUploading ? (
                <>
                  <Loader2 className="uplx-spinner" />
                  {thumbnailUploading
                    ? "Uploading thumbnail..."
                    : currentUpload?.status === "phase2-uploading"
                      ? `Uploading video... ${currentUpload.progress || 0}%`
                      : currentUpload?.status === "phase3-uploading"
                        ? "Finalizing..."
                        : "Starting upload..."
                  }
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </header>

        {err ? (
          <div className="uplx-banner uplx-banner-error">
            <AlertTriangle size={16} />
            <span>{err}</span>
          </div>
        ) : null}

        {/* ✅ Show upload progress */}
        {currentUpload && (
          <div className="uplx-banner" style={{ backgroundColor: 'rgba(26, 115, 232, 0.1)', borderColor: 'rgba(26, 115, 232, 0.3)', color: '#1a73e8' }}>
            <Loader2 className="uplx-spinner" size={16} />
            <span>
              {currentUpload.status === "phase1-uploading" && "Getting upload URL..."}
              {currentUpload.status === "phase2-uploading" && `Uploading to R2... ${currentUpload.progress || 0}%`}
              {currentUpload.status === "phase3-uploading" && "Finalizing upload..."}
            </span>
          </div>
        )}

        <div className="uplx-grid">
          {/* Media card */}
          <section className="uplx-card">
            <h3 className="uplx-card-title">Media</h3>

            {/* Dropzone separated from preview to avoid re-mounts */}
            {!form.video ? (
              <div
                className={`uplx-drop ${isDragActive ? "uplx-drop-active" : ""}`}
                {...getRootProps()}
                style={{ cursor: (isInitiating || thumbnailUploading) ? "not-allowed" : "pointer" }}
              >
                <input {...getInputProps()} />
                <div className="uplx-drop-inner">
                  <div className="uplx-icon-circle">
                    <Play size={24} />
                  </div>
                  <div>
                    <h4>{isDragActive ? "Drop your video" : "Click or drag a video"}</h4>
                    <p>MP4, WebM, AVI up to 2GB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="uplx-preview-wrap">
                <video
                  key={videoUrl}
                  className="uplx-video"
                  controls
                  ref={videoRef}
                  onLoadedMetadata={onLoadedMetadata}
                  src={videoUrl}
                />
                <div className="uplx-video-meta">
                  <Clock size={14} /> {formatDuration(videoDuration)}
                </div>

                <div className="uplx-row">
                  <div className="uplx-tag">
                    <FileVideo size={14} />
                    <span>
                      {form.video.name} • {Math.max(1, Math.round(form.video.size / (1024 * 1024)))} MB
                    </span>
                  </div>
                  <button
                    className="uplx-btn uplx-btn-ghost"
                    onClick={() => setField("video", null)}
                    disabled={isInitiating || thumbnailUploading}
                  >
                    Choose another
                  </button>
                </div>
              </div>
            )}

            {/* Updated Thumbnail section */}
            <div className="uplx-thumb" onClick={openThumbPicker}>
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/*"
                className="uplx-hidden"
                onChange={onSelectThumb}
                disabled={isInitiating || thumbnailUploading}
              />
              {form.thumbnail ? (
                <div className="uplx-thumb-uploaded">
                  <img
                    src={URL.createObjectURL(form.thumbnail)}
                    alt="Thumbnail preview"
                    className="uplx-thumb-img"
                  />
                  {thumbnailUploading && (
                    <div className="uplx-thumb-overlay">
                      <Loader2 className="uplx-spinner" size={20} />
                      <span>Uploading to R2...</span>
                    </div>
                  )}
                  <div className="uplx-thumb-ready">
                    <CheckCircle2 size={16} />
                    <span>Ready for upload</span>
                  </div>
                </div>
              ) : (
                <div className="uplx-thumb-ph">
                  <div className="uplx-icon-circle sm">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <strong>Upload thumbnail</strong>
                    <div className="uplx-muted">JPG, PNG up to 5MB • Will upload on publish</div>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Enhanced progress display */}
            {(isInitiating || thumbnailUploading) && (
              <div className="uplx-progress">
                <Loader2 className="uplx-spinner" />
                <div className="uplx-progress-bar">
                  <div
                    className="uplx-progress-fill"
                    style={{
                      width: thumbnailUploading
                        ? "15%"
                        : currentUpload?.progress
                          ? `${Math.max(20, currentUpload.progress)}%`
                          : "30%"
                    }}
                  />
                </div>
                <div className="uplx-progress-text">
                  {thumbnailUploading
                    ? "Uploading thumbnail..."
                    : currentUpload?.status === "phase2-uploading"
                      ? `Uploading video... ${currentUpload.progress || 0}%`
                      : currentUpload?.status === "phase3-uploading"
                        ? "Finalizing upload..."
                        : "Starting upload..."
                  }
                </div>
              </div>
            )}
          </section>

          {/* Rest of your form remains the same */}
          <section className="uplx-card">
            {/* ... rest of your details card code ... */}
            <h3 className="uplx-card-title">Details</h3>

            <div className="uplx-field">
              <label className="uplx-label">Title</label>
              <input
                type="text"
                className="uplx-input"
                placeholder="Enter a compelling title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                disabled={isInitiating || thumbnailUploading}
              />
              <div className="uplx-hint">Clear, concise, helpful for learners.</div>
            </div>

            <div className="uplx-row-2">
              <div className="uplx-field">
                <label className="uplx-label">Category</label>
                <select
                  className="uplx-select"
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                  disabled={isInitiating || thumbnailUploading}
                >
                  <option value="">Choose a category</option>
                  {categories.map((c) => (
                    <option key={c.toLowerCase()} value={c.toLowerCase()}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="uplx-field">
                <label className="uplx-label">Tags</label>
                <div className="uplx-input-icon">
                  <Tag size={16} />
                  <input
                    type="text"
                    className="uplx-input"
                    placeholder="tag1, tag2, tag3"
                    value={form.tags}
                    onChange={(e) => setField("tags", e.target.value)}
                    disabled={isInitiating || thumbnailUploading}
                  />
                </div>
                {!!tagList.length && (
                  <div className="uplx-chips">
                    {tagList.map((t) => (
                      <span key={t} className="uplx-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="uplx-field">
              <label className="uplx-label">Description</label>
              <textarea
                rows={6}
                className="uplx-textarea"
                placeholder="Describe your video…"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                disabled={isInitiating || thumbnailUploading}
              />
            </div>

            <div className="uplx-actions">
              {step === 2 ? (
                <button
                  className="uplx-btn uplx-btn-ghost"
                  onClick={() => setStep(1)}
                  disabled={isInitiating || thumbnailUploading}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step === 1 ? (
                <button
                  className={`uplx-btn ${canNext ? "uplx-btn-primary" : "uplx-btn-disabled"}`}
                  onClick={() => setStep(2)}
                  disabled={!canNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className={`uplx-btn ${canPublish ? "uplx-btn-primary" : "uplx-btn-disabled"}`}
                  onClick={submit}
                  disabled={!canPublish}
                >
                  {isInitiating || thumbnailUploading ? (
                    <>
                      <Loader2 className="uplx-spinner" />
                      {thumbnailUploading ? "Uploading thumbnail..." : "Starting upload..."}
                    </>
                  ) : (
                    "Publish"
                  )}
                </button>
              )}
            </div>

            {/* Updated summary section */}
            <div className="uplx-summary">
              <div className="uplx-srow">
                <span>Video</span>
                {form.video ? (
                  <span className="uplx-ok">
                    <CheckCircle2 size={16} /> Selected
                  </span>
                ) : (
                  <span className="uplx-muted">Not selected</span>
                )}
              </div>
              <div className="uplx-srow">
                <span>Thumbnail</span>
                {form.thumbnail ? (
                  <span className="uplx-ok">
                    <CheckCircle2 size={16} /> Ready
                  </span>
                ) : (
                  <span className="uplx-muted">Not selected</span>
                )}
              </div>
              <div className="uplx-srow">
                <span>Title</span>
                <span className={form.title ? "uplx-ok" : "uplx-muted"}>
                  {form.title ? "Ready" : "Missing"}
                </span>
              </div>
              <div className="uplx-srow">
                <span>Category</span>
                <span className={form.category ? "uplx-ok" : "uplx-muted"}>
                  {form.category ? "Selected" : "Missing"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
