"use client";
import { useState } from "react";
import CourseRibbon from './components/CourseRibbon';
import ShortsGrid from './components/ShortsGrid';
import VideoCard from '@/components/profile/VideoCard';
import { videoData } from '@/demo/videos';
import { featuredInstructors } from '@/demo/educator';
import { popularCourses } from '@/demo/courses';
import { trendingShorts } from '@/demo/shorts';
import thumb from "@/public/logo.png";
import { videoDataPage } from '@/demo/videoPage';
import './page.css';
import FilterTabs from "./components/FilterTabs";
import VideosRibbon from "./components/VideosRibbon";
import EducatorRibbon from "./components/EducatorRibbon";
import CourseGrid from './components/CourseGrid';
import EducatorGrid from './components/EducatorGrid';
import VideoGrid from './components/VideoGrid';

const filters = [
    { id: 'all', label: 'All', count: '1.2K+' },
    { id: 'tutorials', label: 'Tutorials', count: '680+' },
    { id: 'courses', label: 'Courses', count: '450+' },
    { id: 'educators', label: 'educators', count: '120+' },
];

export default function ExplorePage() {
    const [activeFilter, setActiveFilter] = useState('all');
    return (
        <div className="explore-page">
            <FilterTabs filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            {activeFilter === 'all' && (
                <>
                    <ShortsGrid trendingShorts={trendingShorts} />
                    <VideosRibbon videoData={videoData} />
                    <EducatorRibbon featuredInstructors={featuredInstructors} title="Featured Educators" />
                    <CourseRibbon popularCourses={popularCourses} />
                </>
            )}
            {activeFilter === 'courses' && (
                <CourseGrid popularCourses={popularCourses} />
            )}
            {activeFilter === 'educators' && (
                <EducatorGrid featuredInstructors={featuredInstructors} />
            )}
            {activeFilter === 'tutorials' && (
                <VideoGrid videos={videoDataPage} />
            )}
        </div>
    );
}
