"use client";

import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";

import TitleOverlay from "./videoplayer/TitleOverlay";
import SkipIndicator from "./videoplayer/SkipIndicator";
import Timeline from "./videoplayer/Timeline";
import BottomControls from "./videoplayer/BottomControls";
import SettingsMenu from "./videoplayer/SettingsMenu";
import CenterOverlay from "./videoplayer/CenterOverlay";
import Watermark from "./videoplayer/watermark";

import "./VideoPlayer.css";

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
  const [quality, setQuality] = useState(-1);
  const [availableQualities, setAvailableQualities] = useState([]);
  const [hlsInstance, setHlsInstance] = useState(null);
  const [showCaptions, setShowCaptions] = useState(true);

  const [buffered, setBuffered] = useState(0);
  const [showSkipIndicator, setShowSkipIndicator] = useState(false);
  const [skipDirection, setSkipDirection] = useState("");
  const [currentLevelLabel, setCurrentLevelLabel] = useState("Auto");
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [settingsScreen, setSettingsScreen] = useState("main");
  const [isBuffering, setIsBuffering] = useState(false);

  const videoUrl =
    "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
  const videoTitle = "Mastering React in 30 Minutes";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((lvl, idx) => ({
          index: idx,
          label: `${lvl.height}p`,
        }));
        setAvailableQualities([{ index: -1, label: "Auto" }, ...levels]);
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const level = hls.levels[data.level];
        setCurrentLevelLabel(`${level.height}p`);
        setCurrentLevel(data.level);
      });

      setHlsInstance(hls);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleStalled = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const resetControlsTimeout = () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      setShowControls(true);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const player = playerRef.current;
    if (!player) return;

    const handleMouseMove = () => resetControlsTimeout();
    const handleMouseLeave = () => {
      if (isPlaying) setShowControls(false);
    };

    player.addEventListener("mousemove", handleMouseMove);
    player.addEventListener("mouseleave", handleMouseLeave);

    resetControlsTimeout();

    return () => {
      player.removeEventListener("mousemove", handleMouseMove);
      player.removeEventListener("mouseleave", handleMouseLeave);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (["INPUT", "TEXTAREA"].includes(tag) || e.target.isContentEditable)
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipBackward();
          break;
        case "ArrowRight":
          e.preventDefault();
          skipForward();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [volume, isMuted, isPlaying]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) isPlaying ? video.pause() : video.play();
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
    showSkipIndicatorWithDirection("left");
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
    showSkipIndicatorWithDirection("right");
  };

  const showSkipIndicatorWithDirection = (direction) => {
    setSkipDirection(direction);
    setShowSkipIndicator(true);
    setTimeout(() => setShowSkipIndicator(false), 800);
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    const video = videoRef.current;
    if (video) video.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    const video = videoRef.current;
    if (video) video.volume = newVolume;
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

  const changeQuality = (index) => {
    if (hlsInstance) {
      hlsInstance.currentLevel = index;
      setQuality(index);
    }
  };

  const handleVideoClick = (e) => {
    const video = videoRef.current;
    const rect = video.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const now = Date.now();

    if (now - lastTapRef.current < 300) {
      if (clickX < rect.width / 3) skipBackward();
      else if (clickX > (rect.width * 2) / 3) skipForward();
      else togglePlayPause();
      clearTimeout(tapTimeoutRef.current);
    } else {
      tapTimeoutRef.current = setTimeout(() => {
        if (clickX >= rect.width / 3 && clickX <= (rect.width * 2) / 3) {
          togglePlayPause();
        }
      }, 300);
    }

    lastTapRef.current = now;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.label === "English") {
        track.mode = showCaptions ? "showing" : "disabled";
      } else {
        track.mode = "disabled";
      }
    }
  }, [showCaptions]);

  return (
    <div className="player" ref={playerRef}>
      <div className="player__container">
        <video
          ref={videoRef}
          className="player__video"
          onClick={handleVideoClick}
          playsInline
        />
        <Watermark />

        <TitleOverlay title={videoTitle} visible={showControls} />
        <CenterOverlay
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          showControls={showControls}
          isBuffering={isBuffering}
        />
        <SkipIndicator show={showSkipIndicator} direction={skipDirection} />

        <div
          className={`player__controls ${
            showControls ? "player__controls__visible" : ""
          }`}
        >
          <Timeline
            duration={duration}
            currentTime={currentTime}
            buffered={buffered}
            onClick={handleTimelineClick}
          />
          <BottomControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            skipBackward={skipBackward}
            skipForward={skipForward}
            volume={volume}
            isMuted={isMuted}
            toggleMute={toggleMute}
            handleVolumeChange={handleVolumeChange}
            currentTime={currentTime}
            duration={duration}
            showCaptions={showCaptions}
            setShowCaptions={setShowCaptions}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            isTheaterMode={isTheaterMode}
            setIsTheaterMode={setIsTheaterMode}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </div>

        <SettingsMenu
          visible={showSettings}
          screen={settingsScreen}
          setScreen={setSettingsScreen}
          playbackSpeed={playbackSpeed}
          changePlaybackSpeed={changePlaybackSpeed}
          quality={quality}
          setQuality={changeQuality}
          availableQualities={availableQualities}
          showCaptions={showCaptions}
          setShowCaptions={setShowCaptions}
          currentLevelLabel={
            availableQualities.find((q) => q.index === currentLevel)?.label ||
            "Auto"
          }
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
