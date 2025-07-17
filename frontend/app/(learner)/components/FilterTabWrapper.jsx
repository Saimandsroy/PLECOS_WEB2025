'use client';
import React, { useState } from 'react';
import FilterTabs from './FilterTabs';

// Example data to filter
const allItems = [
  { id: 1, type: 'courses', name: 'React Basics' },
  { id: 2, type: 'courses', name: 'Next.js Advanced' },
  { id: 3, type: 'instructors', name: 'Jane Doe' },
  { id: 4, type: 'shorts', name: 'Quick Tips' },
  { id: 5, type: 'instructors', name: 'John Smith' },
  { id: 6, type: 'shorts', name: '1-Minute JS' },
];

const FilterTabWrapper = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'All', count: '1.2K+' },
    { id: 'courses', label: 'Courses', count: '450+' },
    { id: 'instructors', label: 'Instructors', count: '120+' },
    { id: 'shorts', label: 'Shorts', count: '680+' }
  ];

  // Filter logic
  const filteredItems =
    activeFilter === 'all'
      ? allItems
      : allItems.filter(item => item.type === activeFilter);

  return (
    <>
      <FilterTabs
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="explore-filtered-list">
        {filteredItems.length === 0 ? (
          <div>No items found.</div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="explore-filtered-item">
              {item.name}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default FilterTabWrapper;