import React from "react";
import "./ShortsRow.css";

const ShortsRow = ({ shorts, logo }) => (
    <div className="wl-shorts-row">
        {shorts.map((short, idx) => (
            <div className="wl-short-card" key={idx}>
                <img
                    src={short.thumbnail.src ?? short.thumbnail}
                    alt={short.title}
                    className="wl-short-thumb"
                />
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <div className="wl-short-duration">{short.duration}</div>
                </div>
                <div>
                    <div className="wl-short-row">
                    <div className="wl-short-logo">
                        <img src={logo.src ?? logo} alt="Logo" />
                    </div>
                    <div>
                        <div className="wl-short-title">{short.title}</div>
                        <div className="wl-short-meta">
                            {short.views} views • {short.timeAgo}
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        ))}
    </div>
);

export default ShortsRow;