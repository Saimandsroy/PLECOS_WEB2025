'use client';
import { Users, Clock, Star, Play } from 'lucide-react';
import './CourseGrid.css';

const popularCourses = [
  {
    id: 1,
    title: 'Python for Beginners',
    instructor: 'John Miller',
    learners: '12K',
    rating: 4.8,
    duration: '8 hours',
    level: 'Beginner',
    thumbnail: '🐍',
    price: 'Free',
    category: 'Programming'
  },
  {
    id: 2,
    title: 'Advanced React Development',
    instructor: 'Sarah Wilson',
    learners: '8.5K',
    rating: 4.9,
    duration: '12 hours',
    level: 'Advanced',
    thumbnail: '⚛',
    price: 'Free',
    category: 'Web Development'
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Alex Kumar',
    learners: '15K',
    rating: 4.7,
    duration: '16 hours',
    level: 'Intermediate',
    thumbnail: '📊',
    price: 'Free',
    category: 'Data Science'
  },
  {
    id: 4,
    title: 'Digital Marketing Mastery',
    instructor: 'Lisa Park',
    learners: '9.2K',
    rating: 4.6,
    duration: '10 hours',
    level: 'Beginner',
    thumbnail: '📱',
    price: 'Free',
    category: 'Marketing'
  }
];

export default function CourseGrid() {
  return (
    <section className="explore-courses">
      <h2 className="explore-courses__title">
        <Play size={28} />
        Popular Courses
      </h2>

      <div className="explore-courses__grid">
        {popularCourses.map((course) => (
          <div key={course.id} className="explore-courses__card">
            <div className="explore-courses__banner">
              <div className="explore-courses__thumbnail">{course.thumbnail}</div>
              <div className="explore-courses__price">{course.price}</div>
            </div>

            <div className="explore-courses__info">
              <div className="explore-courses__tags">
                <span className="explore-courses__category">{course.category}</span>
                <span className={`explore-courses__level explore-courses__level--${course.level.toLowerCase()}`}>
                  {course.level}
                </span>
              </div>

              <h3 className="explore-courses__name">{course.title}</h3>
              <p className="explore-courses__instructor">By {course.instructor}</p>

              <div className="explore-courses__meta">
                <div className="explore-courses__details">
                  <div className="explore-courses__icon-group">
                    <Users size={16} color="#666" />
                    <span>{course.learners}</span>
                  </div>
                  <div className="explore-courses__icon-group">
                    <Clock size={16} color="#666" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="explore-courses__rating">
                  <Star size={16} color="#ffd700" fill="#ffd700" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
