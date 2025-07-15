// components/VideoPlayer/VideoCore.jsx
'use client';
import React from 'react';
import './VideoCore.css';
const VideoCore = ({ videoRef, videoUrl, onClick, showCaptions }) => {
  return (
    <video
      ref={videoRef}
      className="player__video"
      src={videoUrl}
      onClick={onClick}
      playsInline
    >
      {showCaptions && (
        <track
          kind="subtitles"
          src="/path/to/captions.vtt"
          srcLang="en"
          label="English"
          default
        />
      )}
    </video>
  );
};

export default VideoCore;