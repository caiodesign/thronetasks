import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Throne Tasks",
  description:
    "Throne Tasks is your simple companion for tracking daily and weekly activities in Throne and Liberty! With Throne Tasks, you’ll never miss out on important quests, bosses, or challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased ${GeistSans.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-Y29SJSK20C" />
      </body>
    </html>
  );
}
