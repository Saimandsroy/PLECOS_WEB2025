'use client';
import React, { forwardRef } from 'react';
import {
  Heart, MessageCircle, Share, Eye,
  MoreHorizontal, Play, Pause, VolumeX, Volume2
} from 'lucide-react';
import CommentSection from './CommentSection';

const ShortVideo = forwardRef(
  (
    {
      video, index, isActive, isPlaying, isMuted,
      like, follow, togglePlay, toggleMute,
      showComments, toggleComments, formatNumber
    },
    ref
  ) => (
    <div className="short-video">
      <div className="short-video-wrapper">
        {/* Video */}
        <video
          ref={ref}
          className="short-video-player"
          src={video.videoUrl}
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        />

        {/* Dark gradient overlay */}
        <div className="short-video-overlay" />

        {/* Center play icon when paused */}
        {!isPlaying && isActive && (
          <div className="short-play-overlay" onClick={togglePlay}>
            <Play size={60} className="short-play-icon" />
          </div>
        )}

        {/* ───── Left (avatar + title) ───── */}
        <div className="short-content-left">
          <div className="short-user-info">
            <img src={video.avatar} alt={video.author} className="short-avatar" />
            <div className="short-user-details">
              <span className="short-username">@{video.author}</span>
              {!video.isFollowing && (
                <button className="short-follow-btn" onClick={follow}>Follow</button>
              )}
            </div>
          </div>
          <div className="short-title">{video.title}</div>
        </div>

        {/* ───── Right (primary actions) ───── */}
        <div className="short-actions">
          <button className={`short-action-btn ${video.isLiked ? 'liked' : ''}`} onClick={like}>
            <Heart size={28} className={`shorts-icon ${video.isLiked ? 'filled' : ''}`} />
            <span className="short-action-count">{formatNumber(video.likes)}</span>
          </button>

          <button className="short-action-btn" onClick={toggleComments}>
            <MessageCircle size={28} className="shorts-icon" />
            <span className="short-action-count">{formatNumber(video.comments)}</span>
          </button>

          <button className="short-action-btn">
            <Share size={28} className="shorts-icon" />
            <span className="short-action-count">{formatNumber(video.shares)}</span>
          </button>

          <button className="short-action-btn">
            <Eye size={28} className="shorts-icon" />
            <span className="short-action-count">{formatNumber(video.views)}</span>
          </button>

          <button className="short-action-btn">
            <MoreHorizontal size={28} className="shorts-icon" />
          </button>
        </div>

        {/* ───── Bottom (transport controls) ───── */}
        <div className="short-controls">
          <button className="short-control-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} className="shorts-icon" /> : <Play size={20} className="shorts-icon" />}
          </button>
          <button className="short-control-btn" onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} className="shorts-icon" /> : <Volume2 size={20} className="shorts-icon" />}
          </button>
        </div>
      </div>

      {/* Comments (overlaying below video wrapper) */}
      {showComments && <CommentSection close={toggleComments} />}
    </div>
  )
);

ShortVideo.displayName = 'ShortVideo';
export default ShortVideo;