import type { Metadata } from "next";
import "./globals.css";
import FallingFlowers from "@/components/FallingFlowers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Pink Blog",
  description: "A beautiful blog built with Next.js and Strapi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FallingFlowers />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
