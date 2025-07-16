import React from "react";
import "./TimeDisplay.css";
const TimeDisplay = ({ currentTime, duration }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="player__timeDisplay">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
};

export default TimeDisplay;
