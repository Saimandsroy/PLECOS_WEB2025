import React from "react";
import "./AnalyticsTopCourses.css";

const AnalyticsTopCourses = ({ courses }) => (
    <div className="analytics-card glass-card">
        <div className="analytics-card-title">Top Courses</div>
        <table className="analytics-table">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Enrollments</th>
                    <th>Watch</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((c) => (
                    <tr key={c.name}>
                        <td>{c.name}</td>
                        <td>{c.hours}</td>
                        <td>{c.watch}</td>
                        <td>{c.rate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AnalyticsTopCourses;