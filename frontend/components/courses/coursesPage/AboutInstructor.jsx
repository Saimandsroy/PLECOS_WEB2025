"use client";

import React, { useState, useRef } from "react";
import "./AboutInstructor.css";

const AboutInstructor = () => {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [instructorData, setInstructorData] = useState({
    name: "Raghav Garg",
    role: "Senior Member of Technical Staff @ GeeksForGeeks",
    bios: [
      `Raghav Garg is a seasoned mentor and Senior Member of Technical Staff at GeeksforGeeks, known for his impactful contributions to technical education and software development. With a teaching legacy that has reached millions of students online, Raghav is widely recognized for simplifying complex concepts in programming and system design.`,
      `Before joining GFG, he served as a Software Engineer at Paytm and later as a Mentor and Developer at PhysicsWallah, where he combined hands-on development with educational content creation. His industry experience across fast-paced tech companies equips him with a deep understanding of scalable systems and real-world engineering challenges.`,
      `Raghav’s mentorship is grounded in practical knowledge, structured learning, and a commitment to student success—making him a trusted guide for learners aiming to break into top tech roles.`,
    ],
    image: "/instructor.jpeg",
  });

  const handleChange = (key, value) => {
    setInstructorData((prev) => ({ ...prev, [key]: value }));
  };

  const handleBioChange = (index, value) => {
    const newBios = [...instructorData.bios];
    newBios[index] = value;
    setInstructorData((prev) => ({ ...prev, bios: newBios }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setInstructorData((prev) => ({ ...prev, image: previewURL }));
    }
  };

  const handleSave = async () => {
    try {
      localStorage.setItem("instructorData", JSON.stringify(instructorData));
      setIsEditing(false);
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  return (
    <div className="instructor-card glass-card">
      <div className="image-container">
        <img
          src={instructorData.image}
          alt={instructorData.name}
          className="instructor-image"
          onClick={() => isEditing && fileInputRef.current.click()}
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        )}
      </div>

      <div className="instructor-info">
        <div className="instructor-header">
          <h2 className="section-heading">Course Instructor</h2>
          <button
            className="edit-btn"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <>
            <input
              className="edit-input name-input"
              value={instructorData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              className="edit-input role-input"
              value={instructorData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            {instructorData.bios.map((bio, idx) => (
              <textarea
                key={idx}
                className="edit-textarea bio-input"
                value={bio}
                onChange={(e) => handleBioChange(idx, e.target.value)}
              />
            ))}
          </>
        ) : (
          <>
            <h3 className="instructor-name">{instructorData.name}</h3>
            <p className="instructor-role">{instructorData.role}</p>
            {instructorData.bios.map((bio, idx) => (
              <p key={idx} className="instructor-bio">
                {bio}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AboutInstructor;
