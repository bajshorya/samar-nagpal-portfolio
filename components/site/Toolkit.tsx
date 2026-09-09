"use client";

import React, { useState } from "react";
import { toolkit } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal, MaskLine } from "./Reveal";

export function Toolkit() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="toolkit" className="relative py-20 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              06 — The Toolkit
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              {toolkit.reduce((n, g) => n + g.items.length, 0)} Capabilities
            </span>
          </div>
        </Reveal>

        <h2 className="mt-14 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-light leading-[0.92] tracking-tight text-paper md:mt-20">
          <MaskLine>
            The <em className="italic accent-text">toolkit.</em>
          </MaskLine>
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-5 md:gap-x-4">
          {toolkit.map((g, i) => {
            const on = hover === i;
            const dim = hover !== null && hover !== i;
            return (
              <Reveal
                key={g.group}
                delay={i * 0.05}
                className={`transition-opacity duration-500 ${
                  dim ? "opacity-35" : "opacity-100"
                }`}
              >
                <div
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className="border-t pt-4 transition-colors duration-500"
                  style={{ borderColor: on ? g.accent : "rgba(243,239,230,0.12)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="block h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                      style={{ backgroundColor: g.accent, opacity: on ? 1 : 0.5 }}
                    />
                    <h3
                      className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300"
                      style={{ color: on ? g.accent : "rgba(243,239,230,0.7)" }}
                    >
                      {g.group}
                    </h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className={`text-[15px] font-light leading-snug transition-colors duration-300 ${
                          on ? "text-paper" : "text-paper/55"
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
