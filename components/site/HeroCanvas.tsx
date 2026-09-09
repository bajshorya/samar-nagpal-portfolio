"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PAPER = "#f3efe6";
const INK = "#0d0d0d";

// Each fragment is a small campaign card, drawn to an offscreen canvas so it
// carries type and an accent moment — an abstract moodboard, never Instagram's
// actual UI. Variants keep the collection from reading as one repeated card.
type Variant = "label" | "block" | "frame" | "swatch";

function drawTexture({
  variant,
  accent,
  top,
  big,
  bottom,
}: {
  variant: Variant;
  accent: string;
  top?: string;
  big?: string;
  bottom?: string;
}) {
  const W = 520;
  const H = 660;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // base card
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  if (variant === "block") {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, H);
  } else if (variant === "swatch") {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, accent);
    g.addColorStop(1, INK);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  } else if (variant === "frame") {
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(26, 26, W - 52, H - 52);
  }

  // hairline inner border for the plain label card
  if (variant === "label") {
    ctx.strokeStyle = "rgba(243,239,230,0.14)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, W - 40, H - 40);
    // accent tick
    ctx.fillStyle = accent;
    ctx.fillRect(44, 44, 46, 6);
  }

  const dark = variant === "block";
  const primary = dark ? INK : PAPER;
  const muted = dark ? "rgba(13,13,13,0.7)" : "rgba(243,239,230,0.5)";

  ctx.textBaseline = "top";
  if (top) {
    ctx.fillStyle = dark ? INK : accent;
    ctx.font = "600 26px ui-monospace, monospace";
    ctx.fillText(top, 46, H - 150);
  }
  if (big) {
    ctx.fillStyle = primary;
    ctx.font = "500 66px Georgia, serif";
    ctx.fillText(big, 44, 64);
  }
  if (bottom) {
    ctx.fillStyle = muted;
    ctx.font = "500 22px ui-monospace, monospace";
    ctx.fillText(bottom, 46, H - 96);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

type Frag = {
  pos: [number, number, number];
  rot: number;
  scale: number;
  speed: number;
  phase: number;
  variant: Variant;
  accent: string;
  top?: string;
  big?: string;
  bottom?: string;
};

const CORAL = "#ff5a36";
const PINK = "#e2879f";
const LAV = "#b3a6ef";
const LIME = "#c9d661";

const FRAGMENTS: Frag[] = [
  { pos: [2.6, 0.9, -1.2], rot: -0.12, scale: 1.15, speed: 0.5, phase: 0, variant: "label", accent: CORAL, top: "01 / REEL", big: "Feed", bottom: "CONTENT" },
  { pos: [4.1, -1.3, -0.4], rot: 0.16, scale: 0.9, speed: 0.66, phase: 1.4, variant: "block", accent: PINK, top: "STORY", bottom: "03 / GRID" },
  { pos: [1.5, -1.9, 0.5], rot: -0.2, scale: 0.78, speed: 0.42, phase: 2.1, variant: "frame", accent: LAV, big: "UGC", bottom: "CAMPAIGN" },
  { pos: [3.3, 1.9, 0.2], rot: 0.1, scale: 0.72, speed: 0.58, phase: 3.3, variant: "swatch", accent: LIME, bottom: "REACH" },
  { pos: [5.0, 0.7, -1.6], rot: -0.08, scale: 1.0, speed: 0.48, phase: 0.8, variant: "label", accent: LAV, top: "02 / STRATEGY", big: "Plan", bottom: "CALENDAR" },
  { pos: [2.0, 2.3, -0.8], rot: 0.22, scale: 0.6, speed: 0.72, phase: 4.0, variant: "block", accent: CORAL, top: "LIVE", bottom: "STORIES" },
  { pos: [4.6, -2.4, 0.4], rot: -0.16, scale: 0.66, speed: 0.5, phase: 2.7, variant: "frame", accent: PINK, big: "Shoot", bottom: "DIRECTION" },
];

function Board() {
  const group = useRef<THREE.Group>(null);
  const vel = useRef({ x: 0, y: 0 });

  const items = useMemo(
    () =>
      FRAGMENTS.map((f) => ({
        ...f,
        tex: drawTexture({
          variant: f.variant,
          accent: f.accent,
          top: f.top,
          big: f.big,
          bottom: f.bottom,
        }),
      })),
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    // slow ambient drift
    group.current.rotation.y += delta * 0.03;

    // heavy inertial parallax — never tracks the pointer directly
    const tx = state.pointer.y * 0.12;
    const ty = state.pointer.x * 0.16;
    vel.current.x += (tx - vel.current.x) * 0.02;
    vel.current.y += (ty - vel.current.y) * 0.02;
    group.current.rotation.x = vel.current.x;
    group.current.rotation.y += vel.current.y * delta;

    // per-card bob
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const f = FRAGMENTS[i];
      child.position.y = f.pos[1] + Math.sin(t * f.speed + f.phase) * 0.18;
      child.rotation.z = f.rot + Math.sin(t * f.speed * 0.6 + f.phase) * 0.03;
    });
  });

  return (
    <group ref={group}>
      {items.map((f, i) => (
        <mesh key={i} position={f.pos} rotation={[0, 0, f.rot]} scale={f.scale}>
          <planeGeometry args={[1.35, 1.72]} />
          <meshBasicMaterial
            map={f.tex}
            transparent
            opacity={0.96}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      frameloop="always"
    >
      <Board />
    </Canvas>
  );
}
