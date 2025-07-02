import React from 'react';
import './ShortsGrid.css';
import thumb from '@/public/logo.png';
import Image from 'next/image';
const shorts = [
    { id: 1, title: 'Quick Tip 1', thumbnail: thumb },
    { id: 2, title: 'Quick Tip 2', thumbnail: thumb },
];

const ShortsGrid = () => (
    <div className="shorts-grid">
        {shorts.map(short => (
            <div className="short-card" key={short.id}>
                <Image src={short.thumbnail} alt={short.title} />
                <div className="short-title">{short.title}</div>
            </div>
        ))}
    </div>
);

export default ShortsGrid;