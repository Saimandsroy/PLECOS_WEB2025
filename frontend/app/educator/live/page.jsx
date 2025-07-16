"use client";

import React, { useState, useRef, useEffect } from "react";
import LiveVideoArea from "./components/LiveVideoArea";
import LiveSidebar from "./components/LiveSidebar";
import LiveEmojiPicker from "./components/LiveEmojiPicker";
import '../../../styles/goLive.css';

const participants = [
  { name: 'You (Host)', icon: '/host-icon.png', isHost: true },
  { name: 'Student 1', icon: '/student1-icon.png' },
  { name: 'Student 2', icon: '/student2-icon.png' },
];

const initialComments = [
  { sender: 'Student 1', text: 'Hi everyone, welcome to the class!' },
  { sender: 'You', text: "Thank you. Let's get started!" },
];

const ICONS = {
  micOn: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff" stroke="#e5e7eb"/><rect x="11" y="7" width="6" height="12" rx="3" fill="#111"/></svg>
  ),
  micOff: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff" stroke="#e5e7eb"/><rect x="11" y="7" width="6" height="12" rx="3" fill="#e11d48"/><line x1="9" y1="9" x2="19" y2="19" stroke="#e11d48" strokeWidth="2"/></svg>
  ),
  videoOn: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff" stroke="#e5e7eb"/><rect x="8" y="11" width="8" height="6" rx="2" fill="#111"/><polygon points="16,14 22,11 22,17 16,14" fill="#111"/></svg>
  ),
  videoOff: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff" stroke="#e5e7eb"/><rect x="8" y="11" width="8" height="6" rx="2" fill="#e11d48"/><polygon points="16,14 22,11 22,17 16,14" fill="#e11d48"/><line x1="10" y1="11" x2="20" y2="17" stroke="#e11d48" strokeWidth="2"/></svg>
  ),
  emoji: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#fff" stroke="#e5e7eb"/><circle cx="14" cy="14" r="8" fill="#111"/><circle cx="11" cy="13" r="1" fill="#fff"/><circle cx="17" cy="13" r="1" fill="#fff"/><path d="M11 16c1.5 1 4.5 1 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  callEnd: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="14" r="14" fill="#e11d48"/><path d="M8 18c2-2 8-2 12 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="8" cy="18" r="1.5" fill="#fff"/><circle cx="20" cy="18" r="1.5" fill="#fff"/></svg>
  ),
  chat: (
    <svg width="28" height="28" fill="none"><rect x="4" y="7" width="20" height="12" rx="4" stroke="#111" strokeWidth="2"/><circle cx="10" cy="13" r="1.5" fill="#6366f1"/><circle cx="14" cy="13" r="1.5" fill="#6366f1"/><circle cx="18" cy="13" r="1.5" fill="#6366f1"/></svg>
  ),
  participants: (
    <svg width="28" height="28" fill="none"><circle cx="14" cy="10" r="4" stroke="#111" strokeWidth="1.5"/><rect x="7" y="18" width="14" height="4" rx="2" stroke="#111" strokeWidth="1.5"/></svg>
  ),
};

const GoLivePage = () => {
  const [comments, setComments] = useState(initialComments);
  const [input, setInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(null); // 'comments' | 'participants' | null
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Camera stream
  useEffect(() => {
    if (videoOn && videoRef.current && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
        .then(stream => {
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
        })
        .catch(() => {});
    } else if (!videoOn && videoRef.current) {
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [videoOn, micOn]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setComments([...comments, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  // --- UI ---
  return (
    <div className="golive-main-content live-meet-layout">
      <div className="golive-session-header align-with-comment" >
        <h2>Lecture 34 Sex Education</h2>
      </div>
      <div className="golive-meet-row" >
        <LiveVideoArea
          videoOn={videoOn}
          micOn={micOn}
          videoRef={videoRef}
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          setMicOn={setMicOn}
          setVideoOn={setVideoOn}
          ICONS={ICONS}
        />
        <LiveSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          comments={comments}
          input={input}
          setInput={setInput}
          handleSend={e => {
            e.preventDefault();
            if (input.trim()) {
              setComments([...comments, { sender: 'You', text: input }]);
              setInput('');
            }
          }}
          participants={participants}
        />
      </div>
      
      <LiveEmojiPicker showEmoji={showEmoji} setShowEmoji={setShowEmoji} />
    </div>
  );
};

export default GoLivePage;