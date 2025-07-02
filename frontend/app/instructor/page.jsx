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
        <div className={`instructor-home ${isLight ? 'light' : 'dark'}`}>
            <ChannelHeader isLight={isLight} />
            <StickyTabs isLight={isLight} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 && <VideosGrid isLight={isLight} />}
            {activeTab === 1 && <ShortsGrid isLight={isLight} />}
            {activeTab === 2 && <PostsRow isLight={isLight} />}
        </div>
    );
}

export default InstructorHome;