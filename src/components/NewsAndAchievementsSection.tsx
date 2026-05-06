"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type NewsArticlePreview = { image: string; body: string };

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4.5 13.5L13.5 4.5M13.5 4.5H7.5M13.5 4.5V10.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NewsCard({ image, text, offsetTop = false }: {
  image: string;
  text: string;
  offsetTop?: boolean;
}) {
  const imgRef  = useRef<HTMLImageElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current,  { scale: 1.07, duration: 0.65, ease: "power3.out", overwrite: "auto" });
    gsap.to(linkRef.current, { x: 5, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current,  { scale: 1, duration: 0.65, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(linkRef.current, { x: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
  };

  return (
    <div
      className={`flex flex-col gap-4 items-start cursor-pointer${offsetTop ? " pt-[60px] min-[1440px]:pt-[120px]" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="w-full aspect-[353/469] overflow-hidden shrink-0">
        <img ref={imgRef} src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <p className="font-inter font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">
        {text}
      </p>
      <div ref={linkRef} className="inline-flex items-center gap-[10px] border-b border-black py-1">
        <span className="font-inter font-medium text-[14px] text-black tracking-[-0.56px] leading-normal">
          Read more
        </span>
        <ArrowIcon />
      </div>
    </div>
  );
}

function MobileNewsCard({ image, text }: { image: string; text: string }) {
  const imgRef  = useRef<HTMLImageElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current,  { scale: 1.07, duration: 0.65, ease: "power3.out", overwrite: "auto" });
    gsap.to(linkRef.current, { x: 5, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current,  { scale: 1, duration: 0.65, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(linkRef.current, { x: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
  };

  return (
    <div
      className="flex flex-col gap-4 w-[300px] cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="w-[300px] aspect-[353/469] overflow-hidden">
        <img ref={imgRef} src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <p className="font-inter font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">
        {text}
      </p>
      <div ref={linkRef} className="inline-flex items-center gap-[10px] border-b border-black py-1">
        <span className="font-inter font-medium text-[14px] text-black tracking-[-0.56px] leading-normal">
          Read more
        </span>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default function NewsAndAchievementsSection({ articles }: { articles: NewsArticlePreview[] }) {
  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    // ── Desktop ──────────────────────────────────────────────────────────
    const desktopCtx = gsap.context((self) => {
      const q = self.selector!;

      // Cards: all three rise up together, scrubbed
      gsap.fromTo(
        q("[data-card]"),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: desktopRef.current,
            start: "top 78%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }, desktopRef);

    // ── Mobile ───────────────────────────────────────────────────────────
    const mobileCtx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(
        q("[data-mobile-card]"),
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mobileRef.current,
            start: "top 80%",
            end: "top 28%",
            scrub: 1.5,
          },
        }
      );
    }, mobileRef);

    return () => {
      desktopCtx.revert();
      mobileCtx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Desktop + Tablet (≥768px) ──────────────────────────────────── */}
      <section ref={desktopRef} className="hidden md:block bg-[#f3f3f3] w-full px-8 py-[80px] min-[1440px]:py-[120px]">
        <div className="flex items-end w-full">

          {/* Rotated title — two lines animate from opposite directions */}
          <div className="self-stretch flex items-center justify-center shrink-0 w-[70px] min-[1440px]:w-[110px] overflow-hidden">
            <div className="-rotate-90 flex-none whitespace-nowrap">
              <p className="font-inter font-light text-[40px] min-[1440px]:text-[64px] text-black tracking-[-3.2px] min-[1440px]:tracking-[-5.12px] uppercase leading-[0.86]">
                Keep up with my latest
              </p>
              <p className="font-inter font-light text-[40px] min-[1440px]:text-[64px] text-black tracking-[-3.2px] min-[1440px]:tracking-[-5.12px] uppercase leading-[0.86]">
                news &amp; achievements
              </p>
            </div>
          </div>

          {/* Three cards with dividers */}
          <div className="flex flex-1 items-start gap-5 min-[1440px]:gap-[31px] ml-6 min-[1440px]:ml-8">
            {articles.map((article, i) => (
              <>
                {i > 0 && <div key={`div-${i}`} className="w-px self-stretch bg-[#cccccc]" />}
                <div key={i} data-card="" className="flex-1 min-w-0">
                  <NewsCard image={article.image} text={article.body} offsetTop={i === 1} />
                </div>
              </>
            ))}
          </div>

        </div>
      </section>

      {/* ── Mobile only (<768px) ──────────────────────────────────────── */}
      <section ref={mobileRef} className="md:hidden bg-[#f3f3f3] w-full px-4 py-16">
        <div className="flex flex-col gap-8">

          <h2 className="font-inter font-light text-[32px] text-black tracking-[-2.56px] uppercase leading-[0.86]">
            Keep up with my latest news &amp; achievements
          </h2>

          <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory pl-4 scroll-px-4">
            {articles.map((article, index) => (
              <div
                key={index}
                data-mobile-card=""
                className={`${index === articles.length - 1 ? "snap-end" : "snap-start"} shrink-0 w-[316px]`}
              >
                <MobileNewsCard image={article.image} text={article.body} />
              </div>
            ))}
            <div className="shrink-0 w-4" />
          </div>

        </div>
      </section>
    </>
  );
}
