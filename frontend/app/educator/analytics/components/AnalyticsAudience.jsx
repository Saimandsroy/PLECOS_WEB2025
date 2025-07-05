import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./AnalyticsAudience.css";

const data = [
    { name: "Mon", Mobile: 120, Desktop: 90 },
    { name: "Tue", Mobile: 132, Desktop: 100 },
    { name: "Wed", Mobile: 101, Desktop: 120 },
    { name: "Thu", Mobile: 134, Desktop: 110 },
    { name: "Fri", Mobile: 90, Desktop: 130 },
    { name: "Sat", Mobile: 230, Desktop: 150 },
    { name: "Sun", Mobile: 210, Desktop: 170 },
];

const AnalyticsAudience = () => (
    <div className="analytics-card glass-card">
        <div className="analytics-card-title">Audience</div>
        <div className="analytics-chart-container">
            <ResponsiveContainer width="100%" height={80}>
                <LineChart data={data}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="Mobile" stroke="#1976d2" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Desktop" stroke="#ff9800" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <div className="analytics-mini-chart-labels">
                <span>Mobile</span>
                <span>Desktop</span>
            </div>
        </div>
    </div>
);

export default AnalyticsAudience;