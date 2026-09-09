"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SHEET } from "./Sheet";

// A full-viewport pause — the marketing thinking, held in space (§33).
export function Statement({
  lines,
  footnote,
  align = "left",
  accentLast = true,
}: {
  lines: string[];
  footnote?: string;
  align?: "left" | "right";
  accentLast?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[82svh] items-center overflow-hidden">
      <div className={`${SHEET} w-full`}>
        <div className={align === "right" ? "ml-auto text-right" : ""}>
          <h2 className="max-w-5xl font-display text-[clamp(2.25rem,7.5vw,6rem)] font-light leading-[1.02] tracking-tight text-paper">
            {lines.map((line, i) => {
              const last = i === lines.length - 1;
              return (
                <span key={line} className="mask-line">
                  <motion.span
                    className={`block ${last && accentLast ? "italic accent-text" : ""}`}
                    initial={reduce ? { opacity: 0 } : { y: "110%" }}
                    whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{
                      duration: 1,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              );
            })}
          </h2>
          {footnote && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.35 }}
              className={`mt-14 max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-paper/40 ${
                align === "right" ? "ml-auto" : ""
              }`}
            >
              {footnote}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
