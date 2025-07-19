"use client";
import React, { useRef } from "react";
import "./ExploreVideos.css";
import "./Carousel.css";

export default function VideosRibbon({ videoData }) {
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
    <section className="explore-video-section">
      <div className="explore-video-section-header">
        <h2>Top Learning Videos</h2>
        <a href="/videos" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="carousel-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="carousel" ref={carouselRef}>
          {videoData.map((video) => (
            <div className="explore-video-card" key={video.id}>
              <div className="thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} />
                <span className="watermark">PLECOS</span>
              </div>

              <div className="explore-video-info">
                <h3>{video.title}</h3>
                <p className="instructor-name">By {video.instructor}</p>
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
};
