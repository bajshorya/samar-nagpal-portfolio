"use client";

import React, { useEffect, useRef, useState } from "react";

// Contextual pointer label (§53). Elements opt in with data-cursor="View".
// The label eases toward the pointer only while over a tagged target — no
// oversized custom cursor, no constant following. Disabled for coarse pointers
// and reduced motion.
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      setLabel(target ? target.dataset.cursor ?? null : null);
    };

    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.18;
      cur.current.y += (pos.current.y - cur.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65] hidden lg:block"
    >
      <div
        className={`accent-bg -translate-x-1/2 translate-y-4 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-900 transition-all duration-300 ${
          label ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {label ?? ""}
      </div>
    </div>
  );
}
