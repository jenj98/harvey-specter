"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function FillButton({
  children,
  className = "",
  fillColor = "bg-neutral-700",
  textColor,
  hoverTextColor,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  fillColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  onClick?: () => void;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    gsap.to(fillRef.current, { y: "0%", duration: 0.35, ease: "power2.out" });
    if (hoverTextColor) {
      gsap.to(textRef.current, { color: hoverTextColor, duration: 0.35, ease: "power2.out" });
    }
  };

  const onLeave = () => {
    gsap.to(fillRef.current, { y: "100%", duration: 0.35, ease: "power2.in" });
    if (hoverTextColor) {
      gsap.to(textRef.current, { color: textColor ?? "white", duration: 0.35, ease: "power2.in" });
    }
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span
        ref={fillRef}
        className={`absolute inset-0 ${fillColor}`}
        style={{ transform: "translateY(100%)" }}
      />
      <span ref={textRef} className="relative">{children}</span>
    </button>
  );
}
