'use client';
import React from 'react';
import styles from './VideoDetailsSkeleton.module.css';

const VideoDetailsSkeleton = () => {
    return (
        <div className={styles.videoDetails}>
            {/* Title row skeleton */}
            <div className={styles.titleRow}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonToggle}></div>
            </div>

            {/* Instructor info skeleton */}
            <div className={styles.instructorInfo}>
                <div className={styles.skeletonAvatar}></div>
                <div className={styles.instructorMeta}>
                    <div className={styles.instructorNameBadge}>
                        <div className={styles.skeletonInstructorName}></div>
                        <div className={styles.skeletonBadge}></div>
                    </div>
                    <div className={styles.skeletonFollowButton}></div>
                </div>
            </div>

            {/* Video meta skeleton */}
            <div className={styles.videoMeta}>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
                <div className={styles.skeletonMetaItem}></div>
            </div>

            {/* Description skeleton (optional) */}
            <div className={styles.skeletonDescription}>
                <div className={styles.skeletonDescriptionLine}></div>
                <div className={styles.skeletonDescriptionLine}></div>
                <div className={styles.skeletonDescriptionLine}></div>
            </div>
        </div>
    );
};

export default VideoDetailsSkeleton;
