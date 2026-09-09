import type { Metadata } from "next";
import * as React from "react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Samar Nagpal — Digital Marketing & Social Media",
  description:
    "Samar Nagpal — digital marketing and social media professional. Brand management, content strategy, creative direction, influencer outreach and campaign execution. Jaipur, India.",
  openGraph: {
    title: "Samar Nagpal — Digital Marketing & Social Media",
    description:
      "Social media, content strategy and creative direction for brands worth stopping for.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Editorial display serif — linked at runtime so the build has no
            font-fetch dependency; falls back to Georgia/serif if offline. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} grain min-h-[100dvh] bg-ink-900 font-sans text-paper antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
