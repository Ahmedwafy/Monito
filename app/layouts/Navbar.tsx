// components/layout/Navbar.tsx

// Next line to disable the rule that prevents setting state in useEffect:
/* eslint-disable react-hooks/set-state-in-effect */

// like the following :

// useEffect(() => {
//   setMounted(true);
// }, []);

// which is necessary for theme handling

"use client";
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Pets", href: "/available-pets" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure theme is only applied after component mounts to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle Search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      router.push(`/available-pets?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/available-pets");
    }
  };

  // Close search when navigating away
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm" />
    );
  }

  return (
    <>
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    font-medium transition-colors relative group
                    ${
                      isActive
                        ? "text-(--color-secondary-monYellow) dark:text-yellow-400"
                        : "text-(--color-primary-darkBlue) dark:text-gray-200 hover:text-(--color-secondary-monYellow) dark:hover:text-yellow-400"
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-(--color-secondary-monYellow) dark:bg-yellow-400 rounded-full transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets by name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full pl-11 py-2.5 text-sm focus:outline-none focus:border-(--color-secondary-monYellow) transition-all"
              />
              <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-(--color-primary-darkBlue) dark:text-gray-200"
            >
              <icons.Search className="w-6 h-6" />
            </button>

            {/* Dark Mode Toggle with animation */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-90"
              aria-label="Toggle theme"
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
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-(--color-primary-darkBlue) dark:text-gray-200 p-2"
            >
              <icons.Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-900 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets by name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full pl-11 py-3 text-sm focus:outline-none focus:border-(--color-secondary-monYellow)"
              />
              <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
          <div
            className={`fixed right-0 top-0 h-full w-4/5 max-w-xs bg-white dark:bg-gray-900 shadow-2xl z-[70] p-6 flex flex-col md:hidden transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" onClick={closeMobileMenu}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-(--color-secondary-monYellow) rounded-full flex items-center justify-center text-(--color-primary-darkBlue) font-bold text-xl">
                    OMF
                  </div>
                  <span className="font-bold text-2xl dark:text-white">
                    One More Friend
                  </span>
                </div>
              </Link>

              <button
                onClick={closeMobileMenu}
                className="text-3xl text-gray-500 dark:text-gray-400 hover:text-(--color-secondary-monYellow)"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`py-3 transition-colors ${
                      isActive
                        ? "text-(--color-secondary-monYellow) dark:text-yellow-400 font-semibold"
                        : "text-(--color-primary-darkBlue) dark:text-gray-200"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-10">
              <Link href="/available-pets" onClick={closeMobileMenu}>
                <Button variant="primary" className="w-full py-4 text-lg">
                  Adopt Now
                  <icons.Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
