import React from "react";
import Image from "next/image";
import "./VideoCard.css";
import { MdDownloadDone  } from "react-icons/md";

const VideoCard = ({ thumbnail, title, duration, logo }) => (
  <div className="dl-video-card">
    <div className="dl-video-thumb-wrapper">
      <Image src={thumbnail} alt={title} className="dl-video-thumb" />
      <span className="dl-video-duration">{duration}</span>
    </div>
    <div className="dl-video-metadata">
      {logo && (
        <div className="dl-video-logo">
          <Image src={logo} alt="Channel Logo" width={48} height={48} />
        </div>
      )}
      <div className="dl-video-info">
        <div className="dl-video-title">{title}</div>
        <div className="dl-video-meta">
          <MdDownloadDone size={20} /> <span>Downloaded</span>
        </div>
      </div>
    </div>
  </div>
);

export default VideoCard;
