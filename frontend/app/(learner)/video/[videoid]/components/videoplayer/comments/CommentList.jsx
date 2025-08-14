import React from "react";
import { CommentItem } from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

export const CommentList = ({
    comments,
    loading,
    initialLoading,
    hasMore,
    error,
    sortBy,
    totalComments,
    loadMore,
    refresh,
    setSortBy,
}) => {
    // Initial loading state
    if (initialLoading) {
        return (
            <div className="comments-list">
                <div className="comments-header">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-sort"></div>
                </div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CommentSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Error state
    if (error && comments.length === 0) {
        return (
            <div className="comments-list">
                <div className="error-state">
                    <p className="error-message">{error}</p>
                    <button onClick={refresh} className="retry-btn">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="comments-list">
            {/* Header with sort */}
            <div className="comments-header">
                <h3 className="comments-title">
                    {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
                </h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                    disabled={loading}
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>

            {/* Rest of your component logic... */}
            {comments.length === 0 && !loading ? (
                <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <h4>No comments yet</h4>
                    <p>Be the first to share your thoughts!</p>
                </div>
            ) : (
                <>
                    <div className="comments-container">
                        {comments.map(comment => (
                            <CommentItem key={comment.comment_id} comment={comment} />
                        ))}
                    </div>

                    {loading && (
                        <div className="loading-more">
                            <div className="loading-spinner"></div>
                            <p>Loading more comments...</p>
                        </div>
                    )}

                    {hasMore && !loading && (
                        <button onClick={loadMore} className="load-more-btn">
                            Load More Comments
                        </button>
                    )}

                    {!hasMore && comments.length > 0 && (
                        <div className="end-message">
                            <span>You've reached the end</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
