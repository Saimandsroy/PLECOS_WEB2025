'use client'
import React, { useState, useRef, useEffect } from 'react';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill={filled ? "#fbbf24" : "none"}
    stroke="#fbbf24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: "pointer", transition: "fill 0.2s" }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FeedbackModal = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="advanced-search-modal-overlay"
      style={{
        zIndex: 2000,
        background: 'rgba(30, 32, 48, 0.45)', // darker overlay for both modes
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      <div
        className="glass-card"
        ref={modalRef}
        style={{
          maxWidth: 420,
          width: '100%',
          margin: '40px auto',
          borderRadius: 18,
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          border: '1.5px solid var(--border-color)',
          background: 'var(--background-primary, #fff)',
          position: 'relative',
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', color: 'var(--text-primary)', padding: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12 }}>Thank you!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>We appreciate your feedback.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 12, textAlign: 'center', color: 'var(--text-primary)' }}>We value your opinion.</h2>
            <div style={{ textAlign: 'center', marginBottom: 18, color: 'var(--text-secondary)', fontSize: 16 }}>
              How would you rate your overall experience?
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={hover ? star <= hover : star <= rating}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15, marginBottom: 12 }}>
              Kindly take a moment to tell us what you think.
            </div>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              rows={4}
              placeholder="Your feedback..."
              style={{
                width: '100%',
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                padding: 14,
                fontSize: 15,
                color: 'var(--text-primary)',
                background: 'var(--background-primary)',
                marginBottom: 18,
                resize: 'vertical',
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 22,
                background: 'var(--brand-blue)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 17,
                border: 'none',
                cursor: 'pointer',
                marginTop: 4,
                boxShadow: '0 2px 8px rgba(26,115,232,0.08)',
              }}
            >
              Share my feedback
            </button>
          </form>
        )}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            fontSize: 22,
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
          aria-label="Close feedback form"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal; 