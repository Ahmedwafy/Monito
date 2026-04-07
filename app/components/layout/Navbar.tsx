"use client";

import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation"; // for active link
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Pets", href: "/available-pets" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname(); // Get current path (URL)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm" />
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="relative">
            <div className="absolute w-[400px] h-[400px] -top-90 -left-50 rotate-25 bg-(--color-secondary-monYellow) dark:bg-yellow-600/30 z-0 rounded-[15%] transition-colors" />
            <Image
              src={images.logo}
              alt="Logo"
              className="relative dark:invert"
            />
          </div>
        </Link>

        {/* Desktop Menu with Active Link */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // Check if the current path is equal to the link's href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  font-medium transition-colors relative group
                    ${
                      isActive
                        ? "text-(--color-secondary-monYellow) dark:text-yellow-400" // Active link style
                        : "text-(--color-primary-darkBlue) dark:text-gray-200 hover:text-(--color-secondary-monYellow) dark:hover:text-yellow-400" // Inactive link style
                    }
                `}
              >
                {link.label}

                {/* Animated underline */}
                <span
                  className={`
                    absolute -bottom-1 left-0 h-0.5 bg-(--color-secondary-monYellow) dark:bg-yellow-400 
                    rounded-full transition-all duration-300 ease-out
                    ${isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"}
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              <icons.Sun className="w-6 h-6 text-yellow-400 animate-spin-once" />
            ) : (
              <icons.Moon className="w-6 h-6 text-(--color-primary-darkBlue) animate-spin-once" />
            )}
          </button>

          {/* Adopt Now Button */}
          <div className="hidden md:block">
            <Link href="/available-pets">
              <Button
                variant="primary"
                className="bg-(--color-primary-darkBlue) dark:bg-blue-600 text-white hover:bg-(--color-primary-darkBlue)/90 dark:hover:bg-blue-700 flex items-center gap-2 transition-colors"
              >
                Adopt Now
                <icons.Heart className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-(--color-primary-darkBlue) dark:text-gray-200">
            <icons.Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>
    </header>
  );
}
