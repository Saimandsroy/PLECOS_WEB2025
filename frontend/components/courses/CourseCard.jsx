"use client";

import styles from "./CourseCard.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ArrowRight, Calendar, CheckCircle, PlayCircle } from "lucide-react";

// Example course object with actual data structure
// category: "business";
// course_id: "a939b149-6987-4a58-acd7-1648a14655b3";
// createdAt: "2025-08-11T15:21:32.594Z";
// description: "bjdkjnnd dhhuud hhuidhuid uhduhud";
// duration: 20;
// educator_id: "fad152c8-0671-483a-8766-d807a2f17697";
// lecturesCount: 0;
// level: "intermediate";
// price: 700;
// published: false;
// rating: 0;
// reviewsCount: 0;
// studentsEnrolled: 0;
// tags: [];
// thumbnailUrl: "https://cdn.prod.website-files.com/6424a84a1a908839d5724077/674db4b94f6966c47d740174_video-thumbnails-1.webp";
// title: "bjcbjkjf";
// updatedAt: "2025-08-11T15:21:32.594Z";

const exampleCourse = {
  course_id: "a939b149-6987-4a58-acd7-1648a14655b3",
  title: "bjcbjkjf",
  thumbnailUrl:
    "https://cdn.prod.website-files.com/6424a84a1a908839d5724077/674db4b94f6966c47d740174_video-thumbnails-1.webp",
  educator_id: "fad152c8-0671-483a-8766-d807a2f17697",
  level: "intermediate",
  rating: 0,
  reviewsCount: 0,
  updatedAt: "2025-08-11T15:21:32.594Z",
  tags: [],
  description: "bjdkjnnd dhhuud hhuidhuid uhduhud",
  studentsEnrolled: 0,
  // Additional properties to maintain UI functionality
  instructorImage: "https://i.imgur.com/user-placeholder.jpeg",
  instructor: "Stephan Mark",
  impactRate: "93%",
  courseTags: ["Business", "Intermediate"],
  features: [
    "Duration: 20 minutes",
    "Business category course",
    "Learn core fundamentals",
  ],
  enrolled: false,
};

const CourseCard = ({ course }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.cardWrapper}>
      <a href={`/courses/${course.course_id}`} className={styles.card}>
        <div className={styles.cardThumbnail}>
          <img
            src={course.thumbnail}
            alt={course.title}
            className={styles.thumbnailImage}
          />
          <div className={styles.thumbnailOverlay}></div>
          <span className={styles.favoriteTag}>★ Learner's Favorite</span>
          <span className={styles.levelTag}>{course.level}</span>
          {/* --- Renders only if enrolled --- */}
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
                src={course.instructorImage}
                alt={course.instructor}
                width={24}
                height={24}
                className={styles.instructorImage}
              />
              <span>{course.instructor}</span>
            </div>
            <div className={styles.dateInfo}>
              <Calendar size={14} />
              <span>{formatDate(course.updatedAt)}</span>
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
                Impact: <b>{course.impactRate}</b>
              </span>
            </div>
          </div>

          {/* --- This overlay now has two states --- */}
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
