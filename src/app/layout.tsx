import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emerging Artists Platform",
  description: "Discover and support early-career artists. Find unique, original artwork and help shape the future of art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-normal`} style={{ background: 'transparent' }}>
        <div className="min-h-screen flex flex-col" style={{ background: 'transparent' }}>
          <Header />
          <main className="flex-1" style={{ background: 'transparent' }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
