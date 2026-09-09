"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { edgeMeta, profile } from "@/lib/content";

// The editorial sheet: two hairline rails, corner annotations, and a single
// accent marker that travels the left rail as the document is read. The rail
// and marker adopt the live section accent, so the page's spine changes colour
// chapter by chapter.
const RAIL_L = "left-6 sm:left-10 lg:left-16";
const RAIL_R = "right-6 sm:right-10 lg:right-16";

export function Frame() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
  });
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
      <div className="relative mx-auto h-full w-full max-w-[1320px]">
        {/* Base rails */}
        <div className={`absolute inset-y-0 ${RAIL_L} w-px bg-paper/[0.07]`} />
        <div className={`absolute inset-y-0 ${RAIL_R} w-px bg-paper/[0.07]`} />

        {/* Left rail fills, tinted by the active section accent */}
        <motion.div
          style={{ scaleY: progress }}
          className={`accent-bg absolute inset-y-0 ${RAIL_L} w-px origin-top opacity-60`}
        />

        {/* Traveling marker */}
        <motion.div
          style={{ top: markerTop }}
          className={`absolute ${RAIL_L} -translate-y-1/2`}
        >
          <div className="relative -left-[3px] flex items-center">
            <span className="accent-bg block h-px w-4" />
            <span className="accent-bg ml-[3px] block h-[7px] w-[7px] rounded-full" />
          </div>
        </motion.div>

        {/* Corner annotations — lg+ only */}
        <span
          className={`absolute bottom-6 ${RAIL_L} hidden translate-x-3 font-mono text-[10px] tracking-[0.22em] text-paper/30 lg:block`}
        >
          {profile.name.toUpperCase()}
        </span>
        <span
          className={`absolute bottom-6 ${RAIL_R} hidden font-mono text-[10px] tracking-[0.22em] text-paper/30 lg:block`}
          style={{ transform: "translateX(-100%)" }}
        >
          <span className="inline-block pr-3">
            {edgeMeta.location} · {edgeMeta.rev}
          </span>
        </span>
      </div>
    </div>
  );
}
