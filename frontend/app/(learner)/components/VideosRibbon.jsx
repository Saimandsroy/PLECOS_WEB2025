"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, Play } from "lucide-react";
import "./ExploreVideos.css";
import "./Carousel.css";

export default function VideosRibbon({ videoData }) {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    if (!carousel || !wrapper) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setShowLeftArrow(scrollLeft > 1);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    setTotalPages((prev) =>
      Math.ceil(scrollWidth / clientWidth) !== prev
        ? Math.ceil(scrollWidth / clientWidth)
        : prev
    );
    setCurrentPage((prev) =>
      Math.round(scrollLeft / clientWidth) !== prev
        ? Math.round(scrollLeft / clientWidth)
        : prev
    );
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || videoData.length === 0) return;
    checkScrollPosition();
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(carousel);
    carousel.addEventListener("scroll", checkScrollPosition);
    return () => {
      if (carousel) {
        resizeObserver.unobserve(carousel);
        carousel.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [checkScrollPosition, videoData]);

  const scroll = (direction) => {
    if (wrapperRef.current) {
      const scrollAmount = wrapperRef.current.clientWidth * 0.8;
      carouselRef.current?.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToPage = (pageIndex) => {
    if (wrapperRef.current && carouselRef.current) {
      carouselRef.current.scrollTo({
        left: pageIndex * wrapperRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnter = (videoId) => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredCardId(videoId), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setHoveredCardId(null);
  };

  return (
    <section className="explore-video-section">
      <div className="explore-video-section-header">
        <h2>Top Learning Videos</h2>
        <a href="/videos" className="see-more">
          See more &gt;
        </a>
      </div>

      <div
        className="carousel-wrapper"
        ref={wrapperRef}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`scroll-btn left ${!showLeftArrow ? "hidden" : ""}`}
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={28} />
        </button>

        <div className="carousel" ref={carouselRef}>
          {videoData.map((video) => (
            <div
              className={`explore-video-card ${
                hoveredCardId === video.id ? "active" : ""
              }`}
              key={video.id}
              onMouseEnter={() => handleMouseEnter(video.id)}
            >
              <div className="thumbnail-wrapper">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                />
                <span className="watermark">PLECOS</span>
              </div>
              <div className="explore-video-info">
                <h3 className="video-title">{video.title}</h3>
                <div className="expanded-content">
                  <p className="instructor-name">By {video.instructor}</p>
                  <div className="tag-list">
                    {video.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="watch-now-button">Watch Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`scroll-btn right ${!showRightArrow ? "hidden" : ""}`}
          onClick={() => scroll("right")}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="nav-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`dot ${currentPage === index ? "active" : ""}`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
