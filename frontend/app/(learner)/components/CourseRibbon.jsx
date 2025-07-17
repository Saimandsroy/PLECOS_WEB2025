"use client";

import { useRef } from "react";
import { Users, Clock, Star, Play } from "lucide-react";
import "./CourseGrid.css";
import "./Carousel.css";


export default function CourseRibbon({ title, popularCourses }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="explore-courses">
      <div className="explore-courses-header">
        <h2 className="explore-courses__title">
          <Play size={28} />
          {title || "Popular Courses"}
        </h2>
        <a href="/PopularCourses" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="carousel-wrapper">
        <button className="scroll-btn left" onClick={() => scroll('left')}>&#10094;</button>

        <div className="carousel" ref={scrollRef}>
          {popularCourses.map((course) => (
            <div key={course.id} className="explore-courses__card">
              <div className="explore-courses__banner">
                <div className="explore-courses__thumbnail">
                  {course.thumbnail}
                </div>
                <div className="explore-courses__price">{course.price}</div>
              </div>

              <div className="explore-courses__info">
                <div className="explore-courses__tags">
                  <span className="explore-courses__category">
                    {course.category}
                  </span>
                  <span
                    className={`explore-courses__level explore-courses__level--${course.level.toLowerCase()}`}
                  >
                    {course.level}
                  </span>
                </div>

                <h3 className="explore-courses__name">{course.title}</h3>
                <p className="explore-courses__instructor">
                  By {course.instructor}
                </p>

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
        <button className="scroll-btn right" onClick={() => scroll('right')}>&#10095;</button>

      </div>
    </section>
  );
}
