import React, { useState } from "react";
import VideoMetaStep1 from "./VideoMetaStep1";
import VideoMetaStep2 from "./VideoMetaStep2";

const VideoMetaForm = ({
    videoURL,
    title,
    setTitle,
    description,
    setDescription,
    thumbnailURL,
    onThumbnailChange,
    thumbnailInputRef,
    videoFile,
    thumbnail,
    onBackToVideoSelect
}) => {
    const [category, setCategory] = useState("Education");
    const [tags, setTags] = useState([]);
    const [metaStep, setMetaStep] = useState(1);

    return (
        <>
            <div className="video-meta-preview" style={{ marginBottom: 24 }}>
                <video src={videoURL} controls />
            </div>
            {metaStep === 1 ? (
                <VideoMetaStep1
                    title={title}
                    setTitle={setTitle}
                    category={category}
                    setCategory={setCategory}
                    thumbnailURL={thumbnailURL}
                    onThumbnailChange={onThumbnailChange}
                    thumbnailInputRef={thumbnailInputRef}
                    onNext={() => setMetaStep(2)}
                    onBack={onBackToVideoSelect}
                />
            ) : (
                <VideoMetaStep2
                    description={description}
                    setDescription={setDescription}
                    tags={tags}
                    setTags={setTags}
                    onBack={() => setMetaStep(1)}
                    onSubmit={() => {
                        // Print all details in the console
                        console.log({
                            videoFile,
                            videoURL,
                            title,
                            category,
                            thumbnail,
                            thumbnailURL,
                            description,
                            tags,
                        });
                    }}
                />
            )}
        </>
    );
};

export default VideoMetaForm;