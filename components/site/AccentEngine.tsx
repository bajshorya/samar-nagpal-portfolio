"use client";

import { useEffect } from "react";
import { toc } from "@/lib/content";

// Watches the sections and eases the global --accent variable to the colour of
// whichever chapter owns the viewport. Elements with .accent-* classes resolve
// that variable and transition, so the page recolours gradually as you scroll
// (§03, §40) — Experience warm, Work pink, Expertise lavender, Contact lime.
export function AccentEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const map = new Map(toc.map((t) => [t.id, t.accent]));

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) {
          const accent = map.get(best.target.id);
          if (accent) root.style.setProperty("--accent", accent);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
