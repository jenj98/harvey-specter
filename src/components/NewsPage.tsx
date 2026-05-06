"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

export type NewsArticle = {
  num: string;
  category: string;
  date: string;
  headline: string;
  body: string;
  image: string;
};

const achievements = [
  { year: "2025", title: "Cannes Lions — Silver, Brand Experience" },
  { year: "2024", title: "D&AD Pencil — Typography & Identity" },
  { year: "2024", title: "Creative Review — Agency of the Year Shortlist" },
  { year: "2023", title: "Ad Age — Emerging Creative of the Year" },
  { year: "2022", title: "Design Week — Top 50 Studios" },
];

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ articleCount }: { articleCount: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(q("[data-label]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo(q("[data-title]"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, 0.2)
        .fromTo(q("[data-sub]"),   { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.75);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-[48vh] min-h-[320px] bg-white flex flex-col px-4 md:px-8 pt-24 pb-10 md:pt-[100px] md:pb-14 overflow-hidden"
    >
      <span aria-hidden className="absolute right-0 bottom-[-1vw] font-inter font-black text-[26vw] text-black/[0.03] uppercase leading-none select-none pointer-events-none tracking-[-0.05em]">
        News
      </span>

      <div data-label="" className="flex items-center justify-between">
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.1em]">[ News &amp; Achievements ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/40 uppercase tracking-[0.1em]">2024 – 2025</p>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <h1 data-title="" className="font-inter font-light text-black uppercase tracking-[-0.04em] leading-[0.88]" style={{ fontSize: "clamp(48px, 8.5vw, 120px)" }}>
          Latest<br />Stories
        </h1>
      </div>

      <div data-sub="" className="flex items-center justify-between mt-5">
        <p className="font-mono text-[11px] md:text-[12px] text-black/30 uppercase tracking-[0.08em]">H.Studio</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/30 uppercase tracking-[0.08em]">{articleCount} articles</p>
      </div>
    </section>
  );
}

// ─── Articles ─────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: NewsArticle }) {
  const imgRef  = useRef<HTMLImageElement>(null);
  const linkRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current,  { scale: 1.05, duration: 0.9, ease: "power3.out",  overwrite: "auto" });
    gsap.to(linkRef.current, { x: 6,        duration: 0.4, ease: "power3.out",  overwrite: "auto" });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current,  { scale: 1, duration: 1,   ease: "power3.inOut", overwrite: "auto" });
    gsap.to(linkRef.current, { x: 0,     duration: 0.5, ease: "power3.inOut", overwrite: "auto" });
  };

  return (
    <div
      data-article=""
      className="flex flex-col gap-5 cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="overflow-hidden w-full aspect-[4/3]">
        <img ref={imgRef} src={article.image} alt={article.headline} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-black/35 uppercase tracking-[0.08em]">{article.category}</span>
          <span className="w-px h-3 bg-black/15" />
          <span className="font-mono text-[10px] text-black/35 uppercase tracking-[0.08em]">{article.date}</span>
        </div>
        <h2 className="font-inter font-light text-[20px] md:text-[24px] text-black tracking-[-0.04em] leading-[1.05]">
          {article.headline}
        </h2>
        <p className="font-inter text-[13px] text-black/50 leading-[1.75]">{article.body}</p>
        <span ref={linkRef} className="inline-flex items-center gap-2 font-mono text-[10px] text-black uppercase tracking-[0.08em] border-b border-black/25 pb-[2px] self-start">
          Read more <Arrow />
        </span>
      </div>
    </div>
  );
}

function Articles({ articles }: { articles: NewsArticle[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-article]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%", end: "top 30%", scrub: 1.4 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[72px] md:py-[100px]">
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <p className="font-mono text-[11px] md:text-[12px] text-black/35 uppercase tracking-[0.08em]">[ Articles ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/35 uppercase tracking-[0.08em]">002</p>
      </div>

      {/* Uniform 3-column grid on desktop */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
        {articles.map((a) => (
          <ArticleCard key={a.num} article={a} />
        ))}
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col gap-10 divide-y divide-black/[0.06]">
        {articles.map((a) => (
          <div key={a.num} className="pt-10 first:pt-0">
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      gsap.fromTo(q("[data-ach]"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 40%", scrub: 1.2 } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-white px-4 md:px-8 py-[72px] md:py-[100px]">
      <div className="flex items-center justify-between mb-12 md:mb-16">
        <p className="font-mono text-[11px] md:text-[12px] text-black/35 uppercase tracking-[0.08em]">[ Recognition ]</p>
        <p className="font-mono text-[11px] md:text-[12px] text-black/35 uppercase tracking-[0.08em]">003</p>
      </div>

      <div className="flex flex-col">
        {achievements.map((a, i) => (
          <div
            key={i}
            data-ach=""
            className="flex items-center justify-between py-5 md:py-6 border-b border-black/[0.08] first:border-t first:border-black/[0.08] group cursor-default"
          >
            <div className="flex items-center gap-6 md:gap-10">
              <span className="font-mono text-[10px] text-black/30 uppercase shrink-0">{a.year}</span>
              <p className="font-inter font-light text-[16px] md:text-[20px] text-black tracking-[-0.03em] leading-[1.2] group-hover:translate-x-2 transition-transform duration-300">
                {a.title}
              </p>
            </div>
            <span className="text-black/20 group-hover:text-black/60 transition-colors duration-300 shrink-0 ml-4">
              <Arrow />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewsPage({ articles }: { articles: NewsArticle[] }) {
  return (
    <>
      <Hero articleCount={articles.length} />
      <Articles articles={articles} />
      <Achievements />
    </>
  );
}
