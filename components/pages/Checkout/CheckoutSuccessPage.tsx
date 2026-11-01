"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/atoms/Button";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--commerce-page-bg) px-4 pb-20">
      <div className="max-w-lg w-full text-center bg-(--commerce-card-bg) rounded-3xl shadow-xl p-10 md:p-12">
        <div className="text-6xl mb-6">✅</div>

        <h1 className="text-3xl md:text-4xl font-bold text-(--commerce-title) mb-4">
          Order placed!
        </h1>

        <p className="text-lg text-(--commerce-muted) mb-2">
          Thank you for your order. We&apos;ll contact you soon to confirm
          delivery details.
        </p>

        {orderId && (
          <p className="text-sm text-(--commerce-muted) mb-8 break-all">
            Order ID:{" "}
            <span className="font-mono text-(--commerce-title)">
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
              className="w-full sm:w-auto px-8 py-3 border-(--commerce-title) text-(--commerce-title)"
            >
              My Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
