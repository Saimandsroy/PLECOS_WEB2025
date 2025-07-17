'use client';

import { useState, useEffect } from 'react';
import styles from './CoursesSection.module.css';
import CourseTabs from './CourseTabs';
import CourseFilters from './CourseFilters';
import StructuredCourseCard from './StructuredCourseCard';
import VideoCard from './VideoCard';
import DocumentCard from './DocumentCard';
import Link from 'next/link';


const CoursesSection = ({ isSe = true, isPro = true, isEnr = true }) => {
  const [activeTab, setActiveTab] = useState('structured');
  const [filters, setFilters] = useState({
    search: '',
    domain: '',
    subdomain: '',
    level: '',
    courseType: '',
    sortBy: 'newest'
  });
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different content types
  const mockData = {
    structured: [
      {
        id: 1,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'Complete JavaScript Fundamentals for Modern Web Development',
        instructor: 'Sarah Johnson',
        instructorImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        level: 'Beginner',
        courseType: 'Interactive',
        rating: 4.8,
        viewCount: 15420,
        impactRate: 95,
        enrolled: false
      },
      {
        id: 2,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'Advanced React Patterns and Performance Optimization',
        instructor: 'Mike Chen',
        instructorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        level: 'Advanced',
        courseType: 'Project-Based',
        rating: 4.9,
        viewCount: 8930,
        impactRate: 92,
        enrolled: true,
        progress: 75
      },
      {
        id: 3,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'Full-Stack Development with Next.js',
        instructor: 'Emma Davis',
        instructorImage: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg',
        level: 'Intermediate',
        courseType: 'Hands-on',
        rating: 4.7,
        viewCount: 12340,
        impactRate: 89,
        enrolled: false
      },
      {
        id: 4,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'Database Design and SQL Mastery',
        instructor: 'David Wilson',
        instructorImage: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg',
        level: 'Intermediate',
        courseType: 'Theory',
        rating: 4.6,
        viewCount: 9870,
        impactRate: 87,
        enrolled: false,
      }
    ],
    videos: [
      {
        id: 1,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'Introduction to Machine Learning Algorithms',
        instructor: 'Dr. Alex Rodriguez',
        duration: '45:30',
        viewCount: 23400,
      },
      {
        id: 2,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'CSS Grid vs Flexbox: When to Use What',
        instructor: 'Lisa Thompson',
        duration: '28:15',
        viewCount: 18200,
      },
      {
        id: 3,
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
        title: 'API Design Best Practices',
        instructor: 'James Kumar',
        duration: '52:45',
        viewCount: 16800,
      }
    ],
    docs: [
      {
        id: 1,
        title: 'React Hooks Comprehensive Guide',
        type: 'PDF',
        uploadedBy: 'Sarah Johnson',
        uploadDate: '2024-01-15',
        downloads: 3420
      },
      {
        id: 2,
        title: 'JavaScript ES6+ Features Cheat Sheet',
        type: 'Notes',
        uploadedBy: 'Mike Chen',
        uploadDate: '2024-01-20',
        downloads: 5670
      },
      {
        id: 3,
        title: 'Database Normalization Slides',
        type: 'Slides',
        uploadedBy: 'David Wilson',
        uploadDate: '2024-01-18',
        downloads: 2340
      }
    ]
  };

  useEffect(() => {

    setLoading(true);
    setTimeout(() => {
      setContent(mockData[activeTab]);
      setLoading(false);
    }, 100);
  }, [activeTab]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };


  const renderContent = () => {
    if (loading) return <div className={styles.loading}>Loading...</div>;
    return (
      <div className={styles.grid}>
        {content.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <StructuredCourseCard course={course} isPro={isPro} isEnr={isEnr} />

          </Link>
        ))}
      </div>
    );


    // if (activeTab === 'videos') {
    //   return (
    //     <div className={styles.grid}>
    //       {content.map((video) => (
    //         <VideoCard key={video.id} video={video} />
    //       ))}
    //     </div>
    //   );
    // }

    // if (activeTab === 'docs') {
    //   return (
    //     <div className={styles.documentGrid}>
    //       {content.map((doc) => (
    //         <DocumentCard key={doc.id} doc={doc} />
    //       ))}
    //     </div>
    //   );
    // }

    return null;
  };

  return (
    <div className={styles.coursesSection}>
      {/* <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}
      {/* { isSe && <CourseFilters filters={filters} onFilterChange={handleFilterChange} />} */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default CoursesSection;