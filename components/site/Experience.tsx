"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal } from "./Reveal";

export function Experience() {
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative py-28 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              03 — Experience
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              Campaign Archive
            </span>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {experience.map((x, i) => {
            const on = hover === i;
            const dim = hover !== null && hover !== i;
            return (
              <Reveal key={x.n}>
                <div
                  data-cursor="Explore"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={`group relative border-t border-paper/10 py-10 transition-opacity duration-500 md:py-14 ${
                    dim ? "opacity-45" : "opacity-100"
                  }`}
                >
                  {/* Anchored campaign fragment — appears top-right of the entry,
                      fixed to the layout, not the cursor (§20) */}
                  <AnimatePresence>
                    {on && !reduce && (
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, y: 14, rotate: -6 }}
                        animate={{ opacity: 1, y: 0, rotate: -4 }}
                        exit={{ opacity: 0, y: 10, rotate: -6 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute right-0 top-6 z-10 hidden h-40 w-32 lg:block"
                        style={{ backgroundColor: x.accent }}
                      >
                        <div className="frame-grain absolute inset-0" />
                        <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-900/80">
                          {x.status}
                        </span>
                        <span className="absolute bottom-3 left-3 right-3 whitespace-pre-line font-mono text-[9px] uppercase leading-[1.5] tracking-[0.1em] text-ink-900/85">
                          {x.preview}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative grid grid-cols-12 gap-x-6 gap-y-8">
                    {/* Identity column */}
                    <div className="col-span-12 md:col-span-4">
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-[11px] tabular-nums transition-colors duration-500"
                          style={{ color: on ? x.accent : "rgba(243,239,230,0.4)" }}
                        >
                          [{x.n}]
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                          {x.period}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-3xl font-medium leading-[0.95] tracking-tight text-paper md:text-[2.6rem]">
                        {x.company}
                      </h3>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/50">
                        {x.role}
                      </p>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">
                        {x.place}
                      </p>
                      <span
                        className="mt-6 inline-block h-px w-10 origin-left transition-transform duration-500 group-hover:w-20"
                        style={{ backgroundColor: x.accent }}
                      />
                    </div>

                    {/* Record column */}
                    <div className="col-span-12 md:col-span-7 md:col-start-6">
                      <p className="max-w-2xl text-lg font-light leading-relaxed text-paper/80 md:text-xl">
                        {x.lead}
                      </p>

                      <div className="mt-10 max-w-2xl">
                        {x.log.map((line, j) => (
                          <div
                            key={j}
                            className="flex gap-5 border-t border-paper/[0.07] py-4"
                          >
                            <span className="font-mono text-[10px] tabular-nums text-paper/30">
                              {String(j + 1).padStart(2, "0")}
                            </span>
                            <p className="text-[15px] font-light leading-relaxed text-paper/60">
                              {line}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                        {x.disciplines.map((d) => (
                          <span
                            key={d}
                            className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/40"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-paper/10" />
        </div>
      </div>
    </section>
  );
}
