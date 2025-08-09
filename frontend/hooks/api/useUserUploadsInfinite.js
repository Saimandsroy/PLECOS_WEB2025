"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import jwt from "jsonwebtoken";
import api from "@/api/axios";

// Maps server item to UI shape
const mapItem = (v) => ({
  id: v.video_id || v.id,
  title: v.title || v.fileName,
  fileName: v.fileName || v.title,
  size: v.fileSize || v.size || 0,
  createdAt: v.createdAt || v.upload_initiated_at || v.created_at,
  status: v.status || v.upload_status, // active | archived | deleted | initiated (from your backend)
  videoUrl: v.video_url,
  thumbnailUrl: v.thumbnail_url,
  duration: v.duration,
  category: v.category,
  privacy: v.privacy,
});

async function fetchUserUploadsPage({ pageParam = null, limit = 20 }) {
  const token = localStorage.getItem("token");
  if (!token) return { data: [], nextCursor: null };
  const email = jwt.decode(token)?.email;

  const res = await api.get(`/videos/uploader/${email}`, {
    params: {
      limit,
      cursor: pageParam || undefined,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  const payload = res.data || {};
  const items = (payload.data || []).map(mapItem);
  const nextCursor = payload.nextCursor || null;

  return { data: items, nextCursor };
}

export default function useUserUploadsInfinite({ pageSize = 20 } = {}) {
  const query = useInfiniteQuery({
    queryKey: ["userUploadsInfinite", pageSize],
    queryFn: ({ pageParam }) =>
      fetchUserUploadsPage({ pageParam, limit: pageSize }),
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const items = (query.data?.pages || []).flatMap((p) => p.data || []);
  const canLoadMore = !!query.hasNextPage;

  return {
    ...query,
    items,
    canLoadMore,
  };
}
