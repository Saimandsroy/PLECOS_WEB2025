import React from "react";

export const CommentHeader = ({ totalComments, sortBy, setSortBy, isMobile }) => {
    if (isMobile) return null;

    return (
        <div className="desktop-header">
            <h3>{totalComments} Comments</h3>
            <div className="sort-dropdown">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="popular">Most liked</option>
                </select>
            </div>
        </div>
    );
};
