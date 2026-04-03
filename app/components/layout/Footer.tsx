// components/layout/Footer.tsx
import Link from "next/link";
import { socialIcons } from "@/assets/iconify-components/page";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#our-story" },
    { label: "Team", href: "/about#team" },
  ],
  adopt: [
    { label: "Available Pets", href: "/availablePets" },
    { label: "Adoption Process", href: "/how-to-adopt" },
    { label: "Success Stories", href: "/success-stories" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faqs" },
    { label: "Volunteer", href: "/volunteer" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: socialIcons.Facebook, href: "/coming-soon" },
  { name: "Instagram", icon: socialIcons.Instagram, href: "/coming-soon" },
  { name: "Twitter", icon: socialIcons.Twitter, href: "/coming-soon" },
];

export default function Footer() {
  return (
    <footer className="bg-(--color-primary-darkBlue) dark:bg-(--color-neutral-5) text-white pt-12 pb-8 w-[99%] mx-auto rounded-2xl mb-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-gray-300 leading-relaxed mb-6">
              Giving every animal a second chance at a loving home. Join us in
              making tails wag and hearts full.
            </p>

            {/* Social Media Icons & Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-(--color-secondary-monYellow)! hover:text-(--color-secondary-monYellow)  transition-colors"
                >
                  <link.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns Company - Adopt - Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-(--color-secondary-monYellow)!">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-(--color-secondary-monYellow)!">
              Adopt
            </h3>
            <ul className="space-y-3">
              {footerLinks.adopt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-(--color-secondary-monYellow)!">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar >>> Privacy Policy , ... */}
        <div className="border-t border-white/20 pt-8 text-center md:flex md:justify-between md:items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} One More Friend. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy"
              className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
            >
              Terms of Service
            </Link>
            {/* <Link
              href="/contact"
              className="text-gray-300! hover:text-(--color-secondary-monYellow)! transition-colors"
            >
              Contact
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
