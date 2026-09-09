"use client";

import React from "react";
import { education } from "@/lib/content";
import { SHEET } from "./Sheet";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section id="education" className="relative py-24 md:py-36">
      <div className={SHEET}>
        <div className="grid grid-cols-12 gap-y-10 border-t border-paper/10 pt-8">
          {/* Left: label + note */}
          <Reveal className="col-span-12 md:col-span-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              {education.label}
            </span>
            <p className="mt-6 max-w-[14rem] text-[13px] font-light leading-relaxed text-paper/45">
              {education.note}
            </p>
          </Reveal>

          {/* Right: degrees on a vertical line */}
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <div className="relative border-l border-paper/12 pl-8 md:pl-12">
              {education.entries.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.08}>
                  <div className={`relative ${i === 0 ? "pb-12" : ""}`}>
                    {/* Node */}
                    <span className="accent-bg absolute -left-[calc(2rem+1px)] top-2 block h-1.5 w-1.5 rounded-full md:-left-[calc(3rem+1px)]" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
                        {e.degree}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/45">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] font-light leading-relaxed text-paper/55">
                      {e.school}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
