"use client";

import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/lib/store";
import {
  generateKPIs,
  generateLineChartData,
  generateBarChartData,
  generatePieChartData,
  generateAreaChartData,
  generateTransactions,
  generateInitialNotifications,
  generateNotification,
  updateKPI,
  shiftChartData,
} from "@/lib/mock-data";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const store = useDashboardStore;

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Apply theme from localStorage
    const theme = store.getState().theme;
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Initialize data
    store.getState().setKpis(generateKPIs());
    store.getState().setLineChartData(generateLineChartData());
    store.getState().setBarChartData(generateBarChartData());
    store.getState().setPieChartData(generatePieChartData());
    store.getState().setAreaChartData(generateAreaChartData());
    store.getState().setTransactions(generateTransactions());

    const notifications = generateInitialNotifications();
    notifications.forEach((n) => store.getState().addNotification(n));

    // Simulate loading delay
    setTimeout(() => store.getState().setIsLoading(false), 800);

    // Real-time KPI updates every 3s
    const kpiInterval = setInterval(() => {
      const current = store.getState().kpis;
      store.getState().setKpis(current.map(updateKPI));
    }, 3000);

    // Chart data updates every 5s
    const chartInterval = setInterval(() => {
      const state = store.getState();
      state.setLineChartData(shiftChartData(state.lineChartData));
      state.setAreaChartData(shiftChartData(state.areaChartData));
    }, 5000);

    // Notification updates every 15-25s
    const notifInterval = setInterval(() => {
      store.getState().addNotification(generateNotification());
    }, 15000 + Math.random() * 10000);

    return () => {
      clearInterval(kpiInterval);
      clearInterval(chartInterval);
      clearInterval(notifInterval);
    };
  }, [store]);

  return <>{children}</>;
}
