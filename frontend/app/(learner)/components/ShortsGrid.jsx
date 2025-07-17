"use client";
import React, { useRef } from "react";
import { Video, Play } from "lucide-react";
import "./ShortsGrid.css";
import "./Carousel.css";

export default function ShortsGrid({ trendingShorts }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="explore-shorts">
      <div className="explore-shorts__title">
        <h2 className="explore-shorts-title-text">
          <Video size={28} />
          Trending Shorts
        </h2>
        <a href="/TrendingShorts" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="explore-shorts__grid shorts-carousel carousel-wrapper ">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>
        <div className="carousel" ref={carouselRef}>
          {trendingShorts.map((short) => (
            <div key={short.id} className="explore-shorts__card">
              <div className="explore-shorts__banner">
                <div className="explore-shorts__thumbnail">
                  {short.thumbnail}
                </div>

                <div className="explore-shorts__duration">{short.duration}</div>

                <div className="explore-shorts__overlay">
                  <Play size={20} color="white" fill="white" />
                </div>
              </div>

              <div className="explore-shorts__info">
                <div className="explore-shorts__meta">
                  <span className="explore-shorts__category">
                    {short.category}
                  </span>
                  <span className="explore-shorts__views">👁 {short.views}</span>
                </div>
                <h3 className="explore-shorts__title-text">{short.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
