import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/app/layouts/Navbar";
import Footer from "@/app/layouts/Footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import RouteLoader from "@/components/ui/RouteLoader";
import { Suspense } from "react";
import QueryProvider from "@/components/providers/QueryProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <RouteLoader />
            </Suspense>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            {children}
            <Toaster position="top-right" richColors />
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
