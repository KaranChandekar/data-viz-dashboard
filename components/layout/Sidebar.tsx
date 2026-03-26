"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { useDashboardStore } from "@/lib/store";
import { slideInLeft } from "@/lib/animations";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: FileText, label: "Reports", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
];

function NavItem({
  icon: Icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-l-full bg-dash-accent"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-border bg-sidebar lg:flex"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dash-accent">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap text-lg font-bold"
            >
              DataViz
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-3 space-y-1">
        <NavItem
          icon={LogOut}
          label="Logout"
          collapsed={sidebarCollapsed}
        />
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.div
            animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}

export function MobileSidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useDashboardStore();

  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Sidebar */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-0 z-50 h-full w-[280px] border-r border-border bg-sidebar lg:hidden"
          >
            <div className="flex h-16 items-center gap-3 border-b border-border px-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dash-accent">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">DataViz</span>
            </div>
            <nav className="space-y-1 p-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <NavItem
                    {...item}
                    collapsed={false}
                    onClick={() => setMobileSidebarOpen(false)}
                  />
                </motion.div>
              ))}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border p-3">
              <NavItem
                icon={LogOut}
                label="Logout"
                collapsed={false}
                onClick={() => setMobileSidebarOpen(false)}
              />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
