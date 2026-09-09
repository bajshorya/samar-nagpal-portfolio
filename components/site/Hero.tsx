"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { hero, profile } from "@/lib/content";
import { SHEET } from "./Sheet";
import { MaskLine } from "./Reveal";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const EASE = [0.22, 1, 0.36, 1] as const;

function Fade({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(min-width: 768px)").matches) setShowCanvas(true);
  }, [reduce]);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Floating campaign moodboard — cropped into the right field */}
      {showCanvas && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(85%_80%_at_78%_52%,#000_18%,transparent_92%)]"
        >
          <HeroCanvas />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 40% at 20% 30%, rgba(255,90,54,0.05), transparent 72%)",
        }}
      />

      <div
        className={`${SHEET} relative z-10 flex min-h-[100svh] flex-col justify-between pb-10 pt-24`}
      >
        {/* Top metadata row */}
        <Fade delay={0.15} className="flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-paper/50">
            {profile.name}
          </span>
          <div className="hidden text-right sm:block">
            {hero.disciplines.map((d) => (
              <p
                key={d}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40"
              >
                {d}
              </p>
            ))}
          </div>
        </Fade>

        {/* The cover statement */}
        <div className="mt-auto">
          <Fade delay={0.2}>
            <span className="accent-text font-mono text-[11px] uppercase tracking-[0.24em]">
              {hero.eyebrow}
            </span>
          </Fade>

          <h1 className="mt-6 font-display font-medium tracking-tight text-paper">
            {hero.lines.map((line, i) => (
              <MaskLine
                key={line}
                trigger="mount"
                delay={0.35 + i * 0.14}
                className="text-[clamp(2.75rem,10.5vw,9rem)] leading-[0.9]"
              >
                {line === hero.emphasisWord ? (
                  <em className="accent-text italic font-light">{line}</em>
                ) : (
                  line
                )}
              </MaskLine>
            ))}
          </h1>

          <Fade
            delay={0.95}
            className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-balance text-base font-light leading-relaxed text-paper/55">
              {hero.descriptor}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 sm:text-right">
              {hero.place}
            </p>
          </Fade>
        </div>

        {/* Scroll cue */}
        <Fade delay={1.25} className="mt-12 flex items-center gap-3">
          <motion.span
            aria-hidden
            className="accent-bg block h-px w-9"
            animate={reduce ? {} : { scaleX: [1, 0.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
            Scroll to explore
          </span>
          <span className="ml-auto font-mono text-[10px] tabular-nums text-paper/30">
            01 / 08
          </span>
        </Fade>
      </div>
    </section>
  );
}
