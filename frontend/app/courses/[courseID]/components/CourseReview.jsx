"use client";
import React, { useState } from "react";
import "./CourseReview.css";
const reviews = [
  {
    name: "Riya Sharma",
    rating: 5,
    comment: "Great course, very clear explanations!",
  },
  {
    name: "Amit Kumar",
    rating: 4,
    comment: "Good content, could use more projects.",
  },
  { name: "Fatima N.", rating: 5, comment: "Perfect for beginners!" },
];
const CourseReview = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleSubmitReview = () => {
    if (newReview.name && newReview.rating && newReview.comment) {
      reviews.unshift({ ...newReview }); // Add to top of array (temporary)
      setNewReview({ name: "", rating: 0, comment: "" });
      alert("Review submitted!");
    } else {
      alert("Please fill out all fields.");
    }
  };
  return (
    <div className="container">
      <div>
        <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
          Write your review
        </h3>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Your name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid var(--border-color)",
            marginBottom: 12,
            fontSize: 15,
          }}
        />

        {/* Star Rating Input */}
        <div style={{ marginBottom: 12, fontSize: 24, color: "#999" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setNewReview({ ...newReview, rating: star })}
              style={{
                cursor: "pointer",
                color: newReview.rating >= star ? "#FF7F3F" : "#666",
                transition: "color 0.2s",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          placeholder="Write your review"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid var(--border-color)",
            marginBottom: 16,
            fontSize: 15,
            resize: "vertical",
            minHeight: 80,
          }}
        />

        <button
          onClick={handleSubmitReview}
          style={{
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 24,
          }}
        >
          Submit Review
        </button>
      </div>
      <div>
        {/* Existing Reviews */}
        <section className="course-section">
          <h2 style={{ fontWeight: 700, fontSize: 20, padding:8 }}>Student Reviews</h2>
          <div className="review-card-list">
            {reviews.map((rev, i) => (
              <div key={i} className="review-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h4 style={{ fontWeight: 600 }}>{rev.name}</h4>
                  <span style={{ color: "#FF7F3F", fontSize: 18 }}>
                    {"★".repeat(rev.rating)}{" "}
                  </span>
                </div>
                <p style={{ marginTop: 6 }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseReview;
