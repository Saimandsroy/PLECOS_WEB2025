"use client";
import React, { useRef, useState } from "react";
import VideoSelect from "./components/VideoSelect";
import VideoMetaForm from "./components/VideoMetaForm";

const UploadVideoPage = () => {
    const [step, setStep] = useState(1);
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoURL(URL.createObjectURL(file));
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbnailURL(URL.createObjectURL(file));
        }
    };

    return (
        <div style={{ maxWidth: 540, margin: "40px auto", padding: 24 }}>
            {step === 1 && (
                <VideoSelect
                    videoFile={videoFile}
                    onVideoChange={handleVideoChange}
                    onNext={() => setStep(2)}
                    videoInputRef={videoInputRef}
                />
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

export default UploadVideoPage;