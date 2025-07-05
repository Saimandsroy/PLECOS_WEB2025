import React, { useRef, useEffect, useState } from "react";
import { PlusCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import "./VideoSelect.css";

const PREVIEW_WIDTH = 180;
const PREVIEW_HEIGHT = 110;

const VideoSelect = ({ videoFile, onVideoChange, onNext, videoInputRef }) => {
    const [videoPreview, setVideoPreview] = useState("");
    const [showPencil, setShowPencil] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const dropRef = useRef(null);

    useEffect(() => {
        if (videoFile) {
            const url = URL.createObjectURL(videoFile);
            const video = document.createElement("video");
            video.src = url;
            video.currentTime = 1;
            video.onloadeddata = () => {
                const canvas = document.createElement("canvas");
                canvas.width = PREVIEW_WIDTH;
                canvas.height = PREVIEW_HEIGHT;
                const ctx = canvas.getContext("2d");
                // Draw video centered and scaled to fit preview box
                const scale = Math.max(
                    PREVIEW_WIDTH / video.videoWidth,
                    PREVIEW_HEIGHT / video.videoHeight
                );
                const x = (PREVIEW_WIDTH / 2) - (video.videoWidth / 2) * scale;
                const y = (PREVIEW_HEIGHT / 2) - (video.videoHeight / 2) * scale;
                ctx.drawImage(
                    video,
                    0, 0, video.videoWidth, video.videoHeight,
                    x, y, video.videoWidth * scale, video.videoHeight * scale
                );
                setVideoPreview(canvas.toDataURL("image/png"));
                URL.revokeObjectURL(url);
            };
        } else {
            setVideoPreview("");
        }
    }, [videoFile]);

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("video/")) {
                // Simulate input change event
                const event = { target: { files: [file] } };
                onVideoChange(event);
            }
        }
    };

    return (
        <div
            className={`video-select-root${dragActive ? " drag-active" : ""}`}
            ref={dropRef}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                ref={videoInputRef}
                onChange={onVideoChange}
            />
            <button
                type="button"
                className={`video-select-btn${videoPreview ? " has-preview" : ""}${dragActive ? " drag-over" : ""}`}
                onClick={() => videoInputRef.current.click()}
                onMouseEnter={() => setShowPencil(true)}
                onMouseLeave={() => setShowPencil(false)}
                style={{
                    padding: !videoPreview ? undefined : 0,
                }}
            >
                {!videoFile || !videoPreview ? (
                    <>
                        <PlusCircledIcon width={36} height={36} color="#888" />
                        <span className="video-select-label">
                            Drag & drop or click to select a video
                        </span>
                    </>
                ) : (
                    <div
                        className="video-select-preview-wrapper"
                    >
                        <img
                            src={videoPreview}
                            alt="Video preview"
                            className="video-select-preview"
                        />
                        <span
                            className="video-select-pencil"
                            style={{ display: showPencil ? "flex" : "none" }}
                        >
                            <Pencil2Icon width={28} height={28} color="#fff" />
                        </span>
                    </div>
                )}
            </button>
            {videoFile && (
                <div className="video-select-filename">
                    <span>🎬</span> {videoFile.name}
                </div>
            )}
            <button
                type="button"
                className="video-select-next"
                disabled={!videoFile}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
};

export default VideoSelect;