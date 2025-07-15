"use client";
import React, { useState } from "react";
import "./CourseContent.css";

const tabs = [
  { key: "live", label: "Live Lectures" },
  { key: "lectures", label: "Lectures" },
  { key: "assignments", label: "Assignments" },
  { key: "documents", label: "Documents" },
  { key: "tests", label: "Tests" },
];

export default function CourseContent() {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <div className="course-content">
      <div className="content-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`content-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "live" && <p>📡 Live lectures will be listed here.</p>}
        {activeTab === "lectures" && <p>🎥 All course videos will be shown here.</p>}
        {activeTab === "assignments" && <p>📝 Assignments will be listed here.</p>}
        {activeTab === "documents" && <p>📄 Downloadable documents will appear here.</p>}
        {activeTab === "tests" && <p>🧪 Quizzes and tests go here.</p>}
      </div>
    </div>
  );
}
