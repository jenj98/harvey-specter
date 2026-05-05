"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhotoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(
        q("[data-photo]"),
        { filter: "blur(28px) brightness(1.18) saturate(0.6)", scale: 1.08 },
        {
          filter: "blur(0px) brightness(1) saturate(1)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 60%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden">
      <img
        data-photo=""
        src="/photo-desktop.webp"
        alt=""
        className="hidden md:block w-full h-auto object-cover"
      />
      <img
        data-photo=""
        src="/photo-mobile.webp"
        alt=""
        className="md:hidden w-full h-auto object-cover"
      />
    </section>
  );
}
