import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Throne Tasks",
  description:
    "ThroneTasks is your simple companion for tracking daily and weekly activities in Throne and Liberty! With ThroneTasks, you’ll never miss out on important quests, bosses, or challenges.",
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
      </body>
    </html>
  );
}
