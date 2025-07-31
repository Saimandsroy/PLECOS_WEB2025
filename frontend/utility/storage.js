// lib/r2.ts
export async function getUploadUrl(file, category = "misc") {
  const params = new URLSearchParams({
    filename: file.name,
    contentType: file.type,
    category,
  });

  const res = await fetch(`/generate-video-upload-url?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to obtain presigned URL");
  return res.json();
}
