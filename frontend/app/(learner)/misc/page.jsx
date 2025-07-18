"use client"
import React, { useState } from 'react';
import Tabs from '@/components/misc/Tabs';
import VideoCard from '@/components/profile/VideoCard';
import CoursesGrid from '@/components/misc/CoursesGrid';
import ShortsRow from '@/components/misc/ShortsRow';
import PostsList from '@/components/misc/PostsList';
import thumb from "@/public/logo.png";
import { useRouter } from 'next/navigation';

const coursesData = [
    {
        title: "React for Beginners",
        description: "Learn React from scratch with hands-on projects.",
        lessons: 24,
        duration: "8h 30m",
        thumbnail: thumb,
    },
    {
        title: "Advanced JavaScript",
        description: "Deep dive into ES6+, async, and advanced JS concepts.",
        lessons: 18,
        duration: "6h 10m",
        thumbnail: thumb,
    },
];

const shortsData = [
    {
        title: "React useState in 60s",
        views: "120K",
        timeAgo: "2 weeks ago",
        duration: "0:59",
        thumbnail: thumb,
    },
    {
        title: "JS Arrow Functions Explained",
        views: "98K",
        timeAgo: "1 month ago",
        duration: "0:45",
        thumbnail: thumb,
    },
];

const postsData = [
    {
        title: "How to stay motivated while learning to code?",
        author: "Priya Sharma",
        timeAgo: "3 days ago",
        content: "Share your tips and experiences for staying consistent in your coding journey.",
    },
    {
        title: "Best resources for mastering React?",
        author: "Amit Verma",
        timeAgo: "1 week ago",
        content: "What are your favorite tutorials, books, or courses for React?",
    },
];

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('learn');
    const router = useRouter();

    return (
        <div>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'learn' && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: 24,
                    }}
                >
                    {videoData.map((video, idx) => (
                        <div
                            key={video.id}
                            onClick={() => router.push(`/video/${video.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <VideoCard {...video} logo={thumb} />
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'courses' && <CoursesGrid courses={coursesData} logo={thumb} />}
            {activeTab === 'shorts' && <ShortsRow shorts={shortsData} logo={thumb} />}
            {activeTab === 'posts' && <PostsList posts={postsData} logo={thumb} />}
        </div>
    );
};

export default HomePage;