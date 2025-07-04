import React from "react";
import Image from "next/image";
import "./VideoCard.css";

const VideoCard = ({ thumbnail, title, views, timeAgo, duration, logo }) => (
  <div className="wl-video-card">
    <div className="wl-video-thumb-wrapper">
      <Image src={thumbnail} alt={title} className="wl-video-thumb" />
      <span className="wl-video-duration">{duration}</span>
    </div>
    <div className="wl-video-metadata">
      {logo && (
        <div className="wl-video-logo">
          <Image src={logo} alt="Channel Logo" width={48} height={48} />
        </div>
      )}
      <div className="wl-video-info">
        <div className="wl-video-title">{title}</div>
        <div className="wl-video-meta">
          <span>{views} views</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  </div>
);

export default VideoCard;
