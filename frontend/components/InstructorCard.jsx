import React from "react";
import "@/app/(learner)/components/EducatorRibbon.css";
const InstructorCard = ({ instructor }) => (
  <div className="explore-instructors__card">
    <div className="explore-instructors__badge">⭐ {instructor.rating}</div>
    <div className="explore-instructors__avatar">
      <div className="explore-instructors__emoji">{instructor.avatar}</div>
      <h3 className="explore-instructors__name">
        {instructor.name}
        {instructor.verified && (
          <span className="explore-instructors__verified">✓</span>
        )}
      </h3>
      <p className="explore-instructors__title-text">{instructor.title}</p>
      <p className="explore-instructors__specialty">{instructor.specialty}</p>
    </div>
    <div className="explore-instructors__stats">
      <div className="explore-instructors__stat">
        <div className="explore-instructors__stat-value">
          {instructor.followers}
        </div>
        <div className="explore-instructors__stat-label">Followers</div>
      </div>
      <div className="explore-instructors__stat">
        <div className="explore-instructors__stat-value">
          {instructor.courses}
        </div>
        <div className="explore-instructors__stat-label">Courses</div>
      </div>
    </div>
  </div>
);

export default InstructorCard;
