import React from 'react'
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
    subsets: ["latin"],
});

export const metadata = {
    title: "Plecos",
    description: "A learning plateform.",
};
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body
                style={{ height: "100vh", overflow: "hidden" }}
                className={`${manrope.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    )
}

export default RootLayout