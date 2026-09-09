"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { work } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal, MaskLine } from "./Reveal";

// Explicit magazine composition — intentional irregularity, clean rows.
const LAYOUT = [
  { span: "md:col-span-7", ratio: "aspect-[16/11] md:aspect-[16/10]" },
  { span: "md:col-span-5", ratio: "aspect-[16/11] md:aspect-[4/3]" },
  { span: "md:col-span-6", ratio: "aspect-[16/11] md:aspect-[3/2]" },
  { span: "md:col-span-6", ratio: "aspect-[16/11] md:aspect-[3/2]" },
  { span: "md:col-span-5", ratio: "aspect-[16/11] md:aspect-[4/3]" },
  { span: "md:col-span-7", ratio: "aspect-[16/11] md:aspect-[16/10]" },
];

// Subtle image parallax (§39) — the image drifts slower than scroll.
function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-16, 16]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-22px]">
        {children}
      </motion.div>
    </div>
  );
}

function Frame({ item }: { item: (typeof work)[number] }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Instagram ↗"
      className="group relative block h-full w-full overflow-hidden border border-paper/10 bg-ink-800"
    >
      {/* Real Instagram content — cropped to the post grid, muted by default,
          brought to full colour on hover so the section stays dark-dominant. */}
      <Parallax>
        <Image
          src={item.image}
          alt={`${item.client} — Instagram feed managed by Samar Nagpal`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectPosition: item.pos }}
          className="object-cover grayscale-[0.4] brightness-[0.82] transition duration-700 ease-out will-change-transform group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-100"
        />
      </Parallax>

      {/* Tonal integration + caption legibility */}
      <div className="absolute inset-0 bg-ink-900/45 transition-colors duration-700 group-hover:bg-ink-900/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent" />
      <div className="frame-grain absolute inset-0 opacity-50" />

      {/* Top row: campaign tag + platform */}
      <div className="absolute inset-x-4 top-4 flex items-start justify-between sm:inset-x-5 sm:top-5">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          style={{ color: item.accent }}
        >
          {item.tag}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {item.platform}
        </span>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <span
          className="mb-3 block h-px w-8 origin-left transition-all duration-500 group-hover:w-14"
          style={{ backgroundColor: item.accent }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">
          {item.industry}
        </span>
        <h3 className="mt-2 font-display text-xl font-medium leading-[1.02] tracking-tight text-paper sm:text-2xl md:text-3xl">
          {item.client}
        </h3>
        <div className="mt-2.5 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.06em] text-paper/50">
            @{item.handle}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ color: item.accent }}
          >
            View ↗
          </span>
        </div>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section id="work" className="relative py-20 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              04 — Selected Work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              {work.length} Brands
            </span>
          </div>
        </Reveal>

        <h2 className="mt-10 font-display text-[clamp(2.25rem,8vw,6.5rem)] font-light leading-[0.92] tracking-tight text-paper md:mt-20">
          <MaskLine>The work,</MaskLine>
          <MaskLine delay={0.1} className="italic accent-text">
            in the feed.
          </MaskLine>
        </h2>

        <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-paper/50 md:mt-8">
          Live accounts I run day to day — tap any to open it on Instagram.
        </p>

        <div className="mt-12 grid grid-cols-12 items-start gap-3 md:mt-20 md:gap-4">
          {work.map((item, i) => (
            <Reveal
              key={item.n}
              className={`col-span-12 ${LAYOUT[i].span} ${LAYOUT[i].ratio}`}
            >
              <Frame item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
