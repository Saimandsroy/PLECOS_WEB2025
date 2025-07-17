"use client";
import { useRef } from "react";
import "./InstructorGrid.css";
import "./Carousel.css";

export default function InstructorGrid({ featuredInstructors }) {
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
        <h2>Featured Instructors</h2>
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
            <div key={instructor.id} className="explore-instructors__card">
              <div className="explore-instructors__badge">
                ⭐ {instructor.rating}
              </div>
              <div className="explore-instructors__avatar">
                <div className="explore-instructors__emoji">
                  {instructor.avatar}
                </div>
                <h3 className="explore-instructors__name">
                  {instructor.name}
                  {instructor.verified && (
                    <span className="explore-instructors__verified">✓</span>
                  )}
                </h3>
                <p className="explore-instructors__title-text">
                  {instructor.title}
                </p>
                <p className="explore-instructors__specialty">
                  {instructor.specialty}
                </p>
              </div>
              <div className="explore-instructors__stats">
                <div className="explore-instructors__stat">
                  <div className="explore-instructors__stat-value">
                    {instructor.followers}
                  </div>
                  <div className="explore-instructors__stat-label">
                    Followers
                  </div>
                </div>
                <div className="explore-instructors__stat">
                  <div className="explore-instructors__stat-value">
                    {instructor.courses}
                  </div>
                  <div className="explore-instructors__stat-label">Courses</div>
                </div>
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
