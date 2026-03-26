"use client";

import { memo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line } from "recharts";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import type { KPI } from "@/lib/store";

interface KPICardProps {
  kpi: KPI;
  index: number;
}

export const KPICard = memo(function KPICard({ kpi, index }: KPICardProps) {
  const isPositive = kpi.trend >= 0;
  const isInvertedMetric = kpi.id === "bounce";
  const trendColor = isInvertedMetric
    ? isPositive
      ? "text-red-500"
      : "text-emerald-500"
    : isPositive
      ? "text-emerald-500"
      : "text-red-500";

  const sparklineData = kpi.sparkline.map((v, i) => ({ value: v, i }));
  const hasDecimals = kpi.id === "conversion" || kpi.id === "bounce" || kpi.id === "avg-order";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="glass-card flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{kpi.title}</span>
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: kpi.color }}
        />
      </div>

      <div className="flex items-end justify-between gap-4">
        <AnimatedCounter
          value={kpi.value}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
          decimals={hasDecimals ? 2 : 0}
          className="text-2xl font-bold tracking-tight"
        />

        <div className="h-10 w-20 shrink-0">
          <LineChart width={80} height={40} data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={kpi.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>

      <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        <span className="font-medium">
          {isPositive ? "+" : ""}
          {kpi.trend}%
        </span>
        <span className="text-muted-foreground text-xs ml-1">vs last period</span>
      </div>
    </motion.div>
  );
});
