// components/VideoPlayer/TitleOverlay.jsx
import React from 'react';
import './TitleOverlay.css';
const TitleOverlay = ({ title, visible }) => {
  return (
    <div className={`player__title ${visible ? 'player__controls__visible' : ''}`}>
      {title}
    </div>
  );
};

export default TitleOverlay;