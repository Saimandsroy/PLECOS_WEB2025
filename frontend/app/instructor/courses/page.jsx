"use client";

import React, { useState } from "react";

const myCourses = [
  {
    title: "Advanced Physics",
    desc: "Deep dive into quantum mechanics and relativity.",
    students: 120,
    published: true,
    feedback: "4.9/5",
  },
  {
    title: "Data Structures",
    desc: "Master trees, graphs, and algorithms.",
    students: 85,
    published: false,
    feedback: "4.7/5",
  },
];

const myShorts = [
  { id: 1, title: "Quick Sorting Demo", views: 900, likes: 40 },
  { id: 2, title: "Physics in 60s", views: 1200, likes: 55 },
];

const tabs = [
  { key: "courses", label: "My Courses" },
  { key: "shorts", label: "My Shorts" },
  { key: "upload", label: "Upload Short" },
  { key: "create", label: "Create Course" },
];

const InstructorCoursesPage = () => {
  const [tab, setTab] = useState("courses");

  return (
    <div style={{ padding: "2rem 0", color: "var(--text-color)" }}>
      <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>
        Instructor Courses
      </h2>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 10,
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: 12,
          marginBottom: 24,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background:
                tab === t.key ? "var(--brand-blue)" : "var(--background-primary)",
              color: tab === t.key ? "#fff" : "var(--text-color)",
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              boxShadow:
                tab === t.key ? "0 2px 8px rgba(30,41,59,0.06)" : "none",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 12 }}>
        {tab === "courses" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {myCourses.map((c, i) => (
              <div key={i} className="glass-card">
                <div style={{ fontWeight: 700, fontSize: 18 }}>{c.title}</div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 15,
                    flexGrow: 1,
                  }}
                >
                  {c.desc}
                </div>
                <div style={{ fontSize: 14, marginTop: 4 }}>
                  Students: <b>{c.students}</b>
                  <span style={{ float: "right" }}>
                    {c.published ? (
                      <span style={{ color: "#22c55e" }}>Published</span>
                    ) : (
                      <span style={{ color: "#f59e0b" }}>Draft</span>
                    )}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: "var(--brand-blue)" }}>
                  Feedback: {c.feedback}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "shorts" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {myShorts.map((short) => (
              <div key={short.id} className="glass-card">
                <div style={{ fontWeight: 600, fontSize: 17 }}>
                  {short.title}
                </div>
                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 15,
                  }}
                >
                  👁 {short.views} &nbsp; | &nbsp; ❤️ {short.likes}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "upload" && (
          <div className="glass-card" style={{ maxWidth: 420, margin: "0 auto" }}>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              Upload a New Short
            </h3>
            <input type="file" accept="video/*" style={{ marginBottom: 16 }} />
            <input
              type="text"
              placeholder="Short Title"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--border-color)",
                marginBottom: 16,
                fontSize: 15,
              }}
            />
            <button
              style={{
                background: "var(--brand-blue)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 22px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Upload Short
            </button>
          </div>
        )}

        {tab === "create" && (
          <div className="glass-card" style={{ maxWidth: 520, margin: "0 auto" }}>
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              Create a New Course
            </h3>
            <input
              type="text"
              placeholder="Course Title"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--border-color)",
                marginBottom: 16,
                fontSize: 15,
              }}
            />
            <textarea
              placeholder="Course Description"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid var(--border-color)",
                marginBottom: 16,
                fontSize: 15,
                minHeight: 80,
                resize: "vertical",
              }}
            />
            <button
              style={{
                background: "#22c55e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 22px",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Create Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCoursesPage;
