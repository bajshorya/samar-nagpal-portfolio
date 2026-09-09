"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { hero, profile } from "@/lib/content";
import { SHEET } from "./Sheet";
import { MaskLine } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const HAND = "'Caveat', 'Segoe Script', cursive";

/* ------------------------------------------------------------------ *
 * Campaign fragments — real brand shoots, cropped to the photography. *
 * ------------------------------------------------------------------ */
type Shot = { src: string; pos: string; alt: string };
const SHOTS: Record<string, Shot> = {
  pashmina: { src: "/poster-pashmina.jpg", pos: "50% 50%", alt: "French Couture — pashmina campaign" },
  scribbology: { src: "/poster-scribbology.jpg", pos: "50% 42%", alt: "Scribbology campaign creative" },
  feed: { src: "/poster-feed.jpg", pos: "50% 48%", alt: "French Couture — feed aesthetic moodboard" },
  kotak: { src: "/poster-kotak.jpg", pos: "50% 42%", alt: "Kotak campaign creative" },
  kalkee: { src: "/poster-kalkee.jpg", pos: "50% 50%", alt: "Kalkee social strategy board" },
};

/* Layered piece: choreographed entrance (outer) + mouse parallax (inner). */
function Piece({
  depth,
  delay = 0,
  rot = 0,
  enterY = 24,
  className = "",
  style,
  children,
  sx,
  sy,
  reduce,
  z,
}: {
  depth: number;
  delay?: number;
  rot?: number;
  enterY?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean | null;
  z?: number;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ ...style, zIndex: z }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: enterY, scale: 0.94, rotate: rot - 5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: rot }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div className="h-full w-full" style={reduce ? undefined : { x, y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* An editorial photo frame with a faint warm glow and hairline border. */
function ShotFrame({
  shot,
  glow = "rgba(255,90,54,0.16)",
  metaTop,
  metaBottom,
  className = "",
  sizes = "22vw",
}: {
  shot: Shot;
  glow?: string;
  metaTop?: string;
  metaBottom?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`group relative h-full w-full ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
      />
      <div className="relative h-full w-full overflow-hidden border border-paper/15 bg-ink-800 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          style={{ objectPosition: shot.pos }}
          className="object-cover brightness-[0.82] saturate-[0.92] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-ink-900/10" />
        <div className="frame-grain absolute inset-0 opacity-40" />
        {metaTop && (
          <span className="absolute left-2 top-2 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/70">
            {metaTop}
          </span>
        )}
        {metaBottom && (
          <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/70">
            {metaBottom}
          </span>
        )}
      </div>
    </div>
  );
}

/* Campaign label — a dark translucent chip, editorial not button-like. */
function Chip({ children, dot }: { children: React.ReactNode; dot?: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] border border-paper/12 bg-ink-900/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70 backdrop-blur-sm">
      {dot && <span className="block h-1.5 w-1.5 rounded-full" style={{ background: dot }} />}
      {children}
    </span>
  );
}

function SocialIcon({ name }: { name: string }) {
  const c = "h-3.5 w-3.5";
  if (name === "ig")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "x")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    );
  if (name === "yt")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
        <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
        <path d="M10.5 9.2l4.5 2.8-4.5 2.8z" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4c.4 2.3 1.9 3.8 4 4" />
    </svg>
  );
}

function SocialBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <span className="h-8 w-px bg-paper/15" />
      {["ig", "x", "yt", "tt"].map((n) => (
        <a
          key={n}
          href={n === "ig" ? profile.linkedin : "#top"}
          onClick={(e) => n !== "ig" && e.preventDefault()}
          aria-label={n}
          className="text-paper/45 transition-colors duration-300 hover:text-coral"
        >
          <SocialIcon name={n} />
        </a>
      ))}
      <span className="h-8 w-px bg-paper/15" />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState(false);

  // Pointer position, normalised to [-0.5, 0.5], eased.
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const sx = useSpring(mvX, { stiffness: 55, damping: 18, mass: 0.4 });
  const sy = useSpring(mvY, { stiffness: 55, damping: 18, mass: 0.4 });

  // Scroll-away parallax on the collage.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const collageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const collageFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const apply = () => setParallax(fine.matches);
    apply();
    fine.addEventListener("change", apply);
    return () => fine.removeEventListener("change", apply);
  }, [reduce]);

  const onMove = (e: React.MouseEvent) => {
    if (!parallax || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mvX.set((e.clientX - r.left) / r.width - 0.5);
    mvY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const p = { sx, sy, reduce };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ---------- L0 — atmospheric lighting ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(48% 42% at 24% 26%, rgba(255,90,54,0.09), transparent 70%)," +
            "radial-gradient(42% 40% at 88% 72%, rgba(179,166,239,0.07), transparent 72%)," +
            "radial-gradient(40% 40% at 70% 12%, rgba(201,214,97,0.05), transparent 70%)",
        }}
      />

      {/* ---------- L2 — oversized ghost word ---------- */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="pointer-events-none absolute -right-[4%] top-[8%] select-none font-display text-[26vw] font-light leading-none tracking-tighter text-paper/[0.035] md:top-[6%]"
      >
        CONTENT
      </motion.span>

      {/* ================= DESKTOP COLLAGE ================= */}
      <motion.div
        aria-hidden={false}
        style={{ y: collageY, opacity: collageFade }}
        className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
      >
        {/* --- L3 abstract shapes --- */}
        <Piece {...p} depth={12} delay={0.55} className="right-[6%] top-[12%] aspect-square w-[26vw] max-w-[380px] rounded-full border border-coral/25">
          <span />
        </Piece>
        <Piece {...p} depth={9} delay={0.6} className="right-[-9%] bottom-[4%] aspect-[3/2] w-[30vw] rounded-full bg-lavender/[0.06] blur-3xl">
          <span />
        </Piece>
        <Piece {...p} depth={16} delay={0.7} className="right-[41%] top-[26%] h-2.5 w-2.5 rounded-full bg-lime">
          <span />
        </Piece>
        <Piece {...p} depth={20} delay={0.72} rot={-8} className="left-[47%] top-[62%] h-16 w-16">
          <svg viewBox="0 0 64 64" fill="none" className="h-full w-full text-pink/50">
            <path d="M32 6l4.6 18.8L55 22l-14 12 8 18-17-11-17 11 8-18L9 22l18.4 2.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </Piece>

        {/* --- L4 campaign creatives / posters --- */}
        <Piece {...p} depth={26} delay={0.85} rot={-3} z={12} className="right-[5%] top-[13%] aspect-[9/16] w-[16vw] max-w-[236px]">
          <ShotFrame shot={SHOTS.pashmina} metaBottom="CAMPAIGN / FC" sizes="16vw" glow="rgba(255,90,54,0.20)" />
        </Piece>
        <Piece {...p} depth={38} delay={1.0} rot={3} z={14} className="right-[27%] top-[42%] aspect-[4/5] w-[13vw] max-w-[188px]">
          <ShotFrame shot={SHOTS.scribbology} metaBottom="CREATIVE" sizes="13vw" glow="rgba(179,166,239,0.18)" />
        </Piece>
        <Piece {...p} depth={44} delay={1.12} rot={-2} z={11} className="right-[1%] bottom-[6%] aspect-[9/16] w-[11vw] max-w-[160px]">
          <ShotFrame shot={SHOTS.feed} metaBottom="STRATEGY" sizes="11vw" glow="rgba(226,135,159,0.18)" />
        </Piece>
        <Piece {...p} depth={22} delay={1.22} rot={5} z={9} className="right-[39%] top-[13%] aspect-[3/4] w-[9vw] max-w-[128px]">
          <ShotFrame shot={SHOTS.kotak} metaBottom="AD" sizes="9vw" glow="rgba(201,214,97,0.16)" />
        </Piece>
        <Piece {...p} depth={34} delay={1.3} rot={-4} z={10} className="right-[21%] bottom-[18%] aspect-[3/2] w-[14vw] max-w-[204px]">
          <ShotFrame shot={SHOTS.kalkee} metaBottom="SOCIAL BOARD" sizes="14vw" glow="rgba(179,166,239,0.16)" />
        </Piece>

        {/* --- L5 labels, annotations, doodles, social --- */}
        <Piece {...p} depth={30} delay={1.3} rot={-2} z={20} className="right-[40%] top-[38%]">
          <Chip dot="#ff5a36">Content Strategy</Chip>
        </Piece>
        <Piece {...p} depth={34} delay={1.4} rot={2} z={20} className="right-[10%] top-[63%]">
          <Chip dot="#c9d661">UGC</Chip>
        </Piece>
        <Piece {...p} depth={32} delay={1.5} rot={-1} z={20} className="right-[30%] bottom-[15%]">
          <Chip dot="#b3a6ef">Creative Direction</Chip>
        </Piece>
        {/* hand-drawn arrow pointing from the label toward the main shot */}
        <Piece {...p} depth={30} delay={1.55} z={19} className="right-[24%] top-[34%] h-16 w-28 text-coral/70">
          <svg viewBox="0 0 120 60" fill="none" className="h-full w-full">
            <motion.path
              d="M4 40 C 40 8, 78 8, 108 22"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
            />
            <motion.path
              d="M108 22 L96 20 M108 22 L100 31"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.3 }}
            />
          </svg>
        </Piece>

        <Piece {...p} depth={40} delay={1.6} rot={-4} z={20} className="right-[16%] bottom-[27%]">
          <span style={{ fontFamily: HAND }} className="text-[26px] leading-none text-coral/85">
            ideas → content → impact
          </span>
        </Piece>
        <Piece {...p} depth={36} delay={1.7} rot={3} z={20} className="right-[44%] top-[52%]">
          <span style={{ fontFamily: HAND }} className="text-[20px] leading-none text-lavender/80">
            good content, good vibes
          </span>
        </Piece>

        <Piece {...p} depth={22} delay={1.75} z={20} className="left-[1.5%] top-1/2 hidden -translate-y-1/2 xl:block">
          <SocialBar className="pointer-events-auto" />
        </Piece>

        {/* --- micro metadata --- */}
        <Piece {...p} depth={18} delay={1.5} z={20} className="left-[47%] top-[13%]">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/35">2026</span>
        </Piece>
        <Piece {...p} depth={18} delay={1.55} z={20} className="right-[50%] bottom-[10%]">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/35">REV 2026.1</span>
        </Piece>
      </motion.div>

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className={`${SHEET} relative z-30 flex min-h-[100svh] flex-col pb-8 pt-24`}>
        {/* Top metadata row */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="flex items-start justify-between"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-paper/60">
              {profile.name}
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-paper/30">
              01 / Intro
            </span>
          </div>
          <div className="hidden text-right sm:block">
            {hero.disciplines.map((d) => (
              <p key={d} className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
                {d}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Cover statement — anchored left, holding the composition */}
        <div className="flex flex-1 flex-col justify-center md:max-w-[62%] md:justify-end">
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="accent-text inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em]"
          >
            <span className="accent-bg h-1.5 w-1.5 rounded-full" />
            {hero.eyebrow}
          </motion.span>

          <h1 className="mt-6 font-display text-[clamp(2.85rem,11vw,8.5rem)] font-medium leading-[0.9] tracking-tight text-paper">
            {hero.lines.map((line, i) => (
              <MaskLine
                key={line}
                trigger="mount"
                pad={0.34}
                delay={0.35 + i * 0.14}
              >
                {line === hero.emphasisWord ? (
                  <span className="relative inline-block">
                    <em className="accent-text italic font-light">{line}</em>
                    <svg
                      viewBox="0 0 200 20"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1 left-0 h-3 w-full text-coral/70"
                      fill="none"
                    >
                      <motion.path
                        d="M4 12 C 50 4, 120 4, 196 10"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, delay: 1, ease: EASE }}
                      />
                    </svg>
                  </span>
                ) : (
                  line
                )}
              </MaskLine>
            ))}
          </h1>

          {/* ===== MOBILE COLLAGE — a vertical magazine cover, tucked under
              the headline; overlaps its lower edge (§ mobile structure) ===== */}
          <div className="relative -mt-2 h-[40vh] min-h-[250px] md:hidden">
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.9 }}
              className="absolute right-[-16%] top-[10%] aspect-[3/2] w-[72%] rounded-full bg-lavender/[0.09] blur-3xl"
            />
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 1, delay: 1.0, ease: EASE }}
              className="absolute right-[4%] top-0 aspect-[9/16] w-[42%]"
            >
              <ShotFrame shot={SHOTS.pashmina} metaBottom="CAMPAIGN / FC" sizes="42vw" glow="rgba(255,90,54,0.20)" />
            </motion.div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 1, delay: 1.15, ease: EASE }}
              className="absolute left-[1%] top-[20%] aspect-[4/5] w-[40%]"
            >
              <ShotFrame shot={SHOTS.scribbology} metaBottom="CREATIVE" sizes="40vw" glow="rgba(179,166,239,0.18)" />
            </motion.div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 1, delay: 1.3, ease: EASE }}
              className="absolute bottom-[0%] right-[14%] aspect-[3/2] w-[42%]"
            >
              <ShotFrame shot={SHOTS.kalkee} metaBottom="SOCIAL BOARD" sizes="42vw" glow="rgba(179,166,239,0.16)" />
            </motion.div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute left-[0%] top-[4%] rotate-[-3deg]"
            >
              <Chip dot="#ff5a36">Content Strategy</Chip>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              style={{ fontFamily: HAND }}
              className="absolute bottom-[4%] left-[1%] rotate-[-4deg] text-[19px] leading-none text-coral/85"
            >
              ideas → content → impact
            </motion.span>
          </div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: EASE }}
            className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-balance text-base font-light leading-relaxed text-paper/55">
              {hero.descriptor}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 sm:text-right">
              {hero.place}
            </p>
          </motion.div>
        </div>

        {/* Scroll cue + mobile social row */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: EASE }}
          className="mt-12 flex items-center gap-3"
        >
          <motion.span
            aria-hidden
            className="accent-bg block h-px w-9"
            animate={reduce ? {} : { scaleX: [1, 0.35, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
            Scroll to explore
          </span>
          <span className="ml-auto font-mono text-[10px] tabular-nums text-paper/30">
            01 / 08
          </span>
        </motion.div>
      </div>
    </section>
  );
}
