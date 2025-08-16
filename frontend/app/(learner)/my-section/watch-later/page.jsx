"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import VideoCard from "@/components/profile/VideoCard";
import ShortsRow from "./components/ShortsRow";
import Tabs from "./components/Tabs";

import { videoDataPage } from "@/demo/videoPage";

import thumb from "@/public/logo.png";

const shortsData = [
  {
    id: "s1",
    title: "React useState in 60s",
    views: "120K",
    timeAgo: "2 weeks ago",
    duration: "0:59",
    thumbnail: thumb,
  },
  {
    id: "s2",
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
    <div style={{ padding: "2rem 1rem" }}>
      {" "}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link href={"/my-section"}>
          <ArrowLeftIcon />{" "}
        </Link>

        <h2
          style={{
            fontWeight: 600,
            fontSize: 24,
            color: "var(--text-primary)",
          }}
        >
          Watch Later
        </h2>
      </div>
      <Tabs active={activeTab} setActive={setActiveTab} />     {" "}
      {activeTab === "videos" && (
        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {" "}
          {/* Using the imported 'videoDataPage' and the reusable VideoCard component */}{" "}
          {videoDataPage.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}{" "}
        </div>
      )}{" "}
      <div style={{ marginTop: "2rem" }}>
        {" "}
        {activeTab ===
          "shorts" /* Using the locally defined 'shortsData' */ && (
          <ShortsRow shorts={shortsData} logo={thumb} />
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default WatchLater;
