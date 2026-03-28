// // components/layout/Navbar.tsx
// import Link from "next/link";
// import Button from "@/app/components/atoms/Button";
// import * as icons from "@/assets/icons";
// import * as images from "@/assets/images/images";
// import Image from "next/image";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Available Pets", href: "/availablePets" },
//   { label: "Categories", href: "/categories" },
//   { label: "About Us", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function Navbar() {
//   return (
//     <header className="sticky top-0 z-500 bg-white/90 backdrop-blur-md shadow-sm">
//       <nav className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <div className="relative">
//             <div className="absolute w-[400px] h-[400px] -top-90 -left-50 rotate-25 bg-(--color-secondary-monYellow) z-0 rounded-[15%]"></div>
//             <Image src={images.logo} alt="Logo" className="relative" />
//           </div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="text-(--color-primary-darkBlue) font-medium hover:text-(--color-secondary-monYellow) transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <div className="hidden md:block">
//           <Link href="/availablePets">
//             <Button
//               variant="primary"
//               className="bg-(--color-primary-darkBlue) text-white hover:bg-(--color-primary-darkBlue)/90 flex items-center gap-2"
//             >
//               Adopt Now
//               <icons.Heart className="w-5 h-5" />
//             </Button>
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-(--color-primary-darkBlue)">
//           <icons.Menu className="w-8 h-8" />
//         </button>
//       </nav>
//     </header>
//   );
// }
// components/layout/Navbar.tsx
// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Pets", href: "/availablePets" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme(); // to Toggle light / dark mode

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // bg-white/90 dark:bg-gray-900/90
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md shadow-sm transition-colors duration-300`}
    >
      <nav className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="relative">
            <div className="absolute w-[400px] h-[400px] -top-90 -left-50 rotate-25 bg-(--color-secondary-monYellow) dark:bg-yellow-500/40 z-0 rounded-[15%] transition-colors" />
            <Image src={images.logo} alt="Logo" className="relative" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-(--color-primary-darkBlue) dark:text-gray-200 font-medium hover:text-(--color-secondary-monYellow) dark:hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Theme Toggle + CTA + Mobile Menu */}
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
              <icons.Moon className="w-6 h-6 text-(--color-primary-darkBlue)" />
            )}
          </button>

          {/* Adopt Now Button */}
          <div className="hidden md:block">
            <Link href="/availablePets">
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
