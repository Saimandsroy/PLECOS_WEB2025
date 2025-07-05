'use client';
import React, { useState } from "react";
import CourseTitle from "./components/CourseTitle";
import CourseBanner from "./components/CourseBanner";
import CourseOverview from "./components/CourseOverview";
import CourseContent from "./components/CourseContent";
import AboutInstructor from "./components/AboutInstructor";
import CourseReview from "./components/CourseReview";
import "./page.css";

const tabs = [
  { key: "overview", label: "Course Overview" },
  { key: "content", label: "Course Content" },
  { key: "instructor", label: "About Instructor" },
  { key: "reviews", label: "Reviews" },
];

const courseData = {
  "1": {
    thumbnail: "/course-thumb.jpg",
    title: "Python Programming Essentials",
    summary: "Master Python basics, syntax, and real-world scripting.",
    level: "Beginner",
    duration: "8 hours",
    views: "42K",
  },
  "2": {
    thumbnail: "/course-thumb.jpg",
    title: "Machine Learning with Scikit-Learn",
    summary: "Build models and understand core ML concepts using Python.",
    level: "Intermediate",
    duration: "12 hours",
    views: "35K",
  },
  "3": {
    thumbnail: "/course-thumb.jpg",
    title: "Full Stack Web Development",
    summary: "HTML, CSS, JS, React, Node & MongoDB from scratch.",
    level: "Advanced",
    duration: "18 hours",
    views: "70K",
  },
  "4":{
    thumbnail: '/course-thumb.jpg',
    title: 'Machine Learning Basics (Level 0)',
    summary: 'Learn the fundamentals of machine learning including supervised and unsupervised learning.',
    level: 'Beginner',
    duration: '6 hours',
    views: '21K'
  },
};

export default function CourseClient({ courseID }) {
  const [tab, setTab] = useState("overview");
    const course = courseData[courseID];
    if(!course) return <h2>Course not found!</h2>;
  return (
    <div>
      <CourseTitle title={course.title} />
      <CourseBanner course={course} />
      <h2>Course ID: {courseID}</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          borderBottom: "1px solid var(--border-color)",
          paddingTop: 12,
          paddingBottom: 12,
          marginBottom: 24,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background:
                tab === t.key
                  ? "var(--brand-blue)"
                  : "var(--background-primary)",
              color: tab === t.key ? "#fff" : "var(--text-color)",
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              boxShadow:
                tab === t.key ? "0 2px 8px rgba(30,41,59,0.06)" : "none",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 12 }}>
        {tab === "overview" && <CourseOverview />}
        {tab === "content" && <CourseContent />}
        {tab === "instructor" && <AboutInstructor />}
        {tab === "reviews" && (
          <div className="glass-card" style={{ maxWidth: 820, margin: "0 auto" }}>
            <CourseReview />
          </div>
        )}
      </div>
    </div>
  );
}
