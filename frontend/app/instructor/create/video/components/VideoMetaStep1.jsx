import React from "react";
import ThumbnailUpload from "./ThumbnailUpload";
import "./VideoMetaStep1.css";

const categories = [
    "Education", "Entertainment", "Technology", "Music", "Gaming", "Vlogs", "Sports"
];

const VideoMetaStep1 = ({
    title,
    setTitle,
    category,
    setCategory,
    thumbnailURL,
    onThumbnailChange,
    thumbnailInputRef,
    onNext,
    onBack
}) => (
    <form className="video-meta-step1" onSubmit={e => { e.preventDefault(); onNext(); }}>
        <div>
            <label>Video Title</label>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                maxLength={100}
                placeholder="Enter video title"
            />
        </div>
        <div>
            <label>Category</label>
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="video-meta-category"
            >
                {categories.map(cat => (
                    <option value={cat} key={cat}>{cat}</option>
                ))}
            </select>
        </div>
        <ThumbnailUpload
            thumbnailURL={thumbnailURL}
            onThumbnailChange={onThumbnailChange}
            thumbnailInputRef={thumbnailInputRef}
        />
        <div className="video-meta-step1-actions">
            <button type="button" className="video-meta-back" onClick={onBack}>
                Back
            </button>
            <button type="submit" className="video-meta-upload">
                Next
            </button>
        </div>
    </form>
);

export default VideoMetaStep1;