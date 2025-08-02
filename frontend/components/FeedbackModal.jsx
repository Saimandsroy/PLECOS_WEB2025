"use client";
import React, { useState, useRef, useEffect } from "react";
import "./FeedbackModal.css";

const feedbackOptions = [
  "General feedback",
  "Feature request",
  "Report an issue",
  "Support/Account/Billing",
  "UI feedback",
];

const FeedbackModal = ({ open, onClose, pageName }) => {
  const [feedbackType, setFeedbackType] = useState(feedbackOptions[0]);
  const [message, setMessage] = useState("");
  const [satisfaction, setSatisfaction] = useState(null);
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!open) return null;

  const handleSelectOption = (option) => {
    setFeedbackType(option);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      page: pageName,
      type: feedbackType,
      message,
      isSatisfied: satisfaction,
      contactEmail: email,
      attachedFile: file ? file.name : "No file attached",
    });
    onClose();
  };

  return (
    <div className="feedbackModalOverlay" onClick={onClose}>
      <div
        className="feedbackModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <h3>Feedback for {pageName || "Current Page"}</h3>
          <button
            onClick={onClose}
            className="closeButton"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <p
            className="helperText"
            style={{ marginTop: 0, marginBottom: "24px" }}
          >
            Thank you for taking time to provide feedback.
          </p>

          <div className="formGroup">
            <label className="formLabel" htmlFor="feedback-type">
              Type
            </label>
            <p className="helperText" style={{ marginTop: "-4px" }}>
              Choose the type of feedback you are submitting.
            </p>

            {/* --- Custom Dropdown Implementation --- */}
            <div className="customSelectContainer" ref={dropdownRef}>
              <button
                type="button"
                className="selectTrigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {feedbackType}
                <svg
                  className={`chevronIcon ${isDropdownOpen ? "open" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="optionsList">
                  {feedbackOptions.map((option) => (
                    <li
                      key={option}
                      className="optionItem"
                      onClick={() => handleSelectOption(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ... The rest of the form is unchanged ... */}
          <div className="formGroup">
            <label className="formLabel" htmlFor="feedback-message">
              Enter your message below
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="formTextarea"
              maxLength="1000"
            />
            <small className="helperText">
              {1000 - message.length} characters available.
            </small>
          </div>

          <div className="formGroup">
            <p className="formLabel" style={{ marginBottom: "12px" }}>
              Are you satisfied with your experience?
            </p>
            <label
              style={{
                marginRight: "20px",
                fontWeight: "normal",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="satisfaction"
                value="yes"
                onChange={(e) => setSatisfaction(e.target.value)}
                style={{ marginRight: "6px" }}
              />{" "}
              Yes
            </label>
            <label style={{ fontWeight: "normal", cursor: "pointer" }}>
              <input
                type="radio"
                name="satisfaction"
                value="no"
                onChange={(e) => setSatisfaction(e.target.value)}
                style={{ marginRight: "6px" }}
              />{" "}
              No
            </label>
          </div>

          <div className="formGroup">
            <label className="formLabel" htmlFor="email-address">
              Email address for follow-up. - <i>optional</i>
            </label>
            <input
              type="email"
              id="email-address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formInput"
            />
          </div>

          {/* <div className="formGroup">
            <label className="formLabel" htmlFor="file-attachment">
              File attachment
            </label>
            <input
              type="file"
              id="file-attachment"
              onChange={(e) => setFile(e.target.files[0])}
              className="formInput"
            />
            <p className="helperText" style={{ marginTop: "8px" }}>
              Please don't attach images with PII information.
            </p>
          </div> */}

          <div className="buttonContainer">
            <button
              type="button"
              onClick={onClose}
              className="modalButton cancelButton"
            >
              Cancel
            </button>
            <button type="submit" className="modalButton submitButton">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
