function BracketFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative py-3 px-5 ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#1f1f1f]" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1f1f1f]" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1f1f1f]" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#1f1f1f]" />
      {children}
    </div>
  );
}

export default function AboutSection2() {
  return (
    <section className="w-full bg-white px-4 py-12 md:px-8 md:py-20">

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

          <BracketFrame className="md:flex-1">
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
