"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useDashboardStore, type Notification } from "@/lib/store";
import { slideDown, badgePop } from "@/lib/animations";

const typeIcons: Record<Notification["type"], typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors: Record<Notification["type"], string> = {
  info: "text-blue-400",
  success: "text-emerald-400",
  warning: "text-amber-400",
  error: "text-red-400",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, dismissNotification, markAllNotificationsRead } =
    useDashboardStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) markAllNotificationsRead();
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        <Bell className="h-4 w-4" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key={unreadCount}
              variants={badgePop}
              initial="hidden"
              animate="visible"
              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-2 w-[350px] max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <span className="text-xs text-muted-foreground">
                {notifications.length} total
              </span>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((n, i) => {
                  const Icon = typeIcons[n.type];
                  return (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-start gap-3 border-b border-border/50 px-4 py-3 hover:bg-accent/50 transition-colors"
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${typeColors[n.type]}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground truncate">
                          {n.message}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground/60">
                          {formatDistanceToNow(n.timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(n.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        aria-label="Dismiss notification"
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
