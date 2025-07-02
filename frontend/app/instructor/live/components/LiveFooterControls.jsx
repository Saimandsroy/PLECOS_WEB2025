import React from "react";

const LiveFooterControls = ({
  micOn,
  setMicOn,
  videoOn,
  setVideoOn,
  setShowEmoji,
  ICONS,
}) => (
  <footer
    style={{
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100vw",
      background: "rgba(255,255,255,0.95)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 28,
      zIndex: 300,
      padding: "16px 0 12px 0",
      boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
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
  </footer>
);

export default LiveFooterControls;
