"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import "./EducatorRibbon.css"; // Using a dedicated CSS file
import InstructorCard from "@/components/InstructorCard"; // Assuming this component exists

export default function EducatorRibbon({
  title = "Featured Educators",
  featuredInstructors,
}) {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * A robust function to check the scroll position and update the state
   * for arrow buttons and navigation dots.
   */
  const updateCarouselState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Check if we are at the beginning of the scroll
    setIsAtStart(el.scrollLeft < 1);

    // Check if we are at the end, with a 1px tolerance for rounding errors
    const isEnd = Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 1;
    setIsAtEnd(isEnd);

    // Calculate total pages and current page if the container has a width
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
  }, [totalPages, currentPage]); // Dependencies ensure we don't cause unnecessary re-renders

  // Effect to set up listeners and perform initial check
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || featuredInstructors.length === 0) return;

    // Initial check when component mounts or data changes
    updateCarouselState();

    const resizeObserver = new ResizeObserver(updateCarouselState);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", updateCarouselState, { passive: true });

    return () => {
      resizeObserver.unobserve(carousel);
      carousel.removeEventListener("scroll", updateCarouselState);
    };
  }, [featuredInstructors, updateCarouselState]);

  /**
   * Scrolls the carousel left or right.
   */
  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.9; // Scroll by 90% of the visible width
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  /**
   * Navigates to a specific page when a dot is clicked.
   */
  const goToPage = (pageIndex) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({
      left: pageIndex * el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="educator-ribbon">
      <div className="educator-ribbon-header">
        <h2>{title}</h2>
        <a href="/FeaturedInstructors" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="carousel-container">
        {/* Left Arrow Button */}
        <button
          className={`carousel-arrow left ${isAtStart ? "hidden" : ""}`}
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          &#10094;
        </button>

        {/* The Scrollable Carousel */}
        <div className="carousel" ref={carouselRef}>
          {featuredInstructors.map((instructor) => (
            <div className="carousel-item" key={instructor.id}>
              <InstructorCard instructor={instructor} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          className={`carousel-arrow right ${isAtEnd ? "hidden" : ""}`}
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          &#10095;
        </button>
      </div>

      {/* Navigation Dots */}
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
