import React from 'react';
import './PortalSkelton.css';

const ProfileSkeleton = () => {
    return (
        <div className="profile-skeleton">
            <div className="profile-skeleton__banner"></div>
            <div className="profile-skeleton__content">
                <div className="profile-skeleton__top">
                    <div className="profile-skeleton__avatar"></div>
                    <div className="profile-skeleton__info">
                        <div className="skeleton-line skeleton-line--name"></div>
                        <div className="skeleton-line skeleton-line--username"></div>
                        <div className="skeleton-line skeleton-line--role"></div>
                        <div className="skeleton-line skeleton-line--qualification"></div>
                    </div>
                </div>
                <div className="profile-skeleton__bottom">
                    <div className="skeleton-line skeleton-line--bio"></div>
                    <div className="skeleton-line skeleton-line--bio-short"></div>
                    <div className="profile-skeleton__stats">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="skeleton-line skeleton-line--stat"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
