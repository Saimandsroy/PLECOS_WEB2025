import React from 'react';
import VideoCard from './VideoCard';
import thumb from '@/public/logo.png';
import './VideosGrid.css';

const videos = [
    {
        id: 1,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    },
    {
        id: 2,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    },
    {
        id: 1112,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 123,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 13,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 121,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 122,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 12,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 11,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    }, {
        id: 10,
        title: 'Shark Tank India S4 | Ep 40 | AI ka model tha smart, par kya Sharks ...',
        thumbnail: thumb,
        views: '5.5K',
        timeAgo: '10 hours ago',
        duration: '1:01:49',
        episode: '40',
        badge: 'FULL EPISODE',
    },
];

const VideosGrid = () => (
    <div className="videos-grid">
        {videos.map(video => (
            <VideoCard key={video.id} {...video} />
        ))}
    </div>
);

export default VideosGrid;