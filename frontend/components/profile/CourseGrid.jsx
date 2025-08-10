// components/profile/CourseGrid.jsx
import React from 'react';
import CourseCard from '@/components/courses/CourseCard';
import './CourseGrid.css';

const CourseGrid = ({ courses, loading = false }) => {
    if (loading && courses.length === 0) {
        return (
            <div className="course-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="course-card-skeleton">
                        <div className="course-thumbnail-skeleton"></div>
                        <div className="course-info-skeleton">
                            <div className="skeleton-line skeleton-line--title"></div>
                            <div className="skeleton-line skeleton-line--subtitle"></div>
                            <div className="skeleton-line skeleton-line--price"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="course-grid">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
            {loading && (
                <div className="loading-more">
                    <div className="loading-spinner"></div>
                    <p>Loading more courses...</p>
                </div>
            )}
        </div>
    );
};

export default CourseGrid;
