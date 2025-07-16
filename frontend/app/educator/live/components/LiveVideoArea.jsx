import React from "react";
import Image from "next/image";

const LiveVideoArea = ({
  videoOn,
  micOn,
  videoRef,
  showEmoji,
  setShowEmoji,
  setMicOn,
  setVideoOn,
  ICONS,
}) => (
  <div
    className="golive-meet-video-area"
    style={{
      borderRadius: 18,
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      margin: "32px auto",
      width: "100%",
      maxWidth: 900,
    
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    {videoOn ? (
      <video
        ref={videoRef}
        autoPlay
        muted={!micOn}
        playsInline
        className="golive-meet-video"
        style={{
          background: "#222",
          borderRadius: 16,
          width: "100%",
          height: "100%",
          maxHeight: 480,
          objectFit: "cover",
        }}
      />
    ) : (
      <div
        className="golive-video-off-placeholder"
        style={{
          width: "100%",
          height: "100%",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f6fa",
        }}
      >
        <Image src="/host-icon.png" alt="Camera Off" width={96} height={96} />
        <div className="golive-video-off-text" style={{ color: "#232323" }}>
          Camera is Off
        </div>
      </div>
    )}
    {/* On-screen controls (centered, floating) */}
    <div
      className="golive-onscreen-controls"
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 28,
      }}
    >
      <button
        className={`golive-meet-controlbtn${!micOn ? " danger" : ""}`}
        title={micOn ? "Mute Mic" : "Unmute Mic"}
        onClick={() => setMicOn((v) => !v)}
      >
        {micOn ? ICONS.micOn : ICONS.micOff}
      </button>
      <button
        className={`golive-meet-controlbtn${!videoOn ? " danger" : ""}`}
        title={videoOn ? "Turn Off Camera" : "Turn On Camera"}
        onClick={() => setVideoOn((v) => !v)}
      >
        {videoOn ? ICONS.videoOn : ICONS.videoOff}
      </button>
      <button
        className="golive-meet-controlbtn"
        title="Emoji"
        onClick={() => setShowEmoji((v) => !v)}
      >
        {ICONS.emoji}
      </button>
      <button
        className="golive-meet-controlbtn danger"
        title="End Call"
        onClick={() => {
          setVideoOn(false);
          setMicOn(false);
        }}
      >
        {ICONS.callEnd}
      </button>
    </div>
  </div>
);

export default LiveVideoArea;
