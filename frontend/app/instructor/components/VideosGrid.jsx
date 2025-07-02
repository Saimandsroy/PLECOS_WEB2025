import React from 'react';
import thumb from '@/public/logo.png';
import Image from 'next/image';
import './VideosGrid.css';

const videos = [
    { id: 1, title: 'React Basics', thumbnail: thumb },
    { id: 2, title: 'Advanced JS', thumbnail: thumb },
    { id: 3, title: 'UI Design', thumbnail: thumb },
    { id: 32, title: 'UI Design', thumbnail: thumb },
    { id: 35, title: 'UI Design', thumbnail: thumb },
    { id: 31, title: 'UI Design', thumbnail: thumb },
    { id: 33, title: 'UI Design', thumbnail: thumb },
    { id: 13, title: 'UI Design', thumbnail: thumb },
    { id: 223, title: 'UI Design', thumbnail: thumb },
    { id: 213, title: 'UI Design', thumbnail: thumb },
    { id: 233, title: 'UI Design', thumbnail: thumb },
    { id: 123, title: 'UI Design', thumbnail: thumb },
    { id: 313, title: 'UI Design', thumbnail: thumb },
    { id: 423, title: 'UI Design', thumbnail: thumb },


];

const VideosGrid = () => (
    <div className="videos-grid">
        {videos.map(video => (
            <div className="video-card" key={video.id}>
                <Image src={video.thumbnail} alt={video.title} />
                <div className="video-title">{video.title}</div>
            </div>
        ))}
    </div>
);

export default VideosGrid;