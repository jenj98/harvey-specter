const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const articles = [
  { image: "/news-1.webp", text: description },
  { image: "/news-2.webp", text: description },
  { image: "/news-3.webp", text: description },
];

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

function ReadMoreLink() {
  return (
    <div className="inline-flex items-center gap-[10px] border-b border-black py-1">
      <span className="font-inter font-medium text-[14px] text-black tracking-[-0.56px] leading-normal">
        Read more
      </span>
      <ArrowIcon />
    </div>
  );
}

function DesktopCard({
  image,
  text,
  offsetTop = false,
}: {
  image: string;
  text: string;
  offsetTop?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 flex-1 min-w-0 items-start${offsetTop ? " pt-[60px] min-[1440px]:pt-[120px]" : ""}`}>
      <div className="w-full aspect-[353/469] overflow-hidden shrink-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <p className="font-inter font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">
        {text}
      </p>
      <ReadMoreLink />
    </div>
  );
}

export default function NewsAndAchievementsSection() {
  return (
    <>
      {/* ── Desktop + Tablet (≥768px) ──────────────────────────────────── */}
      <section className="hidden md:block bg-[#f3f3f3] w-full px-8 py-[80px] min-[1440px]:py-[120px]">
        <div className="flex items-end w-full">

          {/* Rotated title */}
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
            <DesktopCard image="/news-1.webp" text={articles[0].text} />
            <div className="w-px self-stretch bg-[#cccccc]" />
            <DesktopCard image="/news-2.webp" text={articles[1].text} offsetTop />
            <div className="w-px self-stretch bg-[#cccccc]" />
            <DesktopCard image="/news-3.webp" text={articles[2].text} />
          </div>

        </div>
      </section>

      {/* ── Mobile only (<768px) ──────────────────────────────────────── */}
      <section className="md:hidden bg-[#f3f3f3] w-full px-4 py-16">
        <div className="flex flex-col gap-8">

          <h2 className="font-inter font-light text-[32px] text-black tracking-[-2.56px] uppercase leading-[0.86]">
            Keep up with my latest news &amp; achievements
          </h2>

          <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory pl-4 scroll-px-4">
            {articles.map((article, index) => (
              <div
                key={index}
                className={`${index === articles.length - 1 ? "snap-end" : "snap-start"} shrink-0 w-[316px]`}
              >
                <div className="flex flex-col gap-4 w-[300px]">
                  <div className="w-[300px] aspect-[353/469] overflow-hidden">
                    <img src={article.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-inter font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">
                    {article.text}
                  </p>
                  <ReadMoreLink />
                </div>
              </div>
            ))}
            <div className="shrink-0 w-4" />
          </div>

        </div>
      </section>
    </>
  );
}
