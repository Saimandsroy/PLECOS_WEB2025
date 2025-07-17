'use client';
import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
const HeaderWrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <HeaderSection
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
    />
  )
}

export default HeaderWrapper