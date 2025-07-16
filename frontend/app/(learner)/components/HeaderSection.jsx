// components/explore/HeaderSection.jsx
'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import './HeaderSection.css';

export default function HeaderSection({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) {
  return (
    <div className="explore-header">
      <div className="explore-header__container">
        <div className="explore-header__top">
          <div>
            <h1 className="explore-header__title">Explore Learning</h1>
            <p className="explore-header__subtitle">
              Discover top instructors, courses, and trending content
            </p>
          </div>
          <div className="explore-header__icon-wrapper">
            <TrendingUp size={32} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
