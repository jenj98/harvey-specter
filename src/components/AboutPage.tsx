"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(q("[data-hero-label]"),    { opacity: 0, y: 18 },                         { opacity: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(q("[data-hero-n1]"),       { x: -100, opacity: 0 },                       { x: 0, opacity: 1, duration: 1.2 }, 0.2)
        .fromTo(q("[data-hero-portrait]"), { opacity: 0, scale: 0.94, rotationX: 10, transformPerspective: 1000, transformOrigin: "center bottom" },
                                           { opacity: 1, scale: 1, rotationX: 0, duration: 1.3 }, 0.25)
        .fromTo(q("[data-hero-n2]"),       { x: 100, opacity: 0 },                        { x: 0, opacity: 1, duration: 1.2 }, 0.35)
        .fromTo(q("[data-hero-foot]"),     { opacity: 0, y: 20 },                         { opacity: 1, y: 0, duration: 0.8 }, 0.7);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full min-h-screen bg-black flex flex-col px-4 md:px-8 pt-24 pb-10 md:pt-[100px] md:pb-12 overflow-hidden"
    >
      {/* Top label row */}
      <div data-hero-label="" className="flex items-center justify-between">
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">
          [ Creative Director &amp; Photographer ]
        </p>
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">001</p>
      </div>

      {/* Mobile: portrait then name */}
      <div className="md:hidden flex flex-col gap-6 mt-8 flex-1 justify-center">
        <img
          data-hero-portrait=""
          src="/about-portrait.jpg"
          alt="Harvey Specter"
          className="w-full aspect-[4/5] object-cover object-top"
        />
        <div>
          <p data-hero-n1="" className="font-inter font-light text-white uppercase leading-[0.85] tracking-[-0.04em] text-[22vw]">
            Harvey
          </p>
          <p data-hero-n2="" className="font-inter font-light text-white uppercase leading-[0.85] tracking-[-0.04em] text-[22vw] text-right">
            Specter
          </p>
        </div>
      </div>

      {/* Desktop: portrait sandwiched between Harvey (behind) and Specter (in front) */}
      <div className="hidden md:flex flex-col flex-1 justify-center relative py-6">
        {/* Harvey sits behind the portrait */}
        <p
          data-hero-n1=""
          className="font-inter font-light text-white uppercase leading-[0.85] tracking-[-0.04em] relative z-10"
          style={{ fontSize: "clamp(72px, 15vw, 220px)" }}
        >
          Harvey
        </p>

        {/* Portrait sits between the two name lines */}
        <div
          data-hero-portrait=""
          className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[28vw] max-w-[360px] z-20"
          style={{ perspective: "1000px" }}
        >
          <img
            src="/about-portrait.jpg"
            alt="Harvey Specter"
            className="w-full object-cover object-top"
            style={{ aspectRatio: "422/594" }}
          />
        </div>

        {/* Specter sits in front of the portrait — editorial overlap */}
        <p
          data-hero-n2=""
          className="font-inter font-light text-white uppercase leading-[0.85] tracking-[-0.04em] text-right relative z-30"
          style={{ fontSize: "clamp(72px, 15vw, 220px)" }}
        >
          Specter
        </p>
      </div>

      {/* Bottom label row */}
      <div data-hero-foot="" className="flex items-end justify-between mt-6 md:mt-0">
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">New York City</p>
        <p className="font-mono font-normal text-[12px] md:text-[14px] text-white uppercase leading-[1.1]">Since 2016</p>
      </div>
    </section>
  );
}

// ─── Story ───────────────────────────────────────────────────────────────────

function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(q("[data-story-header]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-story-bio]"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "top 35%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-story-img]"),
        { opacity: 0, y: 60, scale: 0.93, rotationX: 14, transformPerspective: 1000, transformOrigin: "center bottom" },
        { opacity: 1, y: 0, scale: 1, rotationX: 0,
          scrollTrigger: { trigger: ref.current, start: "top 76%", end: "center 45%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-story-stats]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: q("[data-story-stats]")[0], start: "top 88%", end: "top 60%", scrub: 1.5 } }
      );

      (Array.from(q("[data-counter]")) as HTMLElement[]).forEach((el) => {
        const target = parseInt(el.dataset.target ?? "0");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(counter.val) + "+"; },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-story-header="" className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ Story ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
      </div>

      {/* Bio + portrait */}
      <div className="flex flex-col gap-10 md:flex-row md:gap-14 md:items-end">

        <div data-story-bio="" className="relative py-4 px-5 flex-1 md:max-w-[500px]">
          <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
          <p className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
            Harvey Specter is a New York City-based creative director and photographer
            with over 8 years of experience across editorial, brand identity, and digital
            experience design.
            <br /><br />
            His sharp, cinematic approach to visual storytelling has drawn collaborations
            with leading brands and independent artists alike. Through H.Studio, Harvey
            leads a full-service creative practice dedicated to building beautiful,
            purposeful digital products and experiences that stand apart.
          </p>
        </div>

        <div
          data-story-img=""
          className="w-full md:w-[360px] md:shrink-0"
          style={{ perspective: "1000px" }}
        >
          <img
            src="/photo-desktop.webp"
            alt="Harvey Specter at work"
            className="w-full aspect-[422/594] object-cover object-center"
          />
        </div>
      </div>

      {/* Stats — centered */}
      <div
        data-story-stats=""
        className="grid grid-cols-3 gap-4 mt-16 md:mt-20 border-t border-[#e0e0e0] pt-10"
      >
        {([
          { value: 8,   label: "Years in industry" },
          { value: 100, label: "Projects completed" },
          { value: 50,  label: "Brands elevated" },
        ] as const).map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-2 items-center text-center">
            <span
              data-counter=""
              data-target={value}
              className="font-inter font-light text-[40px] md:text-[72px] text-black tracking-[-0.04em] leading-[1]"
            >
              0+
            </span>
            <span className="font-mono font-normal text-[11px] md:text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              {label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

function Philosophy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(q("[data-fill]"),
        { color: "#CDCDCD" },
        {
          color: "#111111",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 1.5,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#f3f3f3] px-4 md:px-8 py-[80px] md:py-[120px]">

      <div className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ Approach ]</p>
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">003</p>
      </div>

      <div className="flex flex-col gap-0">
        <p data-fill="" className="font-inter font-light text-[9vw] md:text-[6vw] uppercase tracking-[-0.04em] leading-[0.9]" style={{ color: "#CDCDCD" }}>
          A sharp, cinematic
        </p>
        <p data-fill="" className="font-inter font-light text-[9vw] md:text-[6vw] uppercase tracking-[-0.04em] leading-[0.9] md:pl-[8vw]" style={{ color: "#CDCDCD" }}>
          eye that builds
        </p>
        <p data-fill="" className="font-inter font-light text-[9vw] md:text-[6vw] uppercase tracking-[-0.04em] leading-[0.9] md:pl-[24vw]" style={{ color: "#CDCDCD" }}>
          brands worth
        </p>
        <p data-fill="" className="font-inter font-light text-[9vw] md:text-[6vw] uppercase tracking-[-0.04em] leading-[0.9] md:pl-[6vw]" style={{ color: "#CDCDCD" }}>
          remembering<span className="font-playfair italic">.</span>
        </p>
      </div>

    </section>
  );
}

// ─── Beyond ───────────────────────────────────────────────────────────────────

const frames = [
  { src: "/selected-1.webp", label: "Film Photography", sub: "35mm — NYC Streets" },
  { src: "/selected-2.webp", label: "Architecture",     sub: "Brutalism to Minimal" },
  { src: "/selected-3.webp", label: "Jazz & Vinyl",     sub: "Blue Note Era — Now" },
  { src: "/selected-4.webp", label: "Contemporary Art", sub: "Canvas to Code" },
] as const;

const interests = ["Architecture", "Fine Dining", "Vinyl Collecting", "Street Photography", "Contemporary Film"] as const;

function Beyond() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(q("[data-beyond-header]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", end: "top 55%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-beyond-headline]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 48%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-beyond-photo]"),
        { opacity: 0, y: 70, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 74%", end: "center 50%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-beyond-tag]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center 44%", scrub: 1.5 } }
      );

      gsap.fromTo(q("[data-beyond-interest]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1,
          scrollTrigger: { trigger: q("[data-beyond-interest]")[0], start: "top 90%", end: "top 55%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} data-nav-theme="dark" className="w-full bg-[#111111] px-4 md:px-8 py-[80px] md:py-[120px]">

      <div data-beyond-header="" className="flex items-center justify-between mb-10 md:mb-14">
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">[ Beyond ]</p>
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">004</p>
      </div>

      {/* Section headline */}
      <div className="flex flex-col gap-0 mb-14 md:mb-20">
        <p data-beyond-headline="" className="font-inter font-light text-[10vw] md:text-[5.5vw] text-white uppercase tracking-[-0.04em] leading-[0.9]">
          Life beyond
        </p>
        <p data-beyond-headline="" className="font-inter font-light text-[10vw] md:text-[5.5vw] text-white uppercase tracking-[-0.04em] leading-[0.9] md:pl-[10vw]">
          the <span className="font-playfair italic">frame.</span>
        </p>
      </div>

      {/* Contact-sheet photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {frames.map(({ src, label, sub }) => (
          <div key={label} className="flex flex-col gap-3">
            <div
              data-beyond-photo=""
              className="overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={src}
                alt={label}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
              />
            </div>
            <div data-beyond-tag="" className="flex flex-col gap-[2px]">
              <p className="font-mono font-normal text-[10px] md:text-[11px] text-white uppercase leading-[1.3]">{label}</p>
              <p className="font-mono font-normal text-[10px] md:text-[11px] text-[#555] uppercase leading-[1.3]">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interest strip */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-14 md:mt-20 pt-10 border-t border-[#2a2a2a]">
        {interests.map((interest) => (
          <span
            key={interest}
            data-beyond-interest=""
            className="font-inter font-light text-[20px] md:text-[28px] text-[#444] tracking-[-0.04em] leading-[1.2]"
          >
            {interest}
          </span>
        ))}
      </div>

    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Philosophy />
      <Beyond />
    </>
  );
}
