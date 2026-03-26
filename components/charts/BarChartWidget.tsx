"use client";

import { memo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useDashboardStore } from "@/lib/store";
import { ChartCard } from "./ChartCard";
import { generateBarChartData } from "@/lib/mock-data";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export const BarChartWidget = memo(function BarChartWidget() {
  const { barChartData, setBarChartData } = useDashboardStore();

  return (
    <ChartCard
      title="Sales by Category"
      onRefresh={() => setBarChartData(generateBarChartData())}
      index={1}
    >
      <div className="chart-container h-70 md:h-75">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={barChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar
              dataKey="value"
              name="This Year"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              animationDuration={600}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="value2"
              name="Last Year"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              animationDuration={600}
              animationBegin={200}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
});
