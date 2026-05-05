"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import FillButton from "@/components/FillButton";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];
const MENU_ORIGIN = "92% 5%";
const NAV_H = 80;

function NavLink({ label, theme }: { label: string; theme: "light" | "dark" }) {
  const innerRef = useRef<HTMLSpanElement>(null);
  return (
    <a
      href="#"
      className={`block font-inter font-semibold text-[16px] capitalize tracking-[-0.64px] whitespace-nowrap overflow-hidden h-[1em] transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
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
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const desktopUlRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const hRef = useRef<HTMLSpanElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);

  // Entry animation
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

  // Scroll: hide on down, reveal on up
  useEffect(() => {
    let lastY = window.scrollY;
    let hidden = false;

    const updateTheme = () => {
      const darkEls = document.querySelectorAll("[data-nav-theme='dark']");
      let isDark = false;
      darkEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < NAV_H && rect.bottom > 0) isDark = true;
      });
      setTheme((prev) => {
        const next = isDark ? "dark" : "light";
        return prev === next ? prev : next;
      });
    };

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= 0) {
        hidden = false;
        gsap.to(wrapperRef.current, { y: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
        setTheme("light");
        lastY = y;
        return;
      }

      const goingDown = y > lastY;
      lastY = y;

      if (goingDown && !hidden) {
        hidden = true;
        gsap.to(wrapperRef.current, { y: "-100%", duration: 0.35, ease: "power2.inOut", overwrite: "auto" });
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, overwrite: "auto" });
      } else if (!goingDown && hidden) {
        hidden = false;
        gsap.to(wrapperRef.current, { y: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(backdropRef.current, { opacity: 1, duration: 0.4, overwrite: "auto" });
      }

      updateTheme();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Mobile menu animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (open) {
      overlay.style.pointerEvents = "auto";
      gsap.fromTo(overlay, { clipPath: `circle(0% at ${MENU_ORIGIN})` }, { clipPath: `circle(150% at ${MENU_ORIGIN})`, duration: 0.75, ease: "power3.inOut" });
      gsap.fromTo(menuItemsRef.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.07, delay: 0.35 });
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
    <div ref={wrapperRef} className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8">

      <div
        ref={backdropRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}
      />

      <nav className="relative flex items-center justify-between py-6 w-full">

        <Link
          href="/"
          ref={logoRef}
          className={`font-inter font-semibold text-[16px] capitalize tracking-[-0.64px] whitespace-nowrap transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
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

        <ul ref={desktopUlRef} className="hidden md:flex items-center gap-[56px] list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink label={link} theme={theme} />
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="hidden md:block">
          <FillButton
            className={`whitespace-nowrap font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] transition-colors duration-300 ${
              theme === "dark"
                ? "border border-white bg-transparent text-white"
                : "bg-black text-white"
            }`}
            fillColor="bg-white"
            hoverTextColor="black"
          >
            Let&apos;s talk
          </FillButton>
        </div>

        <button
          ref={hamburgerRef}
          className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px] relative z-[60]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-full h-[2px] rounded-full origin-center transition-all duration-300 ${
            open ? "rotate-45 translate-y-[8px] bg-black" : theme === "dark" ? "bg-white" : "bg-black"
          }`} />
          <span className={`block w-full h-[2px] rounded-full transition-all duration-300 ${
            open ? "opacity-0 bg-black" : theme === "dark" ? "bg-white" : "bg-black"
          }`} />
          <span className={`block w-full h-[2px] rounded-full origin-center transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[8px] bg-black" : theme === "dark" ? "bg-white" : "bg-black"
          }`} />
        </button>
      </nav>

      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-50 bg-neutral-100 flex flex-col pointer-events-none"
        style={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <span className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px]">H.Studio</span>
          <div className="w-6" />
        </div>
        <ul className="flex-1 flex flex-col items-center justify-center gap-1 list-none m-0 p-0">
          {navLinks.map((link, i) => (
            <li key={link} ref={(el) => { menuItemsRef.current[i] = el; }}>
              <a href="#" className="block font-inter font-light text-[42px] text-black capitalize tracking-[-2px] leading-[1.15]" onClick={() => setOpen(false)}>
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
