"use client"
import React, { useState } from 'react'
import CoursesTabs from './components/CoursesTabs'
import CoursesGrid from './components/CoursesGrid'

const CoursesPage = () => {
  const [tab, setTab] = useState('structured')

  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>Courses</h2>
      <CoursesTabs tab={tab} setTab={setTab} />
      <div style={{ marginTop: 24 }}>
        {tab === 'structured' && <CoursesGrid />}
        {tab === 'videos' && <div>Videos content here</div>}
        {tab === 'docs' && <div>Docs content here</div>}
      </div>
    </div>
  )
}

export default CoursesPage