import { format, subDays } from "date-fns";
import type {
  KPI,
  ChartDataPoint,
  PieDataPoint,
  Transaction,
  Notification,
} from "./store";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max));
}

// Generate sparkline data (7 points)
function generateSparkline(base: number): number[] {
  return Array.from({ length: 7 }, () =>
    Math.round(base * (1 + rand(-0.08, 0.08)))
  );
}

export function generateKPIs(): KPI[] {
  return [
    {
      id: "revenue",
      title: "Total Revenue",
      value: 125430,
      previousValue: 111500,
      prefix: "$",
      trend: 12.5,
      sparkline: generateSparkline(125430),
      color: "#3b82f6",
    },
    {
      id: "users",
      title: "Active Users",
      value: 3421,
      previousValue: 3230,
      trend: 5.9,
      sparkline: generateSparkline(3421),
      color: "#10b981",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: 1893,
      previousValue: 1745,
      trend: 8.5,
      sparkline: generateSparkline(1893),
      color: "#f59e0b",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: 3.24,
      previousValue: 3.45,
      suffix: "%",
      trend: -6.1,
      sparkline: generateSparkline(3.24),
      color: "#ef4444",
    },
    {
      id: "avg-order",
      title: "Avg Order Value",
      value: 66.28,
      previousValue: 62.1,
      prefix: "$",
      trend: 6.7,
      sparkline: generateSparkline(66),
      color: "#8b5cf6",
    },
    {
      id: "bounce",
      title: "Bounce Rate",
      value: 42.3,
      previousValue: 44.8,
      suffix: "%",
      trend: -5.6,
      sparkline: generateSparkline(42),
      color: "#06b6d4",
    },
  ];
}

export function generateLineChartData(): ChartDataPoint[] {
  return Array.from({ length: 30 }, (_, i) => ({
    name: format(subDays(new Date(), 29 - i), "MMM dd"),
    value: Math.round(rand(3000, 8000)),
    value2: Math.round(rand(2000, 6000)),
  }));
}

export function generateBarChartData(): ChartDataPoint[] {
  const categories = [
    "Electronics",
    "Clothing",
    "Home",
    "Books",
    "Sports",
    "Toys",
    "Food",
    "Health",
  ];
  return categories.map((cat) => ({
    name: cat,
    value: randInt(1200, 8500),
    value2: randInt(800, 5500),
  }));
}

export function generatePieChartData(): PieDataPoint[] {
  return [
    { name: "North America", value: 35, color: "#3b82f6" },
    { name: "Europe", value: 28, color: "#10b981" },
    { name: "Asia Pacific", value: 22, color: "#f59e0b" },
    { name: "Latin America", value: 10, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#ef4444" },
  ];
}

export function generateAreaChartData(): ChartDataPoint[] {
  return Array.from({ length: 30 }, (_, i) => ({
    name: format(subDays(new Date(), 29 - i), "MMM dd"),
    value: randInt(500, 2500),
    value2: randInt(300, 1800),
  }));
}

const statuses: Transaction["status"][] = [
  "Active",
  "Pending",
  "Complete",
  "Failed",
];
const users = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Davis",
  "David Wilson",
  "Eve Martinez",
  "Frank Chen",
  "Grace Kim",
  "Henry Park",
  "Iris Brown",
  "Jack Taylor",
  "Karen Lee",
  "Leo Anderson",
  "Mia Thomas",
  "Noah Garcia",
  "Olivia Hernandez",
];
const descriptions = [
  "Premium subscription",
  "Product purchase",
  "Service fee",
  "Refund processed",
  "Upgrade plan",
  "One-time payment",
  "Monthly billing",
  "Annual renewal",
  "Add-on feature",
  "Consultation fee",
];

export function generateTransactions(): Transaction[] {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `TXN-${String(1000 + i).padStart(4, "0")}`,
    date: subDays(new Date(), randInt(0, 30)),
    user: users[randInt(0, users.length)],
    description: descriptions[randInt(0, descriptions.length)],
    status: statuses[randInt(0, statuses.length)],
    amount: Math.round(rand(10, 500) * 100) / 100,
  }));
}

const notificationTemplates = [
  {
    title: "New order received",
    message: "Order #{{id}} from {{user}} — ${{amount}}",
    type: "info" as const,
  },
  {
    title: "Payment successful",
    message: "Payment of ${{amount}} from {{user}} processed",
    type: "success" as const,
  },
  {
    title: "Low stock alert",
    message: "{{product}} inventory below threshold",
    type: "warning" as const,
  },
  {
    title: "Failed transaction",
    message: "Transaction #{{id}} from {{user}} failed",
    type: "error" as const,
  },
  {
    title: "User signed up",
    message: "{{user}} joined the platform",
    type: "info" as const,
  },
  {
    title: "Revenue milestone",
    message: "Daily revenue exceeded ${{amount}}",
    type: "success" as const,
  },
];
const products = [
  "Wireless Headphones",
  "Smart Watch",
  "Laptop Stand",
  "USB-C Hub",
  "Keyboard",
];

export function generateNotification(): Notification {
  const template =
    notificationTemplates[randInt(0, notificationTemplates.length)];
  const user = users[randInt(0, users.length)];
  const amount = randInt(50, 500);
  const id = randInt(1000, 9999);
  const product = products[randInt(0, products.length)];

  return {
    id: crypto.randomUUID(),
    title: template.title,
    message: template.message
      .replace("{{user}}", user)
      .replace("{{amount}}", String(amount))
      .replace("{{id}}", String(id))
      .replace("{{product}}", product),
    timestamp: new Date(),
    read: false,
    type: template.type,
  };
}

export function generateInitialNotifications(): Notification[] {
  return Array.from({ length: 5 }, () => {
    const n = generateNotification();
    n.timestamp = subDays(new Date(), rand(0, 1));
    return n;
  });
}

// Update KPI with small random change
export function updateKPI(kpi: KPI): KPI {
  const changePercent = rand(-0.03, 0.03);
  const newValue =
    kpi.id === "conversion" || kpi.id === "bounce"
      ? Math.round((kpi.value * (1 + changePercent)) * 100) / 100
      : Math.round(kpi.value * (1 + changePercent));
  const newTrend = ((newValue - kpi.previousValue) / kpi.previousValue) * 100;
  const newSparkline = [...kpi.sparkline.slice(1), newValue];

  return {
    ...kpi,
    value: newValue,
    trend: Math.round(newTrend * 10) / 10,
    sparkline: newSparkline,
  };
}

// Shift chart data: remove first point, add new one
export function shiftChartData(data: ChartDataPoint[]): ChartDataPoint[] {
  const last = data[data.length - 1];
  const newPoint: ChartDataPoint = {
    name: format(new Date(), "MMM dd"),
    value: Math.round(
      (last?.value ?? 5000) * (1 + rand(-0.1, 0.1))
    ),
    value2: last?.value2
      ? Math.round(last.value2 * (1 + rand(-0.1, 0.1)))
      : undefined,
  };
  return [...data.slice(1), newPoint];
}
