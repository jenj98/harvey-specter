function ArrowIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15.5" stroke="#111111" />
      <path
        d="M11.5 20.5L20.5 11.5M20.5 11.5H13.5M20.5 11.5V18.5"
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ title, image, imageClass }: {
  title: string;
  image: string;
  imageClass: string;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* isolate + overflow-hidden prevents backdrop-blur from escaping */}
      <div className={`relative overflow-hidden isolate ${imageClass}`}>
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 z-10 flex gap-3 items-center">
          {["Social Media", "Photography"].map((tag) => (
            <span
              key={tag}
              className="font-inter font-medium text-[14px] text-[#111] tracking-[-0.56px] px-2 py-1 rounded-[24px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px] whitespace-nowrap leading-normal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-inter font-black text-[24px] md:text-[36px] text-black tracking-[-0.96px] md:tracking-[-1.44px] uppercase leading-[1.1] whitespace-nowrap">
          {title}
        </p>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CtaBracket({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-3 px-5 ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      <div className="flex flex-col gap-[10px]">
        <p className="font-inter font-normal italic text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">
          Discover how my creativity transforms ideas into impactful digital
          experiences — schedule a call with me to get started.
        </p>
        <button className="self-start bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-neutral-800 transition-colors duration-150">
          Let&apos;s talk
        </button>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section className="w-full bg-white px-4 py-12 md:px-8 md:py-20">

      {/* ── Mobile header ───────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1]">
          [ portfolio ]
        </p>
        <div className="flex items-start justify-between w-full">
          <div className="font-inter font-light text-[32px] text-black tracking-[-2.56px] uppercase leading-[0.86]">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-mono font-normal text-[14px] text-[#1f1f1f] leading-[1.1]">004</p>
        </div>
      </div>

      {/* ── Desktop header ──────────────────────────────────────────── */}
      <div className="hidden md:flex items-center justify-between mb-[61px]">
        <div className="flex gap-[10px] items-start">
          <div className="font-inter font-light text-[96px] text-black tracking-[-7.68px] uppercase leading-[0.86]">
            <p>Selected</p>
            <p>Work</p>
          </div>
          <p className="font-mono font-normal text-[14px] text-[#1f1f1f] leading-[1.1]">004</p>
        </div>
        <div className="flex h-[110px] w-[15px] items-center justify-center">
          <p className="-rotate-90 font-mono font-normal text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap leading-[1.1]">
            [ portfolio ]
          </p>
        </div>
      </div>

      {/* ── Mobile: 4 cards stacked ─────────────────────────────────── */}
      {/* aspect-[676/744] and aspect-[676/699] mirror the desktop card proportions */}
      <div className="flex flex-col gap-6 md:hidden">
        <ProjectCard title="Surfers Paradise"   image="/selected-1.webp" imageClass="w-full aspect-[676/744]" />
        <ProjectCard title="Cyberpunk Caffe"    image="/selected-3.webp" imageClass="w-full aspect-[676/699]" />
        <ProjectCard title="Agency 976"         image="/selected-2.webp" imageClass="w-full aspect-[676/699]" />
        <ProjectCard title="Minimal Playground" image="/selected-4.webp" imageClass="w-full aspect-[676/744]" />
        <CtaBracket className="w-full" />
      </div>

      {/* ── Desktop: two-column staggered grid ──────────────────────── */}
      <div className="hidden md:flex gap-6 items-end">

        {/* Left column — stretches to row height, CTA pinned to bottom */}
        <div className="flex-1 self-stretch flex">
          <div className="flex-1 h-full flex flex-col justify-between">
            <ProjectCard title="Surfers Paradise" image="/selected-1.webp" imageClass="h-[744px]" />
            <ProjectCard title="Cyberpunk Caffe"  image="/selected-3.webp" imageClass="h-[699px]" />
            <CtaBracket className="w-[465px]" />
          </div>
        </div>

        {/* Right column — offset 240px from top */}
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          <ProjectCard title="Agency 976"         image="/selected-2.webp" imageClass="h-[699px]" />
          <ProjectCard title="Minimal Playground" image="/selected-4.webp" imageClass="h-[744px]" />
        </div>

      </div>
    </section>
  );
}
