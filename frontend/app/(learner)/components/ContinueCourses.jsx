import React from 'react'
import './ContinueCourses.css'

const courses = [
    {
        title: 'Introduction to Web Development',
        progress: 65,
        lessons: 20,
        completed: 13,
    },
    {
        title: 'Data Science Fundamentals',
        progress: 30,
        lessons: 20,
        completed: 6,
    },
]

const ContinueCourses = () => (
    <div style={{ marginBottom: 32 }}>
        <div className="continue-courses-title">
            Continue Learning
        </div>
        <div className="continue-courses-list">
            {courses.map((c, i) => (
                <div className="continue-course-card" key={i}>
                    <div className="continue-course-card-header">
                        {c.title}
                    </div>
                    <div className="continue-course-card-body">
                        <div className="continue-course-progress-label">
                            Progress: {c.progress}%{' '}
                            <span style={{ float: 'right' }}>
                                {c.completed}/{c.lessons} lessons
                            </span>
                        </div>
                        <div className="continue-course-progress-bar-bg">
                            <div
                                className="continue-course-progress-bar"
                                style={{ width: `${c.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default ContinueCourses