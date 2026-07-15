import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PowerPlantsHero } from '@/components/PageHeroes'
import { PlantSlideshow } from '@/components/PlantSlideshow'
import { Reveal } from '@/components/Reveal'
import WorkProcessSection from '@/components/WorkProcessSection'
import { plants } from '@/lib/plants-data'
import { createServerClient } from '@/lib/supabase-server'
import { defaultPowerPlantsContent } from '@/lib/page-content-defaults'
import type { PageContentRow, PowerPlantsContent } from '@/lib/database.types'

export const metadata: Metadata = {
  title: 'Power Plants & Operations',
  description:
    'FIPL owns and operates four gas turbine power plants in Trans-Amadi, Afam, Omoku, and Eleme, Rivers State, with a combined installed capacity of 541MW.',
  alternates: { canonical: '/power-plants' },
}
export const dynamic = 'force-dynamic'

export default async function PowerPlantsPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('content')
    .eq('page', 'power-plants')
    .maybeSingle()

  const stored = (data as Pick<PageContentRow, 'content'> | null)?.content as
    | Partial<PowerPlantsContent>
    | undefined
  const intro = stored?.intro ?? defaultPowerPlantsContent.intro
  const workProcess = stored?.workProcess ?? defaultPowerPlantsContent.workProcess

  return (
    <div className="page-bolt-bg">
      <PowerPlantsHero />

      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <Reveal variant="left" className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                Our Plants{' '}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" />
                </svg>
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--fipl-heading)] mb-4">
                {intro.heading}
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">{intro.body}</p>
            </Reveal>
            <Reveal variant="fade" delay={0.2} className="shrink-0">
              <Link
                href={`/power-plants/${plants[0].slug}`}
                className="btn-shimmer inline-flex items-center gap-2 bg-[#DB1B0C] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#b81508] transition-colors text-sm whitespace-nowrap"
              >
                {intro.ctaLabel} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          {plants.map((plant) => (
            <Reveal
              key={plant.slug}
              variant={plant.imageLeft ? 'left' : 'right'}
              delay={0}
              duration={0.8}
            >
              <Link
                href={`/power-plants/${plant.slug}`}
                className={`flex flex-col ${plant.imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 bg-[var(--fipl-bg)] shadow-sm border border-[var(--fipl-border)] fipl-card-hover`}
              >
                <div className="lg:w-[420px] shrink-0 overflow-hidden relative h-[240px] md:h-[280px] lg:self-stretch">
                  <PlantSlideshow images={plant.images} imageLeft={plant.imageLeft} />
                </div>
                <div className="flex-1 p-7 md:p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#D97300] mb-4">
                    {plant.name}
                  </h3>
                  <p className="text-[var(--fipl-body)] leading-relaxed text-sm md:text-base mb-4 line-clamp-3">
                    {plant.desc}
                  </p>
                  <p className="text-sm text-[var(--fipl-body)] mb-5">
                    <span className="font-semibold text-[var(--fipl-heading)]">
                      Primary Gas Supplier:
                    </span>{' '}
                    {plant.supplier}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#DB1B0C]">
                    View Plant Details <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-we-work" className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-bg)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                Our Work Process{' '}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" />
                </svg>
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--fipl-heading)] mb-4">
                {workProcess.heading}
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                {workProcess.body}
              </p>
            </div>
          </Reveal>

          <WorkProcessSection />
        </div>
      </section>
    </div>
  )
}
