"use client";

import { useState, useEffect } from "react";
import styles from "./CoursesSection.module.css";
import CourseCard from "./CourseCard";
import { api } from "@/api/axios";
import { useSession } from "next-auth/react";

const CoursesSection = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching courses for educator:", session);
      if(!session || !session.user) {
        console.log("Session is undefined");
        setLoading(false);
        return;
      }
      const educatorId =
        session?.user?.id;
      const res = await api.get(`/courses/educator/${educatorId}`);
      console.log("Fetched courses:", res.data.data);
      setContent(res.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) return <div className={styles.loading}>Loading...</div>;
    return (
      <div className={styles.grid}>
        {content.map((course) => (
          <CourseCard key={course.course_id} course={course} />
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
