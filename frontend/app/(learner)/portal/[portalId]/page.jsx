"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChannelHeader from '@/components/profile/ChannelHeader';
import StickyTabs from '@/components/profile/StickyTabs';
import VideosGrid from '@/components/profile/VideosGrid';
import ShortsGrid from '@/components/profile/ShortsGrid';
import CourseGrid from '@/components/profile/CourseGrid';
import PortalSkelton from '@/components/profile/PortalSkelton';
import './page.css';
import { useParams } from 'next/navigation';
import api from '@/api/axios';

const tabs = ['Videos', 'Shorts', 'Courses'];

const ProfilePage = () => {
  const { portalId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Tab-specific data states
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [courses, setCourses] = useState([]);

  // Loading states
  const [videosLoading, setVideosLoading] = useState(false);
  const [shortsLoading, setShortsLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Pagination states
  const [videosPage, setVideosPage] = useState(1);
  const [shortsPage, setShortsPage] = useState(1);
  const [coursesPage, setCoursesPage] = useState(1);

  // Has more data flags
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [hasMoreShorts, setHasMoreShorts] = useState(true);
  const [hasMoreCourses, setHasMoreCourses] = useState(true);

  const sentinelRef = useRef(null);

  // Intersection observer for sticky tabs
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

  // Fetch profile data
  useEffect(() => {
    if (!portalId) return;

    const fetchProfileData = async () => {
      try {
        setProfileLoading(true);
        const response = await api.get(`/portal/${portalId}`);
        const data = response.data.data[0];
        console.log("Profile response:", response);
        if (!data) throw new Error('Failed to fetch profile');
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfileData();
  }, [portalId]);

  // Fetch videos data - now properly depends on profileData
  const fetchVideos = useCallback(async (page = 1, reset = false) => {
    if (!profileData?.email_id) return; // Guard clause
    if (!hasMoreVideos && !reset) return;

    try {
      setVideosLoading(true);
      console.log("Fetching videos for:", profileData.email_id);
      const response = await api.get(`/portal/${profileData.email_id}/video?page=${page}&limit=12`);

      // Fix: Use axios response structure, not fetch
      const data = response.data.data;
      console.log("Videos response:", data);

      if (reset) {
        setVideos(data.videos || []);
      } else {
        setVideos(prev => [...prev, ...(data.videos || [])]);
      }

      setHasMoreVideos(data.hasMore || false);
      setVideosPage(page);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setVideosLoading(false);
    }
  }, [profileData?.email_id, hasMoreVideos]); // Fixed dependencies

  // Fetch shorts data - using consistent axios pattern
  const fetchShorts = useCallback(async (page = 1, reset = false) => {
    if (!profileData?.email_id) return;
    if (!hasMoreShorts && !reset) return;

    try {
      setShortsLoading(true);
      const response = await api.get(`/portal/${profileData.email_id}/shorts?page=${page}&limit=12`);
      const data = response.data.data;

      if (reset) {
        setShorts(data.shorts || []);
      } else {
        setShorts(prev => [...prev, ...(data.shorts || [])]);
      }

      setHasMoreShorts(data.hasMore || false);
      setShortsPage(page);
    } catch (error) {
      console.error('Error fetching shorts:', error);
    } finally {
      setShortsLoading(false);
    }
  }, [profileData?.email_id, hasMoreShorts]);

  // Fetch courses data - using consistent axios pattern
  const fetchCourses = useCallback(async (page = 1, reset = false) => {
    if (!profileData?.email_id) return;
    if (!hasMoreCourses && !reset) return;

    try {
      setCoursesLoading(true);
      const response = await api.get(`/portal/${profileData.email_id}/courses?page=${page}&limit=12`);
      const data = response.data.data;

      if (reset) {
        setCourses(data.courses || []);
      } else {
        setCourses(prev => [...prev, ...(data.courses || [])]);
      }

      setHasMoreCourses(data.hasMore || false);
      setCoursesPage(page);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setCoursesLoading(false);
    }
  }, [profileData?.email_id, hasMoreCourses]);

  // Handle tab change
  const handleTabChange = useCallback((tabIndex) => {
    setActiveTab(tabIndex);

    // Only fetch if profileData is available
    if (!profileData) return;

    // Fetch data when switching tabs if not already loaded
    switch (tabIndex) {
      case 0: // Videos
        if (videos.length === 0) {
          fetchVideos(1, true);
        }
        break;
      case 1: // Shorts
        if (shorts.length === 0) {
          fetchShorts(1, true);
        }
        break;
      case 2: // Courses
        if (courses.length === 0) {
          fetchCourses(1, true);
        }
        break;
    }
  }, [videos.length, shorts.length, courses.length, fetchVideos, fetchShorts, fetchCourses, profileData]);

  // Initial data fetch for videos (default tab) - Fixed to wait for profileData
  useEffect(() => {
    if (profileData && activeTab === 0 && videos.length === 0) {
      fetchVideos(1, true);
    }
  }, [profileData, activeTab, videos.length, fetchVideos]); // Added profileData dependency

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000) {

        switch (activeTab) {
          case 0: // Videos
            if (!videosLoading && hasMoreVideos && profileData) {
              fetchVideos(videosPage + 1);
            }
            break;
          case 1: // Shorts
            if (!shortsLoading && hasMoreShorts && profileData) {
              fetchShorts(shortsPage + 1);
            }
            break;
          case 2: // Courses
            if (!coursesLoading && hasMoreCourses && profileData) {
              fetchCourses(coursesPage + 1);
            }
            break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, videosLoading, shortsLoading, coursesLoading,
    hasMoreVideos, hasMoreShorts, hasMoreCourses,
    videosPage, shortsPage, coursesPage,
    fetchVideos, fetchShorts, fetchCourses, profileData]); // Added profileData

  if (!portalId) {
    return <div className="error-message">Portal not found</div>;
  }

  if (profileLoading) {
    return <PortalSkelton />;
  }

  if (!profileData) {
    return <div className="error-message">Failed to load profile data</div>;
  }

  return (
    <div className="instructor-home">
      <ChannelHeader {...profileData} />
      <div ref={sentinelRef} style={{ height: 0 }} />
      <StickyTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        className={isSticky ? 'sticky-bg' : 'transparent-bg'}
        tabs={tabs}
      />

      <div className="tab-content">
        {activeTab === 0 && (
          <VideosGrid
            videoDataPage={videos}
            loading={videosLoading}
          />
        )}
        {activeTab === 1 && (
          <ShortsGrid
            shorts={shorts}
            loading={shortsLoading}
          />
        )}
        {activeTab === 2 && (
          <CourseGrid
            courses={courses}
            loading={coursesLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
