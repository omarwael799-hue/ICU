import React from "react";
import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/page-loader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700", "800", "900"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-ibm-plex-arabic",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "اتحاد الشركات الدولي | International Companies Union",
  description:
    "منصة عالمية تجمع الشركات والمؤسسات تحت مظلة اتحاد دولي موحد لتعزيز التعاون والتمثيل والاعتماد المهني",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${ibmPlexArabic.variable} font-sans antialiased`}
      >
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
