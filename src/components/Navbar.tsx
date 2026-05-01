"use client";

import { useState } from "react";

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
          className="md:hidden w-6 h-6 flex flex-col justify-between py-[3px]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-200 ${
              open ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-black rounded-full transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-black rounded-full origin-center transition-transform duration-200 ${
              open ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile: dropdown menu */}
      {open && (
        <div className="md:hidden absolute top-full -left-4 -right-4 z-50 bg-white border-t border-neutral-100 shadow-md">
          <ul className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <li key={link} className="border-b border-neutral-100 last:border-0">
                <a
                  href="#"
                  className="block font-inter font-semibold text-[16px] text-black capitalize tracking-[-0.64px] py-4 hover:opacity-60 transition-opacity"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="py-4">
              <button
                className="w-full bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] py-3 rounded-[24px]"
                onClick={() => setOpen(false)}
              >
                Let&apos;s talk
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
