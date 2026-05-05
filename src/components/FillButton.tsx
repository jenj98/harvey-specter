"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function FillButton({
  children,
  className = "",
  fillColor = "bg-white",
  textColor = "white",
  hoverTextColor = "black",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  onClick?: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    // Kill any in-flight animations so a quick re-hover starts clean
    gsap.killTweensOf([fill, textRef.current]);

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.hypot(rect.width, rect.height) * 1.1;

    // Snap circle to cursor entry point then expand
    gsap.set(fill, { left: x, top: y, width: 0, height: 0, xPercent: -50, yPercent: -50, opacity: 1 });
    gsap.to(fill, { width: radius * 2, height: radius * 2, duration: 0.45, ease: "power2.out" });

    // Delay text color slightly so the fill is visible before text flips
    gsap.to(textRef.current, { color: hoverTextColor, duration: 0.3, ease: "power2.out", delay: 0.12 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, { x: dx * 0.28, y: dy * 0.38, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, { x: dx * 0.1, y: dy * 0.14, duration: 0.35, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const fill = fillRef.current;
    if (!fill) return;

    // Kill in-flight tweens and immediately reset fill + text color
    gsap.killTweensOf([fill, textRef.current]);
    gsap.set(fill, { opacity: 0, width: 0, height: 0 });
    gsap.set(textRef.current, { clearProps: "color" });

    // Elastic snap-back for the magnetic movement
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.45)" });
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span
        ref={fillRef}
        className={`absolute pointer-events-none rounded-full ${fillColor}`}
        style={{ opacity: 0, left: 0, top: 0, width: 0, height: 0 }}
      />
      <span ref={textRef} className="relative">{children}</span>
    </button>
  );
}
