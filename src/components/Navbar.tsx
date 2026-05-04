"use client";

import { useState, useEffect } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="relative w-full shrink-0">
      <nav className="flex items-center justify-between py-6 w-full">
        <span className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px] whitespace-nowrap">
          H.Studio
        </span>

        {/* Desktop: nav links */}
        <ul className="hidden md:flex items-center gap-[56px] list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px] whitespace-nowrap hover:opacity-60 transition-opacity duration-150"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop: CTA button */}
        <button className="hidden md:block bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] whitespace-nowrap hover:bg-neutral-800 transition-colors duration-150">
          Let&apos;s talk
        </button>

        {/* Mobile: hamburger — animates to X when open */}
        <button
          className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px] relative z-[60]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-300 ${
              open ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-black rounded-full transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile: full-screen overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-neutral-100 flex flex-col transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-6">
          <span className="font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px]">
            H.Studio
          </span>
          {/* Spacer to mirror hamburger width */}
          <div className="w-6" />
        </div>

        {/* Nav links — vertically and horizontally centered */}
        <ul className="flex-1 flex flex-col items-center justify-center gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="block font-inter font-light text-[42px] text-black capitalize tracking-[-2px] leading-[1.15] hover:opacity-40 transition-opacity duration-150"
                onClick={() => setOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA button pinned to bottom */}
        <div className="px-4 pb-12 flex justify-center">
          <button
            className="bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-8 py-4 rounded-[24px] hover:bg-neutral-800 transition-colors duration-150"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </button>
        </div>
      </div>
    </div>
  );
}
