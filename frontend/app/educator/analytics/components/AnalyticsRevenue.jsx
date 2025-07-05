import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./AnalyticsRevenue.css";

const data = [
    { name: "Jan", value: 2 },
    { name: "Feb", value: 3 },
    { name: "Mar", value: 4 },
    { name: "Apr", value: 6 },
    { name: "May", value: 8 },
];

const AnalyticsRevenue = () => (
    <div className="analytics-card glass-card">
        <div className="analytics-card-title">Revenue Breakdown</div>
        <div className="analytics-bar-chart">
            <ResponsiveContainer width="100%" height={80}>
                <BarChart data={data}>
                    <XAxis dataKey="name" hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1976d2" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default AnalyticsRevenue;