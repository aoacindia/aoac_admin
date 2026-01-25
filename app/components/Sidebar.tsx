"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  label: string;
  href: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  sectionName: string;
}

export default function Sidebar({ menuItems, sectionName }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="secondary"
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 min-h-screen bg-sidebar text-sidebar-foreground p-4 md:p-6 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-sidebar-foreground capitalize">
          {sectionName}
        </h2>
        <nav className="space-y-2">
          {/* Back to Dashboard Button */}
          <Button
            asChild
            variant="secondary"
            className="w-full justify-start border border-sidebar-border bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80 mb-4"
          >
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              ← Back to Dashboard
            </Link>
          </Button>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-sm md:text-base ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

