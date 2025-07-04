import React from "react";
import "./CoursesGrid.css";

const CoursesGrid = ({ courses, logo }) => (
    <div className="le-courses-grid">
        {courses.map((course, idx) => (
            <div className="le-course-card" key={idx}>
                <img
                    src={course.thumbnail.src ?? course.thumbnail}
                    alt={course.title}
                    className="le-course-thumb"
                />
                <div className="le-course-row">
                    <div className="le-course-logo">
                        <img src={logo.src ?? logo} alt="Logo" />
                    </div>
                    <div>
                        <div className="le-course-title">{course.title}</div>
                        <div className="le-course-desc">{course.description}</div>
                        <div className="le-course-meta">
                            {course.lessons} lessons • {course.duration}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default CoursesGrid;