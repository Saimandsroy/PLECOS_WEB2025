'use client';
import React, { useState } from 'react';
import FilterTabs from './FilterTabs';
const FilterTabWrapper = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const filters = [
    { id: 'all', label: 'All', count: '1.2K+' },
    { id: 'courses', label: 'Courses', count: '450+' },
    { id: 'instructors', label: 'Instructors', count: '120+' },
    { id: 'shorts', label: 'Shorts', count: '680+' }
  ];
  return (
    <FilterTabs
      filters={filters}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
    />
  )
}

export default FilterTabWrapper