import React from "react";
import PlaylistCard from "./components/PlaylistCard";
import thumb from "@/public/logo.png";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const playlists = [
  {
    name: "NPTEL MOOC Machine Learning 2016",
    creater: "NPTEL",
    noOfVideos: 88,
    thumbnail: thumb,
  },
  {
    name: "Next js Full Stack Project with Nextjs 15 and React 19",
    creater: "Dave Gray",
    noOfVideos: 13,
    thumbnail: thumb,
  },
];

function Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link href={"/my-section"}>
          <ArrowLeftIcon />
        </Link>
        <h2 style={{ fontWeight: 600, fontSize: 24 }}>Playlists</h2>
      </div>
      {playlists.map((p) => (
        <PlaylistCard
          noOfVideos={p.noOfVideos}
          thumbnail={p.thumbnail}
          title={p.name}
          creater={p.creater}
          key={p.name}
        />
      ))}
    </div>
  );
}

export default Page;
