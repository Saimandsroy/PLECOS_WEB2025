'use client';
import React from 'react';
import './FilterTabs.css';

export default function FilterTabs({ filters, activeFilter, setActiveFilter }) {
  console.log("hello")
  const handleClick = (filterId) => {
    console.log(`Filter clicked: ${filterId}`);
    setActiveFilter(filterId);
  };

  console.log(setActiveFilter)
  return (
    <div className="explore-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleClick(filter.id)}
          className={`explore-filters__button ${activeFilter === filter.id ? 'explore-filters__button--active' : ''}`}
        >
          {filter.label}
          <span className="explore-filters__count">
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}
