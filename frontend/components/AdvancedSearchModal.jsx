'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CourseFilters from './courses/CourseFilters';
import './AdvancedSearchModal.css';

const defaultFilters = {
    search: '',
    domain: '',
    subdomain: '',
    level: '',
    courseType: '',
    sortBy: 'newest',
};

const AdvancedSearchModal = ({ open, onClose }) => {
    const [filters, setFilters] = useState(defaultFilters);
    const modalRef = useRef(null);
    const router = useRouter();

    // Close modal when clicking outside
    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    // Handle filter changes
    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    // Handle search action
    const handleSearch = () => {
        // Build query string from filters
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        router.push(`/search?${params.toString()}`);
        onClose();
    };

    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (!open) return null;

    return (
        <div className="advanced-search-modal-overlay">
            <div className="advanced-search-modal" ref={modalRef} tabIndex={-1} onKeyDown={handleKeyDown}>
                <h2>Advanced Search</h2>
                <CourseFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    showCourseType={true}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button onClick={handleSearch} className="modal-search-btn">Search</button>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearchModal;