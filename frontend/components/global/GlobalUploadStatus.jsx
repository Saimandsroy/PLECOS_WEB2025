"use client";

import React, { useState } from "react";
import {
  Upload,
  X,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Trash2,
  Video,
} from "lucide-react";
import { useUploadContext } from "@/contexts/UploadContext";
import "./GlobalUploadStatus.css";

const GlobalUploadStatus = () => {
  const { uploads, retryUpload, removeUpload } = useUploadContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort uploads - latest first
  const activeUploads = uploads
    .filter(
      (upload) =>
        upload.status !== "completed" ||
        (upload.status === "completed" &&
          Date.now() - new Date(upload.createdAt).getTime() < 5000)
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // Latest first

  const hasActiveUploads = activeUploads.length > 0;
  const isUploading = activeUploads.some((upload) =>
    [
      "initiating",
      "phase1-uploading",
      "phase2-uploading",
      "phase3-uploading",
    ].includes(upload.status)
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="status-icon-success" size={16} />;
      case "error":
        return <XCircle className="status-icon-error" size={16} />;
      case "initiating":
      case "phase1-uploading":
      case "phase2-uploading":
      case "phase3-uploading":
        return <Clock className="status-icon-progress" size={16} />;
      default:
        return <Clock className="status-icon-default" size={16} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "initiating":
        return "Preparing...";
      case "phase1-uploading":
        return "Getting URL...";
      case "phase1-complete":
        return "Starting upload...";
      case "phase2-uploading":
        return "Uploading...";
      case "phase3-uploading":
        return "Finalizing...";
      case "completed":
        return "Completed";
      case "error":
        return "Failed";
      default:
        return "Pending";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  if (!hasActiveUploads) return null;

  return (
    <>
      {/* Floating Upload Indicator */}
      <div
        className={`upload-indicator ${isUploading ? "uploading" : ""}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="upload-indicator-icon">
          <Upload size={20} />
        </div>
        <div className="upload-indicator-badge">{activeUploads.length}</div>
      </div>

      {/* Upload Status Modal */}
      {isModalOpen && (
        <div
          className="upload-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="upload-modal-header">
              <div className="upload-modal-title">
                <Upload size={20} />
                <span>Upload Status</span>
              </div>
              <button
                className="upload-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="upload-modal-content">
              {activeUploads.map((upload) => {
                // Check if upload is recent (within 15 seconds)
                const isRecent =
                  Date.now() - new Date(upload.createdAt).getTime() < 15000;

                return (
                  <div
                    key={upload.id}
                    className={`upload-modal-item ${
                      isRecent ? "recent-upload" : ""
                    }`}
                  >
                    {/* Recent Upload Badge */}
                    {isRecent && <div className="recent-upload-badge">NEW</div>}

                    <div className="upload-item-main">
                      <div className="upload-item-icon">
                        <Video size={16} />
                      </div>

                      <div className="upload-item-details">
                        <div className="upload-item-name">
                          {upload.fileName.length > 25
                            ? `${upload.fileName.substring(0, 25)}...`
                            : upload.fileName}
                        </div>
                        <div className="upload-item-size">
                          {formatFileSize(upload.fileSize)}
                        </div>
                      </div>

                      <div className="upload-item-actions">
                        {upload.status === "error" && (
                          <button
                            className="upload-action-btn retry"
                            onClick={() => retryUpload(upload.id)}
                            title="Retry upload"
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}

                        {(upload.status === "completed" ||
                          upload.status === "error") && (
                          <button
                            className="upload-action-btn delete"
                            onClick={() => removeUpload(upload.id)}
                            title="Remove from list"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="upload-item-status">
                      <div className="upload-status-info">
                        {getStatusIcon(upload.status)}
                        <span className="upload-status-text">
                          {getStatusText(upload.status)}
                        </span>
                      </div>

                      {upload.progress > 0 &&
                        upload.status !== "completed" &&
                        upload.status !== "error" && (
                          <span className="upload-progress-text">
                            {upload.progress}%
                          </span>
                        )}
                    </div>

                    {upload.status !== "error" &&
                      upload.status !== "completed" && (
                        <div className="upload-progress-bar">
                          <div
                            className="upload-progress-fill"
                            style={{
                              width: `${upload.progress || 0}%`,
                              background: "var(--gradient-primary)",
                            }}
                          />
                        </div>
                      )}

                    {upload.error && (
                      <div className="upload-error-text">{upload.error}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalUploadStatus;
