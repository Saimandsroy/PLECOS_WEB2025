import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoDetails from './components/VideoDetails';
import ActionBar from './components/ActionBar';
import CommentsSection from './components/CommentsSection';
import RecommendationsList from './components/RecommendationsList';


import styles from './page.module.css';

const VideoView = () => {
  const videoData = {
    title: 'Mastering React in 30 Minutes',
    src: 'https://www.sample-videos.com/video321/mp4/240/big_buck_bunny_240p_2mb.mp4',
    instructor: {
      name: 'Jane Doe',
      avatar: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg',
      badge: 'Top Instructor',
    },
    views: 12456,
    uploadDate: 'July 1, 2025',
    duration: '30:15',
    rating: 4.8,
    category: 'Web Development',
    description:
      `In this crash course, you'll learn the core fundamentals of React, including components, state, props, hooks, and more. Whether you're a beginner or refreshing your skills, this guide will help you grasp the concepts fast and efficiently. We cover JSX, component structure, conditional rendering, and real project insights. Dive into hands-on coding and practical tips that accelerate your journey as a React developer.`,
  };

  const comments = [
    {
      id: 1,
      user: { name: 'Alex', avatar: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg' },
      text: 'This was super helpful. Thank you!',
      timestamp: '2 hours ago',
      replies: [
        {
          id: 11,
          user: { name: 'Sam', avatar: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg' },
          text: 'Absolutely agreed!',
          timestamp: '1 hour ago',
        },
      ],
    },
    {
      id: 2,
      user: { name: 'Maria', avatar: 'https://i.pinimg.com/474x/81/76/3e/81763edbda7fa57b57f36bfc0c05840b.jpg' },
      text: 'Great pacing and explanations!',
      timestamp: '3 hours ago',
      replies: [],
    },
  ];

  const recommendations = [
    {
      id: 'r1',
      title: 'React Hooks in Depth',
      channel: 'CodeWorld',
      thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      duration: '18:32',
      views: 45678,
    },
    {
      id: 'r2',
      title: 'Build a Portfolio Website',
      channel: 'DevWizard',
      thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww',
      duration: '25:10',
      views: 98532,
    },
  ];
  

  return (
    <div className={styles.videoViewContainer}>
      <div className={styles.mainContent}>
        <VideoPlayer src={videoData.src} />
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
        <CommentsSection comments={comments} />
      </div>
      <aside className={styles.sidebar}>
        <RecommendationsList videos={recommendations} />
      </aside>
    </div>
  );
};

export default VideoView;