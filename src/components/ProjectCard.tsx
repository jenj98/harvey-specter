"use client";

import { useRef } from "react";
import gsap from "gsap";

interface SelectedWork {
  _id: string;
  title: string;
  slug: { current: string };
  image: { asset: { _ref: string }; alt: string };
  tags: string[];
  order: number;
}

export function ProjectCard({
  work,
  imageClass,
  imageUrl,
}: {
  work: SelectedWork;
  imageClass: string;
  imageUrl: string;
}) {
  const imgRef    = useRef<HTMLImageElement>(null);
  const titleRef  = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef   = useRef<SVGPathElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.07, duration: 0.65, ease: "power3.out", overwrite: "auto" });
    gsap.to(titleRef.current, { x: 8, duration: 0.45, ease: "power3.out", overwrite: "auto" });

    gsap.killTweensOf(pathRef.current);
    gsap.timeline()
      .to(pathRef.current,   { x: 5, y: -5, opacity: 0, duration: 0.18, ease: "power2.in" })
      .set(circleRef.current, { attr: { fill: "#111111" } })
      .set(pathRef.current,   { attr: { stroke: "#ffffff" }, x: -5, y: 5 })
      .to(pathRef.current,   { x: 0, y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.65, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(titleRef.current, { x: 0, duration: 0.45, ease: "power3.inOut", overwrite: "auto" });

    gsap.killTweensOf(pathRef.current);
    gsap.timeline()
      .to(pathRef.current,   { x: -5, y: 5, opacity: 0, duration: 0.18, ease: "power2.in" })
      .set(circleRef.current, { attr: { fill: "none" } })
      .set(pathRef.current,   { attr: { stroke: "#111111" }, x: 5, y: -5 })
      .to(pathRef.current,   { x: 0, y: 0, opacity: 1, duration: 0.28, ease: "power2.out" });
  };

  return (
    <div
      className="flex flex-col gap-[10px] cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={`relative overflow-hidden isolate ${imageClass}`}>
        <img
          ref={imgRef}
          src={imageUrl}
          alt={work.image.alt ?? work.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {work.tags?.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 flex gap-3 items-center">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="font-inter font-medium text-[14px] text-white tracking-[-0.56px] px-2 py-1 rounded-[24px] bg-[rgba(0,0,0,0.45)] backdrop-blur-[10px] whitespace-nowrap leading-normal"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p
          ref={titleRef}
          className="font-inter font-black text-[24px] md:text-[36px] text-black tracking-[-0.96px] md:tracking-[-1.44px] uppercase leading-[1.1] whitespace-nowrap"
        >
          {work.title}
        </p>

        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle ref={circleRef} cx="16" cy="16" r="15.5" stroke="#111111" fill="none" />
          <path
            ref={pathRef}
            d="M11.5 20.5L20.5 11.5M20.5 11.5H13.5M20.5 11.5V18.5"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
