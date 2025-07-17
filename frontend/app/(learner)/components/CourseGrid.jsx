import { useState } from "react";
import CourseRibbon from './CourseRibbon';

const courseCategories = [
    { id: 'web', label: 'Web Development' },
    { id: 'data', label: 'Data Science' },
    { id: 'design', label: 'Design' },
];

const CourseGrid = ({ popularCourses }) => {
    const [activeCategory, setActiveCategory] = useState(courseCategories[0].id);

    // Filter courses by category
    const filteredCourses = popularCourses.filter(
        course => course.category === activeCategory
    );

    return (
        <>
            <div className="explore-category-tabs">
                {courseCategories.map(cat => (
                    <CourseRibbon key={cat.id} popularCourses={popularCourses} title={cat.label} />
                ))}
            </div>
        </>
    );
};

export default CourseGrid;