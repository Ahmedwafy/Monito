"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PawPrint } from "lucide-react";

export default function RouteLoader() {
  const [isRouting, setIsRouting] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Navigation is finished when pathname or searchParams change
  useEffect(() => {
    setIsRouting(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href) {
        // Handle potentially different bases
        try {
          const url = new URL(anchor.href);
          const currentUrl = new URL(window.location.href);

          const isExternal = url.origin !== currentUrl.origin;
          const isSamePage =
            url.pathname === currentUrl.pathname &&
            url.search === currentUrl.search;
          const isNewTab = anchor.target === "_blank";

          if (!isExternal && !isSamePage && !isNewTab) {
            setIsRouting(true);
            setIsMinTimePassed(false);
            
            // Ensure the loader stays for at least 800ms
            setTimeout(() => {
              setIsMinTimePassed(true);
            }, 800);
          }
        } catch (err) {
          // Ignore invalid URLs
        }
      }
    };

    // Use capture phase to ensure we catch the click before navigation starts
    document.addEventListener("click", handleClick, true);

    // Also listen to popstate (back/forward browser buttons)
    const handlePopState = () => {
      setIsRouting(true);
      setIsMinTimePassed(false);
      setTimeout(() => setIsMinTimePassed(true), 800);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const isLoading = isRouting || !isMinTimePassed;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/70 backdrop-blur-md transition-all duration-500 ease-in-out dark:bg-[#00171f]/70 ${
        isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center space-x-2">
        <PawPrint
          className="h-12 w-12 animate-bounce text-[var(--color-primary-darkBlue)]"
          strokeWidth={2}
          style={{ animationDelay: "0ms" }}
        />
        <PawPrint
          className="h-10 w-10 animate-bounce text-[var(--color-pinkRed)]"
          strokeWidth={2}
          style={{ animationDelay: "150ms" }}
        />
        <PawPrint
          className="h-12 w-12 animate-bounce text-[var(--color-secondary-monYellow)]"
          strokeWidth={2}
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="mt-4 animate-pulse text-lg font-bold text-[var(--color-primary-darkBlue)]">
        Loading...
      </p>
    </div>
  );
}
