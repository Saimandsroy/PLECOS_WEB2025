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
  const { initiateUpload } = useUploadContext();

  const [step, setStep] = useState(1);
  const [isInitiating, setIsInitiating] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [err, setErr] = useState("");

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

  const onSelectThumb = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_THUMB_SIZE) {
      setErr("Thumbnail is larger than 5MB.");
      return;
    }
    setErr("");
    setField("thumbnail", file);
  };

  const openThumbPicker = () => {
    if (!isInitiating && thumbInputRef.current) thumbInputRef.current.click();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  };

  const canNext = !!form.video && !isInitiating;
  const canPublish =
    !!form.video &&
    !!form.title.trim() &&
    !!form.category &&
    !isInitiating;

  const submit = async () => {
    if (!canPublish) return;
    setErr("");
    setIsInitiating(true);
    try {
      const metadata = {
        title: form.title,
        description: form.description,
        category: form.category,
        tags: tagList,
        duration: videoDuration || 0,
        uploadDate: new Date().toISOString(),
      };
      await initiateUpload(form.video, metadata);

      // Reset and go back to create page
      setForm({
        video: null,
        thumbnail: null,
        category: "",
        tags: "",
        title: "",
        description: "",
      });
      setStep(1);
      router.push("/educator/create");
    } catch (e) {
      setErr(
        e?.response?.data?.error ||
        e?.message ||
        "Failed to start upload. Please try again."
      );
    } finally {
      setIsInitiating(false);
    }
  };

  // New layout: Wizard header + two cards (Media on left; Details on right)
  return (
    <div className="uplx-page">
      <div className="uplx-container">
        <header className="uplx-header">
          <div className="uplx-head-left">
            <button
              className="uplx-btn-ghost"
              onClick={() => router.back()}
              disabled={isInitiating}
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
              {isInitiating ? (
                <>
                  <Loader2 className="uplx-spinner" />
                  Starting upload...
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

        <div className="uplx-grid">
          {/* Media card */}
          <section className="uplx-card">
            <h3 className="uplx-card-title">Media</h3>

            {/* Dropzone separated from preview to avoid re-mounts */}
            {!form.video ? (
              <div
                className={`uplx-drop ${isDragActive ? "uplx-drop-active" : ""}`}
                {...getRootProps()}
                style={{ cursor: isInitiating ? "not-allowed" : "pointer" }}
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
                  key={videoUrl} /* ensures only reload when file changes */
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
                    disabled={isInitiating}
                  >
                    Choose another
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnail */}
            <div className="uplx-thumb" onClick={openThumbPicker}>
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/*"
                className="uplx-hidden"
                onChange={onSelectThumb}
                disabled={isInitiating}
              />
              {form.thumbnail ? (
                <img
                  src={URL.createObjectURL(form.thumbnail)}
                  alt="Thumbnail preview"
                  className="uplx-thumb-img"
                />
              ) : (
                <div className="uplx-thumb-ph">
                  <div className="uplx-icon-circle sm">
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <strong>Upload thumbnail</strong>
                    <div className="uplx-muted">JPG, PNG up to 5MB</div>
                  </div>
                </div>
              )}
            </div>

            {isInitiating && (
              <div className="uplx-progress">
                <Loader2 className="uplx-spinner" />
                <div className="uplx-progress-bar">
                  <div className="uplx-progress-fill" style={{ width: "30%" }} />
                </div>
              </div>
            )}
          </section>

          {/* Details card */}
          <section className="uplx-card">
            <h3 className="uplx-card-title">Details</h3>

            <div className="uplx-field">
              <label className="uplx-label">Title</label>
              <input
                type="text"
                className="uplx-input"
                placeholder="Enter a compelling title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                disabled={isInitiating}
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
                  disabled={isInitiating}
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
                    disabled={isInitiating}
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
                disabled={isInitiating}
              />
            </div>

            <div className="uplx-actions">
              {step === 2 ? (
                <button
                  className="uplx-btn uplx-btn-ghost"
                  onClick={() => setStep(1)}
                  disabled={isInitiating}
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
                  {isInitiating ? (
                    <>
                      <Loader2 className="uplx-spinner" />
                      Starting upload...
                    </>
                  ) : (
                    "Publish"
                  )}
                </button>
              )}
            </div>

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
