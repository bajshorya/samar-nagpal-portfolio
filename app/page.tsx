import React from "react";
import { AccentEngine } from "@/components/site/AccentEngine";
import { Frame } from "@/components/site/Frame";
import { Nav } from "@/components/site/Nav";
import { PageIndex } from "@/components/site/PageIndex";
import { CursorLabel } from "@/components/site/CursorLabel";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Statement } from "@/components/site/Statement";
import { Work } from "@/components/site/Work";
import { Process } from "@/components/site/Process";
import { Expertise } from "@/components/site/Expertise";
import { Toolkit } from "@/components/site/Toolkit";
import { Education } from "@/components/site/Education";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { statements } from "@/lib/content";

export default function Page() {
  return (
    <>
      <AccentEngine />
      <Frame />
      <Nav />
      <PageIndex />
      <CursorLabel />

      <main>
        {/* 01 — cover */}
        <Hero />

        {/* 02 — the person behind the posts */}
        <About />

        {/* 03 — campaign archive */}
        <Experience />

        {/* silence */}
        <Statement
          lines={statements.interlude.split("\n")}
          footnote="— A note on the work"
        />

        {/* 04 — selected work */}
        <Work />

        {/* the campaign lifecycle */}
        <Process />

        {/* 05 — expertise */}
        <Expertise />

        {/* 06 — the toolkit */}
        <Toolkit />

        {/* 07 — education */}
        <Education />

        {/* the closing thought */}
        <Statement
          lines={statements.preContact.split("\n")}
          align="right"
          footnote="— Why any of this matters"
        />

        {/* 08 — contact */}
        <Contact />
        <Footer />
      </main>
    </>
  );
}
