"use client";

import styles from "./CourseCard.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { ArrowRight, Calendar, CheckCircle, PlayCircle } from "lucide-react";

// Final data structure with the 'enrolled' field
const exampleCourse = {
  id: 1,
  title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025",
  thumbnail: "https://i.imgur.com/Q60y37g.jpeg",
  instructorImage: "https://i.imgur.com/user-placeholder.jpeg",
  instructor: "Stephan Mark",
  level: "Beginner",
  rating: 4.3,
  reviews: 2895,
  impactRate: "93%",
  lastUpdated: "Aug 2025",
  courseTags: ["Cloud", "AWS", "Certification"],
  features: [
    "Fully updated for CLF-C02",
    "Full Practice Exam included",
    "Learn core AWS Fundamentals",
  ],
  enrolled: true, // <-- FINAL FIELD ADDED
};

const CourseCard = ({ course = exampleCourse }) => {
  return (
    <div className={styles.cardWrapper}>
      <a href={`/courses/${course.id}`} className={styles.card}>
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
            {course.courseTags.map((tag, index) => (
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
              <span>{course.lastUpdated}</span>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.ratingInfo}>
              <FaStar className={styles.starIcon} />
              <span>
                <b>{course.rating}</b> ({course.reviews.toLocaleString()}{" "}
                reviews)
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
                  {course.features.map((feature, index) => (
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
