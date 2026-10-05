// components/providers/QueryProvider.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // One QueryClient per browser session (not shared across server requests)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute — avoid refetch spam
            refetchOnWindowFocus: false,

            // refetch on window (browser tab) focus to get the latest data
            // ( if open 2 or 3 tabs and update data in one browser tab, the other tabs will get the latest data when they are focused or clicked )
            // staleTime: 0, // 0 means data is always stale and will be refetched on window focus
            // refetchOnWindowFocus: true, // refetch data on window focus
            // refetchOnReconnect: true, // refetch data on network reconnect
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
