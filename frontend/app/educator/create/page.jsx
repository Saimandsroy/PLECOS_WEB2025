"use client";
import React, { useState } from 'react';
import { Plus, Video, Clock, CheckCircle, XCircle, RotateCcw, Trash2, BookOpen, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUploadContext } from '@/contexts/UploadContext';
import './create.css';

const CreatePage = () => {
    const router = useRouter();
    const { uploads, retryUpload, removeUpload } = useUploadContext();
    const [showModal, setShowModal] = useState(false);

    // Sort uploads - latest first (consistent with GlobalUploadStatus)
    const sortedUploads = [...uploads].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="status-icon-success" size={20} />;
            case 'error':
                return <XCircle className="status-icon-error" size={20} />;
            case 'initiating':
            case 'phase1-uploading':
            case 'phase2-uploading':
            case 'phase3-uploading':
                return <Clock className="status-icon-progress" size={20} />;
            default:
                return <Clock className="status-icon-default" size={20} />;
        }
    };

    const getStatusText = (status, phase) => {
        switch (status) {
            case 'initiating':
                return 'Preparing upload...';
            case 'phase1-uploading':
                return 'Getting upload URL...';
            case 'phase1-complete':
                return 'Starting file upload...';
            case 'phase2-uploading':
                return 'Uploading file...';
            case 'phase3-uploading':
                return 'Finalizing upload...';
            case 'completed':
                return 'Upload completed';
            case 'error':
                return 'Upload failed';
            default:
                return 'Pending';
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatTimeAgo = (dateString) => {
        const now = new Date();
        const created = new Date(dateString);
        const diffInMinutes = Math.floor((now - created) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const handleContentTypeSelect = (type) => {
        setShowModal(false);
        if (type === 'video') {
            router.push('/educator/create/video');
        } else if (type === 'course') {
            router.push('/educator/create/course');
        }
    };

    return (
        <div className="create-page">
            <div className="create-container">
                <div className="create-header">
                    <div className="header-content">
                        <h1 className="create-title">Content Creation</h1>
                        <p className="create-subtitle">Manage your uploads and create new content</p>
                    </div>

                    <button
                        className="create-btn"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus size={20} />
                        Create Content
                    </button>
                </div>

                {sortedUploads.length > 0 && (
                    <div className="uploads-section glass-card">
                        <h2 className="section-title">Active Uploads</h2>
                        <div className="uploads-list">
                            {sortedUploads.map(upload => {
                                // Check if upload is recent (within 15 seconds) - same logic as GlobalUploadStatus
                                const isRecent = Date.now() - new Date(upload.createdAt).getTime() < 15000;

                                return (
                                    <div
                                        key={upload.id}
                                        className={`upload-item ${isRecent ? 'recent-upload' : ''}`}
                                    >
                                        {/* Recent Upload Badge */}
                                        {isRecent && (
                                            <div className="recent-upload-badge">
                                                NEW
                                            </div>
                                        )}

                                        <div className="upload-item-header">
                                            <div className="upload-info">
                                                <div className="upload-icon">
                                                    <Video size={24} />
                                                </div>
                                                <div className="upload-details">
                                                    <h3 className="upload-filename">{upload.fileName}</h3>
                                                    <div className="upload-meta">
                                                        <span>{formatFileSize(upload.fileSize)}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span>{formatTimeAgo(upload.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="upload-actions">
                                                {upload.status === 'error' && (
                                                    <button
                                                        className="action-btn retry"
                                                        onClick={() => retryUpload(upload.id)}
                                                        title="Retry upload"
                                                    >
                                                        <RotateCcw size={16} />
                                                    </button>
                                                )}

                                                {(upload.status === 'completed' || upload.status === 'error') && (
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => removeUpload(upload.id)}
                                                        title="Remove from list"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="upload-progress-section">
                                            <div className="upload-status">
                                                {getStatusIcon(upload.status)}
                                                <span className="status-text">
                                                    {getStatusText(upload.status, upload.phase)}
                                                </span>
                                            </div>

                                            {upload.status !== 'error' && upload.status !== 'completed' && (
                                                <div className="progress-bar">
                                                    <div
                                                        className="progress-fill"
                                                        style={{
                                                            width: `${upload.progress || 0}%`,
                                                            background: upload.status === 'error'
                                                                ? 'var(--gradient-secondary)'
                                                                : 'var(--gradient-primary)'
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {upload.progress > 0 && upload.status !== 'completed' && (
                                                <span className="progress-text">{upload.progress}%</span>
                                            )}
                                        </div>

                                        {upload.error && (
                                            <div className="error-message">
                                                <XCircle size={16} />
                                                <span>{upload.error}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {sortedUploads.length === 0 && (
                    <div className="empty-state glass-card">
                        <div className="empty-icon">
                            <Video size={64} />
                        </div>
                        <h3>No active uploads</h3>
                        <p>Start creating your educational content</p>
                        <button
                            className="create-btn"
                            onClick={() => setShowModal(true)}
                        >
                            <Plus size={20} />
                            Create Content
                        </button>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create New Content</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">
                                    What type of content would you like to create?
                                </p>

                                <div className="content-options">
                                    <button
                                        className="content-option"
                                        onClick={() => handleContentTypeSelect('video')}
                                    >
                                        <div className="option-icon video-option">
                                            <Video size={32} />
                                        </div>
                                        <div className="option-content">
                                            <h4>Upload Video</h4>
                                            <p>Share individual video lessons</p>
                                        </div>
                                    </button>

                                    <button
                                        className="content-option"
                                        onClick={() => handleContentTypeSelect('course')}
                                    >
                                        <div className="option-icon course-option">
                                            <BookOpen size={32} />
                                        </div>
                                        <div className="option-content">
                                            <h4>Create Course</h4>
                                            <p>Build structured learning experiences</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePage;
