"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/lib/store";
import { Sidebar, MobileSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { WidgetGrid } from "@/components/dashboard/WidgetGrid";
import {
  KPICardSkeleton,
  ChartCardSkeleton,
  TableSkeleton,
} from "@/components/common/LoadingSkeleton";

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCardSkeleton />
        <ChartCardSkeleton />
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const check = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIsDesktop(window.innerWidth >= 1024);
    }, 100);
  }, []);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer.current);
    };
  }, [check]);

  return isDesktop;
}

export default function DashboardPage() {
  const { sidebarCollapsed, isLoading } = useDashboardStore();
  const isDesktop = useIsDesktop();

  const marginLeft = isDesktop ? (sidebarCollapsed ? 64 : 280) : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar />

      <div
        className="flex flex-1 flex-col min-w-0 transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft }}
      >
        <Header />

        <main className="flex-1 p-4 md:p-6">
          {isLoading ? (
            <LoadingState />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WidgetGrid />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
