import React from 'react';
import './PostsRow.css';

const posts = [
    {
        id: 1,
        content: 'Welcome to the channel! Excited to share new music and vlogs with you all. Stay tuned for more updates!',
        date: '2 days ago',
        likes: 120,
        comments: 15,
        shares: 5
    },
    {
        id: 2,
        content: 'New video coming soon. What topics do you want to see next? Drop your suggestions below!',
        date: '5 hours ago',
        likes: 89,
        comments: 22,
        shares: 3
    },
];

const PostsRow = () => (
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