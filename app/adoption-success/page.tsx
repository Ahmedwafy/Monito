"use client";

import Link from "next/link";
import Button from "@/app/components/atoms/Button";
import confetti from "canvas-confetti";
import * as icons from "@/assets/icons";
import { useEffect } from "react";

export default function AdoptionSuccessPage() {
  // Confetti animation on page load
  useEffect(() => {
    const end = Date.now() + 1 * 500;

    const colors = ["#bb0000", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    // <div className="min-h-screen bg-linear-to-b from-[#fceed5] to-[#FDECCE] dark:from-[var(--color-neutral-0)] dark:to-[var(--color-card-bg)] flex items-center justify-center px-4 py-16">
    <div className="min-h-screen bg-(--color-secondary-monYellow-40)! dark:bg-(--color-neutral-0)! flex items-center justify-center px-4 py-16 my-2 mx-2 rounded-2xl">
      <div className="bg-white dark:bg-(--color-neutral-5)! rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-3xl w-full text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-(--color-secondary-monYellow)/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-(--color-primary-darkBlue)/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto mb-8 bg-(--color-secondary-monYellow-40) dark:bg-(--color-secondary-monYellow)/20 rounded-full flex items-center justify-center">
            <icons.Heart
              className="w-14 h-14 text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)"
              fill="currentColor"
            />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--color-primary-darkBlue) dark:text-white mb-4">
            your adoption request has been sent successfully!
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Thank you so much for your interest in adopting a pet! 💛
            <br />
            Our team will contact you within 24–48 hours to discuss the next
            steps.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-10">
            <Link href="/">
              <Button
                variant="primary"
                className="text-lg px-10 py-4 dark:text-white! dark:bg-[var(--color-primary-darkBlue)] dark:hover:bg-white dark:hover:text-[var(--color-primary-darkBlue)]!"
              >
                return to Home
              </Button>
            </Link>

            <Link href="/availablePets">
              <Button
                variant="outline"
                className="text-lg px-10 py-4 border-(--color-primary-darkBlue) text-(--color-primary-darkBlue) dark:border-[var(--color-secondary-monYellow)] dark:text-[var(--color-secondary-monYellow)] dark:hover:bg-[var(--color-secondary-monYellow)] dark:hover:text-[#00171f]"
              >
                explore more pets
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            each adoption request makes a difference for us and for a pet in
            need of a warm home 🐾
          </p>
        </div>
      </div>
    </div>
  );
}
