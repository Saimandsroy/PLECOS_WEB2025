"use client";
import React from "react";
import "./CourseOverview.css";

const CourseOverview = () => {
  return (
    <div className="overview-container glass-card">
      <h2 className="section-heading">What You’ll Learn</h2>
      <ul className="learning-list">
        <li>Understand the core concepts of Machine Learning</li>
        <li>Differentiate between supervised and unsupervised learning</li>
        <li>Build and evaluate simple ML models</li>
        <li>Apply ML to real-world scenarios</li>
      </ul>

      <div className="course-info-cards">
        <div className="info-card">
          <h3>Prerequisites</h3>
          <p>Basic knowledge of programming and high school mathematics.</p>
        </div>
        <div className="info-card">
          <h3>Ideal For</h3>
          <p>Beginners, students, and working professionals starting with ML.</p>
        </div>
        <div className="info-card">
          <h3>Outcomes</h3>
          <p>Grasp ML basics and prepare for intermediate-level projects.</p>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
