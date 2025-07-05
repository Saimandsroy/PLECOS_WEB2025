'use client';

import React from 'react';
import './AboutInstructor.css';

const AboutInstructor = () => {
  return (
    <div className="instructor-card">
      <img
        src="/instructor.jpeg"
        alt="Raghav Garg"
        className="instructor-image"
      />
      <div className="instructor-info">
        <h2 className="section-heading">Course Instructor</h2>
        <h3 className="instructor-name">Raghav Garg</h3>
        <p className="instructor-role">
          Senior Member of Technical Staff @ GeeksForGeeks
        </p>
        <p className="instructor-bio">
          <b>Raghav Garg</b> is a seasoned mentor and Senior Member of Technical
          Staff at GeeksforGeeks, known for his impactful contributions to
          technical education and software development. With a teaching legacy
          that has reached <b>millions of students online</b>, Raghav is widely
          recognized for simplifying complex concepts in programming and system
          design.
        </p>
        <p className="instructor-bio">
          Before joining GFG, he served as a <b>Software Engineer at Paytm</b>{" "}
          and later as a <b>Mentor and Developer at PhysicsWallah</b>, where he
          combined hands-on development with educational content creation. His
          industry experience across fast-paced tech companies equips him with a
          deep understanding of scalable systems and real-world engineering
          challenges.
        </p>
        <p className="instructor-bio">
          Raghav’s mentorship is grounded in practical knowledge, structured
          learning, and a commitment to student success—making him a trusted
          guide for learners aiming to break into top tech roles.
        </p>
      </div>
    </div>
  );
};

export default AboutInstructor;
