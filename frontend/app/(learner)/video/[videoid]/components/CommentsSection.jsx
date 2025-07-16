"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  X,
  ChevronDown,
  Send,
  MoreVertical,
} from "lucide-react";
import "./CommentsSection.css";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        isVerified: false,
      },
      content:
        "This explanation really helped me understand the concept! The examples were particularly clear.",
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          user: {
            name: "Mike Chen",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            isVerified: false,
          },
          content:
            "I agree! The visual demonstrations made it so much easier to grasp.",
          timestamp: "1 hour ago",
          likes: 3,
          isLiked: true,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Alex Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        isVerified: true,
      },
      content:
        "Could you make a follow-up video covering the advanced applications of this topic?",
      timestamp: "4 hours ago",
      likes: 8,
      isLiked: true,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [sortBy, setSortBy] = useState("newest");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      setIsCollapsed(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
          isVerified: false,
        },
        content: newComment,
        timestamp: "now",
        likes: 0,
        isLiked: false,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId) => {
    const content = replyInputs[commentId]?.trim();
    if (content) {
      const reply = {
        id: Date.now(),
        user: {
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
          isVerified: false,
        },
        content: content,
        timestamp: "now",
        likes: 0,
        isLiked: false,
      };

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );

      setReplyInputs((prev) => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
    }
  };

  const handleLike = (commentId, replyId = null) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked,
                    }
                  : reply
              ),
            };
          } else {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            };
          }
        }
        return comment;
      })
    );
  };

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + comment.replies.length,
    0
  );

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "popular") return b.likes - a.likes;
    return 0;
  });

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

          {!isMobile && (
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
          )}

          <div className="add-comment">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
              alt="Your avatar"
              className="avatar"
            />
            <div className="comment-input-container">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
                rows="1"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
              <div className="comment-actions">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="post-btn"
                >
                  <Send size={16} />
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="comments-list">
            {sortedComments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-main">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="avatar"
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="username">
                        {comment.user.name}
                        {comment.user.isVerified && (
                          <span className="verified">✓</span>
                        )}
                      </span>
                      <span className="timestamp">{comment.timestamp}</span>
                      <button className="more-btn">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                    <div className="comment-actions">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`like-btn ${comment.isLiked ? "liked" : ""}`}
                      >
                        <Heart
                          size={16}
                          fill={comment.isLiked ? "currentColor" : "none"}
                        />
                        {comment.likes > 0 && <span>{comment.likes}</span>}
                      </button>
                      <button
                        onClick={() =>
                          setReplyInputs((prev) =>
                            prev.hasOwnProperty(comment.id)
                              ? (() => {
                                  const updated = { ...prev };
                                  delete updated[comment.id];
                                  return updated;
                                })()
                              : { ...prev, [comment.id]: "" }
                          )
                        }
                        className="reply-btn"
                      >
                        <MessageCircle size={16} />
                        Reply
                      </button>
                    </div>

                    {replyInputs.hasOwnProperty(comment.id) && (
                      <div className="reply-input-container">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                          alt="Your avatar"
                          className="avatar small"
                        />
                        <div className="reply-input-wrapper">
                          <textarea
                            value={replyInputs[comment.id] || ""}
                            onChange={(e) =>
                              setReplyInputs((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            placeholder={`Reply to ${comment.user.name}...`}
                            className="reply-input"
                            rows="1"
                            onInput={(e) => {
                              e.target.style.height = "auto";
                              e.target.style.height =
                                e.target.scrollHeight + "px";
                            }}
                          />
                          <div className="reply-actions">
                            <button
                              onClick={() =>
                                setReplyInputs((prev) => {
                                  const updated = { ...prev };
                                  delete updated[comment.id];
                                  return updated;
                                })
                              }
                              className="cancel-btn"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyInputs[comment.id]?.trim()}
                              className="post-btn"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {comment.replies.length > 0 && (
                  <div className="replies-container">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-item">
                        <img
                          src={reply.user.avatar}
                          alt={reply.user.name}
                          className="avatar small"
                        />
                        <div className="reply-content">
                          <div className="reply-header">
                            <span className="username">
                              {reply.user.name}
                              {reply.user.isVerified && (
                                <span className="verified">✓</span>
                              )}
                            </span>
                            <span className="timestamp">{reply.timestamp}</span>
                          </div>
                          <p className="reply-text">{reply.content}</p>
                          <div className="reply-actions">
                            <button
                              onClick={() => handleLike(comment.id, reply.id)}
                              className={`like-btn ${
                                reply.isLiked ? "liked" : ""
                              }`}
                            >
                              <Heart
                                size={14}
                                fill={reply.isLiked ? "currentColor" : "none"}
                              />
                              {reply.likes > 0 && <span>{reply.likes}</span>}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
