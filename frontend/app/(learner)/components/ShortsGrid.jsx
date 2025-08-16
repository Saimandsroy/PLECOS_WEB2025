"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Video } from "lucide-react";
import "./HomeShortsGrid.css";

export default function ShortsGrid({ trendingShorts }) {
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
    if (!carousel || !trendingShorts || trendingShorts.length === 0) return;

    updateCarouselState();

    const resizeObserver = new ResizeObserver(updateCarouselState);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", updateCarouselState, { passive: true });

    return () => {
      resizeObserver.unobserve(carousel);
      carousel.removeEventListener("scroll", updateCarouselState);
    };
  }, [trendingShorts, updateCarouselState]);

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
    <section className="home-shorts-grid">
      <div className="home-shorts-grid-header">
        <h2 className="home-shorts-grid__title">
          <Video size={28} />
          Trending Shorts
        </h2>
      </div>

      <div className="home-carousel-container">
        <button
          className={`home-carousel-arrow left ${isAtStart ? "hidden" : ""}`}
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
        >
          &#10094;
        </button>

        <div className="home-carousel" ref={carouselRef}>
          {trendingShorts.map((short) => (
            <div className="home-carousel-item" key={short.id}>
              <div className="home-shorts-card">
                <div className="home-shorts-thumbnail">
                  <img src={short.thumbnail} alt={short.title} />
                  <div className="home-shorts-duration">{short.duration}</div>
                </div>
                <div className="home-shorts-info">
                  <h3 className="home-shorts-title">{short.title}</h3>
                  <span className="home-shorts-views">{short.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`home-carousel-arrow right ${isAtEnd ? "hidden" : ""}`}
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
        >
          &#10095;
        </button>
      </div>

      {totalPages > 1 && (
        <div className="home-carousel-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`home-dot ${currentPage === idx ? "active" : ""}`}
              onClick={() => goToPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
