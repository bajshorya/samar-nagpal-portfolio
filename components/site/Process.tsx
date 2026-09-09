"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { process } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal, MaskLine } from "./Reveal";

function Stage({
  progress,
  frac,
  n,
  stage,
  note,
}: {
  progress: MotionValue<number>;
  frac: number;
  n: string;
  stage: string;
  note: string;
}) {
  // Each stage rises in as the traveling line reaches it.
  const span: [number, number] = [Math.max(0, frac - 0.12), frac];
  const opacity = useTransform(progress, span, [0.15, 1]);
  const y = useTransform(progress, span, [16, 0]);
  const dotScale = useTransform(progress, span, [0.5, 1]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative flex flex-1 flex-row items-start gap-4 md:flex-col md:items-start md:gap-6"
    >
      {/* Node on the line */}
      <motion.span
        style={{ scale: dotScale }}
        className="accent-bg relative z-10 mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full md:mt-0"
      />
      <div className="md:pr-6">
        <span className="accent-text font-mono text-[10px] tabular-nums">
          {n}
        </span>
        <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-paper md:mt-2 md:text-2xl">
          {stage}
        </h3>
        <p className="mt-2 max-w-[16rem] text-[13px] font-light leading-relaxed text-paper/50">
          {note}
        </p>
      </div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  // Line fill follows scroll.
  const fillX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-20 md:py-40">
      <div className={SHEET}>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              — The Process
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              Idea → Feed
            </span>
          </div>
        </Reveal>

        <h2 className="mt-14 max-w-4xl font-display text-[clamp(2.25rem,7vw,5.5rem)] font-light leading-[0.95] tracking-tight text-paper md:mt-20">
          <MaskLine>From idea</MaskLine>
          <MaskLine delay={0.1}>
            to <em className="italic accent-text">feed.</em>
          </MaskLine>
        </h2>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* Base + accent traveling line — horizontal on md, vertical on mobile */}
          <div className="pointer-events-none absolute left-[5px] top-2 bottom-2 w-px bg-paper/10 md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto md:bottom-auto">
            <motion.div
              style={{ height: fillY }}
              className="accent-bg absolute left-0 top-0 w-px md:hidden"
            />
            <motion.div
              style={{ width: fillX }}
              className="accent-bg absolute left-0 top-0 hidden h-px md:block"
            />
          </div>

          <div className="flex flex-col gap-12 md:flex-row md:gap-6">
            {process.map((p, i) => (
              <Stage
                key={p.n}
                progress={scrollYProgress}
                frac={i / (process.length - 1)}
                n={p.n}
                stage={p.stage}
                note={p.note}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
