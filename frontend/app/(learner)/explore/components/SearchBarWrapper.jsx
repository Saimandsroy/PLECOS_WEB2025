'use client';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
const SearchBarWrapper = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
  return (
    <SearchBar
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  )
}

export default SearchBarWrapper