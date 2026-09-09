"use client";

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { work } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal, MaskLine } from "./Reveal";

// Explicit magazine composition — intentional irregularity, not a card grid.
const LAYOUT = [
  "md:col-span-7 aspect-[5/6] md:aspect-[4/5]",
  "md:col-span-5 aspect-[4/5] md:aspect-[3/4]",
  "md:col-span-8 aspect-[5/4] md:aspect-[16/10]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-5 aspect-[4/5] md:aspect-[3/4]",
  "md:col-span-7 aspect-[5/4] md:aspect-[16/10]",
];

// Subtle image parallax (§39) — the inner layer drifts slower than scroll.
function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-18, 18]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-24px]">
        {children}
      </motion.div>
    </div>
  );
}

function Frame({ item, i }: { item: (typeof work)[number]; i: number }) {
  const wash = i % 3 === 2; // some frames are accent fields, most are dark
  return (
    <a
      href="#contact"
      data-cursor="View"
      className={`group relative col-span-12 block overflow-hidden ${
        wash ? "" : "border border-paper/10"
      } ${LAYOUT[i]}`}
      style={{ backgroundColor: wash ? item.accent : "#0d0d0d" }}
    >
      {/* Parallax layer: giant numeral + tonal wash */}
      <Parallax>
        <div className="frame-grain absolute inset-0" />
        {/* Accent duotone so each dark frame has its own identity */}
        <div
          className="absolute inset-0"
          style={{
            background: wash
              ? "linear-gradient(160deg, transparent 25%, rgba(13,13,13,0.55))"
              : `linear-gradient(150deg, ${item.accent}26, transparent 55%), radial-gradient(120% 100% at 85% 105%, ${item.accent}1c, transparent 55%)`,
          }}
        />
        <span
          className="absolute -right-3 -top-10 select-none font-display font-light leading-none tracking-tight"
          style={{
            fontSize: "clamp(9rem, 20vw, 16rem)",
            color: wash ? "rgba(13,13,13,0.16)" : `${item.accent}33`,
          }}
        >
          {item.n}
        </span>
      </Parallax>

      {/* Hover darken */}
      <div className="absolute inset-0 bg-ink-900/0 transition-colors duration-500 group-hover:bg-ink-900/20" />

      {/* Top metadata — tag always present, brightens on hover */}
      <div className="absolute inset-x-5 top-5 flex items-start justify-between">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{ color: wash ? "#0d0d0d" : item.accent }}
        >
          {item.tag}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-0 transition-all duration-500 group-hover:opacity-100"
          style={{ color: wash ? "rgba(13,13,13,0.7)" : "rgba(243,239,230,0.6)" }}
        >
          {item.platform}
        </span>
      </div>

      {/* Foot caption */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="translate-y-0 transition-transform duration-500 group-hover:-translate-y-0.5">
          <span
            className="mb-3 block h-px w-8 origin-left transition-all duration-500 group-hover:w-14"
            style={{ backgroundColor: wash ? "rgba(13,13,13,0.45)" : item.accent }}
          />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: wash ? "rgba(13,13,13,0.65)" : "rgba(243,239,230,0.45)" }}
          >
            {item.industry}
          </span>
          <h3
            className="mt-2 font-display text-2xl font-medium leading-[1.02] tracking-tight md:text-3xl"
            style={{ color: wash ? "#0d0d0d" : "#f3efe6" }}
          >
            {item.client}
          </h3>
          <p
            className="mt-2 max-w-xs text-[13px] font-light leading-snug opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ color: wash ? "rgba(13,13,13,0.75)" : "rgba(243,239,230,0.6)" }}
          >
            {item.types}
          </p>
        </div>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              04 — Selected Work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              {work.length} Campaigns
            </span>
          </div>
        </Reveal>

        <h2 className="mt-14 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-light leading-[0.92] tracking-tight text-paper md:mt-20">
          <MaskLine>The work,</MaskLine>
          <MaskLine delay={0.1} className="italic accent-text">
            in the feed.
          </MaskLine>
        </h2>

        <div className="mt-16 grid grid-cols-12 items-start gap-3 md:mt-24 md:gap-4">
          {work.map((item, i) => (
            <Reveal key={item.n} className={`col-span-12 ${LAYOUT[i]?.match(/md:col-span-\d+/)?.[0] ?? ""}`}>
              <Frame item={item} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
