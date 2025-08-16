'use client';
import React, { useState } from "react";
import { useEffect } from "react";
import CourseTitle from "./CourseTitle";
import CourseBanner from "./CourseBanner";
import CourseOverview from "./CourseOverview";
import CourseContent from "./CourseContent";
import AboutInstructor from "./AboutInstructor";
import CourseReview from "./CourseReview";
import "./CourseClient.css";
import { api } from "@/api/axios";


const tabs = [
  { key: "overview", label: "Course Overview" },
  { key: "content", label: "Course Content" },
  { key: "instructor", label: "About Instructor" },
  { key: "reviews", label: "Reviews" },
];


export default function CourseClient({ courseID }) {
  const [tab, setTab] = useState("overview");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await api.get(`/courses/${courseID}`);
      setCourse(response.data.data);
    };
    fetchCourse();
  }, [courseID]);

  if (!course) return <div style={{ textAlign: "center", marginTop: 50 }}>Loading...</div>;
  return (
    <div>
      {/* <CourseTitle title={course.title} /> */}
      <CourseBanner course={course} />
      <div className="navigation-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          borderBottom: "1px solid var(--border-color)",
          paddingTop: 12,
          paddingBottom: 12,
          marginBottom: 24,
          marginTop: 24
          , padding:"0 100px"
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
