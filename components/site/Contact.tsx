"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, contact } from "@/lib/content";
import { SHEET } from "./Sheet";

const links = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    hint: profile.email,
    external: false,
  },
  {
    label: "Phone",
    href: `tel:${profile.phoneHref}`,
    hint: profile.phone,
    external: false,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    hint: profile.linkedinHandle,
    external: true,
  },
];

export function Contact() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="relative pb-20 pt-20 md:pb-32 md:pt-44">
      <div className={SHEET}>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
          {contact.kicker}
        </span>

        <h2 className="mt-12 font-display text-[clamp(2.5rem,9vw,7.5rem)] font-light leading-[0.98] tracking-tight text-paper">
          {contact.lines.map((line, i) => (
            <span key={line} className="mask-line">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line.split(" ").map((w) =>
                  w.startsWith(contact.emphasisWord) ? (
                    <em key={w} className="italic accent-text">
                      {w}{" "}
                    </em>
                  ) : (
                    <span key={w}>{w} </span>
                  )
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-20 grid grid-cols-12 border-t border-paper/10 md:mt-28">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-cursor={l.external ? "Open" : "Contact"}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="group col-span-12 flex items-baseline justify-between border-b border-paper/10 py-6 transition-colors duration-500 hover:bg-paper/[0.02] md:col-span-4 md:border-r md:last:border-r-0 md:px-8 md:first:pl-0"
            >
              <span className="flex flex-col gap-2">
                <span className="font-display text-2xl font-light text-paper transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                  {l.label}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper/45">
                  {l.hint}
                </span>
              </span>
              <span className="accent-text font-mono transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
