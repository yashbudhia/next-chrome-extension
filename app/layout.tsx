import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SessionMiddleware from "./session";
import Navbar from "@/components/Navbar";

const OpenSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "boost your productivity",
  description: "Never compromoise on productivity anymore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${OpenSans.className} overflow-x-hidden`}>
        <SessionMiddleware>
          <Navbar />
          {children}
        </SessionMiddleware>
      </body>
    </html>
  );
}
