"use client";
import React, { useMemo, useState } from "react";
import {
    Plus,
    Video,
    Clock,
    CheckCircle,
    XCircle,
    RotateCcw,
    Trash2,
    BookOpen,
    X,
    AlertTriangle,
    Filter,
    MoreHorizontal,
    Eye,
    Archive,
    Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUploadContext } from "@/contexts/UploadContext";
import useUserUploadsInfinite from "@/hooks/api/useUserUploadsInfinite";
import "./create.css";

const STATUS = {
    ACTIVE: "active",
    ARCHIVED: "archived",
    DELETED: "deleted",
    INITIATED: "initiated", // failed upload in your definition
};

const FILTERS = [
    { key: "all", label: "All" },
    { key: STATUS.ACTIVE, label: "Active" },
    { key: STATUS.INITIATED, label: "Failed" },
    { key: STATUS.ARCHIVED, label: "Archived" },
];

const CreatePage = () => {
    const router = useRouter();
    const { uploads: localUploads, retryUpload, removeUpload } = useUploadContext();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("all");
    const [menuOpenId, setMenuOpenId] = useState(null);

    // Recent uploads (lazy-loaded with cursor + "Load more")
    const {
        items: recentUploads,
        isLoading: isRecentLoading,
        isFetchingNextPage,
        fetchNextPage,
        canLoadMore,
    } = useUserUploadsInfinite({ pageSize: 7 });

    // Normalize live local uploads for merging (map to display statuses)
    const normalizedLocal = useMemo(() => {
        return (localUploads || []).map((u) => ({
            id: u.videoId || u.id,
            title: u.fileName,
            fileName: u.fileName,
            size: u.fileSize,
            createdAt: u.createdAt,
            status: mapLocalStatus(u.status), // display-only mapping
            progress: u.progress || 0,
            isLocal: true,
            phase: u.phase,
            error: u.error,
            thumbnailUrl: u.thumbnailUrl,
        }));
    }, [localUploads]);

    function mapLocalStatus(s) {
        if (s === "completed") return STATUS.ACTIVE;
        if (s === "error") return STATUS.INITIATED; // treat error as failed (initiated)
        if (s === "uploading" || s === "phase2-uploading") return "uploading";
        if (s === "initiating" || s === "phase1-uploading") return "initiated";
        if (s === "phase3-uploading") return "processing";
        return s || "initiated";
    }

    // Active uploads (local, live progress) shown in first section
    const sortedActive = useMemo(() => {
        return [...localUploads].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [localUploads]);

    const getStatusIcon = (status) => {
        switch (status) {
            case STATUS.ACTIVE:
                return <CheckCircle className="status-icon-success" size={18} />;
            case STATUS.INITIATED:
                return <XCircle className="status-icon-error" size={18} />;
            case "initiated":
            case "uploading":
            case "processing":
                return <Clock className="status-icon-progress" size={18} />;
            case STATUS.ARCHIVED:
                return <Archive className="status-icon-default" size={18} />;
            case STATUS.DELETED:
                return <Trash2 className="status-icon-default" size={18} />;
            default:
                return <Clock className="status-icon-default" size={18} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case STATUS.ACTIVE:
                return "Active";
            case STATUS.ARCHIVED:
                return "Archived";
            case STATUS.DELETED:
                return "Deleted";
            case STATUS.INITIATED:
                return "Failed";
            case "uploading":
                return "Uploading...";
            case "processing":
                return "Processing...";
            case "initiated":
                return "Initiated";
            default:
                return "Pending";
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === undefined || bytes === null) return "";
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const formatTimeAgo = (dateString) => {
        if (!dateString) return "";
        const now = new Date();
        const created = new Date(dateString);
        const diffInMinutes = Math.floor((now - created) / (1000 * 60));
        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    const handleContentTypeSelect = (type) => {
        setShowModal(false);
        if (type === "video") router.push("/educator/create/video");
        else if (type === "course") router.push("/educator/create/course");
    };

    // Inline Actions (wire to backend as needed)
    const handleArchive = async (videoId) => {
        setMenuOpenId(null);
        alert("Archive action (wire backend)");
    };
    const handleUnarchive = async (videoId) => {
        setMenuOpenId(null);
        alert("Unarchive action (wire backend)");
    };
    const handleDelete = async (videoId) => {
        setMenuOpenId(null);
        alert("Delete action (wire backend)");
    };
    const handleView = (videoId) => {
        setMenuOpenId(null);
        alert("View video (route to detail)");
    };

    // Apply filter client-side on recentUploads (server returns mixed statuses)
    const filteredRecent = useMemo(() => {
        if (filter === "all") return recentUploads;
        return recentUploads.filter((i) => i.status === filter);
    }, [recentUploads, filter]);

    return (
        <div className="create-page">
            <div className="create-container">
                {/* Header */}
                <div className="create-header">
                    <div className="header-content">
                        <h1 className="create-title">Content Creation</h1>
                        <p className="create-subtitle">
                            Manage your uploads and create new content
                        </p>
                    </div>

                    <button className="create-btn" onClick={() => setShowModal(true)}>
                        <Plus size={20} />
                        Create Content
                    </button>
                </div>

                {/* Active Uploads (live) */}
                {sortedActive.length > 0 && (
                    <div className="uploads-section glass-card">
                        <div className="section-header-row">
                            <h2 className="section-title">Active Uploads</h2>
                            <span className="subtle-chip">{sortedActive.length} in progress</span>
                        </div>
                        <div className="uploads-list">
                            {sortedActive.map((upload) => {
                                const isRecent =
                                    Date.now() - new Date(upload.createdAt).getTime() < 15000;
                                return (
                                    <div
                                        key={upload.id}
                                        className={`upload-item rich ${isRecent ? "recent-upload" : ""}`}
                                    >
                                        {isRecent && <div className="recent-upload-badge">NEW</div>}

                                        <div className="upload-card-left">
                                            <div className="thumb">
                                                <div className="thumb-skeleton" />
                                                <Video size={18} className="thumb-watermark" />
                                            </div>
                                        </div>

                                        <div className="upload-card-body">
                                            <div className="upload-title-row">
                                                <h3 className="upload-filename">{upload.fileName}</h3>
                                                {upload.status === "error" && (
                                                    <span className="badge-failed">
                                                        <AlertTriangle size={14} /> Failed
                                                    </span>
                                                )}
                                            </div>

                                            <div className="upload-meta">
                                                <span>{formatFileSize(upload.fileSize)}</span>
                                                <span className="meta-separator">•</span>
                                                <span>{formatTimeAgo(upload.createdAt)}</span>
                                            </div>

                                            <div className="upload-progress-row">
                                                <div className="upload-status">
                                                    {getStatusIcon(mapLocalStatus(upload.status))}
                                                    <span className="status-text">
                                                        {getStatusText(mapLocalStatus(upload.status))}
                                                    </span>
                                                </div>

                                                {upload.status !== "error" &&
                                                    mapLocalStatus(upload.status) !== STATUS.ACTIVE && (
                                                        <>
                                                            <div className="progress-bar">
                                                                <div
                                                                    className="progress-fill"
                                                                    style={{
                                                                        width: `${upload.progress || 0}%`,
                                                                        background: "var(--gradient-primary)",
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="progress-text">
                                                                {upload.progress || 0}%
                                                            </span>
                                                        </>
                                                    )}
                                            </div>

                                            {upload.error && (
                                                <div className="error-message">
                                                    <XCircle size={16} />
                                                    <span>{upload.error}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="upload-card-actions">
                                            {upload.status === "error" ? (
                                                <button
                                                    className="pill-btn warn"
                                                    onClick={() => retryUpload(upload.id)}
                                                    title="Retry upload"
                                                >
                                                    <RotateCcw size={16} /> Retry
                                                </button>
                                            ) : null}

                                            {(upload.status === "completed" ||
                                                upload.status === "error") && (
                                                    <button
                                                        className="icon-btn"
                                                        onClick={() => removeUpload(upload.id)}
                                                        title="Remove from list"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recent Uploads - LAZY LOADED via useUserUploadsInfinite */}
                <div className="uploads-section glass-card">
                    <div className="section-header-row">
                        <div className="section-left">
                            <h2 className="section-title">Recent Uploads</h2>
                        </div>

                        <div className="filters-row">
                            <Filter size={16} />
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    className={`chip ${filter === f.key ? "chip-active" : ""}`}
                                    onClick={() => setFilter(f.key)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isRecentLoading ? (
                        <div className="uploads-list">
                            <RecentUploadSkeletonRich />
                            <RecentUploadSkeletonRich />
                            <RecentUploadSkeletonRich />
                        </div>
                    ) : filteredRecent.length > 0 ? (
                        <>
                            <div className="uploads-list">
                                {filteredRecent.map((item) => {
                                    const status = item.status;
                                    const failed = status === STATUS.INITIATED;
                                    const archived = status === STATUS.ARCHIVED;
                                    const active = status === STATUS.ACTIVE;

                                    return (
                                        <div key={item.id} className="upload-item rich">
                                            <div className="upload-card-left">
                                                <div className="thumb">
                                                    {item.thumbnailUrl ? (
                                                        <img
                                                            src={item.thumbnailUrl}
                                                            alt={item.title || item.fileName}
                                                            className="thumb-img"
                                                        />
                                                    ) : (
                                                        <>
                                                            <div className="thumb-skeleton" />
                                                            <Video size={18} className="thumb-watermark" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="upload-card-body">
                                                <div className="upload-title-row">
                                                    <h3 className="upload-filename">
                                                        {item.title || item.fileName}
                                                    </h3>
                                                    <div className="badge-row">
                                                        {failed && (
                                                            <span className="badge-failed">
                                                                <AlertTriangle size={14} /> Failed
                                                            </span>
                                                        )}
                                                        {active && (
                                                            <span className="badge-success">
                                                                <CheckCircle size={14} /> Active
                                                            </span>
                                                        )}
                                                        {archived && (
                                                            <span className="badge-processing">
                                                                <Archive size={14} /> Archived
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="upload-meta">
                                                    {item.size ? <span>{formatFileSize(item.size)}</span> : null}
                                                    {item.size ? <span className="meta-separator">•</span> : null}
                                                    <span>{formatTimeAgo(item.createdAt)}</span>
                                                    {item.category ? (
                                                        <>
                                                            <span className="meta-separator">•</span>
                                                            <span className="pill-muted">{item.category}</span>
                                                        </>
                                                    ) : null}
                                                    {item.privacy ? (
                                                        <>
                                                            <span className="meta-separator">•</span>
                                                            <span className="pill-muted">{item.privacy}</span>
                                                        </>
                                                    ) : null}
                                                </div>

                                                <div className="upload-status-row">
                                                    <div className="upload-status">
                                                        {getStatusIcon(status)}
                                                        <span className="status-text">{getStatusText(status)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="upload-card-actions">
                                                <button
                                                    className="pill-btn"
                                                    onClick={() => handleView(item.id)}
                                                    title="View"
                                                >
                                                    <Eye size={16} /> View
                                                </button>

                                                {active && (
                                                    <button
                                                        className="pill-btn warn"
                                                        onClick={() => handleArchive(item.id)}
                                                        title="Archive"
                                                    >
                                                        <Archive size={16} /> Archive
                                                    </button>
                                                )}

                                                {archived && (
                                                    <button
                                                        className="pill-btn"
                                                        onClick={() => handleUnarchive(item.id)}
                                                        title="Unarchive"
                                                    >
                                                        <Undo2 size={16} /> Unarchive
                                                    </button>
                                                )}

                                                <div className="menu-wrap">
                                                    <button
                                                        className={`icon-btn ${menuOpenId === item.id ? "icon-btn-active" : ""
                                                            }`}
                                                        onClick={() =>
                                                            setMenuOpenId((prev) => (prev === item.id ? null : item.id))
                                                        }
                                                        title="More"
                                                    >
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                    {menuOpenId === item.id && (
                                                        <div className="menu">
                                                            <button onClick={() => handleView(item.id)}>
                                                                <Eye size={16} /> View
                                                            </button>
                                                            {active ? (
                                                                <button onClick={() => handleArchive(item.id)}>
                                                                    <Archive size={16} /> Archive
                                                                </button>
                                                            ) : null}
                                                            {archived ? (
                                                                <button onClick={() => handleUnarchive(item.id)}>
                                                                    <Undo2 size={16} /> Unarchive
                                                                </button>
                                                            ) : null}
                                                            <button
                                                                className="danger"
                                                                onClick={() => handleDelete(item.id)}
                                                            >
                                                                <Trash2 size={16} /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="load-more-row">
                                {canLoadMore ? (
                                    <button
                                        className={`btn btn-primary load-more-btn ${isFetchingNextPage ? 'is-loading' : ''}`}
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                    >
                                        {isFetchingNextPage ? "Loading..." : "Load more"}
                                    </button>
                                ) : (
                                    <span className="subtle-chip">No more uploads</span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state compact">
                            <div className="empty-icon">
                                <Video size={48} />
                            </div>
                            <h3>No recent uploads</h3>
                            <p>Your uploads will appear here.</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create New Content</h3>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">
                                    What type of content would you like to create?
                                </p>

                                <div className="content-options">
                                    <button className="content-option" onClick={() => handleContentTypeSelect("video")}>
                                        <div className="option-icon video-option">
                                            <Video size={32} />
                                        </div>
                                        <div className="option-content">
                                            <h4>Upload Video</h4>
                                            <p>Share individual video lessons</p>
                                        </div>
                                    </button>

                                    <button className="content-option" onClick={() => handleContentTypeSelect("course")}>
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

const RecentUploadSkeletonRich = () => (
    <div className="upload-item rich skeleton">
        <div className="upload-card-left">
            <div className="thumb">
                <div className="thumb-skeleton" />
            </div>
        </div>
        <div className="upload-card-body">
            <div className="shimmer-line w-60" />
            <div className="shimmer-line w-40 small" />
            <div className="upload-progress-row">
                <div className="shimmer-dot" />
                <div className="shimmer-line w-24 small" />
            </div>
        </div>
        <div className="upload-card-actions">
            <div className="icon-placeholder" />
            <div className="icon-placeholder" />
        </div>
    </div>
);

export default CreatePage;
