"use client";
import { BookOpen } from "lucide-react";
import "./CategoryGrid.css";

import { useRef } from "react";

export default function CategoryGrid({ categories }) {
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
    <section className="explore-category">
      <div className="video-section-header">
        <h2 className="explore-category__title">
          <BookOpen size={28} />
          Popular Categories
        </h2>
        <a href="/PopularCategories" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className="carousel-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="carousel" ref={scrollRef}>
          {categories.map((category, index) => (
            <div key={index} className="explore-category__card">
              <div className="explore-category__icon">{category.icon}</div>
              <h3 className="explore-category__name">{category.name}</h3>
              <p className="explore-category__count">{category.count}</p>
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
