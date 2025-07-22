"use client";
import React, { useState } from "react";
import "./CourseOverview.css";

const CourseOverview = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [learningPoints, setLearningPoints] = useState([
    "Understand the core concepts of Machine Learning",
    "Differentiate between supervised and unsupervised learning",
    "Build and evaluate simple ML models",
    "Apply ML to real-world scenarios",
  ]);

  const [infoCards, setInfoCards] = useState([
    {
      title: "Prerequisites",
      content: "Basic knowledge of programming and high school mathematics.",
    },
    {
      title: "Ideal For",
      content:
        "Beginners, students, and working professionals starting with ML.",
    },
    {
      title: "Outcomes",
      content: "Grasp ML basics and prepare for intermediate-level projects.",
    },
  ]);

  const handlePointChange = (index, value) => {
    const updated = [...learningPoints];
    updated[index] = value;
    setLearningPoints(updated);
  };

  const handleCardChange = (index, key, value) => {
    const updated = [...infoCards];
    updated[index][key] = value;
    setInfoCards(updated);
  };

  return (
    <div className="overview-container glass-card">
      <div className="overview-header">
        <h2 className="section-heading">What You’ll Learn</h2>
        <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <ul className="learning-list">
        {learningPoints.map((point, index) => (
          <li key={index}>
            {isEditing ? (
              <input
                type="text"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
              />
            ) : (
              point
            )}
          </li>
        ))}
      </ul>

      <div className="course-info-cards">
        {infoCards.map((card, index) => (
          <div key={index} className="info-card">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={card.title}
                  className="info-title-input"
                  onChange={(e) =>
                    handleCardChange(index, "title", e.target.value)
                  }
                />
                <textarea
                  value={card.content}
                  className="info-content-input"
                  onChange={(e) =>
                    handleCardChange(index, "content", e.target.value)
                  }
                />
              </>
            ) : (
              <>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;
