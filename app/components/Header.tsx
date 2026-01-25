"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-foreground hover:text-foreground/80 cursor-pointer transition-colors">
            AOAC admin panel
          </h1>
        </Link>
      </div>
    </header>
  );
}
