"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Quiet scroll reveal. One reason per animation: establish hierarchy on entry.
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof motion;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

// Masked line reveal — a line of type wiped up from behind an invisible mask.
// The editorial entrance for headlines. Pass words as children lines.
// trigger="mount" plays immediately (above-the-fold hero); "inView" on scroll.
export function MaskLine({
  children,
  delay = 0,
  className,
  trigger = "inView",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  trigger?: "inView" | "mount";
}) {
  const reduce = useReducedMotion();
  const animateProps =
    trigger === "mount"
      ? { animate: reduce ? { opacity: 1 } : { y: "0%" } }
      : {
          whileInView: reduce ? { opacity: 1 } : { y: "0%" },
          viewport: { once: true, margin: "-8% 0px -8% 0px" },
        };
  return (
    <span className="mask-line">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        {...animateProps}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
