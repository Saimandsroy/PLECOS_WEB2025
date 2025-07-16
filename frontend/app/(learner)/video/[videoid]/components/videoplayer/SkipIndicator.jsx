import React from "react";
import { SkipBack, SkipForward } from "lucide-react";
import "./SkipIndicator.css";
const SkipIndicator = ({ show, direction }) => {
  return (
    <div
      className={`player__skipIndicator 
        ${show ? "player__skipIndicator__visible" : ""} 
        ${
          direction === "left"
            ? "player__skipIndicator__left"
            : "player__skipIndicator__right"
        }`}
    >
      {direction === "left" ? (
        <SkipBack size={32} />
      ) : (
        <SkipForward size={32} />
      )}
      <span>10s</span>
    </div>
  );
};

export default SkipIndicator;
