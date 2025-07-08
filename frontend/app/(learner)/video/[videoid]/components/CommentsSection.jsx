'use client';
import React from 'react';
import styles from './CommentsSection.module.css';


const CommentsSection = ({ comments }) => {
  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.commentsHeading}>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <img src={comment.user.avatar} alt={comment.user.name} className={styles.avatar} />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <strong>{comment.user.name}</strong>
              <span className={styles.commentTime}>{comment.timestamp}</span>
            </div>
            <p>{comment.text}</p>
            {comment.replies.length > 0 && (
              <div className={styles.replies}>
                {comment.replies.map(reply => (
                  <div key={reply.id} className={styles.reply}>
                    <img src={reply.user.avatar} alt={reply.user.name} className={styles.avatar} />
                    <div className={styles.commentBody}>
                      <div className={styles.commentHeader}>
                        <strong>{reply.user.name}</strong>
                        <span className={styles.commentTime}>{reply.timestamp}</span>
                      </div>
                      <p>{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;