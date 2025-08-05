"use client";
import React, { useState, useRef, useEffect } from "react";
import ChannelHeader from "../../components/profile/ChannelHeader";
import StickyTabs from "../../components/profile/StickyTabs";
import VideosGrid from "../../components/profile/VideosGrid";
import ShortsGrid from "../../components/profile/ShortsGrid";
import PostsRow from "../../components/profile/PostsRow";
import "./page.css";

const tabs = ["Videos", "Shorts", "Posts"];
const instructorData = {
  name: "Dr. Sarah Chen",
  username: "sarahchen_ml",
  isVerified: true,
  profileImage:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  bannerImage:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  subject: "Machine Learning",
  level: 3,
  qualification: "PhD in Computer Science, MIT",
  bio: "Passionate about making AI accessible to everyone! 🎓 Teaching ML fundamentals to advanced deep learning concepts. Let's learn together! �",
  externalLinks: {
    linkedin: "https://www.linkedin.com/in/example",
    portfolio: "https://www.example.com",
    github: "https://github.com/example",
  },
  impactRate: 85,
  totalViews: 18700,
  totalLearners: 2300,
  achievements: [
    { name: "Top Instructor" },
    { name: "Course Creator" },
    { name: "Community Leader" },
  ],
};

const InstructorHome = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, []);

  return (
    <div className="instructor-home">
      <ChannelHeader {...instructorData} />
      <div ref={sentinelRef} style={{ height: 0 }} />
      <StickyTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className={isSticky ? "sticky-bg" : "transparent-bg"}
        tabs={tabs}
      />
      {activeTab === 0 && <VideosGrid />}
      {activeTab === 1 && <ShortsGrid />}
      {activeTab === 2 && <PostsRow />}
    </div>
  );
};

export default InstructorHome;
