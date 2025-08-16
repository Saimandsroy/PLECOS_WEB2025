"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
  Clock,
  Eye,
  BookOpen,
} from "lucide-react";
import "./VideosRibbon.css";

export default function VideosRibbon({ videoData }) {
  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    if (!carousel || !wrapper) return;
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    setShowLeftArrow(scrollLeft > 1);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    setTotalPages(Math.ceil(scrollWidth / clientWidth));
    setCurrentPage(Math.round(scrollLeft / clientWidth));
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

  return (
    <section className="popular-videos-ribbon">
      <div className="popular-videos-ribbon-header">
        <h2>Top Learning Videos</h2>
      </div>

      <div className="popular-carousel-wrapper" ref={wrapperRef}>
        <button
          className={`popular-scroll-btn popular-left ${
            !showLeftArrow ? "popular-hidden" : ""
          }`}
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={30} />
        </button>

        <div className="popular-carousel" ref={carouselRef}>
          {videoData.map((video) => (
            <div key={video.id} className="popular-video-card">
              {/* Thumbnail */}
              <div className="popular-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="popular-thumbnail-overlay">
                  <button className="popular-play-overlay">
                    <Play size={24} />
                  </button>
                </div>
                <div className="popular-duration">
                  <Clock size={12} /> {video.duration}
                </div>
                <div className="popular-watermark">PLECOS</div>
              </div>

              {/* Content */}
              <div className="popular-video-content">
                <h3>{video.title}</h3>
                <p className="popular-instructor">By {video.instructor}</p>

                <div className="popular-stats-row">
                  <div className="popular-stat">
                    <Eye size={14} /> {video.views} views
                  </div>
                  <div className="popular-stat">
                    <BookOpen size={14} /> {video.level}
                  </div>
                  <div className="popular-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < video.rating ? "popular-filled" : ""}
                      />
                    ))}
                    <span>{video.rating}.0</span>
                  </div>
                </div>

                <div className="popular-tags">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="popular-more">
                      +{video.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Watch Now button always at bottom */}
                <button className="popular-watch-btn">
                  <Play size={18} /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`popular-scroll-btn popular-right ${
            !showRightArrow ? "popular-hidden" : ""
          }`}
          onClick={() => scroll("right")}
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="popular-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`popular-dot ${
                currentPage === index ? "popular-active" : ""
              }`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
