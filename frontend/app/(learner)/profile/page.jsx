'use client'
import React, { useState } from 'react';
import './page.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="p-container">
      <div className="p-card">
        {/* Header Section */}
        <div className="p-header">
          <div className="p-header-content">
            <div className="p-avatar">
              <span className="p-avatar-text">P</span>
            </div>
            <div className="p-user-info">
              <h1 className="p-user-name">Rahul Saini</h1>
              <p className="p-user-title">Software Developer</p>
              <div className="p-location">
                <span className="p-location-icon">📍</span>
                <span>Bilaspur, India</span>
              </div>
            </div>
            <div className="p-edit-button-container">
              <button className="p-edit-button">
                <span className="p-edit-icon">✏️</span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="p-tabs-border">
          <nav className="p-tabs-nav">
            <button 
              className={`p-tab-button ${activeTab === 'personal' ? 'p-tab-active' : ''}`}
              onClick={() => handleTabClick('personal')}
            >
              Personal Details
            </button>
            <button 
              className={`p-tab-button ${activeTab === 'education' ? 'p-tab-active' : ''}`}
              onClick={() => handleTabClick('education')}
            >
              Educational Details
            </button>
            <button 
              className={`p-tab-button ${activeTab === 'experience' ? 'p-tab-active' : ''}`}
              onClick={() => handleTabClick('experience')}
            >
              Experience
            </button>
            <button 
              className={`p-tab-button ${activeTab === 'social' ? 'p-tab-active' : ''}`}
              onClick={() => handleTabClick('social')}
            >
              Social Links
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-content">
          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="p-tab-content">
              <div className="p-grid">
                <div className="p-field">
                  <label className="p-label">Full Name</label>
                  <p className="p-value">Rahul Kumar</p>
                </div>
                <div className="p-field">
                  <label className="p-label">Email</label>
                  <p className="p-value">rahul@example.com</p>
                </div>
                <div className="p-field">
                  <label className="p-label">Phone</label>
                  <p className="p-value">+91 12345 67890</p>
                </div>
                <div className="p-field">
                  <label className="p-label">Date of Birth</label>
                  <p className="p-value">January 1, 2000</p>
                </div>
                <div className="p-field p-field-full">
                  <label className="p-label">About Me</label>
                  <p className="p-value p-about-text">
                    A passionate software developer with a knack for creating elegant solutions in the least amount of time. I am interested in web development and competitive programming.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="p-tab-content">
              <div className="p-education-list">
                <div className="p-education-item">
                  <p className="p-education-title">Guru Ghasidas Vishwavidyalaya (GGU), Bilaspur</p>
                  <p className="p-education-subtitle">Bachelor of Technology in Computer Science</p>
                  <p className="p-education-date">2020 - 2024</p>
                </div>
                <div className="p-education-item">
                  <p className="p-education-title">High School</p>
                  <p className="p-education-subtitle">Science Stream</p>
                  <p className="p-education-date">2018 - 2020</p>
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="p-tab-content">
              <div className="p-experience-list">
                <div className="p-experience-item">
                  <p className="p-experience-title">Software Development Intern</p>
                  <p className="p-experience-subtitle">Tech Solutions Inc. | Summer 2023</p>
                  <ul className="p-experience-details">
                    <li>Developed and maintained web applications using React and Node.js.</li>
                    <li>Collaborated with a team of developers to deliver high-quality software.</li>
                    <li>Participated in code reviews and agile development processes.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === 'social' && (
            <div className="p-tab-content">
              <div className="p-grid">
                <div className="p-field">
                  <label className="p-label">LinkedIn</label>
                  <a className="p-link" href="#">linkedin.com/in/gpriye0ns</a>
                </div>
                <div className="p-field">
                  <label className="p-label">GitHub</label>
                  <a className="p-link" href="#">github.com/gpriye0ns</a>
                </div>
                <div className="p-field">
                  <label className="p-label">Twitter</label>
                  <a className="p-link" href="#">twitter.com/gpriye0ns</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;