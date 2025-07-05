import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./AnalyticsEngagement.css";

const data = [
    { name: "Mon", Engagement: 80 },
    { name: "Tue", Engagement: 100 },
    { name: "Wed", Engagement: 90 },
    { name: "Thu", Engagement: 120 },
    { name: "Fri", Engagement: 110 },
    { name: "Sat", Engagement: 140 },
    { name: "Sun", Engagement: 160 },
];

const AnalyticsEngagement = () => (
    <div className="analytics-card glass-card">
        <div className="analytics-card-title">Engagement</div>
        <div className="analytics-chart-container">
            <ResponsiveContainer width="100%" height={80}>
                <LineChart data={data}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="Engagement" stroke="#ff9800" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default AnalyticsEngagement;