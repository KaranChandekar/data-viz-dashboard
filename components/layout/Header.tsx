"use client";

import { Menu, Search, User } from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NotificationBell } from "@/components/common/NotificationBell";

export function Header() {
  const { sidebarCollapsed, setMobileSidebarOpen } = useDashboardStore();

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border px-4 md:px-6"
      style={{
        background: "var(--dash-card)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-secondary transition-colors lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Page title */}
      <h1 className="text-lg font-semibold hidden sm:block">Dashboard</h1>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search dashboard"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dash-accent text-white">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
