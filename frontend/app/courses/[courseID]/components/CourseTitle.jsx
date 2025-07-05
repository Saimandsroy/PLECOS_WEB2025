'use client';
import React from 'react';
import './CourseTitle.css';

export default function CourseTitle({ title = "Course Title Placeholder" }) {
  return (
    <div className="course-title-bar">
      <h1 className="course-title">{title}</h1>
    </div>
  );
}
