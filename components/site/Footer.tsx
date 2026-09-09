"use client";

import React from "react";
import { footer } from "@/lib/content";
import { SHEET } from "./Sheet";

export function Footer() {
  return (
    <footer className={`${SHEET} pb-16 pt-10`}>
      <div className="grid grid-cols-12 gap-y-8 border-t border-paper/10 pt-10">
        <div className="col-span-6 md:col-span-3">
          <span className="font-display text-lg font-medium tracking-tight text-paper">
            {footer.name}
          </span>
        </div>
        <div className="col-span-6 md:col-span-3">
          {footer.disciplines.map((d) => (
            <p
              key={d}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40"
            >
              {d}
            </p>
          ))}
        </div>
        <div className="col-span-6 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
            {footer.location}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
            {footer.year}
          </p>
        </div>
        <div className="col-span-6 flex items-end justify-end md:col-span-3">
          <span className="accent-text font-mono text-[10px] uppercase tracking-[0.28em]">
            {footer.signoff}
          </span>
        </div>
      </div>
    </footer>
  );
}
