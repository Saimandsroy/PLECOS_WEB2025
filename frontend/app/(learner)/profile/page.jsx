"use client"
import React, { useState } from "react";
import "./page.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <div className="p-profile-container">
      <div className="p-profile-header">
        <div className="p-profile-avatar">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="15" fill="#8B4513" />
            <path
              d="M20 85 C20 65, 35 50, 50 50 C65 50, 80 65, 80 85 Z"
              fill="#8B4513"
            />
          </svg>
        </div>
        <h1 className="p-profile-name">Sophia Clark</h1>
        <p className="p-profile-level">Level 7</p>
        <p className="p-profile-joined">Joined 2 years ago</p>
      </div>

      {/* <div className="p-profile-stats">
        <div className="p-stat-card">
          <div className="p-stat-number">5</div>
          <div className="p-stat-label">Courses Enrolled</div>
        </div>
        <div className="p-stat-card">
          <div className="p-stat-number">80%</div>
          <div className="p-stat-label">Completion Rate</div>
        </div>
        <div className="p-stat-card">
          <div className="p-stat-number">12</div>
          <div className="p-stat-label">Badges Earned</div>
        </div>
      </div> */}

      <div className="p-profile-tabs">
        <button
          className={`p-tab-button ${
            activeTab === "Personal Info" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Personal Info")}
        >
          Personal Info
        </button>
        <button
          className={`p-tab-button ${
            activeTab === "Educational Info" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Educational Info")}
        >
          Educational Info
        </button>
        <button
          className={`p-tab-button ${
            activeTab === "Social Platform Linking" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Social Platform Linking")}
        >
          Social Platform Linking
        </button>
      </div>

      <div className="p-profile-content">
        <div className="p-tab-content">
          {activeTab === "Personal Info" && (
            <div>
              <div className="p-form-group">
                <label className="p-form-label">Date of Birth</label>
                <input
                  type="date"
                  className="p-form-input"
                  placeholder="Select date"
                />
              </div>
              <div className="p-form-group">
                <label className="p-form-label">Location</label>
                <input
                  type="text"
                  className="p-form-input"
                  placeholder="Enter your location"
                />
              </div>
              <button className="p-update-button">Update Personal Info</button>
            </div>
          )}

          {activeTab === "Educational Info" && (
            <div>
              <div className="p-form-group">
                <label className="p-form-label">Highest Education</label>
                <input
                  type="text"
                  className="p-form-input"
                  placeholder="Enter your highest education"
                />
              </div>
              <div className="p-form-group">
                <label className="p-form-label">Institution</label>
                <input
                  type="text"
                  className="p-form-input"
                  placeholder="Enter your institution"
                />
              </div>
              <div className="p-form-group">
                <label className="p-form-label">Field of Study</label>
                <input
                  type="text"
                  className="p-form-input"
                  placeholder="Enter your field of study"
                />
              </div>
              <button className="p-update-button">
                Update Educational Info
              </button>
            </div>
          )}

          {activeTab === "Social Platform Linking" && (
            <div>
              <div className="p-form-group">
                <label className="p-form-label">LinkedIn Profile</label>
                <input
                  type="url"
                  className="p-form-input"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="p-form-group">
                <label className="p-form-label">GitHub Profile</label>
                <input
                  type="url"
                  className="p-form-input"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              <div className="p-form-group">
                <label className="p-form-label">Twitter Profile</label>
                <input
                  type="url"
                  className="p-form-input"
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              <button className="p-update-button">Update Social Links</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
