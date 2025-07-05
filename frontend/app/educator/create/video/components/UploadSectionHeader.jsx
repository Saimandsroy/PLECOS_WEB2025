import React from "react";
import { VideoIcon, FileTextIcon, RocketIcon } from "@radix-ui/react-icons";
import "./UploadSectionHeader.css";

const iconMap = {
    video: <VideoIcon width={36} height={36} color="var(--brand-blue)" />,
    document: <FileTextIcon width={36} height={36} color="var(--brand-orange)" />,
    quiz: <RocketIcon width={36} height={36} color="var(--brand-blue)" />,
};

const UploadSectionHeader = ({ identifier = "video", title, description }) => {
    const id = identifier.toLowerCase();
    return (
        <div className="upload-section-header">
            <div className="upload-section-icon">
                {iconMap[id] || iconMap.video}
            </div>
            <div>
                <h2 className="upload-section-title">
                    {title || `${identifier.charAt(0).toUpperCase() + identifier.slice(1)} Upload`}
                </h2>
                <p className="upload-section-desc">
                    {description ||
                        `Start by uploading your ${identifier.toLowerCase()} file.`}
                </p>
            </div>
        </div>
    );
};

export default UploadSectionHeader;