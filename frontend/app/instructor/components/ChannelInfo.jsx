import React from 'react';
import ChannelMeta from './ChannelMeta';
import './ChannelInfo.css';

const ChannelInfo = ({ isLight }) => (
  <div className="channel-info">
    <div className="channel-title-row">
      <h1 className={`channel-name ${isLight ? 'light' : 'dark'}`}>Sabit Tamang</h1>
      <span className="verified">✔</span>
    </div>
    <ChannelMeta isLight={isLight} />
    <div className={`channel-description ${isLight ? 'light' : 'dark'}`}>
      Hit play on life's coolest playlist with me! 🎵 Dive into wild music rides on Monkey App, ...
    </div>
    <div className="channel-links">
      <a href="https://instagram.com/tamangsobit_14" target="_blank" rel="noopener noreferrer">
        instagram.com/tamangsobit_14
      </a>
      <span>and 2 more links</span>
    </div>
    <div className="channel-stats">
      <span className="subscribers">1.2M subscribers</span>
      <span className="views">1.5B views</span>
    </div>
  </div>
);

export default ChannelInfo;