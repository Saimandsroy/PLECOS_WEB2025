import CourseClient from "@/components/courses/coursesPage/CourseClient";

export default async function CoursePage({ params }) {
  const { courseID } = await params;
  return <CourseClient courseID={courseID} />;
}

