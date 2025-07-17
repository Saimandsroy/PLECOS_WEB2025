import InstructorGrid from './components/InstructorGrid';
import CourseGrid from './components/CourseGrid';
import ShortsGrid from './components/ShortsGrid';
import FilterTabWrapper from './components/FilterTabWrapper';
import ExploreVideos from './components/ExploreVideos';
import { videoData } from '@/demo/videos';
import { featuredInstructors } from '@/demo/educator';
import { popularCourses } from '@/demo/courses';
import { trendingShorts } from '@/demo/shorts';
import './page.css';

export default function ExplorePage() {
    return (
        <div className="explore-page">
            {/* <HeaderWrapper /> */}
            <FilterTabWrapper />
            {/* <CategoryGrid categories={categories} /> */}
            {/* All */}
            <ShortsGrid trendingShorts={trendingShorts} />
            <ExploreVideos videoData={videoData} />
            <InstructorGrid featuredInstructors={featuredInstructors} />
            <CourseGrid popularCourses={popularCourses} />
            {/* Videos */}

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
            {/* Courses */}
            {/* Instructors */}
        </div>
    );
}
