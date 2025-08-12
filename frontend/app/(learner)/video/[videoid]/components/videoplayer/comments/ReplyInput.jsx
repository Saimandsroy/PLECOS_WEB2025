import React from "react";

export const ReplyInput = ({
    comment,
    replyInputs,
    setReplyInputs,
    handleAddReply,
}) => {
    const handleTextareaResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const handleCancel = () => {
        setReplyInputs((prev) => {
            const updated = { ...prev };
            delete updated[comment.comment_id];
            return updated;
        });
    };

    return (
        <div className="reply-input-container">
            <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                alt="Your avatar"
                className="avatar small"
            />
            <div className="reply-input-wrapper">
                <textarea
                    value={replyInputs[comment.comment_id] || ""}
                    onChange={(e) =>
                        setReplyInputs((prev) => ({
                            ...prev,
                            [comment.comment_id]: e.target.value,
                        }))
                    }
                    placeholder={`Reply to ${comment.user?.name || "user"}...`}
                    className="reply-input"
                    rows="1"
                    onInput={handleTextareaResize}
                />
                <div className="reply-actions">
                    <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button
                        onClick={() => handleAddReply(comment.comment_id)}
                        disabled={!replyInputs[comment.comment_id]?.trim()}
                        className="post-btn"
                    >
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
};
