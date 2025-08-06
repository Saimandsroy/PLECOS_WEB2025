"use client";

import React, { useState } from "react";
import { ChevronLeft, Play, FileVideo, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useUploadContext } from "@/contexts/UploadContext";
import "./page.css";

const UploadForm = () => {
  const router = useRouter();
  const { initiateUpload } = useUploadContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [isInitiating, setIsInitiating] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const [formData, setFormData] = useState({
    video: null,
    thumbnail: null,
    category: "",
    tags: "",
    title: "",
    description: "",
  });

  const handleLoadedMetadata = (e) => {
    const secs = Math.floor(e.target.duration);
    const intSecs = Number.parseInt(secs, 10);
    setVideoDuration(intSecs);
  };

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (field, file) =>
    setFormData((prev) => ({ ...prev, [field]: file }));

  const nextStep = () => currentStep < 2 && setCurrentStep(2);
  const prevStep = () => currentStep > 1 && setCurrentStep(1);

  const handleSubmit = async () => {
    if (!formData.video || isInitiating) return;

    setIsInitiating(true);

    try {
      const metadata = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        duration: videoDuration,
        uploadDate: new Date().toISOString(),
      };

      await initiateUpload(formData.video, metadata);

      // Reset form
      setFormData({
        video: null,
        thumbnail: null,
        category: "",
        tags: "",
        title: "",
        description: "",
      });
      setCurrentStep(1);

      // Navigate to uploads page
      router.push('/educator/create');

    } catch (error) {
      console.error('Upload initiation failed:', error);
      alert('Failed to start upload. Please try again.');
    } finally {
      setIsInitiating(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && handleFileUpload("video", files[0]),
    accept: { "video/*": [] },
    maxFiles: 1,
    maxSize: 2_000 * 1024 * 1024,
    disabled: isInitiating,
  });

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1 className="upload-title">Upload video</h1>
        <p className="upload-subtitle">Share your knowledge with the world</p>

        <div className="upload-content-grid">
          {/* LEFT SECTION */}
          <div className="upload-video-section">
            <div
              className="upload-video-area"
              {...getRootProps()}
              style={{ cursor: isInitiating ? "not-allowed" : "pointer" }}
            >
              <input {...getInputProps()} />
              {formData.video ? (
                <video className="upload-video-preview" controls onLoadedMetadata={handleLoadedMetadata}>
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

            {/* Thumbnail upload */}
            <div className="upload-form-group" style={{ marginTop: "1rem" }}>
              <div
                className="upload-thumbnail-area"
                onClick={() =>
                  !isInitiating && document.getElementById("thumbnail-upload").click()
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

            {/* Loading state during initiation */}
            {isInitiating && (
              <div className="upload-progress">
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Preparing upload...</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill animate-pulse" style={{ width: '30%' }} />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="upload-right-section">
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
                    disabled={isInitiating}
                  />
                </div>

                <div className="upload-form-group">
                  <label className="upload-label">Select category</label>
                  <select
                    className="upload-select"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={isInitiating}
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
                    disabled={isInitiating}
                  />
                </div>

                <div className="upload-form-group">
                  <label className="upload-label">Tags</label>
                  <input
                    className="upload-input"
                    placeholder="tag1, tag2, tag3"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    disabled={isInitiating}
                  />
                  <small style={{ color: "var(--text-secondary)" }}>
                    Comma-separated keywords
                  </small>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="upload-actions">
              {currentStep === 2 ? (
                <button
                  className="upload-back-btn"
                  onClick={prevStep}
                  disabled={isInitiating}
                >
                  <ChevronLeft size={20} /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  className="upload-next-btn"
                  onClick={nextStep}
                  disabled={!formData.video || isInitiating}
                >
                  Next Step
                </button>
              ) : (
                <button
                  className="upload-submit-btn"
                  onClick={handleSubmit}
                  disabled={
                    !formData.title.trim() || isInitiating
                  }
                >
                  {isInitiating ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Starting Upload...
                    </>
                  ) : (
                    "Publish Video"
                  )}
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
