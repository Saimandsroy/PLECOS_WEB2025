import React from "react";
import ShortsCard from "./ShortsCard";
import "./ShortsGrid.css"; // Updated CSS filename

const ShortsGrid = ({ shorts, loading = false }) => {
  if (loading && shorts.length === 0) {
    return (
      <div className="profile-shorts-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="profile-shorts-card profile-shorts-card--skeleton"
          >
            <div className="profile-shorts-card__thumbnail-skeleton"></div>
            <div className="profile-shorts-card__actions-skeleton">
              <div className="profile-skeleton-item"></div>
              <div className="profile-skeleton-item"></div>
              <div className="profile-skeleton-item"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="profile-shorts-grid">
      {shorts.map((short) => (
        <ShortsCard key={short.id} short={short} />
      ))}
      {loading && (
        <div className="profile-loading-more">
          <div className="profile-loading-spinner"></div>
          <p>Loading more shorts...</p>
        </div>
      )}
    </div>
  );
};

export default ShortsGrid;
