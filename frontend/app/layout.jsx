"use client";
import React from 'react'
import { Manrope } from "next/font/google";
import "./globals.css";
import { useTheme } from '@/hooks/useTheme';

const manrope = Manrope({
    subsets: ["latin"],
});

// export const metadata = {
//     title: "Plecos",
//     description: "A learning plateform.",
// };
const RootLayout = ({ children }) => {

    const { theme, toggleTheme } = useTheme();
    console.log("Current theme:", theme);
    return (
        <html lang="en">
            <body
                style={{ height: "100vh" }}
                className={`${manrope.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    )
}

export default RootLayout