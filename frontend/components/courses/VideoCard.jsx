'use client';

import styles from './VideoCard.module.css';

const VideoCard = ({ video }) => {
  const formatViewCount = (count) => {
    if (typeof count !== 'number' || isNaN(count)) return '0';
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardThumbnail}>
        <img src={video.thumbnail} alt={video.title} />
        <div className={styles.duration}>{video.duration}</div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <div className={styles.instructorInfo}>
          <span className={styles.instructorName}>{video.instructor}</span>
        </div>
        <div className={styles.courseStats}>
          <span className={styles.viewCount}>{formatViewCount(video.viewCount)} views</span>
        </div>
        <button className={styles.actionButton}>Watch</button>
      </div>
    </div>
  );
};

export default VideoCard;
