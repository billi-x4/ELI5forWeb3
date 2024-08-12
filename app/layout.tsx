import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import OCIDProvider from "@/components/OCIDProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🔥 explain like i'm five on EduChain ✨",
  description:
    "ELI5 for Web3 aims to simplify complex Web3 projects and blockchain stuffs. We explain everything in a simple, fun way, helping you learn and understand Web3 topics quickly and easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OCIDProvider>{children}</OCIDProvider>
        <Analytics />
      </body>
    </html>
  );
}
