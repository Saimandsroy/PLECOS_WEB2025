import React from 'react';
import { Play, Pause } from 'lucide-react';
import './CenterOverlay.css';

const CenterOverlay = ({ isPlaying, togglePlayPause, showControls, isBuffering }) => {
  return (
    <div className={`player__centerPlay ${showControls ? 'player__centerPlay__visible' : ''}`}>
      {isBuffering ? (
        <div className="player__bufferingSpinner">
          <div className="spinner" />
        </div>
      ) : (
        <button className="player__button" onClick={togglePlayPause}>
          {isPlaying ? <Pause size={48} /> : <Play size={48} />}
        </button>
      )}
    </div>
  );
};

export default CenterOverlay;