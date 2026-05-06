"use client";

import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

// ─── Context ──────────────────────────────────────────────────────────────────

type ModalCtx = { openModal: () => void; closeModal: () => void };
const ModalContext = createContext<ModalCtx>({ openModal: () => {}, closeModal: () => {} });
export const useModal = () => useContext(ModalContext);

// ─── Modal UI ─────────────────────────────────────────────────────────────────

const PROJECT_TYPES = ["Brand Identity", "Creative Direction", "Photography", "Web Design", "Consulting", "Other"];
const BUDGETS       = ["< $5k", "$5k – $15k", "$15k – $30k", "$30k – $60k", "$60k+"];

function Modal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  const [projectType, setProjectType] = useState<string>("");
  const [budget, setBudget]           = useState<string>("");
  const [sent, setSent]               = useState(false);

  // Open animation
  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(panelRef.current,   { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.05 });
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    gsap.to(panelRef.current,   { y: 40, opacity: 0, duration: 0.35, ease: "power3.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        ref={panelRef}
        className="relative z-10 w-full md:max-w-[640px] max-h-[92vh] overflow-y-auto bg-white flex flex-col md:rounded-[4px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-black/[0.08] sticky top-0 bg-white z-10">
          <p className="font-mono text-[11px] text-black/40 uppercase tracking-[0.1em]">[ Let&apos;s Talk ]</p>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-20 text-center">
            <span className="font-mono text-[11px] text-black/40 uppercase tracking-[0.1em]">Message sent</span>
            <p className="font-inter font-light text-[32px] text-black tracking-[-0.04em] leading-[1.05] uppercase">
              Talk soon.
            </p>
            <p className="font-inter text-[13px] text-black/50 leading-[1.7]">
              I&apos;ll be in touch within 1–2 business days.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 font-mono text-[11px] text-black/40 uppercase tracking-[0.1em] border-b border-black/20 pb-[2px] hover:text-black hover:border-black transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-0 px-6 md:px-8 py-8">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-black/40 uppercase tracking-[0.08em]">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Jane Smith"
                  className="font-inter text-[14px] text-black bg-transparent border border-black/15 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black transition-colors placeholder:text-black/25"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-black/40 uppercase tracking-[0.08em]">Email</label>
                <input
                  required
                  type="email"
                  placeholder="jane@company.com"
                  className="font-inter text-[14px] text-black bg-transparent border border-black/15 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black transition-colors placeholder:text-black/25"
                />
              </div>
            </div>

            {/* Project type */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="font-mono text-[10px] text-black/40 uppercase tracking-[0.08em]">Project Type</label>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProjectType(t)}
                    className={`font-mono text-[10px] uppercase tracking-[0.06em] px-3 py-[6px] border rounded-[2px] transition-all duration-200 ${
                      projectType === t
                        ? "bg-black text-white border-black"
                        : "text-black/50 border-black/15 hover:border-black/40 hover:text-black"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="font-mono text-[10px] text-black/40 uppercase tracking-[0.08em]">Budget Range</label>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`font-mono text-[10px] uppercase tracking-[0.06em] px-3 py-[6px] border rounded-[2px] transition-all duration-200 ${
                      budget === b
                        ? "bg-black text-white border-black"
                        : "text-black/50 border-black/15 hover:border-black/40 hover:text-black"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 mb-8">
              <label className="font-mono text-[10px] text-black/40 uppercase tracking-[0.08em]">Tell me about your project</label>
              <textarea
                rows={4}
                placeholder="What are you working on, and what does success look like for you?"
                className="font-inter text-[14px] text-black bg-transparent border border-black/15 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black transition-colors placeholder:text-black/25 resize-none leading-[1.7]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="self-start bg-black text-white font-inter font-medium text-[14px] tracking-[-0.02em] px-8 py-4 rounded-[24px] hover:bg-black/80 transition-colors"
            >
              Send message
            </button>

          </form>
        )}
      </div>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
      {open && <Modal onClose={() => setOpen(false)} />}
    </ModalContext.Provider>
  );
}
