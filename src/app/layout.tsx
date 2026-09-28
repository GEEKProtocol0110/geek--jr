import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geek Jr",
  description: "Five playful learning activities for kids ages 1–10. Picture cards, phonics, memory, patterns, and stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
