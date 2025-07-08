'use client';
import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './VideoDetails.module.css';

const VideoDetails = ({
  title,
  instructor,
  views,
  uploadDate,
  duration,
  rating,
  description,
  category,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleDescription = () => setShowDescription((prev) => !prev);
  const toggleFollow = () => setIsFollowing((prev) => !prev);

  return (
    <div className={styles.videoDetails}>
      <div className={styles.titleRow}>
        <h1 className={styles.videoTitle}>{title}</h1>
        <button className={styles.toggleIcon} onClick={toggleDescription}>
          {showDescription ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div className={styles.instructorInfo}>
        <img src={instructor.avatar} alt={instructor.name} className={styles.avatar} />
        <div className={styles.instructorMeta}>
          <div className={styles.instructorNameBadge}>
            <h3>{instructor.name}</h3>
            <span className={styles.badge}>
              <Sparkles size={14} className={styles.icon} />
              {instructor.badge}
            </span>
          </div>
          <button className={styles.followButton} onClick={toggleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      <div className={styles.videoMeta}>
        <span>{views.toLocaleString()} views</span>
        <span>• {uploadDate}</span>
        <span>• {duration}</span>
        <span>• ⭐ {rating}</span>
        <span>• {category}</span>
      </div>

      {showDescription && <p className={styles.videoDescription}>{description}</p>}
    </div>
  );
};

export default VideoDetails;
