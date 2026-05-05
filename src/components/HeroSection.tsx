"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FillButton from "@/components/FillButton";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgDesktopRef = useRef<HTMLImageElement>(null);
  const bgMobileRef = useRef<HTMLImageElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(q("[data-parallax='bg']"), { scale: 1.12, ease: "none" }, 0)
        .to(q("[data-parallax='left']"), { x: "-15vw", ease: "none" }, 0)
        .to(q("[data-parallax='right']"), { x: "15vw", ease: "none" }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen isolate overflow-hidden flex flex-col items-center px-4 pb-6 justify-between md:px-8 xl:justify-start xl:gap-[240px] xl:pb-0"
    >
      <img
        ref={bgDesktopRef}
        data-parallax="bg"
        alt=""
        src="/hero-desktop.png"
        className="absolute hidden md:block inset-0 w-full h-full object-cover object-top pointer-events-none"
      />
      <img
        ref={bgMobileRef}
        data-parallax="bg"
        alt=""
        src="/hero-mobile.png"
        className="absolute md:hidden inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
        }}
      />

      <div className="shrink-0 h-[72px]" aria-hidden="true" />

      <div className="relative flex flex-col w-full gap-6 md:gap-0 xl:shrink-0">

        <div className="relative flex flex-col pb-[15px] w-full items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start mb-[-15px] px-[18px] w-full">
            <p
              ref={helloRef}
              data-parallax="left"
              className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap"
            >
              [ Hello i&apos;m ]
            </p>
          </div>
          <div className="mb-[-15px] w-full">
            <h1 className="font-inter font-medium text-white text-center capitalize mix-blend-overlay w-full tracking-[-0.07em] leading-[0.8] text-[25.6vw] md:text-[13.75vw] md:leading-[1.1]">
              <span ref={harveyRef} data-parallax="left" className="inline-block">Harvey</span>
              <br className="md:hidden" />
              <span className="hidden md:inline-block whitespace-pre">{"   "}</span>
              <span ref={specterRef} data-parallax="right" className="inline-block">Specter</span>
            </h1>
          </div>
        </div>

        <div className="relative flex flex-col items-center md:items-end w-full">
          <div className="flex flex-col gap-[17px] items-start w-[293px]">
            <p className="font-inter font-bold italic text-[#1f1f1f] text-[14px] uppercase leading-[1.1] tracking-[-0.56px] w-[293px]">
              <span>H.Studio is a </span>
              <span className="font-normal">full-service</span>
              <span>
                {" "}
                creative studio creating beautiful digital experiences and
                products. We are an{" "}
              </span>
              <span className="font-normal">award winning</span>
              <span>
                {" "}
                design and art group specializing in branding, web design and
                engineering.
              </span>
            </p>
            <FillButton className="bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]">
              Let&apos;s talk
            </FillButton>
          </div>
        </div>
      </div>
    </div>
  );
}
