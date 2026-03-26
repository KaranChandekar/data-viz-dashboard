"use client";

import { memo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useDashboardStore } from "@/lib/store";
import { ChartCard } from "./ChartCard";
import { generatePieChartData } from "@/lib/mock-data";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="text-sm font-medium" style={{ color: data.payload.color }}>
        {data.name}: {data.value}%
      </p>
    </div>
  );
}

export const PieChartWidget = memo(function PieChartWidget() {
  const { pieChartData, setPieChartData } = useDashboardStore();

  return (
    <ChartCard
      title="Revenue by Region"
      onRefresh={() => setPieChartData(generatePieChartData())}
      index={2}
    >
      <div className="chart-container h-70 md:h-75">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="45%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={3}
              dataKey="value"
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              formatter={(value: string) => (
                <span className="text-foreground text-xs">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
});
