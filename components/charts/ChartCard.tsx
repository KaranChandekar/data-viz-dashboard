"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  onRefresh?: () => void;
  index?: number;
}

export function ChartCard({ title, children, onRefresh, index = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="glass-card flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
            aria-label={`Refresh ${title}`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </motion.div>
  );
}
