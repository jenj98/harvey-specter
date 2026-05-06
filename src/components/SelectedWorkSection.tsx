import { client, urlFor } from '@/lib/sanity/client'
import FillButton from '@/components/FillButton'
import { ProjectCard } from '@/components/ProjectCard'

interface SelectedWork {
  _id: string
  title: string
  slug: { current: string }
  image: { asset: { _ref: string }; alt: string }
  tags: string[]
  order: number
}

async function getSelectedWorks(): Promise<SelectedWork[]> {
  return client.fetch(
    `*[_type == "selectedWork"] | order(order asc) {
      _id, title, slug, image, tags, order
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

// Orders 1 & 4 → tall (744px), orders 2 & 3 → short (699px)
function heightClass(order: number) {
  return order % 3 === 1 ? 'h-[744px]' : 'h-[699px]'
}

function aspectClass(order: number) {
  return order % 3 === 1 ? 'aspect-[676/744]' : 'aspect-[676/699]'
}

function CtaBracket({ className = '' }: { className?: string }) {
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
        <FillButton className="self-start bg-black text-white font-inter font-medium text-[14px] tracking-[-0.56px] px-4 py-3 rounded-[24px]">
          Let&apos;s talk
        </FillButton>
      </div>
    </div>
  )
}

export default async function SelectedWorkSection() {
  const works = await getSelectedWorks()

  const left = works.filter((w) => w.order <= 2)
  const right = works.filter((w) => w.order >= 3)

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

      {/* ── Mobile: stacked ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 md:hidden">
        {works.map((work) => (
          <ProjectCard key={work._id} work={work} imageClass={`w-full ${aspectClass(work.order)}`} imageUrl={urlFor(work.image).width(800).auto('format').url()} />
        ))}
        <CtaBracket className="w-full" />
      </div>

      {/* ── Desktop: two-column staggered grid ──────────────────────── */}
      <div className="hidden md:flex gap-6 items-end">
        <div className="flex-1 self-stretch flex">
          <div className="flex-1 h-full flex flex-col justify-between">
            {left.map((work) => (
              <ProjectCard key={work._id} work={work} imageClass={heightClass(work.order)} imageUrl={urlFor(work.image).width(800).auto('format').url()} />
            ))}
            <CtaBracket className="w-[465px]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[117px] pt-[240px]">
          {right.map((work) => (
            <ProjectCard key={work._id} work={work} imageClass={heightClass(work.order)} imageUrl={urlFor(work.image).width(800).auto('format').url()} />
          ))}
        </div>
      </div>

    </section>
  )
}
