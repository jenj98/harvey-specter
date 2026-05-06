"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

export type Offering = {
  num: string;
  title: string;
  image: string;
  description: string;
  deliverables: string[];
};

export type ProcessStep = {
  num: string;
  label: string;
  description: string;
};

// ─── Fallback data ─────────────────────────────────────────────────────────────

const defaultOfferings: Offering[] = [
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
];

const defaultProcessSteps: ProcessStep[] = [
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
];

const expectations = [
  { label: "Kick-off",      detail: "Most projects start within 2 weeks of an initial call." },
  { label: "Duration",      detail: "Depending on scope, engagements run 2–8 weeks." },
  { label: "What to bring", detail: "A brief, references you admire, and a clear sense of what to avoid." },
] as const;

// ─── Hero — full-bleed image with text overlay ────────────────────────────────

const heroIndents = ["", "md:pl-[8vw]", "md:pl-[4vw]", "md:pl-[14vw]"];

function Hero({ offerings }: { offerings: Offering[] }) {
  const ref    = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Subtle slow zoom on the image
    gsap.fromTo(imgRef.current, { scale: 1.08 }, { scale: 1, duration: 1.8, ease: "power2.out" });

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(q("[data-hero-label]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(q("[data-hero-svc]"),   { opacity: 0, x: -48 }, { opacity: 1, x: 0, stagger: 0.09, duration: 0.9 }, 0.5)
        .fromTo(q("[data-hero-foot]"),  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 1);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      {/* Full-bleed background image */}
      <img
        ref={imgRef}
        src="/services-hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark gradient overlay — heavier on the left where text lives */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full flex-1 px-4 md:px-8 pt-24 pb-10 md:pt-[100px] md:pb-12 min-h-screen">
        <div data-hero-label="" className="flex items-center justify-between">
          <p className="font-mono text-[11px] md:text-[12px] text-white/60 uppercase tracking-[0.1em]">[ Services ]</p>
          <p className="font-mono text-[11px] md:text-[12px] text-white/60 uppercase tracking-[0.1em]">001</p>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-0 py-10">
          {offerings.map((o, i) => (
            <p
              key={o.num}
              data-hero-svc=""
              className={`font-inter font-light text-white uppercase tracking-[-0.04em] leading-[0.9] ${heroIndents[i] ?? ""}`}
              style={{ fontSize: "clamp(30px, 6.5vw, 96px)" }}
            >
              {o.title}
            </p>
          ))}
        </div>

        <div data-hero-foot="" className="flex items-center justify-between">
          <p className="font-mono text-[11px] md:text-[12px] text-white/60 uppercase tracking-[0.1em]">H.Studio — New York</p>
          <p className="font-mono text-[11px] md:text-[12px] text-white/60 uppercase tracking-[0.1em]">Est. 2016</p>
        </div>
      </div>
    </section>
  );
}

// ─── What We Do — 2×2 image grid with hover reveal ───────────────────────────

function ServiceCard({ offering }: { offering: Offering }) {
  const imgRef     = useRef<HTMLImageElement>(null);
  const revealRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(revealRef.current, { y: 20, opacity: 0 });
  }, []);

  const handleEnter = () => {
    gsap.to(imgRef.current,    { scale: 1.06, duration: 0.9, ease: "power3.out",  overwrite: "auto" });
    gsap.to(revealRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out",  overwrite: "auto" });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current,    { scale: 1, duration: 1, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(revealRef.current, { y: 20, opacity: 0, duration: 0.35, ease: "power3.inOut", overwrite: "auto" });
  };

  return (
    <div
      data-service-row=""
      className="relative overflow-hidden aspect-square cursor-default"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        ref={imgRef}
        src={offering.image}
        alt={offering.title}
        className="w-full h-full object-cover"
      />

      {/* Permanent bottom gradient so title always reads */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* Always-visible: number + title */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
        <span className="font-mono text-[10px] text-white/50 uppercase block mb-2">{offering.num}</span>
        <span className="font-inter font-light text-[22px] md:text-[28px] text-white tracking-[-0.04em] leading-[1.05] block">
          {offering.title}
        </span>

        {/* Hover-reveal: description + deliverables */}
        <div ref={revealRef} className="mt-3">
          <p className="font-inter text-[12px] text-white/70 leading-[1.7] mb-4">
            {offering.description}
          </p>
          <div className="flex flex-wrap gap-[6px]">
            {offering.deliverables.map((d) => (
              <span
                key={d}
                className="font-mono text-[9px] text-white/70 border border-white/30 px-[9px] py-[4px] uppercase leading-[1]"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Offerings({ offerings }: { offerings: Offering[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-offerings-header]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );
      // Animate the whole grid as one unit so all 4 cards appear together
      gsap.fromTo(q("[data-grid]"),
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", end: "top 38%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white">
      <div data-offerings-header="" className="px-4 md:px-8 pt-6 md:pt-8 pb-6 md:pb-8 flex items-center justify-between">
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.08em]">[ What We Do ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.08em]">002</p>
      </div>

      {/* 2×2 grid — 1 col on mobile, 2 on desktop */}
      <div data-grid="" className="grid grid-cols-1 md:grid-cols-2">
        {offerings.map((o) => (
          <ServiceCard key={o.num} offering={o} />
        ))}
      </div>
    </section>
  );
}

// ─── How We Work — black ──────────────────────────────────────────────────────

function Process({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-process-header]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );
      gsap.fromTo(q("[data-step]"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 76%", end: "center 55%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="w-full bg-black px-4 md:px-8 py-[72px] md:py-[100px]"
    >
      <div data-process-header="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.08em]">[ How We Work ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.08em]">003</p>
      </div>

      {/* Desktop: 4 columns */}
      <div className="hidden md:flex">
        {steps.map(({ num, label, description }, i) => (
          <div
            key={num}
            data-step=""
            className={[
              "flex-1 flex flex-col gap-5",
              i > 0 ? "border-l border-white/10 pl-8" : "",
              i < steps.length - 1 ? "pr-8" : "",
            ].join(" ")}
          >
            <span className="font-mono text-[10px] text-white/50 uppercase">{num}</span>
            <p className="font-inter font-light text-[22px] md:text-[26px] text-white tracking-[-0.04em] leading-[1.05]">
              {label}
            </p>
            <p className="font-inter text-[12px] md:text-[13px] text-white/70 leading-[1.75]">{description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden flex flex-col">
        {steps.map(({ num, label, description }, i) => (
          <div key={num} data-step="" className="flex gap-5 pb-10">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-7 h-7 border border-white/15 flex items-center justify-center">
                <span className="font-mono text-[9px] text-white/60">{num}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 w-px bg-white/10 mt-2 min-h-[40px]" />
              )}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <p className="font-inter font-light text-[20px] text-white tracking-[-0.04em] leading-[1.1]">{label}</p>
              <p className="font-inter text-[12px] text-white/70 leading-[1.75]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Getting Started ──────────────────────────────────────────────────────────

function Start() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-start-item]"),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", end: "top 42%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[72px] md:py-[100px]">

      <div data-start-item="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.08em]">[ Getting Started ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.08em]">004</p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 md:items-start">

        <div className="flex-1 flex flex-col mb-12 md:mb-0">
          {expectations.map(({ label, detail }) => (
            <div key={label} data-start-item="" className="flex flex-col gap-1 py-6 border-b border-black/[0.08] first:border-t first:border-black/[0.08]">
              <p className="font-mono text-[10px] text-black/30 uppercase tracking-[0.08em]">{label}</p>
              <p className="font-inter font-normal text-[14px] md:text-[15px] text-black/80 leading-[1.6] tracking-[-0.02em]">
                {detail}
              </p>
            </div>
          ))}
        </div>

        <div data-start-item="" className="flex flex-col gap-8 md:w-[42%] md:shrink-0 md:pt-4">
          <p className="font-inter font-light text-[10vw] md:text-[4vw] text-black uppercase tracking-[-0.04em] leading-[0.88]">
            Ready to<br /><span className="font-playfair italic">begin?</span>
          </p>
          <FillButton
            className="self-start border border-black text-black font-inter font-medium text-[14px] tracking-[-0.56px] px-6 py-4 rounded-[24px]"
            fillColor="bg-black"
            textColor="black"
            hoverTextColor="white"
          >
            Start the conversation
          </FillButton>
        </div>

      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = {
  offerings?: Offering[];
  processSteps?: ProcessStep[];
};

export default function ServicesPage({ offerings, processSteps }: Props) {
  const activeOfferings = offerings  ?? defaultOfferings;
  const activeSteps     = processSteps ?? defaultProcessSteps;

  return (
    <>
      <Hero offerings={activeOfferings} />
      <Offerings offerings={activeOfferings} />
      <Process steps={activeSteps} />
      <Start />
    </>
  );
}
