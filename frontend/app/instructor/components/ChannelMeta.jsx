import React from 'react';
import './ChannelMeta.css';

const ChannelMeta = ({ isLight }) => (
  <div className={`channel-meta ${isLight ? 'light' : 'dark'}`}>
    <span className="channel-handle">@SabitTamang</span>
    <span className="channel-subscribers">839K subscribers</span>
    <span className="channel-videos">149 videos</span>
  </div>
);

export default ChannelMeta;