"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import StructuredCourseCard from "@/components/courses/StructuredCourseCard";
import CourseCard from "@/components/courses/CourseCard";
import "./CourseRibbon.css"; // Using the new dedicated CSS file

export default function CourseRibbon({ title, popularCourses }) {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const updateCarouselState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    setIsAtStart(el.scrollLeft < 1);
    const isEnd = Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 1;
    setIsAtEnd(isEnd);

    if (el.clientWidth > 0) {
      const calculatedTotalPages = Math.ceil(el.scrollWidth / el.clientWidth);
      if (totalPages !== calculatedTotalPages) {
        setTotalPages(calculatedTotalPages);
      }

      const calculatedCurrentPage = Math.round(el.scrollLeft / el.clientWidth);
      if (currentPage !== calculatedCurrentPage) {
        setCurrentPage(calculatedCurrentPage);
      }
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !popularCourses || popularCourses.length === 0) return;

    updateCarouselState();

    const resizeObserver = new ResizeObserver(updateCarouselState);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", updateCarouselState, { passive: true });

    return () => {
      resizeObserver.unobserve(carousel);
      carousel.removeEventListener("scroll", updateCarouselState);
    };
  }, [popularCourses, updateCarouselState]);

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.9;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const goToPage = (pageIndex) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: pageIndex * el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="course-ribbon">
      <div className="course-ribbon-header">
        <h2 className="course-ribbon__title">
          <Play size={28} />
          {title || "Popular Courses"}
        </h2>
        <a href="/PopularCourses" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="carousel-container">
        <button
          className={`carousel-arrow left ${isAtStart ? "hidden" : ""}`}
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          &#10094;
        </button>

        <div className="carousel" ref={carouselRef}>
          {popularCourses.map((course) => (
            <div className="carousel-item" key={course.course_id}>
              <CourseCard course={course} isPro={true} />
            </div>
          ))}
        </div>

        <button
          className={`carousel-arrow right ${isAtEnd ? "hidden" : ""}`}
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          &#10095;
        </button>
      </div>

      {totalPages > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentPage === idx ? "active" : ""}`}
              onClick={() => goToPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
