'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Settings, Maximize, Minimize, Monitor, Captions } from 'lucide-react';
import styles from './VideoPlayer.module.css';
import { set } from 'nprogress';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const lastTapRef = useRef(0);
  const tapTimeoutRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [showCaptions, setShowCaptions] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [showSkipIndicator, setShowSkipIndicator] = useState(false);
  const [skipDirection, setSkipDirection] = useState('');

  // Sample video URL 
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const videoTitle = "Mastering React in 30 Minutes";

  useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  
  const handleLoadedMetadata = () => {
    setDuration(video.duration || 0);
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1));
    }
  };

  
  if (video.readyState >= 1) {         
    handleLoadedMetadata();
  } else {
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
  }
  

  const handleTimeUpdate = () => {
    setCurrentTime(video.currentTime);
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1));
    }
  };
  video.addEventListener('timeupdate', handleTimeUpdate);
  video.addEventListener('play',  () => setIsPlaying(true));
  video.addEventListener('pause', () => setIsPlaying(false));
  video.addEventListener('ended', () => setIsPlaying(false));

  return () => {
    video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    video.removeEventListener('timeupdate', handleTimeUpdate);
  };
}, []);

  
  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const handleMouseMove = () => resetControlsTimeout();
    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };

    const player = playerRef.current;
    if (player) {
      player.addEventListener('mousemove', handleMouseMove);
      player.addEventListener('mouseleave', handleMouseLeave);
    }

    resetControlsTimeout();

    return () => {
      if (player) {
        player.removeEventListener('mousemove', handleMouseMove);
        player.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume, isPlaying]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
      showSkipIndicatorWithDirection('left');
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
      showSkipIndicatorWithDirection('right');
    }
  };

  const showSkipIndicatorWithDirection = (direction) => {
    setSkipDirection(direction);
    setShowSkipIndicator(true);
    setTimeout(() => setShowSkipIndicator(false), 800);
  };

  const handleTimelineClick = (e) => {
    const video = videoRef.current;
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    if (video) {
      video.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      if (isMuted) {
        video.volume = volume;
        setIsMuted(false);
      } else {
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackSpeed = (speed) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVideoClick = (e) => {
    const video = videoRef.current;
    const rect = video.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const videoWidth = rect.width;
    const now = Date.now();
    
    
    if (now - lastTapRef.current < 300) {
      // Double tap detected
      if (clickX < videoWidth / 3) {
        skipBackward();
      } else if (clickX > (videoWidth * 2) / 3) {
        skipForward();
      } else {
        togglePlayPause();
      }
      clearTimeout(tapTimeoutRef.current);
    } else {
      // Single tap 
      tapTimeoutRef.current = setTimeout(() => {
        if (clickX >= videoWidth / 3 && clickX <= (videoWidth * 2) / 3) {
          togglePlayPause();
        }
      }, 300);
    }
    
    lastTapRef.current = now;
  };

  return (
    <div className={styles.player} ref={playerRef}>
      <div className={styles.player__container}>
        <video
          ref={videoRef}
          className={styles.player__video}
          src={videoUrl}
          onClick={handleVideoClick}
          playsInline
        />
        
        
        <div className={`${styles.player__title} ${showControls ? styles.player__controls__visible : ''}`}>
          {videoTitle}
        </div>

        
        <div className={`${styles.player__centerPlay} ${!isPlaying ? styles.player__centerPlay__visible : ''}`}>
          <button className={styles.player__button} onClick={togglePlayPause}>
            <Play size={48} />
          </button>
        </div>

        
        <div className={`${styles.player__skipIndicator} ${showSkipIndicator ? styles.player__skipIndicator__visible : ''} ${skipDirection === 'left' ? styles.player__skipIndicator__left : styles.player__skipIndicator__right}`}>
          {skipDirection === 'left' ? <SkipBack size={32} /> : <SkipForward size={32} />}
          <span>10s</span>
        </div>

        
        <div className={`${styles.player__controls} ${showControls ? styles.player__controls__visible : ''}`}>
          
          <div className={styles.player__timeline}>
            <div className={styles.player__timelineContainer} onClick={handleTimelineClick}>
              <div className={styles.player__timelineBuffered} style={{ width: `${(buffered / duration) * 100}%` }}></div>
              <div className={styles.player__timelineCurrent} style={{ width: `${(currentTime / duration) * 100}%` }}></div>
              <div className={styles.player__timelineScrubber} style={{ left: `${(currentTime / duration) * 100}%` }}></div>
            </div>
          </div>

          
          <div className={styles.player__bottomBar}>
            <div className={styles.player__leftControls}>
              <button className={styles.player__button} onClick={togglePlayPause}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className={styles.player__button} onClick={skipBackward}>
                <SkipBack size={20} />
              </button>
              <button className={styles.player__button} onClick={skipForward}>
                <SkipForward size={20} />
              </button>
              
              <div className={styles.player__volumeContainer}>
                <button className={styles.player__button} onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className={styles.player__volumeSlider}
                  style={{ '--volume-fill': `${volume * 100}%` }}

                />
              </div>
              
              <div className={styles.player__timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className={styles.player__rightControls}>
              <button
                className={styles.player__button}
                onClick={() => setShowCaptions(!showCaptions)}
                style={{ opacity: showCaptions ? 1 : 0.6 }}
              >
                <Captions size={20} />
              </button>
              
              <button
                className={styles.player__button}
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={20} />
              </button>
              
              <button
                className={styles.player__button}
                onClick={() => setIsTheaterMode(!isTheaterMode)}
              >
                <Monitor size={20} />
              </button>
              
              <button className={styles.player__button} onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>

        
        {showSettings && (
          <div className={`${styles.player__settingsMenu} ${styles.player__settingsMenu__visible}`}>
            <div className={styles.player__settingsItem}>
              <span>Playback Speed</span>
              <select value={playbackSpeed} onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))} className={styles.player__settingsoption}>
                <option value={0.25}>0.25x</option>
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>Normal</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={1.75}>1.75x</option>
                <option value={2}>2x</option>
              </select>
            </div>
            
            <div className={styles.player__settingsItem}>
              <span>Quality</span>
              <select value={quality} onChange={(e) => setQuality(e.target.value)} className={styles.player__settingsoption}>
                <option value="auto">Auto</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
                <option value="360p">360p</option>
              </select>
            </div>
            
            <div className={styles.player__settingsItem}>
              <label>
                <input
                  type="checkbox"
                  checked={showCaptions}
                  onChange={(e) => setShowCaptions(e.target.checked)}
                />
                <span>Subtitles</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;