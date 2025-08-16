"use client"
import { api } from "@/api/axios";
import CourseCard from "@/components/courses/CourseCard";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      const res = await api.get("/courses");
      setCourses(res.data.data);
    }
    fetchCourses();
  }, []);
  return (
    <div style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      {
        courses.map(course => (
          <CourseCard key={course.course_id} course={course} />
        ))
      }
    </div>
  );
}
