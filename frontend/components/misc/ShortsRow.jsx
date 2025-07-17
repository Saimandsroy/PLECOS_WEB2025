import React from "react";
import "./ShortsRow.css";

const ShortsRow = ({ shorts, logo }) => (
    <div className="le-shorts-row">
        {shorts.map((short, idx) => (
            <div className="le-short-card" key={idx}>
                <img
                    src={short.thumbnail.src ?? short.thumbnail}
                    alt={short.title}
                    className="le-short-thumb"
                />
                <div className="le-short-row">
                    <div className="le-short-logo">
                        <img src={logo.src ?? logo} alt="Logo" />
                    </div>
                    <div>
                        <div className="le-short-title">{short.title}</div>
                        <div className="le-short-meta">
                            {short.views} views • {short.timeAgo}
                        </div>
                    </div>
                </div>
                <div className="le-short-duration">{short.duration}</div>
            </div>
        ))}
    </div>
);

export default ShortsRow;