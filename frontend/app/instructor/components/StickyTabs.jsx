"use client"
import React from 'react';
import './StickyTabs.css';

const tabs = ['Videos', 'Shorts', 'Posts'];

const StickyTabs = ({ isLight, activeTab, setActiveTab }) => (
    <div className={`sticky-tabs ${isLight ? 'light' : 'dark'}`}>
        {tabs.map((tab, idx) => (
            <button
                key={tab}
                className={`sticky-tabs__tab${activeTab === idx ? ' sticky-tabs__tab--active' : ''} ${isLight ? 'light' : 'dark'}`}
                onClick={() => setActiveTab(idx)}
            >
                {tab}
            </button>
        ))}
    </div>
);

export default StickyTabs;