"use client";
import { useRef } from "react";
import "./InstructorGrid.css";
import "./Carousel.css";
const featuredInstructors = [
  {
    id: 1,
    name: "Ava Lee",
    title: "Math Educator",
    followers: "45K",
    rating: 4.9,
    courses: 24,
    avatar: "👩‍🏫",
    specialty: "Advanced Mathematics",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    title: "Computer Science",
    followers: "38K",
    rating: 4.8,
    courses: 18,
    avatar: "👩‍💻",
    specialty: "AI & Machine Learning",
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    title: "Physics Expert",
    followers: "29K",
    rating: 4.9,
    courses: 31,
    avatar: "👨‍🔬",
    specialty: "Quantum Physics",
    verified: true,
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    title: "Language Arts",
    followers: "42K",
    rating: 4.7,
    courses: 27,
    avatar: "👩‍🎓",
    specialty: "Creative Writing",
    verified: true,
  },
  
   { id: 5,
    name: "Ava Lee",
    title: "Math Educator",
    followers: "45K",
    rating: 4.9,
    courses: 24,
    avatar: "👩‍🏫",
    specialty: "Advanced Mathematics",
    verified: true,
  },
  {
    id: 6,
    name: "Dr. Sarah Chen",
    title: "Computer Science",
    followers: "38K",
    rating: 4.8,
    courses: 18,
    avatar: "👩‍💻",
    specialty: "AI & Machine Learning",
    verified: true,
  },
  {
    id: 7,
    name: "Marcus Johnson",
    title: "Physics Expert",
    followers: "29K",
    rating: 4.9,
    courses: 31,
    avatar: "👨‍🔬",
    specialty: "Quantum Physics",
    verified: true,
  },
  {
    id: 8,
    name: "Elena Rodriguez",
    title: "Language Arts",
    followers: "42K",
    rating: 4.7,
    courses: 27,
    avatar: "👩‍🎓",
    specialty: "Creative Writing",
    verified: true,
  }
];
export default function InstructorGrid() {
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
