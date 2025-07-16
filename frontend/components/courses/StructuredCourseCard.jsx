'use client';

import styles from './StructuredCourseCard.module.css';
import {useRouter} from 'next/navigation';

const StructuredCourseCard = ({course ,isPro, isEnr}) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/courses/${course.id}`);
  };
  const getCourseTypeColor = (type) => {
    const colors = {
      'Interactive': '#4CAF50',
      'Project-Based': '#2196F3',
      'Hands-on': '#FF9800',
      'Theory': '#9C27B0'
    };
    return colors[type] || '#757575';
  };

  const formatViewCount = (count) => {
    if (typeof count !== 'number' || isNaN(count)) return '0';
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardThumbnail}>
        <img src={course.thumbnail} alt={course.title} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{course.title}</h3>
       {isPro && ( <div className={styles.instructorInfo}>
          <img src={course.instructorImage} alt={course.instructor} className={styles.instructorImage} />
          <span className={styles.instructorName}>{course.instructor}</span>
        </div>)}
        <div className={styles.courseInfo}>
          <span className={styles.level}>{course.level}</span>
          <span
            className={styles.courseType}
            style={{ backgroundColor: getCourseTypeColor(course.courseType) }}
          >
            {course.courseType}
          </span>
        </div>
        <div className={styles.courseStats}>
          <span className={styles.rating}>★ {course.rating}</span>
          <span className={styles.viewCount}>{formatViewCount(course.viewCount)} views</span>
        </div>
        <div className={styles.impactRate}>
          <span>Impact Rate: {course.impactRate}%</span>
        </div>
        {isEnr && (<button
          onClick={handleCardClick}
            className={`${styles.actionButton} ${course.enrolled ? styles.continueButton : styles.enrollButton}`}
            style={
              course.enrolled && course.progress
                ? {
                    background: `linear-gradient(to right, #28a745 ${course.progress}%, var(--background-secondary) ${course.progress}%)`,
                    color: '#fff',
                    position: 'relative',
                  }
                : {}
            }
          >
          {course.enrolled ? `Continue (${course.progress||0}%)` : 'Enroll'}
        </button>)}
      </div>
    </div>
  );
};

export default StructuredCourseCard;
