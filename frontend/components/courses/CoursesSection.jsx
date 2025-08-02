"use client";

import { useState, useEffect } from "react";
import styles from "./CoursesSection.module.css";
import CourseCard from "./CourseCard";
import { popularCourses } from "@/demo/courses";

const CoursesSection = ({ isSe = true, isPro = true, isEnr = true }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setContent(popularCourses);
      setLoading(false);
    }, 100); // Simulated loading delay
  }, []);

  const renderContent = () => {
    if (loading) return <div className={styles.loading}>Loading...</div>;
    return (
      <div className={styles.grid}>
        {content.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isPro={isPro}
            isEnr={isEnr}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.coursesSection}>
      {/* If needed later */}
      {/* <CourseTabs activeTab={...} onTabChange={...} /> */}
      {/* {isSe && <CourseFilters filters={filters} onFilterChange={...} />} */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default CoursesSection;
