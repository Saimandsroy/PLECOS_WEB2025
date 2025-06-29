// components/explore/HeaderSection.jsx
'use client';

import React from 'react';
import { TrendingUp, LayoutDashboard } from 'lucide-react';
import './HeaderSection.css';

export default function HeaderSection({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) {
    return (
        <div className="explore-header">
            <div className="explore-header__container">
                <div className="explore-header__top">
                    <div>
                        <h1 className="explore-header__title">Learning Space</h1>
                        <p className="explore-header__subtitle">
                            Track. Learn. Grow – All in One Place.
                        </p>
                    </div>
                    <div className="explore-header__icon-wrapper">
                        <LayoutDashboard size={32} color="white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
