'use client';
import React from 'react';

export default function NavigationDots({ total, current, onDotClick }) {
  return (
    <div className="shorts-navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`short-nav-dot ${i === current ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
        />
      ))}
    </div>
  );
}