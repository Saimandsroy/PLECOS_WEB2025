"use client"
import React from "react";
import "./analytics.css";
import AnalyticsStat from "./components/AnalyticsStat";
import AnalyticsAudience from "./components/AnalyticsAudience";
import AnalyticsEngagement from "./components/AnalyticsEngagement";
import AnalyticsTopCourses from "./components/AnalyticsTopCourses";
// import AnalyticsComments from "./components/AnalyticsComments";
// import AnalyticsRevenue from "./components/AnalyticsRevenue";
// import AnalyticsRatings from "./components/AnalyticsRatings";

const stats = [
    { label: "Total Enrollments", value: "4,278", sub: "+12.8% vs pr 28 days" },
    { label: "Watch Time", value: "1,230", sub: "hours" },
    { label: "Completion Rate", value: "47.2%", sub: "" },
];

const topCourses = [
    { name: "Course A", hours: "831", watch: "68.1h", rate: "69.4%" },
    { name: "Course B", hours: "433", watch: "48.9h", rate: "47.9%" },
    { name: "Course C", hours: "382", watch: "68.9h", rate: "49.4%" },
];

const comments = [
    { text: "Student comment 1..." },
    { text: "Student comment 2..." },
    { text: "Student comment 3..." },
];

const AnalyticsPage = () => (
    <div className="analytics-root">
        <div className="analytics-header">
            {stats.map((s) => (
                <AnalyticsStat key={s.label} {...s} />
            ))}
        </div>
        <div className="analytics-main">
            <div className="analytics-charts">
                <AnalyticsAudience />
                <AnalyticsEngagement />
            </div>
            <div className="analytics-side">
                <AnalyticsTopCourses courses={topCourses} />
                {/* <AnalyticsComments comments={comments} /> */}
            </div>
            {/* <div className="analytics-side">
                <AnalyticsRevenue />
                <AnalyticsRatings />
            </div> */}
        </div>
    </div>
);

export default AnalyticsPage;