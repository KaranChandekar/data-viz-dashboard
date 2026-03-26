"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94], // power2.out equivalent
      onUpdate(latest) {
        const formatted =
          decimals > 0
            ? latest.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            : Math.round(latest).toLocaleString("en-US");
        setDisplay(formatted);
      },
    });

    prevValue.current = value;
    return () => controls.stop();
  }, [value, duration, decimals, motionValue]);

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
