"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={15} refetchOnWindowFocus>
      {children}
      <Toaster />
    </SessionProvider>
  );
}

