'use client';

import { useSearchParams } from 'next/navigation';
import StructuredCourseCard from '@/components/courses/StructuredCourseCard';
import InstructorCard from '@/components/InstructorCard';
import VideoCard from '@/components/profile/VideoCard';
import { popularCourses } from '@/demo/courses';
import { featuredInstructors } from '@/demo/educator';
import { videoDataPage } from '@/demo/videoPage';
import thumb from "@/public/logo.png";
import './SearchResultsPage.css';

// Mock shorts data
const mockShorts = [
    { id: 1, title: "Shorts: Learn React in 1 Minute", views: 12000 },
    { id: 2, title: "Shorts: Next.js Quick Tips", views: 9500 },
    { id: 3, title: "Shorts: CSS Tricks", views: 8000 },
];

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());

    // Mock filtered shorts
    const filteredShorts = mockShorts.filter(short =>
        !query.search || short.title.toLowerCase().includes(query.search.toLowerCase())
    );

    // Mock filtered videos
    const filteredVideos = videoDataPage.slice(0, 2); // Just show 2 mock videos

    // Mock filtered courses
    const filteredCourses = popularCourses.slice(0, 2);

    // Mock filtered instructors
    const filteredInstructors = featuredInstructors.slice(0, 2);

    // Combine all results except shorts
    const results = [
        ...filteredVideos.map(video => ({ type: 'video', data: video })),
        ...filteredCourses.map(course => ({ type: 'course', data: course })),
        ...filteredInstructors.map(instructor => ({ type: 'instructor', data: instructor })),
    ];

    return (
        <div className="search-results-page">
            {/* <h2 className="search-results-heading">Search Results</h2>
            <div className="search-query-bar">
                <strong>Query:</strong>
                <pre>{JSON.stringify(query, null, 2)}</pre>
            </div> */}
            <h3 className="search-shorts-heading">Shorts</h3>
            <div className="search-shorts-grid">
                {filteredShorts.length === 0 ? (
                    <div className="search-no-results">No shorts found.</div>
                ) : (
                    filteredShorts.map(short => (
                        <div className="search-short-card" key={short.id}>
                            <VideoCard title={short.title} views={short.views} logo={thumb} isShort={true} />
                        </div>
                    ))
                )}
            </div>
            <div className="search-results-list">
                {results.length === 0 ? (
                    <div className="search-no-results">No results found.</div>
                ) : (
                    results.map((item, idx) => (
                        <div className="search-result-row" key={item.type + '-' + (item.data.id || idx)}>
                            {item.type === 'video' && (
                                <VideoCard {...item.data} logo={thumb} />
                            )}
                            {item.type === 'course' && (
                                <StructuredCourseCard course={item.data} isPro={true} isEnr={true} />
                            )}
                            {item.type === 'instructor' && (
                                <InstructorCard instructor={item.data} />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}