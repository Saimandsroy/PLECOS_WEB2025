"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
// Make sure to import your CSS file.
// In a Next.js or Create React App project, you might do:
import "./FilterTabs.css";

// --- SVG Icons for Buttons ---
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function FilterTabs({ filters, activeFilter, setActiveFilter }) {
  // Ref for the scrollable container
  const filtersContainerRef = useRef(null);

  // State to manage the visibility of scroll buttons
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // --- Effect to check scroll state ---
  const checkScrollability = useCallback(() => {
    const container = filtersContainerRef.current;
    if (!container) return;

    // Check if the content overflows the container's width
    const isContentOverflowing = container.scrollWidth > container.clientWidth;
    setIsOverflowing(isContentOverflowing);

    if (isContentOverflowing) {
      // Check if there is content to scroll to the left
      setCanScrollLeft(container.scrollLeft > 0);
      // Check if there is content to scroll to the right
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 1); // -1 for precision
    } else {
      // If not overflowing, hide both buttons
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    const container = filtersContainerRef.current;
    if (!container) return;

    // Initial check
    checkScrollability();

    // Add event listeners for scroll and resize events
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    // Cleanup function to remove event listeners
    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [filters, checkScrollability]); // Rerun effect if the filters or callback change

  // --- Handlers for scroll buttons ---
  const handleScroll = (direction) => {
    const container = filtersContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth / 2; // Scroll by half the visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    // The main wrapper that contains the variables and provides context
    <div className="explore-filters-wrapper">
      {/* Left Scroll Button - Rendered only if overflowing */}
      {isOverflowing && (
        <button
          id="scroll-left"
          className={`scroll-control ${canScrollLeft ? "visible" : ""}`}
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* The scrollable container */}
      <div className="explore-filters" ref={filtersContainerRef}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleClick(filter.id)}
            className={`explore-filters__button ${
              activeFilter === filter.id
                ? "explore-filters__button--active"
                : ""
            }`}
          >
            <span>{filter.label}</span>
            <span className="explore-filters__count">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Right Scroll Button - Rendered only if overflowing */}
      {isOverflowing && (
        <button
          id="scroll-right"
          className={`scroll-control ${canScrollRight ? "visible" : ""}`}
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}
