import React, { useState } from "react";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { formatRelativeTime } from "@/lib/relativeTime";
import { ReplyInput } from "./ReplyInput";
import { RepliesList } from "./RepliesList"; // <-- Import new replies component
import "./CommentItem.css"
export const CommentItem = ({ comment, handleLike }) => {
    const [isOpenReply, setIsOpenReply] = useState(false);  // for adding a new reply
    const [showReplies, setShowReplies] = useState(false);  // for fetching/displaying replies

    const handleAddReply = (reply) => {
        console.log("new reply added:", reply);
        // here you would push the reply to backend or local state
    };

    const toggleReplyInput = () => {
        setIsOpenReply(!isOpenReply);
    };

    return (
        <div className="comment-item">
            <div className="comment-main">
                <img
                    src={comment.user?.avatar}
                    alt={comment.user?.name}
                    className="avatar"
                />
                <div className="comment-content">
                    <div className="comment-header">
                        <span className="username">
                            {comment.user?.name || "Anonymous"}
                            {/* {comment.user.isVerified && <span className="verified">✓</span>} */}
                        </span>
                        <span className="timestamp">
                            {formatRelativeTime(comment.createdAt)}
                        </span>
                        <button className="more-btn">
                            <MoreVertical size={16} />
                        </button>
                    </div>

                    <p className="comment-text">{comment.commentText}</p>

                    {/* Actions */}
                    <div className="comment-actions">
                        {/* Like */}
                        <button
                            onClick={() => handleLike(comment.comment_id)}
                            className={`like-btn ${comment.isLiked ? "liked" : ""}`}
                        >
                            <Heart
                                size={16}
                                fill={comment.isLiked ? "currentColor" : "none"}
                            />
                            {comment.likes > 0 && <span>{comment.likes}</span>}
                        </button>

                        {/* Reply */}
                        <button onClick={toggleReplyInput} className="reply-btn">
                            <MessageCircle size={16} />
                            Reply
                        </button>
                    </div>

                    {/* Inline Reply Input (when user wants to add a reply) */}
                    {isOpenReply && (
                        <ReplyInput
                            comment={comment}
                            handleAddReply={handleAddReply}
                        />
                    )}

                    {/* ✅ Show reply count + toggle replies list */}
                    {comment.reply_count > 0 && (
                        <div className="replies-info">
                            <button
                                className="toggle-replies-btn"
                                onClick={() => setShowReplies((prev) => !prev)}
                            >
                                {showReplies
                                    ? "Hide Replies"
                                    : `${comment.reply_count} ${comment.reply_count === 1 ? "Reply" : "Replies"
                                    }`}
                            </button>

                            {/* Replies List (fetch + render) */}
                            {showReplies && <RepliesList commentId={comment.comment_id} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
