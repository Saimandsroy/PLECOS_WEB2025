import React from "react";

const LiveEmojiPicker = ({ showEmoji, setShowEmoji }) =>
  showEmoji ? (
    <div className="golive-emoji-picker">
      <div className="golive-emoji-picker-inner">
        <span
          role="img"
          aria-label="smile"
          style={{ fontSize: 32, cursor: "pointer" }}
          onClick={() => setShowEmoji(false)}
        >
          😊
        </span>
        <span
          role="img"
          aria-label="thumbs up"
          style={{ fontSize: 32, cursor: "pointer" }}
          onClick={() => setShowEmoji(false)}
        >
          👍
        </span>
        <span
          role="img"
          aria-label="clap"
          style={{ fontSize: 32, cursor: "pointer" }}
          onClick={() => setShowEmoji(false)}
        >
          👏
        </span>
        <span
          role="img"
          aria-label="close"
          style={{ fontSize: 24, marginLeft: 16, cursor: "pointer" }}
          onClick={() => setShowEmoji(false)}
        >
          ✖️
        </span>
      </div>
    </div>
  ) : null;

export default LiveEmojiPicker;
