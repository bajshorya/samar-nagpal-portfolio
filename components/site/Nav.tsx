"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { toc } from "@/lib/content";

const navItems = toc.filter((t) => t.nav);

export function Nav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-paper/10 bg-ink-900/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-4 sm:px-10 lg:px-20">
        <a
          href="#top"
          className="group flex items-baseline gap-2"
          aria-label="Samar Nagpal — top"
        >
          <span className="font-display text-[15px] font-medium tracking-tight text-paper">
            Samar Nagpal
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-paper/40 sm:inline">
            ©26
          </span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-4 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`group relative font-mono text-[10px] uppercase tracking-[0.2em] text-paper/55 transition-colors duration-300 hover:text-paper ${
                item.id === "experience" || item.id === "expertise"
                  ? "hidden sm:inline"
                  : ""
              }`}
            >
              {item.nav}
              <span className="accent-bg absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
