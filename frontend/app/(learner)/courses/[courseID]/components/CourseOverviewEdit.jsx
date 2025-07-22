import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CourseOverviewEdit.css";

function ensureDotPrefix(lines) {
  return lines.map(line => line.startsWith(".") ? line : ". " + line.replace(/^\s*/, ""));
}

const CourseOverviewEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const [title, setTitle] = useState(data.title || "");
  const [instructor, setInstructor] = useState(data.instructor || "");
  const [duration, setDuration] = useState(data.duration || "");
  const [learningLines, setLearningLines] = useState(
    data.learningList ? ensureDotPrefix(data.learningList) : [". "]
  );
  const textareaRef = useRef(null);

  // Bullet point editor logic
  const handleLearningChange = (e) => {
    let value = e.target.value;
    let lines = value.split("\n").map(line => line.replace(/^\s*/, ""));
    lines = ensureDotPrefix(lines);
    setLearningLines(lines);
  };

  const handleLearningKeyDown = (e) => {
    const { selectionStart, value } = e.target;
    const before = value.slice(0, selectionStart);
    if (e.key === "Enter") {
      e.preventDefault();
      const insertPos = selectionStart;
      const newValue =
        value.slice(0, insertPos) +
        "\n. " +
        value.slice(insertPos);
      setLearningLines(ensureDotPrefix(newValue.split("\n")));
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = insertPos + 3;
        }
      }, 0);
    }
    // Prevent removing dot at line start
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      before.endsWith(". ") &&
      (before === ". " || before.endsWith("\n. "))
    ) {
      e.preventDefault();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      title,
      instructor,
      duration,
      learningList: learningLines,
    };
    // Replace with actual save logic
    console.log("Updated course overview:", updated);
    navigate(-1);
  };

  return (
    <div className="edit-container">
      <form className="edit-form" onSubmit={handleSave}>
        <h2 className="edit-heading">Edit Course Overview</h2>
        <div className="edit-field">
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="edit-input"
            required
          />
        </div>
        <div className="edit-field">
          <label>Instructor</label>
          <input
            type="text"
            value={instructor}
            onChange={e => setInstructor(e.target.value)}
            className="edit-input"
            required
          />
        </div>
        <div className="edit-field">
          <label>Duration</label>
          <input
            type="text"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="edit-input"
            required
          />
        </div>
        <div className="edit-field">
          <label>What you'll learn</label>
          <textarea
            ref={textareaRef}
            className="edit-textarea"
            rows={Math.max(learningLines.length, 4)}
            value={learningLines.join("\n")}
            onChange={handleLearningChange}
            onKeyDown={handleLearningKeyDown}
            required
          />
          <small className="edit-hint">Each line starts with a dot. Press Enter for a new bullet.</small>
        </div>
        <div className="edit-actions">
          <button type="submit" className="edit-save-btn">Save</button>
          <button type="button" className="edit-cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CourseOverviewEdit;
