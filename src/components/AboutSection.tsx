"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.to(q("[data-fill]"), {
        color: "#000",
        stagger: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-4 py-12 md:px-8 md:py-[120px]">

      {/* ── Header: label + divider ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p
          data-fill=""
          className="font-mono font-normal text-[14px] uppercase leading-[1.1] text-right"
          style={{ color: "#CDCDCD" }}
        >
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* ── Text block ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 items-center md:items-start">

        <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 uppercase">
          <p
            data-fill=""
            className="order-first md:order-last font-mono font-normal text-[14px] leading-[1.1]"
            style={{ color: "#CDCDCD" }}
          >
            001
          </p>
          <p
            data-fill=""
            className="order-last md:order-first font-inter font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] whitespace-pre"
            style={{ color: "#CDCDCD" }}
          >
            {"A creative director   /"}
          </p>
        </div>

        <p
          data-fill=""
          className="font-inter font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap md:pl-[14.86vw]"
          style={{ color: "#CDCDCD" }}
        >
          Photographer
        </p>

        <p
          data-fill=""
          className="font-inter font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap md:pl-[42.36vw]"
          style={{ color: "#CDCDCD" }}
        >
          Born{" "}
          <span className="font-playfair italic">&amp;</span>
          {" "}raised
        </p>

        <p
          data-fill=""
          className="font-inter font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap"
          style={{ color: "#CDCDCD" }}
        >
          on the south side
        </p>

        <div className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:items-center md:pl-[42.08vw] md:gap-x-4 md:gap-y-1 uppercase">
          <p
            data-fill=""
            className="font-inter font-light text-[32px] md:text-[6.67vw] tracking-[-0.08em] leading-[0.84] whitespace-nowrap"
            style={{ color: "#CDCDCD" }}
          >
            of chicago.
          </p>
          <p
            data-fill=""
            className="font-mono font-normal text-[14px] leading-[1.1] whitespace-nowrap"
            style={{ color: "#CDCDCD" }}
          >
            [ creative freelancer ]
          </p>
        </div>

      </div>
    </section>
  );
}
