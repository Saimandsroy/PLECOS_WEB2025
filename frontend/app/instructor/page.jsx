"use client";

import React from "react";
import Link from "next/link";

const metrics = [
  { label: "Active Courses", value: 5 },
  { label: "Enrolled Learners", value: 250 },
  { label: "Avg. Feedback", value: "4.8/5" },
  { label: "Earnings", value: "$1,200" },
];

const announcements = [
  "New learners enrolled in Advanced Physics.",
  "Feedback received for Data Structures.",
  "Platform Update: New Certificate Templates!",
];

const navLinks = [
  { label: "Go Live", route: "/instructor/live" },
  { label: "Analytics", route: "/instructor/analytics" },
  { label: "Courses", route: "/instructor/courses" },
  { label: "Shorts", route: "/instructor/shorts" },
  { label: "Tools", route: "/instructor/tools" },
  { label: "Profile", route: "/instructor/profile" },
];

const InstructorHome = () => (
  <div style={{ padding: "2rem 0" }}>
    {/* Welcome Banner */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      marginBottom: 24,
      justifyContent: "center"
    }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 24,
        margin: 0,
        color: "var(--text-accent)"
      }}>
        Welcome Back 👋
      </h2>
    </div>

    {/* Metrics */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 20,
      marginBottom: 32
    }} >
      {metrics.map((m) => (
        <div key={m.label} style={{
        }} className="glass-card">
          <div style={{ fontWeight: 700, fontSize: 22 }}>{m.value}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 15 }}>{m.label}</div>
        </div>
      ))}
    </div>

    {/* Quick Actions */}
    <div style={{
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      marginBottom: 32
    }}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.route}
          style={{
            background: "var(--background-glass)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.5rem",
            padding: "0.8rem 1.3rem",
            fontWeight: 600,
            fontSize: 15,
            color: "var(--text-color)",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(30,41,59,0.03)",
            backdropFilter: "blur(14px)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>

    {/* Announcements */}
    <div>
      <div style={{
        fontWeight: 600,
        fontSize: 18,
        marginBottom: 10,
        color: "var(--text-color)"
      }}>
        Announcements & Updates
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {announcements.map((a, i) => (
          <div key={i} style={{
            borderLeft: "4px solid var(--brand-blue)"
          }} className="glass-card" >
            {a}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default InstructorHome;
