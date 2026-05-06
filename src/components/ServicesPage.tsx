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
    image: "/deliverables-3.png",
    description:
      "Setting the visual tone for campaigns, shoots, and brand worlds. From initial concept through final execution — this is where a scattered idea becomes a cohesive visual language.",
    deliverables: ["Creative Brief", "Mood Boards", "Art Direction", "Campaign Visuals"],
  },
  {
    num: "02",
    title: "Brand Discovery",
    image: "/deliverables-1.png",
    description:
      "Building visual systems that communicate who you are before you say a word. Logo, colour, type, and the rules that hold it all together across every touchpoint.",
    deliverables: ["Logo Suite", "Colour System", "Typography", "Brand Guidelines"],
  },
  {
    num: "03",
    title: "Photography",
    image: "/deliverables-4.png",
    description:
      "Editorial and commercial photography that goes beyond documentation. Sharp, cinematic images built to stop the scroll and hold attention long after.",
    deliverables: ["Art-Directed Shoot", "Edited Selects", "Licensing", "Usage Rights"],
  },
  {
    num: "04",
    title: "Web Design & Dev",
    image: "/deliverables-2.png",
    description:
      "Design and direction for websites, campaigns, and interactive touchpoints — where brand identity becomes something people move through and remember.",
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
  { label: "Kick-off",      detail: "Most projects start within 2 weeks of an initial call." },
  { label: "Duration",      detail: "Depending on scope, engagements run 2–8 weeks." },
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
    ["Brand Discovery",    "md:pl-[8vw]"],
    ["Photography",        "md:pl-[4vw]"],
    ["Web Design & Dev",   "md:pl-[14vw]"],
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

// ─── Service row — alternating image/text layout ───────────────────────────

type Offering = (typeof offerings)[number];

function ServiceRow({ offering, isReversed }: { offering: Offering; isReversed: boolean }) {
  const imgRef   = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current,   { scale: 1.05, duration: 0.8, ease: "power3.out",  overwrite: "auto" });
    gsap.to(titleRef.current, { x: 8,        duration: 0.5, ease: "power3.out",  overwrite: "auto" });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current,   { scale: 1, duration: 0.9, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(titleRef.current, { x: 0,     duration: 0.6, ease: "power3.inOut", overwrite: "auto" });
  };

  return (
    <div
      data-service-row=""
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} border-b border-[#e4e0d9] first:border-t first:border-[#e4e0d9]`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image — full-height, 45% on desktop */}
      <div className="h-[260px] md:h-auto md:w-[45%] md:shrink-0 md:self-stretch overflow-hidden">
        <img
          ref={imgRef}
          src={offering.image}
          alt={offering.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="flex-1 flex flex-col justify-center gap-5 px-6 md:px-14 py-10 md:py-14">
        <span className="font-mono font-normal text-[11px] text-[#aaa] uppercase">{offering.num}</span>
        <span
          ref={titleRef}
          className="font-inter font-light text-[26px] md:text-[38px] text-[#1a1a1a] tracking-[-0.04em] leading-[1.05] inline-block"
        >
          {offering.title}
        </span>
        <p className="font-inter font-normal text-[13px] md:text-[14px] text-[#666] leading-[1.7] max-w-[460px]">
          {offering.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {offering.deliverables.map((d) => (
            <span
              key={d}
              className="font-mono font-normal text-[10px] md:text-[11px] text-[#1a1a1a] border border-[#d5d1c8] px-3 py-[5px] uppercase leading-[1]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
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
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "center 50%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    // Warm cream — distinct from About's clinical white
    <section ref={ref} className="w-full bg-[#f7f5f0]">

      <div data-offerings-header="" className="px-4 md:px-8 pt-[80px] md:pt-[120px] pb-10 md:pb-14 flex items-center justify-between">
        <p className="font-mono font-normal text-[14px] text-[#1a1a1a] uppercase leading-[1.1]">[ What We Do ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1a1a1a] uppercase leading-[1.1]">002</p>
      </div>

      {/* Full-width alternating rows — no horizontal section padding */}
      <div className="flex flex-col">
        {offerings.map((o, i) => (
          <ServiceRow key={o.num} offering={o} isReversed={i % 2 !== 0} />
        ))}
      </div>

    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 76%", end: "center 55%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    // Pure white — different from About's #f3f3f3 gray
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-process-header="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-[#1a1a1a] uppercase leading-[1.1]">[ How We Work ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1a1a1a] uppercase leading-[1.1]">003</p>
      </div>

      {/* Desktop: 4 equal columns with vertical dividers — no staircase, no dead space */}
      <div className="hidden md:flex">
        {processSteps.map(({ num, label, description }, i) => (
          <div
            key={num}
            data-step=""
            className={[
              "flex-1 flex flex-col gap-5",
              i > 0 ? "border-l border-[#e8e8e8] pl-8" : "",
              i < processSteps.length - 1 ? "pr-8" : "",
            ].join(" ")}
          >
            <span className="font-mono font-normal text-[11px] text-[#bbb] uppercase">{num}</span>
            <p className="font-inter font-light text-[26px] md:text-[30px] text-[#1a1a1a] tracking-[-0.04em] leading-[1.05]">
              {label}
            </p>
            <p className="font-inter font-normal text-[13px] text-[#888] leading-[1.7]">{description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline with connector line */}
      <div className="md:hidden flex flex-col">
        {processSteps.map(({ num, label, description }, i) => (
          <div key={num} data-step="" className="flex gap-5 pb-10">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 border border-[#ddd] flex items-center justify-center">
                <span className="font-mono text-[9px] text-[#bbb]">{num}</span>
              </div>
              {i < processSteps.length - 1 && (
                <div className="flex-1 w-px bg-[#e8e8e8] mt-2 min-h-[40px]" />
              )}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-inter font-light text-[22px] text-[#1a1a1a] tracking-[-0.04em] leading-[1.1]">
                {label}
              </p>
              <p className="font-inter font-normal text-[13px] text-[#888] leading-[1.7]">{description}</p>
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
    // Pure black — merges seamlessly with the sticky footer below
    <section ref={ref} data-nav-theme="dark" className="w-full bg-black px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-start-item="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">[ Getting Started ]</p>
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">004</p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 md:items-start">

        {/* Expectations list */}
        <div className="flex-1 flex flex-col mb-12 md:mb-0">
          {expectations.map(({ label, detail }) => (
            <div key={label} data-start-item="" className="flex flex-col gap-1 py-6 border-b border-[#1f1f1f] first:border-t first:border-[#1f1f1f]">
              <p className="font-mono font-normal text-[11px] text-[#444] uppercase">{label}</p>
              <p className="font-inter font-normal text-[14px] md:text-[15px] text-white leading-[1.5] tracking-[-0.02em]">
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* Headline + CTA */}
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
