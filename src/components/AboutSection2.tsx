"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BracketFrame({ children, className = "", innerRef }: { children: React.ReactNode; className?: string; innerRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={innerRef} className={`relative py-3 px-5 ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      {children}
    </div>
  );
}

export default function AboutSection2() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: 3D perspective lift — scrubbed to scroll entry
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 80,
          rotationX: 18,
          scale: 0.92,
          transformPerspective: 1000,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "center 55%",
            scrub: 1.5,
          },
        }
      );

      // Text: rises in alongside image — scrubbed to scroll entry
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center 50%",
            scrub: 1.5,
          },
        }
      );

      // Text: parallax slide out left as section exits
      gsap.to(textRef.current, {
        x: "-15vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-4 py-12 md:px-8 md:py-20 overflow-hidden">

      {/* Mobile: 002 + [ About ] stacked at top */}
      <div className="flex flex-col gap-5 mb-5 md:hidden">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">002</p>
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">[ About ]</p>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        {/* Desktop-only: [ About ] in left column */}
        <p className="hidden md:block font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ About ]
        </p>

        {/* Right block: bracket frame + image */}
        <div className="flex flex-col gap-5 md:w-[68.26vw] md:flex-row md:items-end md:gap-8">

          <BracketFrame innerRef={textRef} className="md:flex-1">
            <p className="font-inter font-normal text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
              Harvey Specter is a New York City-based creative director and
              photographer with over 8 years of experience across editorial,
              brand identity, and digital experience design.
              <br /><br />
              His sharp, cinematic approach to visual storytelling has drawn
              collaborations with leading brands and independent artists alike.
              Through H.Studio, Harvey leads a full-service creative practice
              dedicated to building beautiful, purposeful digital products and
              experiences that stand apart.
            </p>
          </BracketFrame>

          <div className="flex flex-col gap-3">
            <p className="hidden md:block font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
              002
            </p>
            <img
              ref={imageRef}
              src="/about-portrait.jpg"
              alt="Harvey Specter portrait"
              className="w-full aspect-[422/594] object-cover object-top md:w-[436px] md:h-[614px] md:aspect-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
