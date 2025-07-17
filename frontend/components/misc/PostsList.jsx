import React from "react";
import "./PostsList.css";

const PostsList = ({ posts, logo }) => (
    <div className="posts-list">
        {posts.map((post, idx) => (
            <div className="post-card" key={idx}>
                <div className="post-row">
                    <div className="post-logo">
                        <img src={logo.src ?? logo} alt="Logo" />
                    </div>
                    <div>
                        <div className="post-title">{post.title}</div>
                        <div className="post-meta">
                            {post.author} • {post.timeAgo}
                        </div>
                    </div>
                </div>
                <div className="post-content">{post.content}</div>
            </div>
        ))}
    </div>
);

export default PostsList;