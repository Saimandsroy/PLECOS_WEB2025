"use client";
import { useQuery } from "@tanstack/react-query";
import jwt from "jsonwebtoken";
import api from "@/api/axios";

const fetchUserUploads = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];
  const email = jwt.decode(token)?.email;
  const res = await api.get(`/videos/uploader/${email}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return (res.data?.data || []).map((v) => ({
    id: v.video_id || v.id,
    title: v.title || v.fileName,
    fileName: v.fileName || v.title,
    size: v.fileSize || v.size || 0,
    createdAt: v.createdAt || v.upload_initiated_at || v.created_at,
    // keep server statuses as-is: active | archived | deleted | initiated
    status: v.status || v.upload_status,
    videoUrl: v.video_url,
    thumbnailUrl: v.thumbnail_url,
    duration: v.duration,
    category: v.category,
    privacy: v.privacy,
  }));
};

export default function useUserUploads() {
  return useQuery({
    queryKey: ["userUploads"],
    queryFn: fetchUserUploads,
    staleTime: 60_000,
    refetchInterval: 20_000,
    refetchOnWindowFocus: true,
  });
}
