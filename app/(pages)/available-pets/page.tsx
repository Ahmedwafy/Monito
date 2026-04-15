// This is a server component that wraps the client component with Suspense
// to enable loading states while fetching data or performing client-side operations.
// The actual UI and logic for the Available Pets page is implemented in AvailablePetsPage.tsx,
// which is a client component that can use hooks and manage state.

// Note : Do not use >>> "use client" in page.tsx files, So page.tsx should be server components that wrap the client components with Suspense to enable loading
// states while fetching data or performing client-side operations. The actual UI and logic for the Available Pets page is implemented in AvailablePetsPage.tsx,
// which is a client component that can use hooks and manage state.

import { Suspense } from "react";
import AvailablePetsPage from "./AvailablePetsPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AvailablePetsPage />
    </Suspense>
  );
};

export default Page;
