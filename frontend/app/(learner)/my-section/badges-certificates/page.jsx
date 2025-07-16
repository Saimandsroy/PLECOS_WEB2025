"use client"
import React, { useState } from "react";
import "./BadgesCert.css";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { DownloadIcon } from "react-icons/bi";
import Tabs from "./components/Tabs";
const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState("badges");

  const badges = [
    {
      id: 1,
      title: "Course Completion",
      description: "Completed the 'Introduction to Programming' course",
      icon: "📱",
      color: "teal",
    },
    {
      id: 2,
      title: "Active Participation",
      description:
        "Participated actively in the 'Data Science Fundamentals' course",
      icon: "🏷️",
      color: "mint",
    },
    {
      id: 3,
      title: "Community Contributor",
      description:
        "Contributed significantly to the 'Machine Learning' community forum",
      icon: "🎖️",
      color: "dark",
    },
    {
      id: 4,
      title: "Expert Reviewer",
      description:
        "Reviewed and provided feedback on 5 projects in the 'Web Development' course",
      icon: "📋",
      color: "green",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "Data Science Fundamentals",
      issued: "July 15, 2023",
      color: "teal",
      type: "certificate",
    },
    {
      id: 2,
      title: "Advanced Machine Learning",
      issued: "December 20, 2023",
      color: "light",
      type: "certificate",
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      issued: "May 5, 2024",
      color: "mint",
      type: "certificate",
    },
  ];

  const getBadgeIcon = (title) => {
    switch (title) {
      case "Course Completion":
        return "📱";
      case "Active Participation":
        return "🏷️";
      case "Community Contributor":
        return "🎖️";
      case "Expert Reviewer":
        return "📋";
      default:
        return "🏆";
    }
  };

  return (
    <div className="bac-container">
      <div className="bac-header">
        <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link href={"/my-section"}>
          <ArrowLeftIcon />
        </Link>
        <h2 style={{ fontWeight: 600, fontSize: 24 }}>Badges & Certificates</h2>
      </div>

        <Tabs active={activeTab} setActive={setActiveTab} />
      </div>

      {activeTab === "badges" && (
        <div className="bac-content">
          <div className="bac-grid">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`bac-card bac-badge-card`}
              >
                <div className="bac-card-content">
                  <div className="bac-badge-icon">
                    {getBadgeIcon(badge.title)}
                  </div>
                  <div className="bac-card-info">
                    <h3 className="bac-card-title">{badge.title}</h3>
                    <p className="bac-card-description">{badge.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="bac-content">
          <div className="bac-grid">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className={`bac-card bac-cert-card bac-card-${cert.color}`}
              >
              {/* <div style={{display: 'flex', justifyContent: 'end'}}><DownloadIcon /></div> */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="bac-cert-paper">
                    <div className="bac-cert-header">
                      <div className="bac-cert-border"></div>
                      <h4 className="bac-cert-type">CERTIFICATE</h4>
                      <div className="bac-cert-border"></div>
                    </div>
                    <div className="bac-cert-body">
                      <p className="bac-cert-text">This is to certify that</p>
                      <div className="bac-cert-name">Student Name</div>
                      <p className="bac-cert-text">
                        has successfully completed
                      </p>
                      <div className="bac-cert-course">{cert.title}</div>
                    </div>
                    <div className="bac-cert-footer">
                      <div className="bac-cert-seal">🏆</div>
                    </div>
                  </div>
                </div>
                <div className="bac-cert-info">
                  <h3 className="bac-card-title">{cert.title}</h3>
                  <p className="bac-card-description">
                    Issued on {cert.issued}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
