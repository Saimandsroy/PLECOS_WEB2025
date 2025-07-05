import React from "react";
import "./AnalyticsComments.css";

const AnalyticsComments = ({ comments }) => (
    <div className="analytics-card glass-card">
        <div className="analytics-card-title">Comments & Reviews</div>
        <ul className="analytics-comments">
            {comments.map((c, i) => (
                <li key={i}>
                    <span className="analytics-comment-icon">💬</span>
                    {c.text}
                </li>
            ))}
        </ul>
    </div>
);

export default AnalyticsComments;