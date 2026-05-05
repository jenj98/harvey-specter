import Navbar from "@/components/Navbar";
import FillButton from "@/components/FillButton";
import AboutSection from "@/components/AboutSection";
import AboutSection2 from "@/components/AboutSection2";
import PhotoSection from "@/components/PhotoSection";
import DeliverablesSection from "@/components/DeliverablesSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsAndAchievementsSection from "@/components/NewsAndAchievementsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="relative h-screen isolate overflow-hidden flex flex-col items-center px-4 pb-6 justify-between md:px-8 xl:justify-start xl:gap-[240px] xl:pb-0">

      {/* ── Desktop background image (≥768px) ────────────────────────────
          hero-desktop.png is 1440×847 — exactly the Figma frame.
          object-cover + object-top fills the viewport while keeping
          the face anchored at the top on wider/shorter screens.
      */}
      <img
        alt=""
        src="/hero-desktop.png"
        className="absolute hidden md:block inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* ── Mobile background image (<768px) ─────────────────────────────
          hero-mobile.png is 375×635 — pre-cropped portrait for mobile.
          object-cover object-top fills the viewport, face anchored top.
      */}
      <img
        alt=""
        src="/hero-mobile.png"
        className="absolute md:hidden inset-0 w-full h-full object-cover object-top pointer-events-none"
      />

      {/* ── Frosted glass strip ───────────────────────────────────────────
          backdrop-blur blurs the bottom of the photo.
          Mask gradient fades the blur in seamlessly from the bottom edge.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
          maskImage:
            "linear-gradient(to top, black 55%, transparent 100%)",
        }}
      />

      {/* Spacer — keeps hero layout identical now that Navbar is fixed */}
      <div className="shrink-0 h-[72px]" aria-hidden="true" />

      <div className="relative flex flex-col w-full gap-6 md:gap-0 xl:shrink-0">

        {/* ── Label + H1 ─────────────────────────────────────────────────
            Mobile:  items-center, label justify-center, H1 text-center
            Desktop: items-start, label justify-start, H1 text-center
            Negative margins create the Figma overlap between label and H1.
        */}
        <div className="relative flex flex-col pb-[15px] w-full items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start mb-[-15px] px-[18px] w-full">
            <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1] whitespace-nowrap">
              [ Hello i&apos;m ]
            </p>
          </div>
          <div className="mb-[-15px] w-full">
            <h1 className="font-inter font-medium text-white text-center capitalize mix-blend-overlay w-full whitespace-pre-wrap md:whitespace-pre tracking-[-0.07em] leading-[0.8] text-[25.6vw] md:text-[13.75vw] md:leading-[1.1]">
              {"Harvey   Specter"}
            </h1>
          </div>
        </div>

        {/* ── Description + button ───────────────────────────────────────
            Mobile:  centered block (items-center on parent → w-[293px] centered)
            Desktop: right-aligned (md:items-end → w-[293px] at right edge)
        */}
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

    <AboutSection />
    <AboutSection2 />
    <div data-nav-theme="dark"><PhotoSection /></div>
    <div data-nav-theme="dark"><DeliverablesSection /></div>
    <SelectedWorkSection />
    <TestimonialsSection />
    <NewsAndAchievementsSection />
    <div data-nav-theme="dark"><Footer /></div>
    </>
  );
}
