import { useState } from "react";
import EducatorRibbon from './EducatorRibbon';

const educatorCategories = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'data', label: 'Data Science' },
];

const EducatorGrid = ({ featuredInstructors }) => {
    const [activeCategory, setActiveCategory] = useState(educatorCategories[0].id);

    // Filter instructors by category
    const filteredInstructors = featuredInstructors.filter(
        instructor => instructor.category === activeCategory
    );

    return (
        <>
            <div className="explore-category-tabs">
                {educatorCategories.map(cat => (
                    <EducatorRibbon key={cat.id} featuredInstructors={featuredInstructors} title={cat.lab} />

                ))}
            </div>
        </>
    );
};

export default EducatorGrid;