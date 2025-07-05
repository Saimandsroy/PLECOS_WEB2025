"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoSelect from "../video/components/VideoSelect";
import VideoMetaForm from "../video/components/VideoMetaForm";
import UploadSectionHeader from "../video/components/UploadSectionHeader";
import "../video/page.css";

const UploadShortPage = () => {
    const [step, setStep] = useState(1);
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoError, setVideoError] = useState("");
    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const video = document.createElement("video");
            video.preload = "metadata";
            video.src = url;
            video.onloadedmetadata = () => {
                if (video.duration > 60) {
                    setVideoError("Please select a video under 1 minute.");
                    setVideoFile(null);
                    setVideoURL("");
                    if (videoInputRef.current) videoInputRef.current.value = "";
                    URL.revokeObjectURL(url); // revoke immediately if not used
                } else {
                    setVideoFile(file);
                    setVideoURL(url);
                    setVideoError("");
                    // Do NOT revoke here! Keep the URL for preview
                }
            };
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailURL(URL.createObjectURL(file));
        }
    };
    console.log(videoURL)

    useEffect(() => {
        return () => {
            if (videoURL) {
                URL.revokeObjectURL(videoURL);
            }
        };
    }, [videoURL]);

    return (
        <div className="upload-video-page-xyz">
            <UploadSectionHeader identifier="short" />
            {step === 1 && (
                <>
                    <VideoSelect
                        videoFile={videoFile}
                        onVideoChange={handleVideoChange}
                        onNext={() => setStep(2)}
                        videoInputRef={videoInputRef}
                    />
                    {videoError && (
                        <div style={{ color: "var(--brand-orange)", marginTop: 12, fontWeight: 500 }}>
                            {videoError}
                        </div>
                    )}
                </>
            )}
            {step === 2 && (
                <VideoMetaForm
                    videoURL={videoURL}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    thumbnailURL={thumbnailURL}
                    onThumbnailChange={handleThumbnailChange}
                    thumbnailInputRef={thumbnailInputRef}
                    videoFile={videoFile}
                    thumbnail={thumbnail}
                    onBackToVideoSelect={() => setStep(1)}
                />
            )}
        </div>
    );
};

export default UploadShortPage;