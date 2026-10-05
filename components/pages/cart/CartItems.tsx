// components/pages/cart/CartItems.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { productsData } from "@/app/mock-data/mockProducts";
import { useCart } from "@/hooks/useCart";
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { useMe } from "@/hooks/useMe";

function parsePrice(price: string) {
  return Number(String(price).replace("$", "")) || 0;
}

export const CartItems = () => {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { data: cart = [], isLoading: isCartLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/Login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isCartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0)">
        <p className="text-lg font-medium text-(--color-primary-darkBlue) dark:text-gray-200 animate-pulse">
          Loading cart...
        </p>
      </div>
    );
  }

  if (!user) return null;

  const lines = cart
    .map((item) => {
      const product = productsData.find((p) => p.id === item.productId);
      if (!product) return null;
      const unit = parsePrice(product.price);
      return {
        product,
        quantity: item.quantity,
        unit,
        lineTotal: unit * item.quantity,
      };
    })
    .filter(Boolean);

  const total = lines.reduce((sum, line) => sum + (line?.lineTotal ?? 0), 0);

  return (
    <div className="min-h-screen bg-(--color-secondary-monYellow-40) dark:bg-(--color-neutral-0) pb-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow) mb-8">
          Your Cart
        </h1>

        {lines.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-(--color-neutral-0)/50 rounded-3xl shadow">
            <p className="text-xl text-(--color-primary-darkBlue) dark:text-gray-200 mb-6">
              Your cart is empty
            </p>
            <Link href="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {lines.map((line) => {
              if (!line) return null;
              const { product, quantity, unit, lineTotal } = line;

              return (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-(--color-neutral-10) rounded-2xl p-4 md:p-5 shadow"
                >
                  <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.brand}
                    </p>
                    <p className="mt-1 font-medium text-gray-700 dark:text-gray-300">
                      ${unit}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                        disabled={updateItem.isPending}
                        onClick={() =>
                          updateItem.mutate({
                            productId: product.id,
                            quantity: quantity - 1,
                          })
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
                        disabled={updateItem.isPending}
                        onClick={() =>
                          updateItem.mutate({
                            productId: product.id,
                            quantity: quantity + 1,
                          })
                        }
                      >
                        +
                      </button>

                      <button
                        type="button"
                        className="ml-auto text-red-500 text-sm font-medium hover:underline"
                        disabled={removeItem.isPending}
                        onClick={() =>
                          removeItem.mutate({ productId: product.id })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:text-right font-semibold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
                    ${lineTotal}
                  </div>
                </div>
              );
            })}

            <div className="bg-white dark:bg-(--color-neutral-10) rounded-2xl p-6 flex justify-between items-center shadow">
              <span className="text-xl font-bold text-(--color-primary-darkBlue) dark:text-neutral-100">
                Total
              </span>
              <span className="text-2xl font-bold text-(--color-primary-darkBlue) dark:text-(--color-secondary-monYellow)">
                ${total}
              </span>
            </div>

            <Button variant="primary" className="w-full py-4 text-lg" disabled>
              Checkout (Coming Soon)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
