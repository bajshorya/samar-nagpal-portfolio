import React from "react";

// The shared measure. Every chapter aligns to this container so the
// editorial rails in <Frame> land exactly on the text edges.
export const SHEET = "mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-20";

export function Sheet({
  children,
  className = "",
  id,
  as: As = "section",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}) {
  return (
    <As id={id} className={`${SHEET} ${className}`}>
      {children}
    </As>
  );
}
