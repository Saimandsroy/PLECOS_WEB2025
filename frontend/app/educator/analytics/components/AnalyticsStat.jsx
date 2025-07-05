import React from "react";
import "./AnalyticsStat.css";

const AnalyticsStat = ({ label, value, sub }) => (
    <div className="analytics-stat glass-card">
        <div className="analytics-stat-label">{label}</div>
        <div className="analytics-stat-value">{value}</div>
        <div className="analytics-stat-sub">{sub}</div>
    </div>
);

export default AnalyticsStat;