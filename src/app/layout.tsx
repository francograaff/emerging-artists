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
      <body className={`${inter.className} font-normal text-black bg-white`}>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="border-t border-gray-200 my-8"></div>
          </div>
          <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 bg-white">
            {children}
          </main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="border-t border-gray-200 my-8"></div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
