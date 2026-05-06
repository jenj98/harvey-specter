"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/components/LetsTalkModal";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = ["Brand Identity", "Creative Direction", "Photography", "Web Design", "Consulting", "Other"];
const BUDGETS       = ["< $5k", "$5k – $15k", "$15k – $30k", "$30k – $60k", "$60k+"];

const socials = ["Instagram", "X.com", "LinkedIn", "Facebook"];

// ─── Left info panel ─────────────────────────────────────────────────────────

function InfoPanel() {
  return (
    <div className="flex flex-col justify-between h-full py-10 md:py-0">
      <div className="flex flex-col gap-10">
        <div>
          <p className="font-inter font-light text-white uppercase tracking-[-0.04em] leading-[0.88]" style={{ fontSize: "clamp(52px, 6vw, 86px)" }}>
            Let&apos;s<br /><span className="font-playfair italic">work</span><br />together.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] text-white/35 uppercase tracking-[0.1em] mb-1">Get in touch</p>
          <a href="mailto:hello@hstudio.co" className="font-inter text-[14px] text-white/70 hover:text-white transition-colors duration-200 tracking-[-0.02em]">
            hello@hstudio.co
          </a>
          <a href="tel:+12125551234" className="font-inter text-[14px] text-white/70 hover:text-white transition-colors duration-200 tracking-[-0.02em]">
            +1 (212) 555 1234
          </a>
          <p className="font-inter text-[14px] text-white/40 tracking-[-0.02em] mt-1">New York, NY</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] text-white/35 uppercase tracking-[0.1em] mb-1">Follow</p>
          {socials.map((s) => (
            <a key={s} className="font-inter text-[14px] text-white/70 hover:text-white transition-colors duration-200 tracking-[-0.02em] cursor-pointer">
              {s}
            </a>
          ))}
        </div>
      </div>

      <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.1em] hidden md:block">
        H.Studio © 2025
      </p>
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget]           = useState("");
  const [sent, setSent]               = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-6 justify-center h-full py-16">
        <span className="font-mono text-[11px] text-black/50 uppercase tracking-[0.1em]">Message received</span>
        <p className="font-inter font-light text-[42px] md:text-[56px] text-black tracking-[-0.04em] leading-[1.0] uppercase">
          Talk soon.
        </p>
        <p className="font-inter text-[14px] text-black/60 leading-[1.75] max-w-[360px]">
          I&apos;ll review your brief and be in touch within 1–2 business days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="self-start font-mono text-[11px] text-black/50 uppercase tracking-[0.1em] border-b border-black/30 pb-[2px] hover:text-black hover:border-black transition-colors mt-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-10 md:py-0">

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] text-black/60 uppercase tracking-[0.08em]">Full Name</label>
          <input
            required
            type="text"
            placeholder="Jane Smith"
            className="font-inter text-[14px] text-black bg-transparent border-b border-black/30 pb-2.5 focus:outline-none focus:border-black transition-colors placeholder:text-black/35"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] text-black/60 uppercase tracking-[0.08em]">Email</label>
          <input
            required
            type="email"
            placeholder="jane@company.com"
            className="font-inter text-[14px] text-black bg-transparent border-b border-black/30 pb-2.5 focus:outline-none focus:border-black transition-colors placeholder:text-black/35"
          />
        </div>
      </div>

      {/* Project type */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[10px] text-black/60 uppercase tracking-[0.08em]">I&apos;m looking for</label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setProjectType(t === projectType ? "" : t)}
              className={`font-mono text-[10px] uppercase tracking-[0.06em] px-3 py-[6px] border rounded-[2px] transition-all duration-200 ${
                projectType === t
                  ? "bg-black text-white border-black"
                  : "text-black/60 border-black/25 hover:border-black/60 hover:text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[10px] text-black/60 uppercase tracking-[0.08em]">Budget range</label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b === budget ? "" : b)}
              className={`font-mono text-[10px] uppercase tracking-[0.06em] px-3 py-[6px] border rounded-[2px] transition-all duration-200 ${
                budget === b
                  ? "bg-black text-white border-black"
                  : "text-black/60 border-black/25 hover:border-black/60 hover:text-black"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] text-black/60 uppercase tracking-[0.08em]">Tell me about your project</label>
        <textarea
          rows={3}
          placeholder="What are you building, and what does success look like?"
          className="font-inter text-[14px] text-black bg-transparent border-b border-black/30 pb-2.5 focus:outline-none focus:border-black transition-colors placeholder:text-black/35 resize-none leading-[1.7]"
        />
      </div>

      <button
        type="submit"
        className="self-start bg-black text-white font-inter font-medium text-[14px] tracking-[-0.02em] px-8 py-4 rounded-[24px] hover:bg-black/80 transition-colors mt-1"
      >
        Send message →
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const ref        = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1 },    0.2)
        .fromTo(rightRef.current, { opacity: 0, x:  40 }, { opacity: 1, x: 0, duration: 1 },    0.4);
    });
    return () => ctx.revert();
  }, []);

  // Suppress unused var warning — openModal is available for any inline CTA
  void openModal;

  return (
    <>
      {/* ── Hero label strip ─────────────────────────────────────────── */}
      <section
        ref={ref}
        data-nav-theme="dark"
        className="w-full bg-black px-4 md:px-8 pt-24 pb-0 md:pt-[100px]"
      >
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08]">
          <p className="font-mono text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.1em]">[ Contact ]</p>
          <p className="font-mono text-[11px] md:text-[12px] text-white/40 uppercase tracking-[0.1em]">H.Studio</p>
        </div>
      </section>

      {/* ── Split layout ─────────────────────────────────────────────── */}
      <section className="w-full flex flex-col md:flex-row min-h-[calc(100vh-80px)]">

        {/* Left — black info panel */}
        <div
          ref={leftRef}
          data-nav-theme="dark"
          className="w-full md:w-[40%] md:shrink-0 bg-black px-4 md:px-8 pb-12 md:py-16 md:sticky md:top-0 md:h-screen"
        >
          <InfoPanel />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-black/[0.08]" />

        {/* Right — white form */}
        <div
          ref={rightRef}
          className="flex-1 bg-white px-4 md:px-12 py-0 md:py-16"
        >
          <div className="max-w-[600px]">
            <div className="flex items-center justify-between mb-10 md:mb-12 pt-10 md:pt-0">
              <p className="font-mono text-[11px] text-black/35 uppercase tracking-[0.08em]">Start the conversation</p>
              <p className="font-mono text-[11px] text-black/35 uppercase tracking-[0.08em]">001</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
