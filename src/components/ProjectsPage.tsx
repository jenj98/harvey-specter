"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

export type Project = {
  _id: string;
  title: string;
  slug: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  order: number;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ count }: { count: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(q("[data-hero-label]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .fromTo(q("[data-hero-title]"), { opacity: 0, y: 70, clipPath: "inset(100% 0% 0% 0%)" }, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.out" }, 0.25)
        .fromTo(q("[data-hero-sub]"),   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full h-[50vh] min-h-[340px] bg-black flex flex-col px-4 md:px-8 pt-24 pb-10 md:pt-[100px] md:pb-14 overflow-hidden"
    >
      {/* Ghost watermark */}
      <span
        aria-hidden
        className="absolute right-0 bottom-[-2vw] font-inter font-black text-[28vw] text-white/[0.035] uppercase leading-none select-none pointer-events-none tracking-[-0.05em]"
      >
        Work
      </span>

      <div data-hero-label="" className="flex items-center justify-between">
        <p className="font-mono text-[11px] md:text-[12px] text-white/50 uppercase tracking-[0.1em]">[ Projects ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-white/50 uppercase tracking-[0.1em]">{String(count).padStart(3, "0")}</p>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <h1
          data-hero-title=""
          className="font-inter font-light text-white uppercase tracking-[-0.04em] leading-[0.88]"
          style={{ fontSize: "clamp(52px, 9vw, 128px)" }}
        >
          Selected<br />Work
        </h1>
      </div>

      <div data-hero-sub="" className="flex items-center justify-between mt-5">
        <p className="font-mono text-[11px] md:text-[12px] text-white/35 uppercase tracking-[0.08em] hidden md:block">
          Drag to explore →
        </p>
        <p className="font-mono text-[11px] md:text-[12px] text-white/35 uppercase tracking-[0.08em]">H.Studio</p>
      </div>
    </section>
  );
}

// ─── Filmstrip (desktop horizontal scroll) ────────────────────────────────────

function FilmCard({ project, index }: { project: Project; index: number }) {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleEnter = () => gsap.to(imgRef.current, { scale: 1.07, duration: 1, ease: "power3.out", overwrite: "auto" });
  const handleLeave = () => gsap.to(imgRef.current, { scale: 1,    duration: 1.1, ease: "power3.inOut", overwrite: "auto" });

  return (
    <div
      className="relative shrink-0 overflow-hidden cursor-pointer"
      style={{ width: "36vw", height: "100%" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        ref={imgRef}
        src={project.imageUrl}
        alt={project.imageAlt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* Index — top left */}
      <span className="absolute top-6 left-6 font-mono text-[11px] text-white/40 uppercase tracking-[0.1em]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Title + tags — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p
          className="font-inter font-light text-white uppercase tracking-[-0.04em] leading-[0.95] mb-4"
          style={{ fontSize: "clamp(22px, 2.6vw, 42px)" }}
        >
          {project.title}
        </p>
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-[6px]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-white/65 border border-white/25 px-3 py-[5px] uppercase leading-[1]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Filmstrip({ projects }: { projects: Project[] }) {
  const pinRef   = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const pin   = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              gsap.set(barRef.current, { scaleX: self.progress, transformOrigin: "left center" });
            }
          },
        },
      });

      tl.to(track, {
        x: () => -getDistance(),
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinRef}
      data-nav-theme="dark"
      className="hidden md:block w-full bg-black overflow-hidden"
      style={{ height: "78vh" }}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-10">
        <div ref={barRef} className="h-full bg-white/50 origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      <div
        ref={trackRef}
        className="flex gap-3 h-full"
        style={{ paddingLeft: "2rem", paddingRight: "10vw", width: "max-content" }}
      >
        {projects.map((project, i) => (
          <FilmCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Mobile stack ─────────────────────────────────────────────────────────────

function MobileStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-card]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 30%", scrub: 1.2 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="md:hidden flex flex-col gap-3 px-4 pt-4 pb-8 bg-black">
      {projects.map((project, i) => (
        <div
          key={project._id}
          data-card=""
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/3" }}
        >
          <img
            src={project.imageUrl}
            alt={project.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.1em] block mb-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-inter font-light text-[22px] text-white uppercase tracking-[-0.04em] leading-[1.0] mb-3">
              {project.title}
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {project.tags?.map((tag) => (
                <span key={tag} className="font-mono text-[9px] text-white/60 border border-white/20 px-[9px] py-[4px] uppercase leading-[1]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function Cta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(
        q("[data-cta-item]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 40%", scrub: 1.5 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-white px-4 md:px-8 py-[80px] md:py-[120px] flex flex-col md:flex-row md:items-end md:justify-between gap-12"
    >
      <p
        data-cta-item=""
        className="font-inter font-light text-black uppercase tracking-[-0.04em] leading-[0.88]"
        style={{ fontSize: "clamp(44px, 7.5vw, 108px)" }}
      >
        Have a<br />
        <span className="font-playfair italic">project</span>
        <br />in mind?
      </p>

      <div data-cta-item="" className="flex flex-col gap-5 md:pb-4 md:max-w-[320px]">
        <p className="font-inter text-[13px] md:text-[14px] text-black/50 leading-[1.75]">
          Every great project starts with a conversation. Let&apos;s talk about yours.
        </p>
        <FillButton
          className="self-start border border-black text-black font-inter font-medium text-[14px] tracking-[-0.56px] px-6 py-4 rounded-[24px]"
          fillColor="bg-black"
          textColor="black"
          hoverTextColor="white"
        >
          Start a conversation
        </FillButton>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage({ projects }: { projects: Project[] }) {
  return (
    <>
      <Hero count={projects.length} />
      <Filmstrip projects={projects} />
      <MobileStack projects={projects} />
      <Cta />
    </>
  );
}
