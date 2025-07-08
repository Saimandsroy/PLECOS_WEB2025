'use client';
import React from 'react';
import styles from './RecommendationsList.module.css';



const RecommendationsList = ({ videos }) => {
  return (
    <div className={styles.recommendationsList}>
      <h3 className={styles.recommendationsHeading}>Recommended Videos</h3>
      {videos.map(video => (
        <div key={video.id} className={styles.recommendationItem}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className={styles.recommendationThumbnail}
          />
          <div className={styles.recommendationInfo}>
            <h4 className={styles.recommendationTitle}>{video.title}</h4>
            <p className={styles.recommendationMeta}>
              {video.channel} • {video.views.toLocaleString()} views • {video.duration}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;