"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const offerings = [
  {
    num: "01",
    title: "Creative Direction",
    description:
      "Setting the visual tone for campaigns, shoots, and brand worlds. From initial concept through final execution — this is where a scattered idea becomes a cohesive visual language.",
    deliverables: ["Creative Brief", "Mood Boards", "Art Direction", "Campaign Visuals"],
  },
  {
    num: "02",
    title: "Brand Identity",
    description:
      "Building visual systems that communicate who you are before you say a word. Logo, colour, type, and the rules that hold it all together across every context.",
    deliverables: ["Logo Suite", "Colour System", "Typography", "Brand Guidelines"],
  },
  {
    num: "03",
    title: "Photography",
    description:
      "Editorial and commercial photography that goes beyond documentation. Sharp, cinematic images built to stop the scroll and hold attention long after.",
    deliverables: ["Art-Directed Shoot", "Edited Selects", "Licensing", "Usage Rights"],
  },
  {
    num: "04",
    title: "Digital Experience",
    description:
      "Design and direction for websites, campaigns, and interactive touchpoints — where brand identity becomes something people move through.",
    deliverables: ["UX/UI Design", "Prototypes", "Design System", "Dev Handoff"],
  },
] as const;

const processSteps = [
  {
    num: "01",
    label: "Discover",
    description:
      "We start by listening. Understanding your brand, your audience, and the gap between where you are and where you want to be.",
  },
  {
    num: "02",
    label: "Strategy",
    description:
      "A creative framework takes shape — direction, positioning, and the visual language that will carry everything forward.",
  },
  {
    num: "03",
    label: "Create",
    description:
      "This is where the work happens. Iteration, craft, and refinement until the output earns its place.",
  },
  {
    num: "04",
    label: "Deliver",
    description:
      "Final assets, handed over with clarity. Everything needed to launch — nothing that isn't.",
  },
] as const;

const expectations = [
  { label: "Kick-off", detail: "Most projects start within 2 weeks of an initial call." },
  { label: "Duration", detail: "Depending on scope, engagements run 2–8 weeks." },
  { label: "What to bring", detail: "A brief, references you admire, and a clear sense of what to avoid." },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(q("[data-hero-label]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
        .fromTo(q("[data-hero-svc]"),   { opacity: 0, x: -60 }, { opacity: 1, x: 0, stagger: 0.1, duration: 1 }, 0.25)
        .fromTo(q("[data-hero-foot]"),  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85);
    }, ref);
    return () => ctx.revert();
  }, []);

  const lines: [string, string][] = [
    ["Creative Direction", ""],
    ["Brand Identity",     "md:pl-[8vw]"],
    ["Photography",        "md:pl-[4vw]"],
    ["Digital Experience", "md:pl-[14vw]"],
  ];

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full min-h-screen bg-black flex flex-col px-4 md:px-8 pt-24 pb-10 md:pt-[100px] md:pb-12"
    >
      <div data-hero-label="" className="flex items-center justify-between">
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">[ Services ]</p>
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">001</p>
      </div>

      <div className="flex-1 flex flex-col justify-center py-10 md:py-14 gap-0">
        {lines.map(([label, indent]) => (
          <p
            key={label}
            data-hero-svc=""
            className={`font-inter font-light text-white uppercase tracking-[-0.04em] leading-[0.88] ${indent}`}
            style={{ fontSize: "clamp(32px, 7.5vw, 108px)" }}
          >
            {label}
          </p>
        ))}
      </div>

      <div data-hero-foot="" className="flex items-end justify-between">
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">H.Studio — New York</p>
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">Est. 2016</p>
      </div>
    </section>
  );
}

// ─── Offerings ────────────────────────────────────────────────────────────────

function Offerings() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(q("[data-offerings-header]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-service-row]"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "center 45%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-offerings-header="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ What We Do ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
      </div>

      <div className="flex flex-col">
        {offerings.map(({ num, title, description, deliverables }) => (
          <div
            key={num}
            data-service-row=""
            className="flex flex-col md:flex-row md:gap-16 py-8 md:py-10 border-b border-[#e8e8e8] first:border-t first:border-[#e8e8e8]"
          >
            {/* Left: number + service name */}
            <div className="md:w-[300px] md:shrink-0 flex items-baseline gap-4 mb-4 md:mb-0">
              <span className="font-mono font-normal text-[11px] text-[#aaa] uppercase shrink-0">{num}</span>
              <span className="font-inter font-light text-[20px] md:text-[26px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.1]">
                {title}
              </span>
            </div>

            {/* Right: description + deliverable tags */}
            <div className="flex-1 flex flex-col gap-4">
              <p className="font-inter font-normal text-[13px] md:text-[14px] text-[#666] leading-[1.6] tracking-[-0.02em]">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {deliverables.map((d) => (
                  <span
                    key={d}
                    className="font-mono font-normal text-[10px] md:text-[11px] text-[#1f1f1f] border border-[#ddd] px-3 py-1 uppercase leading-[1]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

const stepTopPad = ["", "md:pt-[7vw]", "md:pt-[14vw]", "md:pt-[21vw]"];

function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(q("[data-process-header]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-step]"),
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 76%", end: "center 40%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#f3f3f3] px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-process-header="" className="flex items-center justify-between mb-12 md:mb-20">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ How We Work ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">003</p>
      </div>

      {/* Desktop: staircase — each column drops lower than the last */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-8 md:pb-[22vw]">
        {processSteps.map(({ num, label, description }, i) => (
          <div key={num} data-step="" className={`flex flex-col gap-5 ${stepTopPad[i]}`}>
            <span className="font-mono font-normal text-[11px] text-[#aaa] uppercase">{num}</span>
            <p className="font-inter font-light text-[26px] md:text-[32px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.05]">
              {label}
            </p>
            <p className="font-inter font-normal text-[13px] text-[#777] leading-[1.6]">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical with connector */}
      <div className="md:hidden flex flex-col">
        {processSteps.map(({ num, label, description }, i) => (
          <div key={num} data-step="" className="flex gap-5 pb-10">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 border border-[#ccc] flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#aaa]">{num}</span>
              </div>
              {i < processSteps.length - 1 && (
                <div className="flex-1 w-px bg-[#ddd] mt-2 min-h-[40px]" />
              )}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-inter font-light text-[22px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.1]">
                {label}
              </p>
              <p className="font-inter font-normal text-[13px] text-[#777] leading-[1.6]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── Start ────────────────────────────────────────────────────────────────────

function Start() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-start-item]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "top 42%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} data-nav-theme="dark" className="w-full bg-[#111111] px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-start-item="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">[ Getting Started ]</p>
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">004</p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 md:items-start">

        {/* Left: expectations */}
        <div className="flex-1 flex flex-col mb-12 md:mb-0">
          {expectations.map(({ label, detail }) => (
            <div key={label} data-start-item="" className="flex flex-col gap-1 py-6 border-b border-[#222] first:border-t first:border-[#222]">
              <p className="font-mono font-normal text-[11px] text-[#555] uppercase">{label}</p>
              <p className="font-inter font-normal text-[14px] md:text-[15px] text-white leading-[1.5] tracking-[-0.02em]">
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* Right: headline + CTA */}
        <div data-start-item="" className="flex flex-col gap-8 md:w-[42%] md:shrink-0 md:pt-6">
          <p className="font-inter font-light text-[10vw] md:text-[4vw] text-white uppercase tracking-[-0.04em] leading-[0.88]">
            Ready to<br /><span className="font-playfair italic">begin?</span>
          </p>
          <FillButton
            className="self-start border border-white text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-6 py-4 rounded-[24px]"
            fillColor="bg-white"
            textColor="white"
            hoverTextColor="black"
          >
            Start the conversation
          </FillButton>
        </div>

      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Hero />
      <Offerings />
      <Process />
      <Start />
    </>
  );
}
