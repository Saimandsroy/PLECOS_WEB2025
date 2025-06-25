import React from 'react'
import CourseCard from './CourseCard'

const courses = [
  {
    title: 'Introduction to Web Development',
    desc: 'Learn the basics of HTML, CSS, and JavaScript',
    progress: 65,
    lessons: 20,
    completed: 13
  },
  {
    title: 'Data Science Fundamentals',
    desc: 'Master Python, statistics, and data visualization',
    progress: 30,
    lessons: 20,
    completed: 6
  },
  {
    title: 'UX Design Principles',
    desc: 'Create user-centered digital experiences',
    progress: 10,
    lessons: 20,
    completed: 2
  },
  {
    title: 'Digital Marketing Strategy',
    desc: 'Develop effective online marketing campaigns',
    progress: 0,
    lessons: 15,
    completed: 0
  }
]

const CoursesGrid = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 24
  }}>
    {courses.map((c, i) => (
      <CourseCard key={i} {...c} />
    ))}
  </div>
)

export default CoursesGrid