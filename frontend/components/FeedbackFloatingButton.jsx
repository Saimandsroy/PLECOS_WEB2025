'use client'
import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';

const buttonStyle = {
  position: 'fixed',
  right: 24,
  bottom: 24,
  zIndex: 1500,
  background: 'var(--brand-blue)',
  color: '#fff',
  borderRadius: '50%',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
  textDecoration: 'none',
  fontSize: 28,
  transition: 'background 0.2s',
  cursor: 'pointer',
};

const mobileButtonStyle = {
  position: 'fixed',
  right: 20,
  bottom: 92, // 1.25rem (20px) + 3rem (48px) + 24px gap
  zIndex: 1500,
  background: 'var(--brand-blue)',
  color: '#fff',
  borderRadius: '50%',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
  textDecoration: 'none',
  fontSize: 24,
  transition: 'background 0.2s',
  cursor: 'pointer',
};

const FeedbackFloatingButton = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <a
        onClick={() => setOpen(true)}
        style={isMobile ? mobileButtonStyle : buttonStyle}
        title="Give Feedback"
      >
        <svg width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15.5C21 16.3284 20.3284 17 19.5 17H7.41421L4.70711 19.7071C4.07714 20.3371 3 19.8906 3 19.0001V5.5C3 4.67157 3.67157 4 4.5 4H19.5C20.3284 4 21 4.67157 21 5.5V15.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="var(--brand-blue)"/>
        </svg>
      </a>
      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default FeedbackFloatingButton; 