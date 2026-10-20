import { Suspense } from "react";
import CheckoutPage from "@/components/pages/Checkout/CheckoutPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  );
}
