export default function AboutSection() {
  return (
    <section className="w-full bg-white px-4 py-12 md:px-8 md:py-[120px]">

      {/* ── Header: label + divider ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 items-end mb-6">
        <p className="font-mono font-normal text-[14px] text-[#1f1f1f] uppercase leading-[1.1] text-right">
          [ 8+ years in industry ]
        </p>
        <div className="w-full h-px bg-[#1f1f1f]" />
      </div>

      {/* ── Text block ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 items-center md:items-start">

        {/* Line 1: "A CREATIVE DIRECTOR   /" + "001"
            Mobile:  001 above text (flex-col), both centered
            Desktop: text on left, 001 to its right (flex-row)            */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-3 uppercase">
          <p className="order-first md:order-last font-mono font-normal text-[14px] text-[#1f1f1f] leading-[1.1]">
            001
          </p>
          <p className="order-last md:order-first font-inter font-light text-[32px] md:text-[6.67vw] text-black tracking-[-0.08em] leading-[0.84] whitespace-pre">
            {"A creative director   /"}
          </p>
        </div>

        {/* Line 2: "PHOTOGRAPHER" — indented on desktop */}
        <p className="font-inter font-light text-[32px] md:text-[6.67vw] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap md:pl-[14.86vw]">
          Photographer
        </p>

        {/* Line 3: "BORN & RAISED" — & in Playfair italic */}
        <p className="font-inter font-light text-[32px] md:text-[6.67vw] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap md:pl-[42.36vw]">
          Born{" "}
          <span className="font-playfair italic">&amp;</span>
          {" "}raised
        </p>

        {/* Line 4: "ON THE SOUTH SIDE" — no indent */}
        <p className="font-inter font-light text-[32px] md:text-[6.67vw] text-black tracking-[-0.08em] leading-[0.84] uppercase whitespace-nowrap">
          on the south side
        </p>

        {/* Line 5: "OF CHICAGO." + label
            Mobile:  label below text (flex-col), both centered
            Desktop: label inline-right of text (flex-row), indented     */}
        <div className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:items-center md:pl-[42.08vw] md:gap-x-4 md:gap-y-1 uppercase">
          <p className="font-inter font-light text-[32px] md:text-[6.67vw] text-black tracking-[-0.08em] leading-[0.84] whitespace-nowrap">
            of chicago.
          </p>
          <p className="font-mono font-normal text-[14px] text-[#1f1f1f] leading-[1.1] whitespace-nowrap">
            [ creative freelancer ]
          </p>
        </div>

      </div>
    </section>
  );
}
