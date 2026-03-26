"use client";

import { cn } from "@/lib/utils";

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted skeleton-shimmer",
        className
      )}
    />
  );
}

export function KPICardSkeleton() {
  return (
    <div className="glass-card space-y-3" style={{ pointerEvents: "none" }}>
      <SkeletonLine className="h-4 w-24" />
      <SkeletonLine className="h-8 w-32" />
      <SkeletonLine className="h-3 w-20" />
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="glass-card space-y-4" style={{ pointerEvents: "none" }}>
      <div className="flex items-center justify-between">
        <SkeletonLine className="h-5 w-36" />
        <SkeletonLine className="h-5 w-5 rounded-full" />
      </div>
      <SkeletonLine className="h-[280px] w-full rounded-lg" />
      <div className="flex gap-4">
        <SkeletonLine className="h-3 w-16" />
        <SkeletonLine className="h-3 w-16" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="glass-card space-y-3" style={{ pointerEvents: "none" }}>
      <SkeletonLine className="h-5 w-40" />
      <div className="space-y-2 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <SkeletonLine className="h-8 flex-1" />
            <SkeletonLine className="h-8 flex-1" />
            <SkeletonLine className="h-8 flex-[2]" />
            <SkeletonLine className="h-8 flex-1" />
            <SkeletonLine className="h-8 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
