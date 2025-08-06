import React from 'react'
import { Manrope } from "next/font/google";
import "./globals.css";
import TopLoader from '@/components/TopLoader';
import FeedbackFloatingButton from '@/components/FeedbackFloatingButton';
import { UploadProvider } from '@/contexts/UploadContext';
import GlobalUploadStatus from '@/components/global/GlobalUploadStatus.jsx';

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
                <UploadProvider>
                    <TopLoader />
                    {children}
                    <GlobalUploadStatus />
                    <FeedbackFloatingButton />
                </UploadProvider>
            </body>
        </html>
    )
}

export default RootLayout