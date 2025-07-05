'use client';

import styles from './CourseFilters.module.css';

const CourseFilters = ({ filters, onFilterChange, showCourseType }) => {
  return (
    <div className={styles.filtersBar}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filtersRow}>
        <select
          value={filters.domain}
          onChange={(e) => onFilterChange('domain', e.target.value)}
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
          onChange={(e) => onFilterChange('subdomain', e.target.value)}
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
          onChange={(e) => onFilterChange('level', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {showCourseType && (
          <select
            value={filters.courseType}
            onChange={(e) => onFilterChange('courseType', e.target.value)}
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
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilters;
