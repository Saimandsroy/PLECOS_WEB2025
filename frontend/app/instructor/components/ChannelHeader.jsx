import React from 'react';
import Banner from './Banner';
import ChannelInfo from './ChannelInfo';
import './ChannelHeader.css';

const ChannelHeader = () => (
  <div className="channel-header">
    <Banner />
    <div className="channel-main">
      <div className="channel-logo">
        <div className='channel-logo-div'>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Channel Logo" />
        </div>
      </div>
      <ChannelInfo />
    </div>
  </div>
);

export default ChannelHeader;