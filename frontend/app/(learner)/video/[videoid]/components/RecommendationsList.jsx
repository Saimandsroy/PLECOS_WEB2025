"use client";
import React from "react";
import styles from "./RecommendationsList.module.css";

const RecommendationsList = ({ videos }) => {
  return (
    <div className={styles.recommendationsList}>
      <h3 className={styles.recommendationsHeading}>Recommended Videos</h3>
      {videos.map((video) => (
        <div key={video.id} className={styles.recommendationItem}>
          <div className={styles.thumbnailWrapper}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className={styles.recommendationThumbnail}
            />
            <span className={styles.duration}>{video.duration}</span>
          </div>
          <div className={styles.recommendationInfo}>
            <h4 className={styles.recommendationTitle}>{video.title}</h4>
            <p className={styles.channelName}>{video.channel}</p>
            <p className={styles.recommendationMeta}>
              {video.views.toLocaleString()} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
