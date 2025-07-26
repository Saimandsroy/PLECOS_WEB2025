import React from 'react';
import './PostLiveSummary.css';

// SVG Icons for buttons
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const AnalyticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"/>
    </svg>
);


const PostLiveSummary = ({ onReturn }) => {
    // Placeholder data
    const summaryStats = {
        duration: '48 mins',
        peakViewers: 128,
    };

    return (
        <div className="post-live-wrapper">
            <div className="post-live-card">
                <header className="summary-header">
                    <h1>Live Session Ended</h1>
                    <p>Thank you for streaming!</p>
                </header>

                <div className="summary-stats">
                    <div className="stat-item">
                        <span className="stat-value">{summaryStats.duration}</span>
                        <span className="stat-label">Session Duration</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{summaryStats.peakViewers}</span>
                        <span className="stat-label">Peak Viewers</span>
                    </div>
                </div>

                <div className="summary-actions">
                    <button className="action-btn primary-btn">
                        <DownloadIcon />
                        <span>Download Recording</span>
                    </button>
                    <button className="action-btn secondary-btn" onClick={onReturn}>
                        <AnalyticsIcon />
                        <span>Go Live Again</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostLiveSummary;
