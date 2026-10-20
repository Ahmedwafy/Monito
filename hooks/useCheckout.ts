"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CheckoutPayload = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
};

export function useCheckout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const checkout = async (payload: CheckoutPayload) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status === 401) {
      const err = new Error("Unauthorized");
      (err as Error & { status?: number }).status = 401;
      throw err;
    }

    if (!res.ok) {
      throw new Error(data.error || "Checkout failed");
    }

    return data as { message: string; orderId: string };
  };

  return useMutation({
    mutationFn: checkout,
    onSuccess: async (data) => {
      // Cart is empty on server → refresh cache
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      // Orders list should include the new order
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      toast.success("Order placed successfully!");
      router.push(`/checkout/success?orderId=${data.orderId}`);
    },
    onError: (error: Error & { status?: number }) => {
      if (error.status === 401 || error.message === "Unauthorized") {
        toast.error("Please log in to checkout");
        router.push("/Login");
        return;
      }
      toast.error(error.message || "Something went wrong");
    },
  });
}
