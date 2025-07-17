"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import StructuredCourseCard from '@/components/courses/StructuredCourseCard';
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
              <StructuredCourseCard course={course} isPro={true} isEnr={true} />
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </section>
  );
}
