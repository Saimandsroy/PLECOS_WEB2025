"use client";

import React, { useState, useEffect } from "react";
import "./CourseBanner.css";

const CourseBanner = ({ course }) => {
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`enrolled-${course.title}`);
    if (stored === "true") {
      setEnrolled(true);
    }
  }, [course.title]);

  const handleEnroll = () => {
    setEnrolling(true);

    setTimeout(() => {
      setEnrolling(false);
      setEnrolled(true);
      localStorage.setItem(`enrolled-${course.title}`, "true");
    }, 2000); // simulate 2 sec loading
  };

  return (
    <div className="course-banner glass-card">
      <img
        src={`${process.env.NEXT_PUBLIC_R2_ENDPOINT}${course.thumbnailUrl}`}
        alt="Course Thumbnail"
        className="course-thumbnail"
      />

      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-summary">{course.description}</p>

        <div className="course-meta">
          <span>Level: {course.level}</span>
          <span>Duration: {course.duration} {course.duration==1?"hour":"hours"}</span>
          <span>Enrolled: {course.studentsEnrolled}</span>
        </div>

        {!enrolled ? (
          <button
            className="enroll-btn"
            onClick={handleEnroll}
            disabled={enrolling}
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        ) : (
          <div>
            <div className="enrolled-success">
              <span className="checkmark">✅</span> Enrolled
            </div>
            <div>
              <h3>Your Progress</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: "100%" }}></div>
              </div>
            </div>
            {/* Just for development time after that remove this button
            <button
              onClick={() => {
                localStorage.removeItem(`enrolled-${course.title}`);
                window.location.reload();
              }}
            > 
              Reset Enrollment
            </button>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBanner;
