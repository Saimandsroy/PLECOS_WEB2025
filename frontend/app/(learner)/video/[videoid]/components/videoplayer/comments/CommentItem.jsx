import React from "react";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { formatRelativeTime } from "@/lib/relativeTime";
import { ReplyInput } from "./ReplyInput";

export const CommentItem = ({
    comment,
    replyInputs,
    setReplyInputs,
    handleLike,
    handleAddReply,
}) => {
    const toggleReplyInput = () => {
        setReplyInputs((prev) =>
            prev.hasOwnProperty(comment.comment_id)
                ? (() => {
                    const updated = { ...prev };
                    delete updated[comment.comment_id];
                    return updated;
                })()
                : { ...prev, [comment.comment_id]: "" }
        );
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
                            Rahul
                            {/* {comment.user.isVerified && (
                <span className="verified">✓</span>
              )} */}
                        </span>
                        <span className="timestamp">
                            {formatRelativeTime(comment.createdAt)}
                        </span>
                        <button className="more-btn">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                    <p className="comment-text">{comment.commentText}</p>
                    <div className="comment-actions">
                        <button
                            onClick={() => handleLike(comment.comment_id)}
                            className={`like-btn ${comment.isLiked ? "liked" : ""}`}
                        >
                            <Heart
                                size={16}
                                fill={comment.isLiked ? "currentColor" : "none"}
                            />
                            {comment.likes > 0 && <span>{comment.likes || 4}</span>}
                        </button>
                        <button onClick={toggleReplyInput} className="reply-btn">
                            <MessageCircle size={16} />
                            Reply
                        </button>
                    </div>

                    {replyInputs.hasOwnProperty(comment.comment_id) && (
                        <ReplyInput
                            comment={comment}
                            replyInputs={replyInputs}
                            setReplyInputs={setReplyInputs}
                            handleAddReply={handleAddReply}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
