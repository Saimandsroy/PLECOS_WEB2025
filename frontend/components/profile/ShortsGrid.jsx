// components/profile/ShortsGrid.jsx
import React from 'react';
import ShortsCard from './ShortsCard';
import './ShortsGrid.css';

const ShortsGrid = ({ shorts, loading = false }) => {
    if (loading && shorts.length === 0) {
        return (
            <div className="shorts-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="shorts-card shorts-card--skeleton">
                        <div className="shorts-card__thumbnail-skeleton"></div>
                        <div className="shorts-card__actions-skeleton">
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                            <div className="skeleton-item"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="shorts-grid">
            {shorts.map((short) => (
                <ShortsCard key={short.id} short={short} />
            ))}
            {loading && (
                <div className="loading-more">
                    <div className="loading-spinner"></div>
                    <p>Loading more shorts...</p>
                </div>
            )}
        </div>
    );
};

export default ShortsGrid;
