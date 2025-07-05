'use client';

import styles from './CourseTabs.module.css';

const CourseTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'structured' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('structured')}
      >
        📘 Structured Courses
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'videos' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('videos')}
      >
        🎞️ Videos
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'docs' ? styles.activeTab : ''}`}
        onClick={() => onTabChange('docs')}
      >
        📄 Docs & Notes
      </button>
    </div>
  );
};

export default CourseTabs;
