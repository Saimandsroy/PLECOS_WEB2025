"use client";
import React, { useRef } from "react";
import "./ExploreVideos.css";
import "./Carousel.css";



const videoData = [
  {
    id: 1,
    title: "Python for Data Science",
    instructor: "Dr. Michael Chen",
    role: "Data Scientist at Microsoft",
    thumbnail: "/video-tutorial.png",
    tags: ["Python", "Data Science", "NumPy", "Pandas"],
    points: [
      "Python programming fundamentals",
      "Data manipulation with Pandas",
      "Statistical analysis techniques",
      "Data visualization with Matplotlib",
      "Machine learning basics"
    ],
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    instructor: "Sarah Johnson",
    role: "Full Stack Developer at Google",
    thumbnail: "/video-tutorial.png",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    points: [
      "Build responsive web pages",
      "Master HTML5 and CSS3",
      "Interactive websites using JavaScript",
      "Front-end with React",
      "Project-based learning"
    ],
  },
  {
    id: 3,
    title: "Intro to Machine Learning",
    instructor: "Ankit Sharma",
    role: "ML Engineer at Amazon",
    thumbnail: "/video-tutorial.png",
    tags: ["Machine Learning", "Scikit-learn", "Python"],
    points: [
      "Understand supervised and unsupervised learning",
      "Build models with scikit-learn",
      "Cross-validation techniques",
      "Model evaluation metrics",
      "Hands-on mini projects"
    ],
  },
  {
    id: 4,
    title: "Java Programming Mastery",
    instructor: "Priya Desai",
    role: "Software Engineer at Oracle",
    thumbnail: "/video-tutorial.png",
    tags: ["Java", "OOP", "Data Structures"],
    points: [
      "Java syntax and core concepts",
      "Object-oriented programming",
      "Working with collections",
      "File I/O and exceptions",
      "Building CLI applications"
    ],
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Kim",
    role: "Product Designer at Adobe",
    thumbnail: "/video-tutorial.png",
    tags: ["UI Design", "UX Research", "Figma"],
    points: [
      "Design principles and user psychology",
      "Wireframing and prototyping",
      "User research and testing",
      "Working with Figma",
      "Building responsive layouts"
    ],
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    instructor: "Rohit Mehta",
    role: "Security Analyst at Cisco",
    thumbnail: "/video-tutorial.png",
    tags: ["Cybersecurity", "Networking", "Linux"],
    points: [
      "Cybersecurity fundamentals",
      "Threats, vulnerabilities, and risks",
      "Basics of networking and firewalls",
      "Linux commands for security",
      "Ethical hacking introduction"
    ],
  },
  {
    id: 7,
    title: "Data Structures & Algorithms",
    instructor: "Megha Nair",
    role: "SDE at Flipkart",
    thumbnail: "/video-tutorial.png",
    tags: ["DSA", "C++", "Coding Interviews"],
    points: [
      "Arrays, Linked Lists, Stacks, Queues",
      "Trees, Graphs, and Hashing",
      "Sorting and searching algorithms",
      "Recursion and dynamic programming",
      "Mock interview problems"
    ],
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    instructor: "Dev Patel",
    role: "Cloud Engineer at AWS",
    thumbnail: "/video-tutorial.png",
    tags: ["AWS", "Cloud", "DevOps"],
    points: [
      "Introduction to cloud computing",
      "AWS services (EC2, S3, RDS)",
      "IAM roles and security",
      "Deploying apps in the cloud",
      "Monitoring and scaling"
    ],
  },
  {
    id: 9,
    title: "Database Management Systems",
    instructor: "Neha Reddy",
    role: "DBA at Infosys",
    thumbnail: "/video-tutorial.png",
    tags: ["SQL", "MySQL", "Database"],
    points: [
      "Database concepts and ER diagrams",
      "SQL queries and Joins",
      "Normalization and indexing",
      "Transactions and concurrency",
      "Hands-on with MySQL"
    ],
  }
];


const ExploreVideos = () => {
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
      <div className="video-section-header">
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
            <div className="video-card" key={video.id}>
              <div className="thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} />
                <span className="watermark">PLECOS</span>
              </div>

              <div className="video-info">
                <h3>{video.title}</h3>
                <p className="instructor-name">By {video.instructor}</p>
                <p className="instructor-role">{video.role}</p>

                <div className="tag-list">
                  {video.tags.map((tag, index) => (
                    <span className="tag" key={index}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="what-you-learn">
                  <p className="learn-heading">
                    What will you learn in this course?
                  </p>
                  <ul>
                    {video.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                <button className="enroll-now-btn">Watch Now</button>
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

export default ExploreVideos;
