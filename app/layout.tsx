import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Monito",
  description:
    "Monito is a pet adoption platform that connects loving families with animals in need. Our mission is to give every pet a second chance at a happy life. Join us in making tails wag and hearts full.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Navbar />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
