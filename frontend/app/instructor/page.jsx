"use client";

import React from "react";
import Link from "next/link";

const instructor = {

};

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
      <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0 }}>
        Welcome Back 👋
      </h2>
    </div>
    {/* Metrics */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 20,
      marginBottom: 32
    }}>
      {metrics.map((m) => (
        <div key={m.label} style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(30,41,59,0.06)",
          padding: "1.2rem 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 6,
          minHeight: 90
        }}>
          <div style={{ fontWeight: 700, fontSize: 22 }}>{m.value}</div>
          <div style={{ color: "#64748b", fontSize: 15 }}>{m.label}</div>
        </div>
      ))}
    </div>
    {/* Quick Actions */}
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.route}
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 8,
            padding: "0.8rem 1.3rem",
            fontWeight: 600,
            fontSize: 15,
            color: "#232323",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(30,41,59,0.03)",
            transition: "background 0.16s, border 0.16s",
            textDecoration: "none",
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
    {/* Announcements */}
    <div>
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Announcements & Updates</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {announcements.map((a, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 8,
            padding: "1rem 1.2rem",
            fontSize: 15,
            color: "#232323",
            boxShadow: "0 2px 8px rgba(30,41,59,0.04)",
            borderLeft: "4px solid #6366f1"
          }}>
            {a}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default InstructorHome;