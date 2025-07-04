'use client';

import { useState, useEffect } from 'react';
import styles from './CourseSection.module.css';

const CoursesSection = () => {
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
        thumbnail: '/api/placeholder/300/200',
        title: 'Complete JavaScript Fundamentals for Modern Web Development',
        instructor: 'Sarah Johnson',
        instructorImage: '/api/placeholder/40/40',
        level: 'Level 1',
        courseType: 'Interactive',
        rating: 4.8,
        viewCount: 15420,
        impactRate: 95,
        enrolled: false
      },
      {
        id: 2,
        thumbnail: '/api/placeholder/300/200',
        title: 'Advanced React Patterns and Performance Optimization',
        instructor: 'Mike Chen',
        instructorImage: '/api/placeholder/40/40',
        level: 'Level 3',
        courseType: 'Project-Based',
        rating: 4.9,
        viewCount: 8930,
        impactRate: 92,
        enrolled: true
      },
      {
        id: 3,
        thumbnail: '/api/placeholder/300/200',
        title: 'Full-Stack Development with Next.js',
        instructor: 'Emma Davis',
        instructorImage: '/api/placeholder/40/40',
        level: 'Level 2',
        courseType: 'Hands-on',
        rating: 4.7,
        viewCount: 12340,
        impactRate: 89,
        enrolled: false
      },
      {
        id: 4,
        thumbnail: '/api/placeholder/300/200',
        title: 'Database Design and SQL Mastery',
        instructor: 'David Wilson',
        instructorImage: '/api/placeholder/40/40',
        level: 'Level 2',
        courseType: 'Theory',
        rating: 4.6,
        viewCount: 9870,
        impactRate: 87,
        enrolled: false
      }
    ],
    videos: [
      {
        id: 1,
        thumbnail: '/api/placeholder/300/200',
        title: 'Introduction to Machine Learning Algorithms',
        instructor: 'Dr. Alex Rodriguez',
        duration: '45:30',
        viewCount: 23400,
      },
      {
        id: 2,
        thumbnail: '/api/placeholder/300/200',
        title: 'CSS Grid vs Flexbox: When to Use What',
        instructor: 'Lisa Thompson',
        duration: '28:15',
        viewCount: 18200,
      },
      {
        id: 3,
        thumbnail: '/api/placeholder/300/200',
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
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setContent(mockData[activeTab]);
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCourseTypeColor = (type) => {
    const colors = {
      'Interactive': '#4CAF50',
      'Project-Based': '#2196F3',
      'Hands-on': '#FF9800',
      'Theory': '#9C27B0'
    };
    return colors[type] || '#757575';
  };

  const formatViewCount = (count) => {
  if (typeof count !== 'number' || isNaN(count)) return '0';
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

  const renderStructuredCourseCard = (course) => (
    <div key={course.id} className={styles.card}>
      <div className={styles.cardThumbnail}>
        <img src={course.thumbnail} alt={course.title} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <div className={styles.instructorInfo}>
          <img src={course.instructorImage} alt={course.instructor} className={styles.instructorImage} />
          <span className={styles.instructorName}>{course.instructor}</span>
        </div>
        <div className={styles.courseInfo}>
          <span className={styles.level}>{course.level}</span>
          <span 
            className={styles.courseType}
            style={{ backgroundColor: getCourseTypeColor(course.courseType) }}
          >
            {course.courseType}
          </span>
        </div>
        <div className={styles.courseStats}>
          <span className={styles.rating}>★ {course.rating}</span>
          <span className={styles.viewCount}>{formatViewCount(course.viewCount)} views</span>
        </div>
        <div className={styles.impactRate}>
          <span>Impact Rate: {course.impactRate}%</span>
        </div>
        <button className={`${styles.actionButton} ${course.enrolled ? styles.continueButton : styles.enrollButton}`}>
          {course.enrolled ? 'Continue' : 'Enroll'}
        </button>
      </div>
    </div>
  );

  const renderVideoCard = (video) => (
    <div key={video.id} className={styles.card}>
      <div className={styles.cardThumbnail}>
        <img src={video.thumbnail} alt={video.title} />
        <div className={styles.duration}>{video.duration}</div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        <div className={styles.instructorInfo}>
          <span className={styles.instructorName}>{video.instructor}</span>
        </div>
        <div className={styles.courseStats}>
          <span className={styles.viewCount}>{formatViewCount(video.viewCount)} views</span>
        </div>
        <button className={styles.actionButton}>Watch</button>
      </div>
    </div>
  );

  const renderDocumentCard = (doc) => (
    <div key={doc.id} className={styles.documentCard}>
      <div className={styles.documentInfo}>
        <h3 className={styles.documentTitle}>{doc.title}</h3>
        <div className={styles.documentMeta}>
          <span className={styles.documentType}>{doc.type}</span>
          <span className={styles.uploadedBy}>by {doc.uploadedBy}</span>
          <span className={styles.downloads}>{formatViewCount(doc.downloads)} downloads</span>
        </div>
      </div>
      <button className={styles.actionButton}>
        {doc.type === 'PDF' ? 'Download' : 'View'}
      </button>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (activeTab === 'structured') {
      return (
        <div className={styles.grid}>
          {content.map(renderStructuredCourseCard)}
        </div>
      );
    }

    if (activeTab === 'videos') {
      return (
        <div className={styles.grid}>
          {content.map(renderVideoCard)}
        </div>
      );
    }

    if (activeTab === 'docs') {
      return (
        <div className={styles.documentGrid}>
          {content.map(renderDocumentCard)}
        </div>
      );
    }
  };

  return (
    <div className={styles.coursesSection}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'structured' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('structured')}
        >
          📘 Structured Courses
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'videos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          🎞️ Videos
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'docs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          📄 Docs & Notes
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filtersRow}>
          <select
            value={filters.domain}
            onChange={(e) => handleFilterChange('domain', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Domains</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="devops">DevOps</option>
          </select>

          <select
            value={filters.subdomain}
            onChange={(e) => handleFilterChange('subdomain', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Subdomains</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="databases">Databases</option>
          </select>

          <select
            value={filters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {activeTab === 'structured' && (
            <select
              value={filters.courseType}
              onChange={(e) => handleFilterChange('courseType', e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Types</option>
              <option value="interactive">Interactive</option>
              <option value="project-based">Project-Based</option>
              <option value="hands-on">Hands-on</option>
              <option value="theory">Theory</option>
            </select>
          )}

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default CoursesSection;