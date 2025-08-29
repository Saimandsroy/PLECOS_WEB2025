// components/VideoPlayer/Controls/Timeline.jsx
import React from 'react';
import './Timeline.css';
const Timeline = ({ duration, currentTime, buffered, onClick }) => {
  const currentPercent = (currentTime / duration) * 100;
  const bufferedPercent = (buffered / duration) * 100;

  return (
    <div className="player__timeline">
      <div className="player__timelineContainer" onClick={onClick}>
        <div
          className="player__timelineBuffered"
          style={{ width: `${bufferedPercent}%` }}
        />
        <div
          className="player__timelineCurrent"
          style={{ width: `${currentPercent}%` }}
        />
        <div
          className="player__timelineScrubber"
          style={{ left: `${currentPercent}%` }}
        />
      </div>
    </div>
  );
};

export default Timeline;