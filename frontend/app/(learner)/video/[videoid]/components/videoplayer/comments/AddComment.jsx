import React from "react";
import { Send } from "lucide-react";

export const AddComment = ({ newComment, setNewComment, handleAddComment }) => {
    const handleTextareaResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    return (
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
                    onInput={handleTextareaResize}
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
    );
};
