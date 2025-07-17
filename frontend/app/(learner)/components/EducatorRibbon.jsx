"use client";
import { useRef } from "react";
import "./InstructorGrid.css";
import "./Carousel.css";
import InstructorCard from "@/components/InstructorCard";

export default function EducatorRibbon({ title = "Featured Educators", featuredInstructors }) {
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
    <section className="explore-instructors">
      <div className="explore-instructors__title">
        <h2>{title}</h2>
        <a href="/FeaturedInstructors" className="see-more">
          See more &gt;
        </a>
      </div>

      <div className=" carousel-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>

        <div className="carousel" ref={scrollRef}>
          {featuredInstructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
