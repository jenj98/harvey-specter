export default function Footer() {
  return (
    <footer className="w-full bg-black">

      {/* ── Desktop + Tablet (≥768px) ─────────────────────────────────── */}
      <div className="hidden md:flex flex-col px-8 pt-12 gap-[120px]">

        {/* Top: CTA | social center | social right + divider */}
        <div className="flex flex-col gap-12">
          <div className="flex items-start justify-between">

            {/* Left: CTA */}
            <div className="flex flex-col gap-3 w-[298px] shrink-0">
              <p className="font-inter font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="self-start border border-white font-inter font-medium text-[14px] text-white tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-white hover:text-black transition-colors duration-150">
                Let&apos;s talk
              </button>
            </div>

            {/* Center: social */}
            <div className="flex flex-col items-center w-[298px] shrink-0">
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Facebook</p>
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Instagram</p>
            </div>

            {/* Right: social */}
            <div className="flex flex-col items-end w-[298px] shrink-0">
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">x.com</p>
              <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</p>
            </div>

          </div>

          {/* Horizontal divider */}
          <div className="w-full border-t border-white" />
        </div>

        {/* Bottom: H.Studio + legal links */}
        <div className="flex items-end justify-between">

          {/* H.Studio overflow block */}
          <div className="relative flex-1 overflow-clip h-[15.2vw]">
            {/* [ Coded By Claude ] — rotated on the left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[15px] flex items-center justify-center">
              <div className="-rotate-90 whitespace-nowrap">
                <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">
                  [ Coded By Claude ]
                </p>
              </div>
            </div>

            {/* Large H.Studio wordmark — overflows right, clipped */}
            <p
              className="absolute top-1/2 -translate-y-1/2 left-0 font-inter font-semibold capitalize text-white whitespace-nowrap leading-[0.8]"
              style={{ fontSize: "20.14vw", letterSpacing: "-1.208vw" }}
            >
              H.Studio
            </p>
          </div>

          {/* Legal links — pinned to bottom-right */}
          <div className="flex gap-[34px] items-center pb-8 shrink-0">
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Licences
            </a>
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Privacy policy
            </a>
          </div>

        </div>
      </div>

      {/* ── Mobile (<768px) ───────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col px-4 pt-12 gap-12">

        {/* CTA + social links + divider */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <p className="font-inter font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="self-start border border-white font-inter font-medium text-[14px] text-white tracking-[-0.56px] px-4 py-3 rounded-[24px] hover:bg-white hover:text-black transition-colors duration-150">
                Let&apos;s talk
              </button>
            </div>

            {/* Social links stacked */}
            <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Facebook</p>
            <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Instagram</p>
            <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">x.com</p>
            <p className="font-inter font-normal text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</p>

          </div>

          {/* Horizontal divider */}
          <div className="w-full border-t border-white" />
        </div>

        {/* Bottom: legal + coded by + H.Studio */}
        <div className="flex flex-col gap-4 overflow-clip">
          <div className="flex gap-[34px] items-center">
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Licences
            </a>
            <a className="font-inter font-normal text-[12px] text-white tracking-[-0.48px] uppercase leading-[1.1] underline cursor-pointer">
              Privacy policy
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono font-normal text-[10px] text-white uppercase leading-[1.1]">
              [ Coded By Claude ]
            </p>
            <p
              className="font-inter font-semibold capitalize text-white whitespace-nowrap leading-[0.8]"
              style={{ fontSize: "24.38vw", letterSpacing: "-1.464vw" }}
            >
              H.Studio
            </p>
          </div>
        </div>

      </div>

    </footer>
  );
}
