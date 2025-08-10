// components/profile/ShortsCard.jsx
import React from 'react';
import Image from 'next/image';
import { FcLike, FcShare } from 'react-icons/fc';
import { FaComment } from 'react-icons/fa6';
import './ShortsCard.css';

const ShortsCard = ({ short }) => {
    const formatCount = (count) => {
        if (typeof count === 'string') return count;
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count?.toString() || '0';
    };

    return (
        <div className="shorts-card">
            <div className="shorts-card__thumbnail-wrapper">
                <Image
                    src={short.thumbnail}
                    alt={short.title}
                    className="shorts-card__thumbnail"
                    width={200}
                    height={350}
                    priority
                />
                <div className="shorts-card__overlay">
                    <div className="shorts-card__info">
                        <h3 className="shorts-card__title">{short.title}</h3>
                        <p className="shorts-card__views">{short.views} views</p>
                    </div>
                </div>
            </div>
            <div className="shorts-card__actions">
                <div className="shorts-card__action">
                    <FcLike className="shorts-card__icon" />
                    <span>{formatCount(short.likes)}</span>
                </div>
                <div className="shorts-card__action">
                    <FaComment className="shorts-card__icon" />
                    <span>{formatCount(short.comments)}</span>
                </div>
                <div className="shorts-card__action">
                    <FcShare className="shorts-card__icon" />
                    <span>{formatCount(short.shares)}</span>
                </div>
            </div>
        </div>
    );
};

export default ShortsCard;
