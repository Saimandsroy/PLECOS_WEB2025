"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, ChevronDown, X } from "lucide-react";
import { CommentHeader } from "./videoplayer/comments/CommentHeader";
import { AddComment } from "./videoplayer/comments/AddComment";
import { CommentList } from "./videoplayer/comments/CommentList"; // Back to simple CommentList
import { useCommentsPagination } from "@/hooks/useComments";
import { useMobileDetection } from "@/hooks/useMobile";
import "./CommentsSection.css";

const CommentSection = ({ videoId }) => {
  const {
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
    addComment,
    updateComment,
    removeComment,
  } = useCommentsPagination(videoId); // Hook in parent

  const { isMobile } = useMobileDetection();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Your comment creation logic here
      setNewComment("");
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      {isMobile && isCollapsed && (
        <div
          className="inline-comment-bar"
          onClick={() => setIsCollapsed(false)}
        >
          <MessageCircle size={18} />
          <span>Show Comments ({totalComments})</span>
          <ChevronDown size={16} />
        </div>
      )}

      {!isCollapsed && (
        <div className="comment-container">
          {isMobile && (
            <div className="mobile-header">
              <h3>Comments</h3>
              <button
                className="close-btn"
                onClick={() => setIsCollapsed(true)}
              >
                <X size={20} />
              </button>
            </div>
          )}

          <CommentHeader
            totalComments={totalComments}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isMobile={isMobile}
            loading={loading}
            onRefresh={refresh}
          />

          <AddComment
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            isSubmitting={isSubmitting}
            disabled={initialLoading}
          />

          {/* Pass all pagination data as props */}
          <CommentList
            comments={comments}
            loading={loading}
            initialLoading={initialLoading}
            hasMore={hasMore}
            error={error}
            loadMore={loadMore}
            refresh={refresh}
          />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
