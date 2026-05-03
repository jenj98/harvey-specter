const testimonials = [
  {
    id: 2,
    name: "Marko Stojković",
    text: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: "/testimonial-logo-2.svg",
    rotation: "-rotate-[6.85deg]",
    mobileRotation: "-rotate-[3.5deg]",
    pos: { left: "102.021px", top: "142.02px" },
    zClass: "z-20",
  },
  {
    id: 1,
    name: "Lukas Weber",
    text: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: "/testimonial-logo-1.svg",
    rotation: "rotate-[2.9deg]",
    mobileRotation: "rotate-[1.5deg]",
    pos: { right: "402.042px", top: "272px" },
    zClass: "z-0",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    text: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    logo: "/testimonial-logo-3.svg",
    rotation: "rotate-[2.23deg]",
    mobileRotation: "rotate-[1deg]",
    pos: { left: "305.004px", bottom: "153.684px" },
    zClass: "z-20",
  },
  {
    id: 4,
    name: "Sofia Martínez",
    text: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: "/testimonial-logo-4.svg",
    rotation: "-rotate-[4.15deg]",
    mobileRotation: "rotate-2",
    pos: { right: "86.234px", bottom: "212.832px" },
    zClass: "z-20",
  },
];

function TestimonialCard({ text, name, logo, rotation, className = "" }: {
  text: string;
  name: string;
  logo: string;
  rotation: string;
  className?: string;
}) {
  return (
    <div className={`${rotation} bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 ${className}`}>
      <img src={logo} alt="" className="h-auto max-h-9 w-auto max-w-[143px] object-contain object-left" />
      <p className="font-inter font-normal text-[18px] text-[#1f1f1f] tracking-[-0.72px] leading-[1.3]">
        {text}
      </p>
      <p className="font-inter font-black text-[16px] text-black tracking-[-0.64px] uppercase leading-[1.1] whitespace-nowrap">
        {name}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <>
      {/* ── Desktop: scattered card layout ──────────────────────────── */}
      <section className="hidden min-[1440px]:flex relative w-full bg-white overflow-hidden min-h-[960px] items-center justify-center px-8 py-[120px]">
        {/* Big centred title — z-10; Lukas (z-0) goes behind it, others (z-20) go in front */}
        <p className="font-inter font-medium text-[198px] text-black text-center tracking-[-13.86px] leading-[1.1] capitalize select-none relative z-10">
          Testimonials
        </p>
        {/* Absolutely scattered cards */}
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`absolute ${t.zClass}`}
            style={t.pos}
          >
            <TestimonialCard
              text={t.text}
              name={t.name}
              logo={t.logo}
              rotation={t.rotation}
              className="w-[353px]"
            />
          </div>
        ))}
      </section>

      {/* ── Mobile: title + horizontal swipe row ─────────────────────── */}
      <section className="min-[1440px]:hidden w-full bg-white py-16 flex flex-col gap-8">
        <p className="font-inter font-medium text-[64px] text-black text-center tracking-[-4.48px] leading-[0.8] capitalize px-4">
          Testimonials
        </p>
        {/* Swipeable row — snap to each card */}
        {/*
          < 1108px : mobile-style scroll (snap + 16px left padding)
          ≥ 1108px : all 4 cards (4×277=1108px) fit; disable scroll/snap, center the row
        */}
        <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory pl-4 py-4 scroll-px-4 min-[1108px]:overflow-x-visible min-[1108px]:snap-none min-[1108px]:justify-center min-[1108px]:pl-0 min-[1108px]:scroll-px-0">
          {testimonials.map((t, index) => (
            <div key={t.id} className={`${index === testimonials.length - 1 ? 'snap-end' : 'snap-start'} min-[1108px]:snap-none shrink-0 w-[277px] flex items-center justify-center`}>
              <TestimonialCard
                text={t.text}
                name={t.name}
                logo={t.logo}
                rotation={t.mobileRotation}
                className="w-[260px]"
              />
            </div>
          ))}
          <div className="shrink-0 w-4 min-[1108px]:hidden" />
        </div>
      </section>
    </>
  );
}
