'use client';
import React from 'react';

export default function CommentSection({ close }) {
  return (
    <div className="short-comment-section">
      <div className="comments">
        <div className="comments-header">
          <h4>Comments</h4>
          <button onClick={close}>✖</button>
        </div>

        <div className="comments-body">
          <p className="comment">🔥 This is awesome! – <strong>User123</strong></p>
          <p className="comment">Love this tip. – <strong>DevQueen</strong></p>
          <p className="comment">😂 This is so true! – <strong>CodeMeme</strong></p>
        </div>
      </div>

      <div className="comment-input">
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </div>
    </div>
  );
}