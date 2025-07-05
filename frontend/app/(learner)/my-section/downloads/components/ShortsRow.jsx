import React from "react";
import "./ShortsRow.css";
import { MdDownloadDone } from "react-icons/md";

const ShortsRow = ({ shorts, logo }) => (
    <div className="dl-shorts-row">
        {shorts.map((short, idx) => (
            <div className="dl-short-card" key={idx}>
                <img
                    src={short.thumbnail.src ?? short.thumbnail}
                    alt={short.title}
                    className="dl-short-thumb"
                />
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <div className="dl-short-duration">{short.duration}</div>
                </div>
                <div>
                    <div className="dl-short-row">
                    <div className="dl-short-logo">
                        <img src={logo.src ?? logo} alt="Logo" />
                    </div>
                    <div>
                        <div className="dl-short-title">{short.title}</div>
                        <div className="dl-short-meta">
                            <MdDownloadDone size={18} /> <span>Downloaded</span>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        ))}
    </div>
);

export default ShortsRow;