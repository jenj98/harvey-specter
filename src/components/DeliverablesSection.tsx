const services = [
  { num: "1", title: "Brand Discovery",   image: "/deliverables-1.png" },
  { num: "2", title: "Web Design & Dev",  image: "/deliverables-2.png" },
  { num: "3", title: "Marketing",         image: "/deliverables-3.png" },
  { num: "4", title: "Photography",       image: "/deliverables-4.png" },
];

const description =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

export default function DeliverablesSection() {
  return (
    <section className="w-full bg-black px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">

        {/* [ services ] */}
        <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>

        {/* [4]   DELIVERABLES */}
        <div className="flex items-center justify-between w-full">
          <p className="font-inter font-light text-[32px] md:text-[96px] text-white uppercase leading-none tracking-[-0.08em] whitespace-nowrap">
            [4]
          </p>
          <p className="font-inter font-light text-[32px] md:text-[96px] text-white uppercase leading-none tracking-[-0.08em] whitespace-nowrap">
            Deliverables
          </p>
        </div>

        {/* Service list */}
        <div className="flex flex-col gap-12">
          {services.map((s) => (
            <div key={s.num} className="flex flex-col gap-[9px]">

              {/* Number + divider */}
              <p className="font-mono font-normal text-[14px] text-white uppercase leading-[1.1]">
                [ {s.num} ]
              </p>
              <div className="w-full border-t border-white" />

              {/* Desktop: title left, desc+image right. Mobile: all stacked */}
              <div className="flex flex-col gap-4 pt-1 md:flex-row md:items-start md:justify-between md:pt-0">

                <p className="font-inter font-bold italic text-[36px] text-white tracking-[-1.44px] uppercase leading-[1.1] whitespace-nowrap">
                  {s.title}
                </p>

                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <p className="font-inter font-normal text-[14px] text-white tracking-[-0.56px] leading-[1.3] md:w-[393px]">
                    {description}
                  </p>
                  <div className="w-[151px] h-[151px] shrink-0 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
