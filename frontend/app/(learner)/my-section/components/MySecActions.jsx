import React from "react";
import "./MySecActions.css"
import {
  ClockIcon,
  ListBulletIcon,
  DownloadIcon,
  BadgeIcon,
  DesktopIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const actions = [
  {
    icon: <ClockIcon width={28} height={28} />,
    label: "Watch Later",
    href: "/my-section/watch-later",
  },
  {
    icon: <ListBulletIcon width={28} height={28} />,
    label: "Playlist",
    href: "/my-section/playlists",
  },
  {
    icon: <DownloadIcon width={28} height={28} />,
    label: "Downloads",
    href: "/my-section/downloads",
  },
  {
    icon: <BadgeIcon width={28} height={28} />,
    label: "Badges & Certificates",
    href: "/my-section/badges-certificates",
  },
  {
    icon: <DesktopIcon width={28} height={28} />,
    label: "Tests",
    href: "/my-section/tests",
  },
];

const MySecActions = () => (
  <div
  className="myGrid"
    // style={{
    //   display: "grid",
    //   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    //   gap: 20,
    //   marginBottom: 8,
    // }}
  >
    {actions.map((a) => (
      <Link href={a.href || ""} key={a.label}>
        <div
          className="glass-card"
          // style={{
          //   padding: "2rem 0",
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   fontWeight: 500,
          //   fontSize: 18,
          //   gap: 16,
          //   minHeight: 110,
          //   textAlign: "center",
          //   color: "var(--text-primary)",
          //   transition: "all 0.3s ease",
          // }}
        >
          <span className="icon-fixed">{a.icon}</span>
          <span>{a.label}</span>
        </div>
      </Link>
    ))}
  </div>
);

export default MySecActions;
