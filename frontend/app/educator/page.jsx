"use client";
import React, { useState, useRef, useEffect } from 'react';
import ChannelHeader from '../../components/profile/ChannelHeader';
import StickyTabs from '../../components/profile/StickyTabs';
import VideosGrid from '../../components/profile/VideosGrid';
import ShortsGrid from '../../components/profile/ShortsGrid';
import PostsRow from '../../components/profile/PostsRow';
import './page.css';

const tabs = ['Videos', 'Shorts', 'Posts'];

const InstructorHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, []);

  return (
    <div className="instructor-home">
      <ChannelHeader />
      <div ref={sentinelRef} style={{ height: 0 }} />
      <StickyTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className={isSticky ? 'sticky-bg' : 'transparent-bg'}
        tabs={tabs}
      />
      {activeTab === 0 && <VideosGrid />}
      {activeTab === 1 && <ShortsGrid />}
      {activeTab === 2 && <PostsRow />}
    </div>
  );
}

export default InstructorHome;
