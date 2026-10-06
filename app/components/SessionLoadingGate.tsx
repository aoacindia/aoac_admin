"use client";

import { useSession } from "next-auth/react";

export default function SessionLoadingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#168e2d] border-t-transparent" />
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Checking access…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
