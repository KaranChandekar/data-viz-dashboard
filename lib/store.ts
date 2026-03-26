"use client";

import { create } from "zustand";

export interface KPI {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  sparkline: number[];
  color: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

export interface Transaction {
  id: string;
  date: Date;
  user: string;
  description: string;
  status: "Active" | "Pending" | "Complete" | "Failed";
  amount: number;
}

export type WidgetId =
  | "kpi"
  | "line-chart"
  | "bar-chart"
  | "pie-chart"
  | "area-chart"
  | "data-table";

interface DashboardState {
  theme: "dark" | "light";
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  kpis: KPI[];
  lineChartData: ChartDataPoint[];
  barChartData: ChartDataPoint[];
  pieChartData: PieDataPoint[];
  areaChartData: ChartDataPoint[];
  transactions: Transaction[];
  notifications: Notification[];
  widgetOrder: WidgetId[];
  isLoading: boolean;

  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setKpis: (kpis: KPI[]) => void;
  setLineChartData: (data: ChartDataPoint[]) => void;
  setBarChartData: (data: ChartDataPoint[]) => void;
  setPieChartData: (data: PieDataPoint[]) => void;
  setAreaChartData: (data: ChartDataPoint[]) => void;
  setTransactions: (data: Transaction[]) => void;
  addNotification: (notification: Notification) => void;
  dismissNotification: (id: string) => void;
  markAllNotificationsRead: () => void;
  setWidgetOrder: (order: WidgetId[]) => void;
  setIsLoading: (loading: boolean) => void;
}

const getInitialTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("dashboard-theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
};

const getInitialWidgetOrder = (): WidgetId[] => {
  if (typeof window === "undefined")
    return ["kpi", "line-chart", "bar-chart", "pie-chart", "area-chart", "data-table"];
  const stored = localStorage.getItem("dashboard-widget-order");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* ignore */
    }
  }
  return ["kpi", "line-chart", "bar-chart", "pie-chart", "area-chart", "data-table"];
};

const getInitialSidebarCollapsed = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("dashboard-sidebar-collapsed") === "true";
};

export const useDashboardStore = create<DashboardState>((set) => ({
  theme: getInitialTheme(),
  sidebarCollapsed: getInitialSidebarCollapsed(),
  mobileSidebarOpen: false,
  kpis: [],
  lineChartData: [],
  barChartData: [],
  pieChartData: [],
  areaChartData: [],
  transactions: [],
  notifications: [],
  widgetOrder: getInitialWidgetOrder(),
  isLoading: true,

  setTheme: (theme) => {
    localStorage.setItem("dashboard-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("dashboard-theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    }),
  setSidebarCollapsed: (collapsed) => {
    localStorage.setItem("dashboard-sidebar-collapsed", String(collapsed));
    set({ sidebarCollapsed: collapsed });
  },
  toggleSidebar: () =>
    set((state) => {
      const collapsed = !state.sidebarCollapsed;
      localStorage.setItem("dashboard-sidebar-collapsed", String(collapsed));
      return { sidebarCollapsed: collapsed };
    }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  setKpis: (kpis) => set({ kpis }),
  setLineChartData: (data) => set({ lineChartData: data }),
  setBarChartData: (data) => set({ barChartData: data }),
  setPieChartData: (data) => set({ pieChartData: data }),
  setAreaChartData: (data) => set({ areaChartData: data }),
  setTransactions: (data) => set({ transactions: data }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 20),
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  setWidgetOrder: (order) => {
    localStorage.setItem("dashboard-widget-order", JSON.stringify(order));
    set({ widgetOrder: order });
  },
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
