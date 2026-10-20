"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";
import { useMe } from "@/hooks/useMe";
import { productsData } from "@/app/mock-data/mockProducts";
import { toast } from "sonner";
import { useCheckout } from "@/hooks/useCheckout";

type FormState = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const checkout = useCheckout();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: cart = [], isLoading: isCartLoading } = useCart();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  // Prefill from profile when user loads
  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      fullName: user.name || prev.fullName,
      phone: user.phone || prev.phone,
      address: user.address || prev.address,
    }));
  }, [user]);

  // Not logged in → login
  useEffect(() => {
    if (!isUserLoading && !user) {
      toast.error("Please log in to checkout");
      router.push("/Login");
    }
  }, [user, isUserLoading, router]);

  const cartLines = cart
    .map((item: { productId: number; quantity: number }) => {
      const product = productsData.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    })
    .filter(Boolean) as Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    image?: string;
  }>;

  const totalItems = cartLines.reduce((sum, line) => sum + line.quantity, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      toast.error("Please fill full name, phone, address, and city");
      return;
    }

    if (cartLines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    checkout.mutate({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      notes: form.notes.trim(),
    });
  };

  if (isUserLoading || isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)">
        <p className="text-lg text-(--color-primary-darkBlue)">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  if (cartLines.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) px-4">
        <h1 className="text-3xl font-bold text-(--color-primary-darkBlue)">
          Your cart is empty
        </h1>
        <Link href="/">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) mb-10">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-5">
            <div className="bg-white dark:bg-(--color-neutral-5) rounded-2xl p-6 shadow-lg space-y-4">
              <h2 className="text-xl font-bold text-(--color-primary-darkBlue)">
                Shipping details
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1 text-(--color-primary-darkBlue)">
                  Full name *
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-(--color-primary-darkBlue)">
                  Phone *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-(--color-primary-darkBlue)">
                  Address *
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-(--color-primary-darkBlue)">
                  City *
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-(--color-primary-darkBlue)">
                  Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-(--color-neutral-10) px-4 py-3"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={checkout.isPending}
              className="w-full py-4 text-lg"
            >
              {checkout.isPending ? "Placing order..." : "Place Order"}
            </Button>
          </form>

          {/* Summary */}
          <aside className="lg:w-96">
            <div className="bg-white dark:bg-(--color-neutral-5) rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-(--color-primary-darkBlue) mb-4">
                Order summary
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>

              <ul className="space-y-4 max-h-80 overflow-y-auto">
                {cartLines.map((line) => (
                  <li key={line.id} className="flex gap-3 items-center">
                    {line.image && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-(--color-primary-darkBlue) truncate">
                        {line.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        × {line.quantity} · {line.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/cart"
                className="mt-6 inline-block text-sm underline text-(--color-primary-darkBlue)"
              >
                Edit cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
