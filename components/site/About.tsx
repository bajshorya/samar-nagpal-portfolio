"use client";

import React from "react";
import { about } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal, MaskLine } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-44">
      <div className={SHEET}>
        {/* Chapter marker */}
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              {about.kicker}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
              {about.lead}
            </span>
          </div>
        </Reveal>

        {/* Editorial title */}
        <h2 className="mt-16 font-display text-[clamp(3rem,11vw,9rem)] font-light leading-[0.9] tracking-tight text-paper md:mt-24">
          <MaskLine>Beyond</MaskLine>
          <MaskLine delay={0.1} className="italic accent-text">
            the feed.
          </MaskLine>
        </h2>

        {/* Body + surrounding annotations. Body leads on mobile; on desktop the
            annotations sit in the left column, body in the right. */}
        <div className="mt-14 grid grid-cols-12 gap-y-10 md:mt-24">
          <Reveal
            delay={0.1}
            className="col-span-12 md:col-span-8 md:col-start-5 md:row-start-1"
          >
            <p className="text-balance text-[clamp(1.35rem,2.6vw,2.1rem)] font-light leading-[1.4] text-paper/85">
              {about.body}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">
              {about.lead}
            </p>
          </Reveal>

          {/* Annotations — plain type, not badges (§13) */}
          <div className="col-span-12 md:col-span-3 md:col-start-1 md:row-start-1">
            <div className="grid grid-cols-3 gap-y-8 border-t border-paper/10 pt-8 md:flex md:flex-col md:gap-y-9 md:border-t-0 md:pt-0">
              {about.annotations.map((a, i) => (
                <Reveal key={a} delay={i * 0.04}>
                  <span className="block whitespace-pre-line font-mono text-[11px] uppercase leading-[1.5] tracking-[0.16em] text-paper/40">
                    {a}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
