// app/courses/[courseID]/page.jsx

import CourseClient from "./CourseClient";

export default async function CoursePage({ params }) {
  const { courseID } = await params;
  return <CourseClient courseID={courseID} />;
}
