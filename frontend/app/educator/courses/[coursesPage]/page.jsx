import CourseClient from "@/components/courses/coursesPage/CourseClient";

export default async function CoursePage({ params }) {
  const { coursesPage } = await params;
  return <CourseClient courseID={coursesPage} />;
}

