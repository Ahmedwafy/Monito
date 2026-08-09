"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PawPrint } from "lucide-react";

export default function RouteLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (safetyRef.current) clearTimeout(safetyRef.current);
    timeoutRef.current = null;
    safetyRef.current = null;
  }, []);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    clearTimers();

    // Safety timer to ensure the loader doesn't stay indefinitely
    safetyRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [clearTimers]);

  // Ensure the loader stays for at least 400ms [ spinner animation duration 400ms ]
  useEffect(() => {
    if (!isLoading) return;

    const minDelay = setTimeout(() => {
      setIsLoading(false);
      clearTimers();
    }, 800); // 800ms minimum display time

    return () => clearTimeout(minDelay);
  }, [pathname, searchParams, isLoading, clearTimers]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor || !anchor.href) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        const isExternal = url.origin !== currentUrl.origin;
        const isSamePage =
          url.pathname === currentUrl.pathname &&
          url.search === currentUrl.search;
        const isNewTab =
          anchor.target === "_blank" ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.button === 1;
        const isHashOnly =
          url.pathname === currentUrl.pathname &&
          url.search === currentUrl.search &&
          url.hash !== "";

        if (!isExternal && !isSamePage && !isNewTab && !isHashOnly) {
          startLoading();
        }
      } catch {
        // ignore invalid urls
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [startLoading, clearTimers]);

  return (
    <div
      className={`fixed inset-0 z-10000 flex flex-col items-center justify-center bg-white/70 backdrop-blur-md transition-all duration-300 ease-in-out dark:bg-(--color-neutral-0)/70 ${
        isLoading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center justify-center space-x-2">
        <PawPrint
          className="h-12 w-12 animate-bounce text-(--color-primary-darkBlue)"
          strokeWidth={2}
          style={{ animationDelay: "0ms" }}
        />
        <PawPrint
          className="h-10 w-10 animate-bounce text-(--color-pinkRed)"
          strokeWidth={2}
          style={{ animationDelay: "150ms" }}
        />
        <PawPrint
          className="h-12 w-12 animate-bounce text-(--color-secondary-monYellow)"
          strokeWidth={2}
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="mt-4 animate-pulse text-lg font-bold text-(--color-primary-darkBlue)">
        Loading...
      </p>
    </div>
  );
}
