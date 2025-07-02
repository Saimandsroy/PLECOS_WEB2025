import React from "react";
import Image from "next/image";

const LiveSidebar = ({
  showSidebar,
  setShowSidebar,
  comments,
  input,
  setInput,
  handleSend,
  participants,
}) => (
  <>
    <div className="golive-meet-rightnav">
      <button
        className="golive-meet-navbtn"
        title="Comments"
        onClick={() =>
          setShowSidebar(showSidebar === "comments" ? null : "comments")
        }
      >
        {/* Chat Icon */}
        <svg width="28" height="28" fill="none">
          <rect x="4" y="7" width="20" height="12" rx="4" stroke="#111" strokeWidth="2" />
          <circle cx="10" cy="13" r="1.5" fill="#6366f1" />
          <circle cx="14" cy="13" r="1.5" fill="#6366f1" />
          <circle cx="18" cy="13" r="1.5" fill="#6366f1" />
        </svg>
      </button>
      <button
        className="golive-meet-navbtn"
        title="Participants"
        onClick={() =>
          setShowSidebar(showSidebar === "participants" ? null : "participants")
        }
      >
        {/* Participants Icon */}
        <svg width="28" height="28" fill="none">
          <circle cx="14" cy="10" r="4" stroke="#111" strokeWidth="1.5" />
          <rect x="7" y="18" width="14" height="4" rx="2" stroke="#111" strokeWidth="1.5" />
        </svg>
        <span className="golive-meet-nav-count">{participants.length}</span>
      </button>
    </div>
    {/* Sidebar (right lower, floating) */}
    {showSidebar === "comments" && (
      <div className="golive-meet-sidebar-float">
        <div className="golive-meet-sidebar-header">
          <span>Comments</span>
          <button
            className="golive-meet-sidebar-close"
            onClick={() => setShowSidebar(null)}
            title="Close"
          >
            <svg width="20" height="20">
              <line x1="6" y1="14" x2="14" y2="6" stroke="#222" strokeWidth="2" />
              <line x1="6" y1="6" x2="14" y2="14" stroke="#222" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div
          className="golive-meet-chat-list"
          style={{ maxHeight: 180, overflowY: "auto" }}
        >
          {comments.map((msg, idx) => (
            <div key={idx} className="golive-meet-chat-message">
              <span className="golive-meet-chat-sender">{msg.sender}</span>
              <span className="golive-meet-chat-text">{msg.text}</span>
            </div>
          ))}
        </div>
        <form className="golive-meet-chat-inputbox" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="golive-meet-chat-sendbtn">
            <svg width="20" height="20">
              <path d="M2 10l16-8v16L2 10z" fill="#6366f1" />
            </svg>
          </button>
        </form>
      </div>
    )}
    {showSidebar === "participants" && (
      <div className="golive-meet-sidebar-float">
        <div className="golive-meet-sidebar-header">
          <span>Participants</span>
          <button
            className="golive-meet-sidebar-close"
            onClick={() => setShowSidebar(null)}
            title="Close"
          >
            <svg width="20" height="20">
              <line x1="6" y1="14" x2="14" y2="6" stroke="#222" strokeWidth="2" />
              <line x1="6" y1="6" x2="14" y2="14" stroke="#222" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div
          className="golive-meet-sidebar-participants"
          style={{ maxHeight: 180, overflowY: "auto" }}
        >
          {participants.map((p, idx) => (
            <div key={p.name} className="golive-meet-sidebar-participant">
              <Image src={p.icon} alt={p.name} width={32} height={32} />
              <span>{p.name}</span>
              {p.isHost && (
                <span className="golive-meet-host-badge">Host</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

export default LiveSidebar;
