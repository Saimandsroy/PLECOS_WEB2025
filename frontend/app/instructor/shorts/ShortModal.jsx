import React from 'react'
import { Cross2Icon, ChatBubbleIcon } from '@radix-ui/react-icons'
import './ShortsPage.css'

const commentsData = {
    1: [
        { id: 1, user: 'Alice', text: 'Great tip!' },
        { id: 2, user: 'Alice', text: 'Great tip!' },
        { id: 3, user: 'Alice', text: 'Great tip!' },
        { id: 4, user: 'Alice', text: 'Great tip!' },
        { id: 5, user: 'Alice', text: 'Great tip!' },
        { id: 6, user: 'Alice', text: 'Great tip!' },
        { id: 7, user: 'Alice', text: 'Great tip!' },
        { id: 8, user: 'Alice', text: 'Great tip!' },
        { id: 9, user: 'Bob', text: 'Very helpful.' }

    ],
    2: [{ id: 10, user: 'Sam', text: 'Nice demo!' }],
    3: [{ id: 11, user: 'Jane', text: 'Thanks for explaining.' }],
    4: []
}

const ShortModal = ({ short, onClose, showComments, onShowComments, onHideComments }) => (
    <div className="short-modal-overlay">
        <div className="short-modal-content">
            <button className="short-modal-close" onClick={onClose}>
                <Cross2Icon width={28} height={28} color='white' />
            </button>
            <div className="short-modal-video">
                <span>{short.title}</span>
            </div>
            <div className="short-modal-actions">
                <span>👁 {short.views}</span>
                <span
                    className="short-modal-comment-btn"
                    onClick={showComments ? onHideComments : onShowComments}
                >
                    <ChatBubbleIcon /> {short.comments}
                </span>
                <span>❤️ {short.likes}</span>
            </div>
            {showComments && (
                <div className="short-modal-comments">
                    <div className="short-modal-comments-header">
                        <span>Comments</span>
                        <button onClick={onHideComments}><Cross2Icon /></button>
                    </div>
                    <div className="short-modal-comments-list">
                        {(commentsData[short.id] || []).length === 0 && (
                            <div style={{ color: '#888', padding: 12 }}>No comments yet.</div>
                        )}
                        {(commentsData[short.id] || []).map(c => (
                            <div key={c.id} className="short-modal-comment">
                                <b>{c.user}:</b> {c.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
)

export default ShortModal