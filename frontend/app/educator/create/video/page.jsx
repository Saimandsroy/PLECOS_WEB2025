"use client";

import React, { useState } from "react";
import { ChevronLeft, Play, FileVideo } from "lucide-react";
import { useDropzone } from "react-dropzone";
import useVideoUpload from "@/hooks/useVideoUpload";   // <= NEW
import "./page.css";

const UploadForm = () => {
  /* ---------- form fields ---------- */
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    video: null,
    thumbnail: null,
    category: "",
    tags: "",
    title: "",
    description: "",
  });

  /* ---------- upload hook ---------- */
  const {
    uploadVideo,
    progress,
    status,        // idle | uploading | completed | error
    error,
    retryCount,
    resetUpload,
  } = useVideoUpload();

  /* ---------- basic helpers ---------- */
  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (field, file) =>
    setFormData((prev) => ({ ...prev, [field]: file }));

  const nextStep = () => currentStep < 2 && setCurrentStep(2);
  const prevStep = () => currentStep > 1 && setCurrentStep(1);

  /* ---------- main submit ---------- */
  const handleSubmit = async () => {
    if (!formData.video) return;

    try {
      /* gather metadata expected by backend */
      const meta = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      await uploadVideo(formData.video, meta);

      alert("Video uploaded successfully!");
      /* reset UI once finished */
      setFormData({
        video: null,
        thumbnail: null,
        category: "",
        tags: "",
        title: "",
        description: "",
      });
      resetUpload();
      setCurrentStep(1);
    } catch (e) {
      // error state already handled by hook – optional extra logging here
      console.error(e);
    }
  };

  /* ---------- drag-and-drop (optional) ---------- */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && handleFileUpload("video", files[0]),
    accept: { "video/*": [] },
    maxFiles: 1,
    maxSize: 2_000 * 1024 * 1024, // 2 GB
    disabled: status === "uploading",
  });

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Upload video</h1>
        <p className="upload-subtitle">Share your knowledge with the world</p>

        <div className="upload-content-grid">
          {/* ---------------- LEFT ---------------- */}
          <div className="upload-video-section">
            <div
              className="upload-video-area"
              {...getRootProps()}
              style={{ cursor: status === "uploading" ? "not-allowed" : "pointer" }}
            >
              <input {...getInputProps()} />
              {formData.video ? (
                <video className="upload-video-preview" controls>
                  <source src={URL.createObjectURL(formData.video)} />
                </video>
              ) : (
                <div className="upload-video-placeholder">
                  <div className="upload-play-icon">
                    <Play size={32} fill="currentColor" />
                  </div>
                  <h3>
                    {isDragActive ? "Drop the file here" : "Click or drag to upload"}
                  </h3>
                  <p>MP4, WebM, AVI up to 2 GB</p>
                </div>
              )}
            </div>

            {/* thumbnail upload */}
            <div className="upload-form-group" style={{ marginTop: "1rem" }}>
              <div
                className="upload-thumbnail-area"
                onClick={() =>
                  status !== "uploading" && document.getElementById("thumbnail-upload").click()
                }
              >
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="upload-file-input"
                  onChange={(e) => handleFileUpload("thumbnail", e.target.files[0])}
                />
                {formData.thumbnail ? (
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Thumbnail preview"
                    className="upload-thumbnail-preview"
                  />
                ) : (
                  <div className="upload-thumbnail-placeholder">
                    <FileVideo size={48} className="upload-thumbnail-icon" />
                    <p>Upload thumbnail</p>
                    <small>JPG, PNG up to 5 MB</small>
                  </div>
                )}
              </div>
            </div>

            {/* progress / retry / error banners */}
            {status === "uploading" && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p>{progress}% uploaded {retryCount ? `(retry ${retryCount})` : ""}</p>
              </div>
            )}

            {status === "completed" && (
              <div className="success-message">✅ Upload complete!</div>
            )}

            {status === "error" && (
              <div className="error-message">❌ {error}</div>
            )}
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="upload-right-section">
            {/* step 1 */}
            {currentStep === 1 && (
              <div className="upload-step-content active">
                <div className="upload-form-group">
                  <label className="upload-label">Video Title</label>
                  <input
                    type="text"
                    className="upload-input"
                    placeholder="Enter a compelling title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    disabled={status === "uploading"}
                  />
                </div>

                <div className="upload-form-group">
                  <label className="upload-label">Select category</label>
                  <select
                    className="upload-select"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={status === "uploading"}
                  >
                    <option value="">Choose a category</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="science">Science</option>
                    <option value="business">Business</option>
                    <option value="arts">Arts & Design</option>
                    <option value="health">Health & Fitness</option>
                    <option value="programming">Programming</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>
              </div>
            )}

            {/* step 2 */}
            {currentStep === 2 && (
              <div className="upload-step-content active">
                <h2 className="upload-section-title">Video Details</h2>

                <div className="upload-form-group">
                  <label className="upload-label">Description</label>
                  <textarea
                    className="upload-textarea"
                    placeholder="Describe your video…"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={status === "uploading"}
                  />
                </div>

                <div className="upload-form-group">
                  <label className="upload-label">Tags</label>
                  <input
                    className="upload-input"
                    placeholder="tag1, tag2, tag3"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    disabled={status === "uploading"}
                  />
                  <small style={{ color: "var(--text-secondary)" }}>
                    Comma-separated keywords
                  </small>
                </div>
              </div>
            )}

            {/* action buttons */}
            <div className="upload-actions">
              {currentStep === 2 ? (
                <button className="upload-back-btn" onClick={prevStep} disabled={status === "uploading"}>
                  <ChevronLeft size={20} /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  className="upload-next-btn"
                  onClick={nextStep}
                  disabled={!formData.video || status === "uploading"}
                >
                  Next Step
                </button>
              ) : (
                <button
                  className="upload-submit-btn"
                  onClick={handleSubmit}
                  disabled={
                    !formData.title.trim() ||
                    status === "uploading" ||
                    status === "completed"
                  }
                >
                  {status === "uploading" ? "Uploading…" : "Publish Video"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
