import { formatRelativeTime } from '@/lib/relativeTime'
import { Heart } from 'lucide-react'
import { MoreVertical } from 'lucide-react'
import React from 'react'

const ReplyItem = ({ reply }) => {
    console.log(reply)
    return (
        <div className="comment-main">
            <img
                src={reply.profilePic}
                alt={reply.userName}
                className="avatar"
            />
            <div className="comment-content">
                <div className="comment-header">
                    <span className="username">
                        {reply.userName || "Anonymous"}
                        {/* {reply.user.isVerified && <span className="verified">✓</span>} */}
                    </span>
                    <span className="timestamp">
                        {formatRelativeTime(reply.createdAt)}
                    </span>
                    <button className="more-btn">
                        <MoreVertical size={16} />
                    </button>
                </div>

                <p className="comment-text">{reply.commentText}</p>

                {/* Actions */}
                <div className="comment-actions">
                    {/* Like */}
                    <button
                        onClick={() => handleLike(reply.comment_id)}
                        className={`like-btn ${reply.isLiked ? "liked" : ""}`}
                    >
                        <Heart
                            size={16}
                            fill={reply.isLiked ? "currentColor" : "none"}
                        />
                        {reply.likes > 0 && <span>{reply.likes}</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReplyItem