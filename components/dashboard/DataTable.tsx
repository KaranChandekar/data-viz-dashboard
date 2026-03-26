"use client";

import { memo, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDashboardStore, type Transaction } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChartCard } from "@/components/charts/ChartCard";

type SortKey = "id" | "date" | "user" | "status" | "amount";
type SortDir = "asc" | "desc";

const statusColors: Record<Transaction["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  Pending: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  Complete: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  Failed: "bg-red-500/15 text-red-500 border-red-500/30",
};

const PAGE_OPTIONS = [10, 25, 50];

export const DataTable = memo(function DataTable() {
  const { transactions } = useDashboardStore();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
      setPage(0);
    },
    [sortKey]
  );

  const sorted = useMemo(() => {
    const copy = [...transactions];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "id":
          cmp = a.id.localeCompare(b.id);
          break;
        case "date":
          cmp = a.date.getTime() - b.date.getTime();
          break;
        case "user":
          cmp = a.user.localeCompare(b.user);
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "amount":
          cmp = a.amount - b.amount;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [transactions, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const pageData = sorted.slice(page * perPage, (page + 1) * perPage);

  function SortHeader({
    label,
    col,
  }: {
    label: string;
    col: SortKey;
  }) {
    const isActive = sortKey === col;
    return (
      <button
        onClick={() => handleSort(col)}
        className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`Sort by ${label}`}
      >
        {label}
        {isActive ? (
          sortDir === "asc" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    );
  }

  return (
    <ChartCard title="Recent Transactions" index={4}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 pr-4 text-left">
                <SortHeader label="ID" col="id" />
              </th>
              <th className="pb-3 pr-4 text-left">
                <SortHeader label="Date" col="date" />
              </th>
              <th className="pb-3 pr-4 text-left hidden md:table-cell">
                <SortHeader label="User" col="user" />
              </th>
              <th className="pb-3 pr-4 text-left">
                <SortHeader label="Status" col="status" />
              </th>
              <th className="pb-3 text-right">
                <SortHeader label="Amount" col="amount" />
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {pageData.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  onClick={() =>
                    setExpandedRow(expandedRow === tx.id ? null : tx.id)
                  }
                  className="border-b border-border/50 cursor-pointer hover:bg-accent/30 transition-colors"
                >
                  <td className="py-3 pr-4 font-mono text-xs">{tx.id}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {format(tx.date, "MMM dd, yyyy")}
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell">{tx.user}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                        statusColors[tx.status]
                      )}
                    >
                      {tx.status === "Active" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 status-pulse" />
                      )}
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    ${tx.amount.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(0);
            }}
            className="rounded border border-border bg-secondary/50 px-2 py-1 text-xs"
            aria-label="Rows per page"
          >
            {PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>
            {page * perPage + 1}-{Math.min((page + 1) * perPage, sorted.length)}{" "}
            of {sorted.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md p-1.5 hover:bg-accent/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md p-1.5 hover:bg-accent/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </ChartCard>
  );
});
