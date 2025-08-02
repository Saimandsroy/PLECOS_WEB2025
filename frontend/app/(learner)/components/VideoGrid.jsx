import React from "react";
import VideoCard from "@/components/profile/VideoCard";
import "./VideoGrid.css";

const VideoGrid = ({ videos }) => {
  return (
    <div className="video-grid-container">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
