// app/courses/[courseID]/page.jsx

import CourseClient from "./CourseClient";

export default function CoursePage({ params }) {
  const { courseID } = params;
  return <CourseClient courseID={courseID} />;
}
