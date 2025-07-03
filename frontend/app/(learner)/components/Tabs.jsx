import React, { useRef, useEffect, useState } from 'react';
import './Tabs.css';

const tabList = [
    { key: 'learn', label: 'Learn' },
    { key: 'courses', label: 'Courses' },
    { key: 'shorts', label: 'Shorts' },
    { key: 'posts', label: 'Posts' },
];

const Tabs = ({ activeTab, onTabChange }) => {
    const [isSticky, setIsSticky] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([e]) => setIsSticky(e.intersectionRatio < 1),
            { threshold: [1] }
        );
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }
        return () => {
            if (sentinelRef.current) observer.unobserve(sentinelRef.current);
        };
    }, []);

    return (
        <>
            <div ref={sentinelRef} style={{ height: 0 }} />
            <div className={`le-ho-tabs-wrapper${isSticky ? ' sticky-bg' : ''}`}>
                {tabList.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`le-ho-tabs-button ${activeTab === tab.key ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Tabs;