"use client";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import VideoDetails from "./components/VideoDetails";
import ActionBar from "./components/ActionBar";
import CommentsSection from "./components/CommentsSection";
import RecommendationsList from "./components/RecommendationsList";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { api } from "@/api/axios";
import VideoDetailsSkeleton from "./components/VideoDetailsSkelton";
import { formatRelativeTime } from "@/lib/relativeTime";
const VideoView = () => {
  const { videoId } = useParams();
  const [sedio, setSedio] = useState();
  // const videoUrl = process.env.NEXT_PUBLIC_R2_ENDPOINT + video.videoUrl
  // console.log(videoUrl)
  console.log(sedio)
  useEffect(() => {
    const data = async () => {
      try {
        const response = await api.get(`/videos/${videoId}`);
        console.log(response.data.data)
        setSedio(response.data.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }
    data();
  }, []);
  const recommendations = [
    {
      id: "r1",
      title: "React Hooks in Depth",
      channel: "CodeWorld",
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      duration: "18:32",
      views: 45678,
    },
    {
      id: "r2",
      title: "Build a Portfolio Website",
      channel: "DevWizard",
      thumbnail:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww",
      duration: "25:10",
      views: 98532,
    },
  ];

  return (
    <div className={styles.videoViewContainer}>
      <div className={styles.mainContent}>
        <VideoPlayer src={sedio?.videoUrl} />
        {sedio ? (<VideoDetails
          title={sedio.title}
          instructor={"rahul"}
          views={sedio.views}
          uploadDate={formatRelativeTime(sedio.createdAt)}
          rating={sedio.likes}
          description={sedio.description}
          category={sedio.category}
        />) : <VideoDetailsSkeleton />}

        <ActionBar likes={248} dislikes={3} />
        {sedio && <CommentsSection videoId={sedio?.video_id} />}
      </div>
      <aside className={styles.sidebar}>
        <RecommendationsList videos={recommendations} />
      </aside>
    </div>
  );
};

export default VideoView;
