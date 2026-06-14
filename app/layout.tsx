import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReadmeForge — README Generator + Scorer",
  description:
    "Paste a GitHub repo URL → score your README across 4 dimensions and generate a polished replacement using Claude AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
