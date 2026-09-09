"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { expertise } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal } from "./Reveal";

export function Expertise() {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? 0;

  return (
    <section id="expertise" className="relative py-20 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              05 — Expertise
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              What I do
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-y-10 md:mt-24">
          {/* The list */}
          <div className="col-span-12 md:col-span-8">
            {expertise.map((s, i) => {
              const on = hover === i;
              const dim = hover !== null && hover !== i;
              return (
                <Reveal key={s.name} delay={i * 0.03}>
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    className="group block w-full border-t border-paper/10 py-4 text-left md:py-5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-[10px] tabular-nums transition-colors duration-300"
                        style={{ color: on ? "var(--accent)" : "rgba(243,239,230,0.3)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[clamp(1.6rem,4vw,2.9rem)] font-light leading-[1.05] tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                          dim ? "text-paper/30" : "text-paper"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span
                        className="ml-auto self-center font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ color: "var(--accent)" }}
                      >
                        ↗
                      </span>
                    </div>
                    {/* Mobile inline description */}
                    <p className="mt-2 max-w-md text-[13px] font-light leading-relaxed text-paper/45 md:hidden">
                      {s.note}
                    </p>
                  </button>
                </Reveal>
              );
            })}
            <div className="border-t border-paper/10" />
          </div>

          {/* Description panel — desktop, follows hover */}
          <div className="col-span-12 hidden md:col-span-3 md:col-start-10 md:block">
            <div className="sticky top-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(expertise.length).padStart(2, "0")}
              </span>
              <div className="mt-4 h-px w-full bg-paper/10">
                <div
                  className="accent-bg h-px transition-all duration-500"
                  style={{ width: `${((active + 1) / expertise.length) * 100}%` }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 text-[15px] font-light leading-relaxed text-paper/65"
                >
                  {expertise[active].note}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
