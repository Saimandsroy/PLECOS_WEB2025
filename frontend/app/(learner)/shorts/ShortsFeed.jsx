'use client';

import './ShortsFeed.css';
import React, { useState, useRef, useEffect } from 'react';
import ShortVideo from './ShortVideo.jsx';
import NavigationDots from './NavigationDots.jsx';
import { shortsData as mock } from './shortsData.js';

import { formatNumber } from './utils';

export default function ShortsFeed() {
  /* ─────────── State & Refs ─────────── */
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [data, setData] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const containerRef = useRef(null);
  const videoRefs   = useRef([]);

  /* ─────────── Lifecycle ─────────── */
  useEffect(() => setData(mock), []);

  /* Scroll snapping → active index */
  useEffect(() => {
    const handler = () => {
      const el   = containerRef.current;
      const h    = el.clientHeight;
      const next = Math.round(el.scrollTop / h);
      if (next !== current && next >= 0 && next < data.length) {
        setCurrent(next);
        setActiveComment(null);
      }
    };
    containerRef.current?.addEventListener('scroll', handler);
    return () => containerRef.current?.removeEventListener('scroll', handler);
  }, [current, data.length]);

  /* Play / pause & mute logic */
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      i === current && playing ? v.play().catch(console.error) : v.pause();
      v.muted = muted;
    });
  }, [current, playing, muted]);

  /* ─────────── Handlers passed down ─────────── */
  const like   = id    => setData(d => d.map(v => v.id === id ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 } : v));
  const follow = id    => setData(d => d.map(v => v.id === id ? { ...v, isFollowing: !v.isFollowing } : v));
  const togglePlay  = () => setPlaying(p => !p);
  const toggleMute  = () => setMuted(m => !m);
  const toggleCmnt  = idx => setActiveComment(c => (c === idx ? null : idx));
  const scrollTo    = idx => containerRef.current?.scrollTo({ top: idx * containerRef.current.clientHeight, behavior: 'smooth' });

  /* ─────────── Render ─────────── */
  return (
    <div className="shorts-container">
      <div className="shorts-feed" ref={containerRef}>
        {data.map((video, i) => (
          <ShortVideo
            key={video.id}
            ref={el => (videoRefs.current[i] = el)}
            video={video}
            index={i}
            isActive={i === current}
            isPlaying={playing}
            isMuted={muted}
            like={() => like(video.id)}
            follow={() => follow(video.id)}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            showComments={activeComment === i}
            toggleComments={() => toggleCmnt(i)}
            formatNumber={formatNumber}
          />
        ))}
      </div>

      <NavigationDots
        total={data.length}
        current={current}
        onDotClick={scrollTo}
      />
    </div>
  );
}