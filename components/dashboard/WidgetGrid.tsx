"use client";

import { useCallback, ReactNode } from "react";
import { Reorder } from "framer-motion";
import { GripVertical } from "lucide-react";
import { useDashboardStore, type WidgetId } from "@/lib/store";
import { KPICard } from "./KPICard";
import { LineChartWidget } from "@/components/charts/LineChartWidget";
import { BarChartWidget } from "@/components/charts/BarChartWidget";
import { PieChartWidget } from "@/components/charts/PieChartWidget";
import { AreaChartWidget } from "@/components/charts/AreaChartWidget";
import { DataTable } from "./DataTable";

function DragHandle() {
  return (
    <div className="absolute -left-1 top-3 z-10 hidden cursor-grab rounded p-1 text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing lg:block">
      <GripVertical className="h-4 w-4" />
    </div>
  );
}

function KPIRow() {
  const { kpis } = useDashboardStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <KPICard key={kpi.id} kpi={kpi} index={i} />
      ))}
    </div>
  );
}

const widgetMap: Record<WidgetId, { component: () => ReactNode; span: string }> = {
  kpi: {
    component: () => <KPIRow />,
    span: "col-span-1 lg:col-span-2",
  },
  "line-chart": {
    component: () => <LineChartWidget />,
    span: "col-span-1",
  },
  "bar-chart": {
    component: () => <BarChartWidget />,
    span: "col-span-1",
  },
  "pie-chart": {
    component: () => <PieChartWidget />,
    span: "col-span-1",
  },
  "area-chart": {
    component: () => <AreaChartWidget />,
    span: "col-span-1",
  },
  "data-table": {
    component: () => <DataTable />,
    span: "col-span-1 lg:col-span-2",
  },
};

export function WidgetGrid() {
  const { widgetOrder, setWidgetOrder } = useDashboardStore();

  const handleReorder = useCallback(
    (newOrder: WidgetId[]) => {
      setWidgetOrder(newOrder);
    },
    [setWidgetOrder]
  );

  return (
    <Reorder.Group
      axis="y"
      values={widgetOrder}
      onReorder={handleReorder}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {widgetOrder.map((id) => {
        const widget = widgetMap[id];
        if (!widget) return null;
        return (
          <Reorder.Item
            key={id}
            value={id}
            layout="position"
            className={`relative ${widget.span}`}
            whileDrag={{
              scale: 1.02,
              opacity: 0.8,
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              cursor: "grabbing",
            }}
            transition={{ duration: 0.3 }}
          >
            <DragHandle />
            {widget.component()}
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
