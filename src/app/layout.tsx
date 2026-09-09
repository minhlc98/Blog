import type { Metadata } from "next";
import "./globals.css";
import FallingFlowers from "@/components/FallingFlowers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bubu Dudu Blog",
  description: "Nơi lưu giữ những khoảnh khắc ngọt ngào và kỷ niệm đáng yêu của Bubu và Dudu",
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
