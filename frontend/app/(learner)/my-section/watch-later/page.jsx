"use client";
import React, { useState } from "react";
import Tabs from "./components/Tabs";
import VideoCard from "./components/VideoCard";
import ShortsRow from "./components/ShortsRow";
import thumb from "@/public/logo.png";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const videoData = [
  {
    thumbnail: thumb,
    title: "Learn Langchain in 1 hours | Langchain Latest Crash Course 2024",
    views: "20K",
    timeAgo: "1 year ago",
    duration: "1:04:54",
  },
  {
    thumbnail: thumb,
    title: "Machine Learning Fundamentals | Harward CS101 | Chapter 1",
    views: "2.3K",
    timeAgo: "1 year ago",
    duration: "2:01:00",
  },
];

const shortsData = [
  {
    title: "React useState in 60s",
    views: "120K",
    timeAgo: "2 weeks ago",
    duration: "0:59",
    thumbnail: thumb,
  },
  {
    title: "JS Arrow Functions Explained",
    views: "98K",
    timeAgo: "1 month ago",
    duration: "0:45",
    thumbnail: thumb,
  },
];

const WatchLater = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div style={{ padding: "2rem 0" }}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link href={"/my-section"}>
          <ArrowLeftIcon />
        </Link>
        <h2 style={{ fontWeight: 600, fontSize: 24 }}>Watch Later</h2>
      </div>
      <Tabs tab={activeTab} setTab={setActiveTab} />
      {activeTab === "videos" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 10,
          }}
        >
          {videoData.map((video, idx) => (
            <VideoCard key={idx} {...video} logo={thumb} />
          ))}
        </div>
      )}
      {activeTab === "shorts" && <ShortsRow shorts={shortsData} logo={thumb} />}
    </div>
  );
};

export default WatchLater;
