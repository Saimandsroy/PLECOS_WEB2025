import React, { useEffect, useState } from "react";
import ReplyItem from "./ReplyItem";

export const RepliesList = ({ commentId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔹 Replace with real API request
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  reply_id: "r1",
                  userName: "John",
                  commentText: "Thanks for sharing!",
                },
                {
                  reply_id: "r2",
                  userName: "Alice",
                  commentText: "Totally agree with you!",
                },
              ]),
            800
          )
        );

        setReplies(response);
      } catch (err) {
        setError("Failed to load replies");
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, [commentId]);

  if (loading) return <p className="loading-text">Loading replies...</p>;
  if (error) return <p className="error-replies">{error}</p>;

  return (
    <div className="replies-list">
      {replies.map((reply) => (
        <ReplyItem key={reply.reply_id} reply={reply} />
      ))}
    </div>
  );
};