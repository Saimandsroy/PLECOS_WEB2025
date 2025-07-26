'use client';

import React, { useState } from 'react';
import PreLiveSetup from './PreLiveSetup';
import LiveStreamArea from './LiveStreamArea';
import PostLiveSummary from './PostLiveSummary';
import "./GoLivePage.css";

const GoLivePage = () => {
    const [liveState, setLiveState] = useState('pre-live'); // 'pre-live', 'live', 'post-live'

    const renderContent = () => {
        switch (liveState) {
            case 'live':
                return (
                    <LiveStreamArea onEndStream={() => setLiveState('post-live')} />
                );
            case 'post-live':
                return (
                    <div className="post-live-container">
                        <PostLiveSummary onReturn={() => setLiveState('pre-live')} />
                    </div>
                );
            case 'pre-live':
            default:
                return (
                    <div className="pre-live-container">
                        <PreLiveSetup onGoLive={() => setLiveState('live')} />
                    </div>
                );
        }
    };

    return (
        <main className="go-live-page-container">
            {renderContent()}
        </main>
    );
};

export default GoLivePage;