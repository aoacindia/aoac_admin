"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Modal from "@/app/components/Modal";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const name = session?.user?.name?.trim() || "User";
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/dashboard">
          <h1 className="cursor-pointer text-2xl font-bold text-foreground transition-colors hover:text-foreground/80">
            AOAC admin panel
          </h1>
        </Link>

        {session?.user && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#168e2d] text-sm font-semibold text-white"
              aria-label="Open profile menu"
            >
              {initial}
            </button>
            {open && (
              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  My profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setConfirmLogout(true);
                  }}
                  className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {confirmLogout && (
        <Modal title="Log out?" onClose={() => setConfirmLogout(false)}>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to log out?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmLogout(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Log out
            </Button>
          </div>
        </Modal>
      )}
    </header>
  );
}
