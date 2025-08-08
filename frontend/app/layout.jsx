// app/layout.js
import React from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import TopLoader from '@/components/TopLoader';
import FeedbackFloatingButton from '@/components/FeedbackFloatingButton';
import { UploadProvider } from '@/contexts/UploadContext';

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata = {
  title: "Plecos",
  description: "A learning platform.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        <Providers>
          {" "}
          {/* Wrap everything with Providers */}
          <UploadProvider>
            <TopLoader />
            {children}
            <FeedbackFloatingButton />
          </UploadProvider>
        </Providers>
      </body>
    </html>
  );
};


export default RootLayout;
