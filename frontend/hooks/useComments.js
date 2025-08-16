import { useState, useEffect, useCallback } from "react";
import { api } from "@/api/axios";

export const useCommentsPagination = (typeId, comment) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const params = new URLSearchParams({
    limit: "20",
    sort: sortBy,
    ...(lastEvaluatedKey && !reset && { lastEvaluatedKey }),
  });
  let url = `/comments/video/${typeId}?${params}`;
  if (comment) {
    url = `/comments/${typeId}/replies?${params}`;
  }

  const fetchComments = useCallback(
    async (reset = false) => {
      if (loading || !typeId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(url);

        if (response.data.success) {
          const newComments = response.data.data;

          setComments((prev) =>
            reset ? newComments : [...prev, ...newComments]
          );
          setHasMore(response.data.pagination.has_more);
          setLastEvaluatedKey(response.data.pagination.last_evaluated_key);
        } else {
          throw new Error(response.data.error || "Failed to fetch comments");
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setError(error.message || "Failed to load comments");

        // If it's the first load, set empty state
        if (reset) {
          setComments([]);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
        if (reset) {
          setInitialLoading(false);
        }
      }
    },
    [typeId, lastEvaluatedKey, loading, sortBy]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchComments(false);
    }
  }, [hasMore, loading, fetchComments]);

  const refresh = useCallback(() => {
    setComments([]);
    setLastEvaluatedKey(null);
    setHasMore(true);
    setError(null);
    setInitialLoading(true);
    fetchComments(true);
  }, [fetchComments]);

  // Handle sort change
  const handleSortChange = useCallback(
    (newSort) => {
      if (newSort !== sortBy) {
        setSortBy(newSort);
        setComments([]);
        setLastEvaluatedKey(null);
        setHasMore(true);
        setError(null);
        setInitialLoading(true);
      }
    },
    [sortBy]
  );

  // Initial load
  useEffect(() => {
    if (typeId) {
      refresh();
    }
  }, [typeId, sortBy]);

  // Add new comment optimistically
  const addComment = useCallback((newComment) => {
    setComments((prev) => [newComment, ...prev]);
  }, []);

  // Update comment (for likes, edits, etc.)
  const updateComment = useCallback((commentId, updates) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.comment_id === commentId ? { ...comment, ...updates } : comment
      )
    );
  }, []);

  // Remove comment
  const removeComment = useCallback((commentId) => {
    setComments((prev) =>
      prev.filter((comment) => comment.comment_id !== commentId)
    );
  }, []);

  return {
    comments,
    loading,
    initialLoading,
    hasMore,
    error,
    sortBy,
    totalComments: comments.length,
    loadMore,
    refresh,
    setSortBy: handleSortChange,
    addComment,
    updateComment,
    removeComment,
  };
};
