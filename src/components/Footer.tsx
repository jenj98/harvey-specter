"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          once: true,
        },
      });

      // Top row: CTA + socials stagger in
      tl.fromTo(
        q("[data-footer-top]"),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }
      )
      // Divider expands left → right
      .fromTo(
        q("[data-footer-divider]"),
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      // Bottom row fades up
      .fromTo(
        q("[data-footer-bottom]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-black">

      {/* ── Desktop + Tablet (≥768px) ─────────────────────────────────── */}
      <div className="hidden md:flex flex-col px-8 pt-12 gap-[120px]">

        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* Left: CTA */}
            <div data-footer-top="" className="flex flex-col gap-3 w-[298px] shrink-0">
              <p className="font-inter font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <FillButton
                className="self-start border border-white text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]"
                fillColor="bg-white"
                textColor="white"
                hoverTextColor="black"
                onClick={() => router.push("/contact")}
              >
                Let&apos;s Talk
              </FillButton>
            </div>

            {/* Center: social */}
            <div data-footer-top="" className="flex flex-col items-center w-[298px] shrink-0">
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Facebook</p>
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Instagram</p>
            </div>

            {/* Right: social */}
            <div data-footer-top="" className="flex flex-col items-end w-[298px] shrink-0">
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">x.com</p>
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</p>
            </div>

          </div>

          <div data-footer-divider="" className="w-full border-t border-white" />
        </div>

        {/* Bottom: H.Studio + legal */}
        <div className="flex items-end justify-between">

          <div data-footer-bottom="" className="relative flex-1 overflow-clip h-[15.2vw]">
            <div className="absolute left-0 top-0 bottom-0 w-[15px] flex items-center justify-center">
              <div className="-rotate-90 whitespace-nowrap">
                <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">
                  [ Coded By Claude ]
                </p>
              </div>
            </div>
            <p
              className="absolute top-1/2 -translate-y-1/2 left-0 font-inter font-semibold capitalize text-white whitespace-nowrap leading-[0.8]"
              style={{ fontSize: "20.14vw", letterSpacing: "-1.208vw" }}
            >
              H.Studio
            </p>
          </div>

          <div data-footer-bottom="" className="flex gap-[34px] items-center pb-8 shrink-0">
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Licences
            </a>
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Privacy policy
            </a>
          </div>

        </div>
      </div>

      {/* ── Mobile (<768px) ───────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col px-4 pt-12 gap-12">

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">

            <div data-footer-top="" className="flex flex-col gap-3">
              <p className="font-inter font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <FillButton
                className="self-start border border-white text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]"
                fillColor="bg-white"
                textColor="white"
                hoverTextColor="black"
                onClick={() => router.push("/contact")}
              >
                Let&apos;s Talk
              </FillButton>
            </div>

            <p data-footer-top="" className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Facebook</p>
            <p data-footer-top="" className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Instagram</p>
            <p data-footer-top="" className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">x.com</p>
            <p data-footer-top="" className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</p>

          </div>

          <div data-footer-divider="" className="w-full border-t border-white" />
        </div>

        <div className="flex flex-col gap-4 overflow-clip">
          <div data-footer-bottom="" className="flex gap-[34px] items-center">
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Licences
            </a>
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Privacy policy
            </a>
          </div>
          <div data-footer-bottom="" className="flex flex-col gap-3">
            <p className="font-mono font-normal text-[10px] text-white uppercase leading-[1.1]">
              [ Coded By Claude ]
            </p>
            <p
              className="font-inter font-semibold capitalize text-white whitespace-nowrap leading-[0.8]"
              style={{ fontSize: "24.38vw", letterSpacing: "-1.464vw" }}
            >
              H.Studio
            </p>
          </div>
        </div>

      </div>

    </footer>
  );
}
