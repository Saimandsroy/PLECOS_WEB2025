"use client";
import React, { useState } from 'react';
import ChannelHeader from './components/ChannelHeader';
import StickyTabs from './components/StickyTabs';
import VideosGrid from './components/VideosGrid';
import ShortsGrid from './components/ShortsGrid';
import PostsRow from './components/PostsRow';
import './page.css';

const isLight = true; // set to true for light mode

const InstructorHome = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="instructor-home" >
      <ChannelHeader />
      <StickyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && <VideosGrid />}
      {activeTab === 1 && <ShortsGrid />}
      {activeTab === 2 && <PostsRow />}
    </div>
  );
}

export default InstructorHome;
