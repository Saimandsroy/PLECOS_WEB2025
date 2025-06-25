import React from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import './ShortsFeed.css'

// Dummy comments data
const commentsData = {
  1: [
    { id: 1, user: 'Alice', text: 'Great short!' },
    { id: 2, user: 'Bob', text: 'Loved the content.' }
  ],
  2: [
    { id: 1, user: 'Charlie', text: 'Very informative.' }
  ],
  3: [
    { id: 1, user: 'Dave', text: 'Nice editing!' }
  ]
}

const CommentSection = ({ shortId, onClose }) => (
  <div className="comment-section-overlay">
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        zIndex: 2
      }}
      aria-label="Close comments"
    >
      <Cross2Icon width={28} height={28} />
    </button>
    <h3 style={{ marginTop: 32, marginBottom: '1rem', fontWeight: 600, fontSize: 20, paddingLeft: 24 }}>Comments</h3>
    <div style={{ padding: '0 24px 24px 24px', overflowY: 'auto', height: '100%' }}>
      {(commentsData[shortId] || []).map(comment => (
        <div key={comment.id} style={{
          marginBottom: '1.2rem',
          padding: '0.75rem 1rem',
          background: '#f3f4f6',
          borderRadius: 8
        }}>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>{comment.user}</div>
          <div style={{ color: '#374151' }}>{comment.text}</div>
        </div>
      ))}
      {(!commentsData[shortId] || commentsData[shortId].length === 0) && (
        <div style={{ color: '#888' }}>No comments yet.</div>
      )}
    </div>
  </div>
)

export default CommentSection