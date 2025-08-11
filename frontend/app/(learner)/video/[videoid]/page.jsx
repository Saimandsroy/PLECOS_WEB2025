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
  const videoData = {
    title: "Mastering React in 30 Minutes",
    src: "https://www.sample-videos.com/video321/mp4/240/big_buck_bunny_240p_2mb.mp4",
    instructor: {
      name: "Jane Doe",
      avatar:
        "https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg",
      badge: "Top Instructor",
    },
    views: 12456,
    uploadDate: "July 1, 2025",
    duration: "30:15",
    rating: 4.8,
    category: "Web Development",
    description: `In this crash course, you'll learn the core fundamentals of React, including components, state, props, hooks, and more. Whether you're a beginner or refreshing your skills, this guide will help you grasp the concepts fast and efficiently. We cover JSX, component structure, conditional rendering, and real project insights. Dive into hands-on coding and practical tips that accelerate your journey as a React developer.`,
  };

  const commentsList = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=40&h=40&fit=crop&crop=face",
        isVerified: false,
      },
      content:
        "This explanation really helped me understand the concept! The examples were particularly clear.",
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          user: {
            name: "Mike Chen",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            isVerified: false,
          },
          content:
            "I agree! The visual demonstrations made it so much easier to grasp.",
          timestamp: "1 hour ago",
          likes: 3,
          isLiked: true,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Alex Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isVerified: true,
      },
      content:
        "Could you make a follow-up video covering the advanced applications of this topic?",
      timestamp: "4 hours ago",
      likes: 8,
      isLiked: true,
      replies: [],
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        isVerified: false,
      },
      content:
        "Thank you for breaking this down step by step. It's exactly what I needed for my assignment!",
      timestamp: "6 hours ago",
      likes: 15,
      isLiked: false,
      replies: [],
    },
  ];

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
        <VideoDetails
          title={videoData.title}
          instructor={videoData.instructor}
          views={videoData.views}
          uploadDate={videoData.uploadDate}
          duration={videoData.duration}
          rating={videoData.rating}
          description={videoData.description}
          category={videoData.category}
        />

        <ActionBar likes={248} dislikes={3} />
        <CommentsSection />
      </div>
      <aside className={styles.sidebar}>
        <RecommendationsList videos={recommendations} />
      </aside>
    </div>
  );
};

export default VideoView;
