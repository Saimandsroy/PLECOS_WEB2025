import React from 'react'
import { Manrope } from "next/font/google";
import "./globals.css";
import TopLoader from '@/components/TopLoader';
import FeedbackFloatingButton from '@/components/FeedbackFloatingButton';

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
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <body
                className={`${manrope.variable} antialiased`}
            >
                <TopLoader />
                {children}
                <FeedbackFloatingButton />
            </body>
        </html>
    )
}

export default RootLayout