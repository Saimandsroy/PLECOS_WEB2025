import React from "react";
import Image from "next/image";
import "./PlaylistCard.css";
import { MdPlaylistPlay } from "react-icons/md";

const PlaylistCard = ({ thumbnail, title, noOfVideos, creater }) => (
  <div className="playlist-card">
    <div className="playlist-thumb-wrapper">
      <Image src={thumbnail} alt={title} className="playlist-thumb" />
      <span className="playlists-no">
        <MdPlaylistPlay /> {noOfVideos}
      </span>
    </div>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className="playlist-title">{title}</div>
      <div style={{color: 'var(--text-secondary)'}}>{creater}</div>
    </div>
  </div>
);

export default PlaylistCard;
