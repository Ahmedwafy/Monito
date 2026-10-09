// components/layout/Navbar.tsx
/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import * as icons from "@/assets/icons";
import * as images from "@/assets/images/images";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useMe } from "@/hooks/useMe";
import { useLogout } from "@/hooks/useLogout";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Available Pets", href: "/available-pets" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Join Our Family", href: "/join-our-family", icon: Heart },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [searchQuery, setSearchQuery] = useState(urlSearch); // Initialize searchQuery with the value from the URL : Sync searchQuery with URL when it changes
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: user } = useMe();
  const logout = useLogout();
  const { data: cart = [] } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast.success("Logged out");
        router.replace("/");
        router.refresh();
      },
      onError: () => toast.error(logout.error?.message || "Logout failed"),
    });
  };

  const handleSearchChange = (value: string) => {
    // 1) Update the search query state immediately
    setSearchQuery(value);

    // 2) Clear any existing timeout to prevent multiple navigations
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // 3) Set a new timeout to navigate after 500ms of inactivity
    // Store the timeout ID in the ref so we can clear it later if needed
    searchTimeoutRef.current = setTimeout(() => {
      searchTimeoutRef.current = null; // <-- جديد
      if (value.trim() !== "") {
        router.push(
          `/available-pets?search=${encodeURIComponent(value.trim())}`,
        );
      } else {
        router.push("/available-pets");
      }
    }, 500);
  };

  // Cleanup the timeout timer when the component unmounts
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!searchTimeoutRef.current) setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (pathname !== "/available-pets") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }, [pathname]);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm" />
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-(--color-neutral-0)/90 backdrop-blur-md shadow-sm transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="relative">
              <div
                className="absolute w-[400px] h-[400px] -top-90 -left-40 sm:-left-60 rotate-25 bg-(--color-secondary-monYellow) dark:bg-yellow-600/30 z-0 
              rounded-[15%] transition-colors"
              />
              <Image
                src={images.logo}
                alt="Logo"
                className="relative dark:invert right-10 left-8 sm:-left-10"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center md:gap-6 gap-8">
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
                        ? "text-(--color-neutral-5)! dark:text-yellow-400!"
                        : "text-(--color-primary-darkBlue) dark:hover:text-yellow-400"
                    }
                  `}
                >
                  {link.label}
                  {link.icon && (
                    <link.icon
                      className="inline-block ml-2 text-red-400"
                      fill="currentColor"
                    />
                  )}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full origin-center transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100 bg-(--color-primary-darkBlue)! dark:bg-yellow-400!"
                        : "scale-x-0 bg-(--color-primary-darkBlue)! dark:bg-yellow-400! group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative w-60">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets by name..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white dark:bg-(--color-neutral-10) border border-gray-200 dark:border-gray-700 rounded-full pl-11 py-2.5 text-sm focus:outline-none focus:border-(--color-secondary-monYellow) transition-all"
              />
              <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Mobile Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-(--color-primary-darkBlue) dark:text-gray-200"
            >
              <icons.Search className="w-6 h-6" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-(--color-neutral-10) transition-colors text-(--color-primary-darkBlue) dark:text-gray-200"
              aria-label="Shopping cart"
            >
              {/* <icons.Mail className="w-6 h-6" /> */}

              <ShoppingCart className="w-6 h-6" />

              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-400 dark:bg-amber-100! dark:text-black! text-white text-xs font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-(--color-neutral-10) transition-all active:scale-90"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <icons.Sun className="w-6 h-6 text-yellow-400 animate-spin-once" />
              ) : (
                <icons.Moon className="w-6 h-6 text-(--color-primary-darkBlue) animate-spin-once" />
              )}
            </button>

            {/* Auth section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link href="/profile">
                    <span className="text-sm font-medium text-(--color-primary-darkBlue) dark:text-gray-200 max-w-[120px] truncate">
                      {user.name}
                    </span>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) 
                    dark:text-(--color-secondary-monYellow) px-4 py-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/Login">
                    <Button
                      variant="outline"
                      // className="transition-all duration-300 dark:border-(--color-secondary-monYellow) dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0)"
                      className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) 
                      dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) px-4 py-2"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/SignUp">
                    <Button
                      variant="outline"
                      // className="px-4 py-2"
                      className="border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-(--color-secondary-monYellow) 
                      dark:text-(--color-secondary-monYellow) dark:hover:bg-(--color-secondary-monYellow) dark:hover:text-(--color-neutral-0) px-4 py-2"
                    >
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Adopt Now - Desktop */}
            <div className="hidden lg:block">
              <Link href="/available-pets">
                <Button
                  variant="primary"
                  className="bg-(--color-primary-darkBlue) dark:bg-blue-600 text-white flex items-center gap-2"
                >
                  Adopt Now
                  {/* <icons.Heart className="w-5 h-5" /> */}
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

        {/* Mobile Search input */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4 bg-white dark:bg-(--color-neutral-5) border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search pets by name..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-gray-100 dark:bg-(--color-neutral-10) border border-gray-200 dark:border-gray-700 rounded-full pl-11 py-3 text-sm focus:outline-none focus:border-(--color-secondary-monYellow)"
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
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed right-0 top-0 h-full w-4/5 max-w-xs bg-white dark:bg-(--color-neutral-5) shadow-2xl z-70 p-6 flex flex-col md:hidden">
            <div className="flex justify-between items-center mb-10">
              <Link href="/" onClick={closeMobileMenu}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-(--color-secondary-monYellow) rounded-full flex items-center justify-center text-(--color-primary-darkBlue) font-bold text-xl"></div>
                  <span className="font-bold text-2xl dark:text-neutral-100">
                    Monito
                  </span>
                </div>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-3xl text-gray-500 dark:text-gray-400"
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

            {/* Auth - Mobile */}
            <div className="mt-8 flex flex-col gap-3">
              {user ? (
                <>
                  <Link href="/profile">
                    <p className="text-(--color-primary-darkBlue) dark:text-gray-200 font-medium mb-8">
                      {user.name}
                    </p>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="w-full py-3 border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/Login" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full py-3">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/SignUp" onClick={closeMobileMenu}>
                    <Button variant="primary" className="w-full py-3">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
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

// 1) Navbar mount
//    → fetch("/api/auth/me")
//         ↓
// 2) /api/auth/me starts
//    → read Cookie: auth_token
//         ↓
//    no token? → 401 Not authenticated
//         ↓
//    token?  → verifyToken(token)
//         - check (signature)
//         - check (expiration)
//         ↓
//    invalid ? → 401 Invalid or expired token
//    valid ? → payload = { userId, email }
//         ↓
// 3) connectDB + User.findById(payload.userId)
//    → returns user's data (password excluded)
//         ↓
// 4) Navbar
//    → setUser(data.user)  //  user's name + Logout btn
