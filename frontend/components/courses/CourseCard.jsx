"use client";

import styles from "./CourseCard.module.css";
import { FaStar } from "react-icons/fa";
import { ArrowRight, Calendar, CheckCircle, PlayCircle } from "lucide-react";

const CourseCard = ({ course }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.cardWrapper}>
      <a href={`/courses/${course.course_id}`} className={styles.card}>
        <div className={styles.cardThumbnail}>
          <img
            src={`${process.env.NEXT_PUBLIC_R2_ENDPOINT}${course.thumbnailUrl}`}
            alt={course.title}
            className={styles.thumbnailImage}
          />
          <div className={styles.thumbnailOverlay}></div>
          <span className={styles.favoriteTag}>★ Learner's Favorite</span>
          <span className={styles.levelTag}>{course.level}</span>
          {course.enrolled && (
            <span className={styles.enrolledBadge}>Enrolled</span>
          )}
        </div>

        <div className={styles.cardContent}>
          <div className={styles.titleSection}>
            <h3 className={styles.cardTitle}>{course.title}</h3>
          </div>

          <div className={styles.tagsContainer}>
            {course.courseTags?.map((tag, index) => (
              <span key={index} className={styles.courseTag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.instructorInfo}>
              <img
                src={course.instructorImage || "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"}
                alt={course.instructor}
                width={24}
                height={24}
                className={styles.instructorImage}
              />
              <span>{course.instructor}</span>
            </div>
            <div className={styles.dateInfo}>
              <Calendar size={14} />
              <span>{formatDate(course.lastUpdated)}</span>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.ratingInfo}>
              <FaStar className={styles.starIcon} />
              <span>
                <b>{course.rating}</b> ({course.reviewsCount} reviews)
              </span>
            </div>
            <div className={styles.impactInfo}>
              <span>
                Impact: <b>{course.impactRate || "10%"}</b>
              </span>
            </div>
          </div>
          <div className={styles.hoverOverlay}>
            {course.enrolled ? (
              <div className={styles.enrolledHoverContent}>
                <PlayCircle size={48} />
                <h4 className={styles.enrolledTitle}>Continue Learning</h4>
                <div className={styles.hoverAction}>
                  <span>Go to Course</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            ) : (
              <>
                <ul className={styles.featuresList}>
                  {course.features?.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle size={16} className={styles.featureIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.hoverAction}>
                  <span>View Course</span>
                  <ArrowRight size={20} />
                </div>
              </>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseCard;
