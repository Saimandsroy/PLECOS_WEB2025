import React from 'react';

const bgColors = [
  '#232b36', '#374151', '#475569', '#232b36'
];

const CourseCard = ({ title, desc, progress, lessons, completed }, idx) => {
  const styles = {
    card: {
      borderRadius: 16,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 220,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'var(--background-glass)',
      boxShadow: '0 12px 24px var(--shadow-color)',
      border: '1px solid var(--border-color)',
      transition: 'all 0.3s ease',
      color: 'var(--text-primary)',
    },
    header: {
      background: bgColors[idx % bgColors.length],
      color: 'var(--text-primary)',
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 18
    },
    body: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    },
    desc: {
      color: 'var(--text-secondary)',
      fontSize: 15
    },
    meta: {
      marginTop: 8,
      fontSize: 14,
      display: 'flex',
      justifyContent: 'space-between'
    },
    progressBarBg: {
      width: '100%',
      height: 7,
      background: 'var(--background-secondary)',
      borderRadius: 6,
      marginTop: 4,
      overflow: 'hidden'
    },
    progressBar: {
      width: `${progress}%`,
      height: '100%',
      background: 'var(--gradient-secondary)',
      borderRadius: 6,
      transition: 'width 0.3s ease'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>{title}</div>
      <div style={styles.body}>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={styles.desc}>{desc}</div>
        <div style={styles.meta}>
          <span>Progress: {progress}%</span>
          <span>{completed}/{lessons} lessons</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
