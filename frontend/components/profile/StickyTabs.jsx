"use client"
import React, { forwardRef } from 'react';
import './StickyTabs.css';

const StickyTabs = forwardRef(({ activeTab, setActiveTab, className, tabs }, ref) => (
    <div ref={ref} className={`sticky-tabs ${className || ''}`}>
        {tabs.map((tab, idx) => (
            <button
                key={tab}
                className={`sticky-tabs__tab${activeTab === idx ? ' sticky-tabs__tab--active' : ''}`}
                onClick={() => setActiveTab(idx)}
            >
                {tab}
            </button>
        ))}
    </div>
));

export default StickyTabs;