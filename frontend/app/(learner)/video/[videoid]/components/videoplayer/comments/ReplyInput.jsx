import { api } from "@/api/axios";
import React, { useState, useRef, useEffect } from "react";

export const ReplyInput = ({
    comment,
    handleAddReply,
    handleCancel,
}) => {
    const [replyText, setReplyText] = useState("");
    const textareaRef = useRef(null);

    // Automatically resize textarea height to fit content
    const handleTextareaResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    // Resize on replyText change too
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [replyText]);
    const replyService = async (replyData) => {
        console.log("adfasdf", replyData)
        const result = await api.post(`comments/${comment.comment_id}/replies`, replyData)
        console.log(result)
    }
    const submitReply = () => {
        const trimmed = replyText.trim();
        if (!trimmed) {
            return; // Don't submit empty replies
        }

        console.log(`Reply to commentID ${comment.comment_id}:`, trimmed);
        const reviewData = {
            commentText: trimmed,
            parent_comment_id: comment.comment_id
        }
        replyService(reviewData);
        handleAddReply(comment.comment_id, trimmed);

        // Clear input and close reply box
        setReplyText("");
        if (handleCancel) {
            handleCancel();
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitReply();
        } else if (e.key === 'Escape') {
            if (handleCancel) {
                handleCancel();
            }
        }
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
                    ref={textareaRef}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onInput={handleTextareaResize}
                    onKeyDown={onKeyDown}
                    placeholder={`Reply to ${comment.user?.name || "user"}...`}
                    className="reply-input"
                    rows={1}
                    autoFocus
                />
                <div className="reply-actions">
                    <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button
                        onClick={submitReply}
                        disabled={!replyText.trim()}
                        className="post-btn"
                    >
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
};
