import React from "react";
import VideoCard from "./VideoCard";
import thumb from "@/public/logo.png";
import "./VideosGrid.css";
import { videoDataPage } from "@/demo/videoPage";

const VideosGrid = () => (
  <div className="videos-grid">
    {videoDataPage.map((video) => (
      <VideoCard key={video.id} video={video} />
    ))}
  </div>
);

export default VideosGrid;
