"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) px-4 pb-20">
      <div className="max-w-lg w-full text-center bg-white dark:bg-(--color-neutral-5) rounded-3xl shadow-xl p-10 md:p-12">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) mb-4">
          Order placed!
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Thank you for your order. We&apos;ll contact you soon to confirm
          delivery details.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 break-all">
            Order ID:{" "}
            <span className="font-mono text-(--color-primary-darkBlue)">
              {orderId}
            </span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto px-8 py-3">
              Back to Home
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-3 border-(--color-primary-darkBlue) text-(--color-primary-darkBlue)"
            >
              My Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
