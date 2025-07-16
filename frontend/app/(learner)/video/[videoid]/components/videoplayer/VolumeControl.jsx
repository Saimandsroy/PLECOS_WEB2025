import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import "./VolumeControl.css";
const VolumeControl = ({ volume, isMuted, onToggleMute, onVolumeChange }) => {
  return (
    <div className="player__volumeContainer">
      <button className="player__button" onClick={onToggleMute}>
        {isMuted || volume === 0 ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={onVolumeChange}
        className="player__volumeSlider"
        style={{ "--volume-fill": `${volume * 100}%` }}
      />
    </div>
  );
};

export default VolumeControl;
