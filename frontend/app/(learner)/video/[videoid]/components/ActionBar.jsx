"use client";
import React, { useState } from "react";
import { Star, Bookmark, Download, MessageCircle, Flag } from "lucide-react";
import styles from "./ActionBar.module.css";

const FilledStar = ({ size = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2.25l3.093 6.271 6.907.993-5 4.873 1.181 6.886L12 17.77l-6.181 3.503L7 14.387l-5-4.873 6.907-.993L12 2.25z" />
  </svg>
);

const ActionBar = ({ rating = 0, ratingCount = 0 }) => {
  const [userRating, setUserRating] = useState(0);

  const handleRate = (value) => {
    setUserRating(value === userRating ? 0 : value);
    // send to backend
  };

  const renderStars = () =>
    [...Array(5)].map((_, idx) => {
      const value = idx + 1;
      const filled = (userRating || rating) >= value;
      return (
        <button
          key={value}
          onClick={() => handleRate(value)}
          className={`${styles.starButton} ${filled ? styles.filled : ""}`}
          aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
        >
          {filled ? <FilledStar /> : <Star size={18} />}
        </button>
      );
    });

  return (
    <div className={styles.actionBar}>
      <div className={styles.ratingGroup}>
        {renderStars()}
        <span className={styles.ratingValue}>
          {(userRating || rating).toFixed(1)}
          {ratingCount ? ` (${ratingCount})` : ""}
        </span>
      </div>

      <button className={styles.iconBtn}>
        <Bookmark size={18} />
        <span>Save</span>
      </button>
      <button className={styles.iconBtn}>
        <Download size={18} />
        <span>Download</span>
      </button>
      {/* <button className={styles.iconBtn}>
        <MessageCircle size={18} />
        <span>Discuss</span>
      </button> */}
      <button className={styles.iconBtn}>
        <Flag size={18} />
        <span>Report</span>
      </button>
    </div>
  );
};

export default ActionBar;
