import CheckoutSuccessPage from "@/components/pages/Checkout/CheckoutSuccessPage";
import { Suspense } from "react";

// used suspense to avoid hydration error when use useSearchParams() in CheckoutSuccessPage.tsx, because useSearchParams()
// is a client component and cannot be used in server components. Suspense allows us to render the component on the client side only.
export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}
