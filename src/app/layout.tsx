import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Barry</title>
        <link rel="icon" type="image/x-icon" href="/barry.png"></link>
      </head>
      <body className="bg-cyan-800 text-white">
        <main className="max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
