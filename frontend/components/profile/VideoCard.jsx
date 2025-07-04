import React from 'react';
import Image from 'next/image';
import './VideoCard.css';

const VideoCard = ({
    thumbnail,
    title,
    views,
    timeAgo,
    duration,
    logo
}) => (
    <div className="video-card">
        <div className="video-thumb-wrapper">
            <Image src={thumbnail} alt={title} className="video-thumb" />
            <span className="video-duration">{duration}</span>
        </div>
        <div className="video-metadata">
            {logo && (
                <div className="video-logo">
                    <Image src={logo} alt="Channel Logo" width={48} height={48} />
                </div>
            )}
            <div className="video-info">
                <div className="video-title">{title}</div>
                <div className="video-meta">
                    <span>{views} views</span>
                    <span>•</span>
                    <span>{timeAgo}</span>
                </div>
            </div>
        </div>
    </div>
);

export default VideoCard;