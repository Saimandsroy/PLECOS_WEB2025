"use client";
import React, { useState, useRef, useEffect } from "react";
import "./VideoCard.css";
import thumb from "@/public/logo.png";
import Image from "next/image";
const VideoCard = ({ video }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const duration = () => {
    const hours = Math.floor(video.duration / 3600);
    const minutes = Math.floor(video.duration / 60) - (hours * 60);
    const seconds = video.duration % 60
    return `${hours > 0 ? `${hours}:` : ""}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <img src="@/public/video-tutorial.png" alt={video.title} />
        <span className="video-duration">{duration(video.duraion)}</span>
        <div className="play-icon">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="video-details">
        <div className="video-header">
          <h3 className="video-title">{video.title}</h3>

          <div className="video-options" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="options-btn"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="options-menu">
                <a href="#">Add to Queue</a>
                <a href="#">Save to Watch Later</a>
                <a href="#">Share</a>
              </div>
            )}
          </div>
        </div>

        <div className="video-info">
          <img
            src={video?.instructor?.image || thumb}
            alt={video?.instructor?.name || "Instructor"}
            className="instructor-image"
          />
          <div className="info-text">
            <p className="instructor-name">{video?.instructor?.name || "Instructor"}</p>
            <p className="video-stats">
              {video.views} Views • {video.uploadedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

/**
 * instructor name
 *instructor pic
 */
