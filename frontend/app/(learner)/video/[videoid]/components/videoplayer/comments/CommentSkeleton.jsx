import React from 'react';
import './CommentSkeleton.css';

const CommentSkeleton = () => {
  return (
    <div className="comment-skeleton">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-content">
        <div className="skeleton-header">
          <div className="skeleton-name"></div>
          <div className="skeleton-timestamp"></div>
        </div>
        <div className="skeleton-text">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-action"></div>
          <div className="skeleton-action"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
