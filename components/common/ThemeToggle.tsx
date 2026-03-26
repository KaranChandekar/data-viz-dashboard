"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useDashboardStore } from "@/lib/store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useDashboardStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-400" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700" />
        )}
      </motion.div>
    </button>
  );
}
