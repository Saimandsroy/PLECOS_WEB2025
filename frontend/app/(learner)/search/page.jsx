"use client";
import React, { useState } from "react";
import styles from "./SearchResultsPage.module.css";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const scrollLeft = () => {
    document
      .querySelector(`.${styles.horizontalScroll}`)
      .scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .querySelector(`.${styles.horizontalScroll}`)
      .scrollBy({ left: 300, behavior: "smooth" });
  };

  // Mock data for shorts
  const shorts = [
    {
      id: 1,
      thumbnail: "https://picsum.photos/180/320?random=1",
      title: "Quick React Tips",
      views: "125K",
      duration: "0:45",
    },
    {
      id: 2,
      thumbnail: "https://picsum.photos/180/320?random=2",
      title: "CSS Flexbox in 60s",
      views: "89K",
      duration: "1:00",
    },
    {
      id: 3,
      thumbnail: "https://picsum.photos/180/320?random=3",
      title: "JavaScript ES6 Arrow Functions",
      views: "203K",
      duration: "0:52",
    },
    {
      id: 4,
      thumbnail: "https://picsum.photos/180/320?random=4",
      title: "Node.js Basics",
      views: "156K",
      duration: "0:58",
    },
    {
      id: 5,
      thumbnail: "https://picsum.photos/180/320?random=5",
      title: "MongoDB Query Tips",
      views: "92K",
      duration: "1:15",
    },
    {
      id: 6,
      thumbnail: "https://picsum.photos/180/320?random=1",
      title: "Quick React Tips",
      views: "125K",
      duration: "0:45",
    },
    {
      id: 7,
      thumbnail: "https://picsum.photos/180/320?random=2",
      title: "CSS Flexbox in 60s",
      views: "89K",
      duration: "1:00",
    },
    {
      id: 8,
      thumbnail: "https://picsum.photos/180/320?random=3",
      title: "JavaScript ES6 Arrow Functions",
      views: "203K",
      duration: "0:52",
    },
    {
      id: 9,
      thumbnail: "https://picsum.photos/180/320?random=4",
      title: "Node.js Basics",
      views: "156K",
      duration: "0:58",
    },
    {
      id: 10,
      thumbnail: "https://picsum.photos/180/320?random=5",
      title: "MongoDB Query Tips",
      views: "92K",
      duration: "1:15",
    },
  ];

  // Mock data for instructors
  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://picsum.photos/80/80?random=10",
      expertise: "Frontend Development",
      followers: "125K",
      courses: 15,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://picsum.photos/80/80?random=11",
      expertise: "Full Stack Development",
      followers: "89K",
      courses: 22,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://picsum.photos/80/80?random=12",
      expertise: "Backend Development",
      followers: "203K",
      courses: 18,
      rating: 4.9,
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://picsum.photos/80/80?random=13",
      expertise: "DevOps & Cloud",
      followers: "156K",
      courses: 12,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "https://picsum.photos/80/80?random=14",
      expertise: "UI/UX Design",
      followers: "92K",
      courses: 25,
      rating: 4.8,
    },
    {
      id: 6,
      name: "Sarah Johnson",
      avatar: "https://picsum.photos/80/80?random=10",
      expertise: "Frontend Development",
      followers: "125K",
      courses: 15,
      rating: 4.9,
    },
    {
      id: 7,
      name: "Mike Chen",
      avatar: "https://picsum.photos/80/80?random=11",
      expertise: "Full Stack Development",
      followers: "89K",
      courses: 22,
      rating: 4.8,
    },
    {
      id: 8,
      name: "Emily Rodriguez",
      avatar: "https://picsum.photos/80/80?random=12",
      expertise: "Backend Development",
      followers: "203K",
      courses: 18,
      rating: 4.9,
    },
    {
      id: 9,
      name: "David Kim",
      avatar: "https://picsum.photos/80/80?random=13",
      expertise: "DevOps & Cloud",
      followers: "156K",
      courses: 12,
      rating: 4.7,
    },
    {
      id: 10,
      name: "Lisa Thompson",
      avatar: "https://picsum.photos/80/80?random=14",
      expertise: "UI/UX Design",
      followers: "92K",
      courses: 25,
      rating: 4.8,
    },
  ];

  // Mock data for mixed content (courses and videos)
  const mixedContent = [
    {
      id: 1,
      type: "course",
      thumbnail: "https://picsum.photos/320/180?random=20",
      title: "Complete React Development Bootcamp",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://picsum.photos/32/32?random=10",
      },
      level: "intermediate",
      rating: 4.8,
      views: "25K",
      impactRate: 92,
    },
    {
      id: 2,
      type: "video",
      thumbnail: "https://picsum.photos/320/180?random=21",
      title: "React Hooks Explained - useState and useEffect",
      instructor: {
        name: "Mike Chen",
        avatar: "https://picsum.photos/32/32?random=11",
      },
      rating: 4.9,
      views: "158K",
      duration: "15:42",
    },
    {
      id: 3,
      type: "course",
      thumbnail: "https://picsum.photos/320/180?random=22",
      title: "Advanced JavaScript Patterns",
      instructor: {
        name: "Emily Rodriguez",
        avatar: "https://picsum.photos/32/32?random=12",
      },
      level: "advanced",
      rating: 4.7,
      views: "18K",
      impactRate: 89,
    },
    {
      id: 4,
      type: "video",
      thumbnail: "https://picsum.photos/320/180?random=23",
      title: "Building REST APIs with Node.js and Express",
      instructor: {
        name: "David Kim",
        avatar: "https://picsum.photos/32/32?random=13",
      },
      rating: 4.6,
      views: "89K",
      duration: "28:15",
    },
    {
      id: 5,
      type: "course",
      thumbnail: "https://picsum.photos/320/180?random=24",
      title: "CSS Grid and Flexbox Mastery",
      instructor: {
        name: "Lisa Thompson",
        avatar: "https://picsum.photos/32/32?random=14",
      },
      level: "beginner",
      rating: 4.9,
      views: "42K",
      impactRate: 95,
    },
    {
      id: 6,
      type: "video",
      thumbnail: "https://picsum.photos/320/180?random=25",
      title: "MongoDB Aggregation Pipeline Tutorial",
      instructor: {
        name: "Sarah Johnson",
        avatar: "https://picsum.photos/32/32?random=10",
      },
      rating: 4.7,
      views: "65K",
      duration: "22:30",
    },
    {
      id: 7,
      type: "course",
      thumbnail: "https://picsum.photos/320/180?random=26",
      title: "Modern Frontend Development with React",
      instructor: {
        name: "Mike Chen",
        avatar: "https://picsum.photos/32/32?random=11",
      },
      level: "intermediate",
      rating: 4.8,
      views: "31K",
      impactRate: 91,
    },
    {
      id: 8,
      type: "video",
      thumbnail: "https://picsum.photos/320/180?random=27",
      title: "Docker Containers Explained",
      instructor: {
        name: "Emily Rodriguez",
        avatar: "https://picsum.photos/32/32?random=12",
      },
      rating: 4.5,
      views: "73K",
      duration: "18:45",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.starHalf}>
          ☆
        </span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={styles.starEmpty}>
          ☆
        </span>
      );
    }

    return stars;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return styles.beginner;
      case "intermediate":
        return styles.intermediate;
      case "advanced":
        return styles.advanced;
      default:
        return "";
    }
  };

  return (
    <div className={styles.searchResults}>
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <h1>Search results for "{searchQuery}"</h1>
        <div className={styles.resultCount}>About 2,150 results</div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shorts</h2>
        <div className={styles.scrollWrapper}>
          <button
            className={`${styles.scrollButton} ${styles.left}`}
            onClick={() =>
              document
                .getElementById("shortsScroll")
                .scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            &lt;
          </button>

          <div id="shortsScroll" className={styles.horizontalScroll}>
            {shorts.map((short) => (
              <div key={short.id} className={styles.shortCard}>
                <div className={styles.shortThumbnail}>
                  <img src={short.thumbnail} alt={short.title} />
                  <div className={styles.shortDuration}>{short.duration}</div>
                </div>
                <div className={styles.shortInfo}>
                  <h4>{short.title}</h4>
                  <span className={styles.shortViews}>{short.views} views</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`${styles.scrollButton} ${styles.right}`}
            onClick={() =>
              document
                .getElementById("shortsScroll")
                .scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            &gt;
          </button>

          <div className={styles.fadeLeft}></div>
          <div className={styles.fadeRight}></div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Top Instructors</h2>
        <div className={styles.scrollWrapper}>
          <button
            className={`${styles.scrollButton} ${styles.left}`}
            onClick={() =>
              document
                .getElementById("instructorsScroll")
                .scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            &lt;
          </button>

          <div id="instructorsScroll" className={styles.horizontalScroll}>
            {instructors.map((instructor) => (
              <div key={instructor.id} className={styles.instructorCard}>
                <div className={styles.instructorAvatar}>
                  <img src={instructor.avatar} alt={instructor.name} />
                </div>
                <div className={styles.instructorInfo}>
                  <h4>{instructor.name}</h4>
                  <p className={styles.expertise}>{instructor.expertise}</p>
                  <div className={styles.instructorStats}>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>
                        {instructor.followers}
                      </span>
                      <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>
                        {instructor.courses}
                      </span>
                      <span className={styles.statLabel}>Courses</span>
                    </div>
                  </div>
                  <div className={styles.instructorRating}>
                    {renderStars(instructor.rating)}
                    <span className={styles.ratingValue}>
                      {instructor.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`${styles.scrollButton} ${styles.right}`}
            onClick={() =>
              document
                .getElementById("instructorsScroll")
                .scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            &gt;
          </button>

          <div className={styles.fadeLeft}></div>
          <div className={styles.fadeRight}></div>
        </div>
      </section>

      {/* Mixed Content Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Courses & Videos</h2>
        <div className={styles.mixedGrid}>
          {mixedContent.map((item) => (
            <div
              key={item.id}
              className={`${styles.contentCard} ${styles[item.type]}`}
            >
              <div className={styles.contentThumbnail}>
                <img src={item.thumbnail} alt={item.title} />
                {item.type === "video" && (
                  <div className={styles.videoDuration}>{item.duration}</div>
                )}
                {item.type === "course" && (
                  <div
                    className={`${styles.courseLevel} ${getLevelColor(
                      item.level
                    )}`}
                  >
                    {item.level}
                  </div>
                )}
              </div>

              <div className={styles.contentInfo}>
                <h3 className={styles.contentTitle}>{item.title}</h3>

                <div className={styles.instructorMeta}>
                  <img
                    src={item.instructor.avatar}
                    alt={item.instructor.name}
                    className={styles.instructorProfilePhoto}
                  />
                  <span className={styles.instructorName}>
                    {item.instructor.name}
                  </span>
                </div>

                <div className={styles.contentStats}>
                  <div className={styles.rating}>
                    {renderStars(item.rating)}
                    <span className={styles.ratingValue}>{item.rating}</span>
                  </div>
                  <span className={styles.views}>{item.views} views</span>
                  {item.type === "course" && (
                    <span className={styles.impactRate}>
                      {item.impactRate}% impact rate
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;
