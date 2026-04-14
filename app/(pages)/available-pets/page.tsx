// This is a server component that wraps the client component with Suspense
// to enable loading states while fetching data or performing client-side operations.
// The actual UI and logic for the Available Pets page is implemented in AvailablePetsPage.tsx,
// which is a client component that can use hooks and manage state.
import { Suspense } from "react";
import AvailablePetsPage from "./AvailablePetsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AvailablePetsPage />
    </Suspense>
  );
}
