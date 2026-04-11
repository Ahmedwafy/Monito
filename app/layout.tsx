import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/app/layouts/Navbar";
import Footer from "@/app/layouts/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import RouteLoader from "@/app/components/ui/RouteLoader";
import { Suspense } from "react";
// import NextTopLoader from "nextjs-toploader";  // old loader ... blue bar at top
import "./globals.css";

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
        <ThemeProvider
          attribute="class"
          // defaultTheme="system" // follow system (light/dark)
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange // disable transition when switching theme
        >
          <Suspense fallback={null}>
            <RouteLoader />
          </Suspense>
          {/* <NextTopLoader
            color="var(--color-primary-darkBlue)"  // old loader ... blue bar at top
            showSpinner={false}
            height={3}
          /> */}
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
