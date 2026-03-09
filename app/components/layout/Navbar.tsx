// components/layout/Navbar.tsx
import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Pets", href: "/AvailablePets" },
  { label: "Categories", href: "/Categories" },
  { label: "About Us", href: "/About" },
  { label: "Contact", href: "/Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-500 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="relative">
            <div className="absolute w-[400px] h-[400px] -top-90 -left-50 rotate-25 bg-(--color-secondary-monYellow) z-0 rounded-[15%]"></div>
            <Image src={images.logo} alt="Logo" className="relative" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-(--color-primary-darkBlue) font-medium hover:text-(--color-secondary-monYellow) transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/AvailablePets">
            <Button
              variant="primary"
              className="bg-(--color-primary-darkBlue) text-white hover:bg-(--color-primary-darkBlue)/90 flex items-center gap-2"
            >
              Adopt Now
              <icons.Heart className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-(--color-primary-darkBlue)">
          <icons.Menu className="w-8 h-8" />
        </button>
      </nav>
    </header>
  );
}
