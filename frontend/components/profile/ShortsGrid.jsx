import React from 'react';
import './ShortsGrid.css';
import thumb from '@/public/logo.png';
import Image from 'next/image';
import { FcLike, FcShare } from 'react-icons/fc';
import { FaComment } from 'react-icons/fa6';
import { Share1Icon } from '@radix-ui/react-icons';

const shorts = [
    { id: 1, title: 'Is young couple ko\ndekkar Sharks ne sabse ...', views: '20K', likes: "300.2k", comments: "150k", shares: "800k", thumbnail: thumb },
    { id: 2, title: 'Quick Tip 2', views: '10K', likes: 800, comments: 90, shares: 40, thumbnail: thumb },
];

const ShortsGrid = () => (
    <div className="shorts-grid">
        {shorts.map(short => (
            <div className="short-card" key={short.id}>
                <div className="short-thumb-wrapper">
                    <Image src={short.thumbnail} alt={short.title} className="short-thumb" />
                    <div className="short-info-overlay">
                        <div className="short-title">{short.title}</div>
                        <div className="short-views">{short.views} views</div>
                    </div>
                </div>
                <div className="profile-short-actions">
                    <div><FcLike /> <p>{short.likes}</p></div>
                    <div><FaComment /> <p>{short.comments}</p></div>
                    <div><FcShare /> <p>{short.shares}</p></div>
                </div>
            </div>
        ))}
    </div>
);

export default ShortsGrid;