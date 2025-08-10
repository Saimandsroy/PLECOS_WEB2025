import React from "react";
import VideoCard from "./VideoCard";
import "./VideosGrid.css";
import { videoDataPage as videos } from "@/demo/videoPage";
const VideosGrid = ({ videoDataPage }) => {
  console.log("VideosGrid videoDataPage:", videoDataPage);
  return (
    <div className="videos-grid">
      {(videoDataPage ? videoDataPage : videos).map((video) => (
        <VideoCard key={video.video_id} video={video} />
      ))}
    </div>
  )
};

export default VideosGrid;
