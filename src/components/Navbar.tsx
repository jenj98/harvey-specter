"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import FillButton from "@/components/FillButton";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

const MENU_ORIGIN = "92% 5%";

function NavLink({ label }: { label: string }) {
  const innerRef = useRef<HTMLSpanElement>(null);

  return (
    <a
      href="#"
      className="block font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px] whitespace-nowrap overflow-hidden h-[1em]"
      onMouseEnter={() => gsap.to(innerRef.current, { yPercent: -50, duration: 0.45, ease: "power3.inOut" })}
      onMouseLeave={() => gsap.to(innerRef.current, { yPercent: 0, duration: 0.45, ease: "power3.inOut" })}
    >
      <span ref={innerRef} className="block leading-none">
        <span className="block">{label}</span>
        <span className="block" aria-hidden="true">{label}</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Mobile menu
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Entry animation refs
  const logoRef = useRef<HTMLAnchorElement>(null);
  const desktopUlRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Logo split refs
  const hRef = useRef<HTMLSpanElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      gsap.fromTo(
        [logoRef.current, hamburgerRef.current].filter(Boolean),
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    } else {
      const items = [
        logoRef.current,
        ...(desktopUlRef.current ? Array.from(desktopUlRef.current.children) : []),
        ctaRef.current,
      ].filter(Boolean);

      gsap.fromTo(
        items,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.07, delay: 0.1 }
      );
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      overlay.style.pointerEvents = "auto";
      gsap.fromTo(
        overlay,
        { clipPath: `circle(0% at ${MENU_ORIGIN})` },
        { clipPath: `circle(150% at ${MENU_ORIGIN})`, duration: 0.75, ease: "power3.inOut" }
      );
      gsap.fromTo(
        menuItemsRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07, delay: 0.35 }
      );
    } else {
      gsap.to(overlay, {
        clipPath: `circle(0% at ${MENU_ORIGIN})`,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => { overlay.style.pointerEvents = "none"; },
      });
    }
  }, [open]);

  return (
    <div className="relative w-full shrink-0">
      <nav className="flex items-center justify-between py-6 w-full">
        <Link
          href="/"
          ref={logoRef}
          className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px] whitespace-nowrap"
          onMouseEnter={() => {
            gsap.to(hRef.current, { x: -5, duration: 0.55, ease: "power3.out" });
            gsap.to(studioRef.current, { x: 5, duration: 0.55, ease: "power3.out" });
          }}
          onMouseLeave={() => {
            gsap.to([hRef.current, studioRef.current], { x: 0, duration: 0.5, ease: "power3.inOut" });
          }}
        >
          <span ref={hRef} style={{ display: "inline-block" }}>H.</span>
          <span ref={studioRef} style={{ display: "inline-block" }}>Studio</span>
        </Link>

        {/* Desktop: nav links */}
        <ul ref={desktopUlRef} className="hidden md:flex items-center gap-[56px] list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink label={link} />
            </li>
          ))}
        </ul>

        {/* Desktop: CTA */}
        <div ref={ctaRef} className="hidden md:block">
          <FillButton className="bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] whitespace-nowrap">
            Let&apos;s talk
          </FillButton>
        </div>

        {/* Mobile: hamburger */}
        <button
          ref={hamburgerRef}
          className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px] relative z-[60]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block w-full h-[2px] bg-black rounded-full transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile: full-screen overlay */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-50 bg-neutral-100 flex flex-col pointer-events-none"
        style={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <span className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px]">
            H.Studio
          </span>
          <div className="w-6" />
        </div>

        <ul className="flex-1 flex flex-col items-center justify-center gap-1 list-none m-0 p-0">
          {navLinks.map((link, i) => (
            <li
              key={link}
              ref={(el) => { menuItemsRef.current[i] = el; }}
            >
              <a
                href="#"
                className="block font-inter font-light text-[42px] text-black capitalize tracking-[-2px] leading-[1.15]"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-4 pb-12 flex justify-center">
          <button
            className="relative overflow-hidden btn-shimmer bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-8 py-4 rounded-[24px]"
            onClick={() => setOpen(false)}
          >
            <span className="relative">Let&apos;s talk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
