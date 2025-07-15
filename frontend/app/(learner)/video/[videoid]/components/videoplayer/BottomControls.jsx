// components/VideoPlayer/Controls/BottomControls.jsx

import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Monitor,
  Settings,
  Captions,
  Maximize,
  Minimize
} from 'lucide-react';

import VolumeControl from './VolumeControl';
import TimeDisplay from './TimeDisplay';

import './BottomControls.css';

const BottomControls = ({
  isPlaying,
  togglePlayPause,
  skipBackward,
  skipForward,
  volume,
  isMuted,
  toggleMute,
  handleVolumeChange,
  currentTime,
  duration,
  showCaptions,
  setShowCaptions,
  showSettings,
  setShowSettings,
  isTheaterMode,
  setIsTheaterMode,
  isFullscreen,
  toggleFullscreen
}) => {
  return (
    <div className="player__bottomBar">
      <div className="player__leftControls">
        <button className="player__button" onClick={togglePlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button className="player__button" onClick={skipBackward}>
          <SkipBack size={20} />
        </button>

        <button className="player__button" onClick={skipForward}>
          <SkipForward size={20} />
        </button>

        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />

        <TimeDisplay currentTime={currentTime} duration={duration} />
      </div>

      <div className="player__rightControls">
        <button
          className="player__button"
          onClick={() => setShowCaptions(!showCaptions)}
          style={{ opacity: showCaptions ? 1 : 0.6 }}
        >
          <Captions size={20} />
        </button>

        <button
          className="player__button"
          onClick={() => setShowSettings((prev) => !prev)}
          style={{ opacity: showSettings ? 1 : 0.6 }}
        >
          <Settings size={20} />
        </button>

        <button
          className="player__button"
          onClick={() => setIsTheaterMode(!isTheaterMode)}
        >
          <Monitor size={20} />
        </button>

        <button className="player__button" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default BottomControls;