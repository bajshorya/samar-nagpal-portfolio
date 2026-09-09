"use client";

import React, { useEffect, useState } from "react";
import { toc } from "@/lib/content";

// A subtle page index (§51) — the running table of contents on the right rail.
// The active numeral takes the section accent. Not a navbar; a sense of place.
export function PageIndex() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Page index"
      className="fixed right-7 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex"
    >
      {toc.map(({ id, n, label }) => {
        const on = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center gap-3">
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-all duration-300 ${
                on
                  ? "text-paper/80 opacity-100"
                  : "text-paper/40 opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                on ? "accent-text" : "text-paper/35"
              }`}
            >
              {n}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                on ? "accent-bg w-5" : "w-2 bg-paper/25 group-hover:w-3"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
