import React from 'react';
import './PostsRow.css';

const PostsRow = ({ posts }) => (
    <div className="posts-row">
        {posts.map(post => (
            <div className="post-card" key={post.id}>
                <div className="post-content">{post.content}</div>
                <div className="post-date">{post.date}</div>
                <div className="post-engagement">
                    <span role="img" aria-label="likes">👍</span> {post.likes}
                    <span role="img" aria-label="comments"> 💬</span> {post.comments}
                    <span role="img" aria-label="shares"> 🔁</span> {post.shares}
                </div>
            </div>
        ))}
    </div>
);

export default PostsRow;