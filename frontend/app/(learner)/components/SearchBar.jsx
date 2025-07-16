'use client';
import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="explore-search">
      <div className="explore-search__icon">
        <Search size={20} color="#666" />
      </div>
      <input
        type="text"
        className="explore-search__input"
        placeholder="Search courses, instructors, topics..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
