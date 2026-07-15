import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { CareersHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { createServerClient } from '@/lib/supabase-server'
import { defaultCareersContent } from '@/lib/page-content-defaults'
import type { CareersContent, JobRow, PageContentRow } from '@/lib/database.types'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join FIPL and help power Nigeria’s industrial and economic growth. Explore open roles across engineering, plant operations, administration, and management.',
  alternates: { canonical: '/careers' },
}
export const dynamic = 'force-dynamic'

const evpIcons = [
  <svg
    key="growth"
    className="w-8 h-8 text-[#DB1B0C]"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M16 4l4 8h8l-6.5 5 2.5 8.5L16 21l-8 4.5 2.5-8.5L4 12h8z" strokeLinejoin="round" />
  </svg>,
  <svg
    key="culture"
    className="w-8 h-8 text-[#DB1B0C]"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M16 28C22.627 28 28 22.627 28 16S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" />
    <path d="M12 12c1-3 7-3 8 0s-2 5-4 6c-2-1-5-3-4-6z" />
  </svg>,
  <svg
    key="collaboration"
    className="w-8 h-8 text-[#DB1B0C]"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="10" cy="12" r="5" />
    <circle cx="22" cy="12" r="5" />
    <path
      d="M2 28c0-4.418 3.582-8 8-8M22 20c4.418 0 8 3.582 8 8M16 20c3.314 0 6 2.686 6 6"
      strokeLinecap="round"
    />
  </svg>,
]

export default async function CareersPage() {
  const supabase = createServerClient()
  const [{ data }, { data: pageRow }] = await Promise.all([
    supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false }),
    supabase.from('page_content').select('content').eq('page', 'careers').maybeSingle(),
  ])

  const jobs = (data ?? []) as JobRow[]
  const stored = (pageRow as Pick<PageContentRow, 'content'> | null)?.content as
    | Partial<CareersContent>
    | undefined
  const whyJoin = stored?.whyJoin ?? defaultCareersContent.whyJoin
  const evpCards = (stored?.evpCards ?? defaultCareersContent.evpCards).map((c, i) => ({
    ...c,
    icon: evpIcons[i],
  }))
  const workingInFipl = stored?.workingInFipl ?? defaultCareersContent.workingInFipl
  const talentPool = stored?.talentPool ?? defaultCareersContent.talentPool
  const ctaCard = stored?.ctaCard ?? defaultCareersContent.ctaCard

  return (
    <div className="page-bolt-bg">
      <CareersHero />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center mb-12">
              <div className="max-w-2xl mx-auto mb-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  Employee Value Proposition{' '}
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--fipl-heading)]">
                  {whyJoin.heading}
                </h2>
              </div>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base max-w-5xl mx-auto">
                {whyJoin.body}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {evpCards.map((card, i) => (
              <Reveal key={card.title} variant="scale" delay={i * 0.12}>
                <div className="bg-[var(--fipl-card)] flex flex-col items-center gap-4 p-7 text-center fipl-card-hover h-full">
                  <div
                    style={{
                      animation: `floatOrb ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--fipl-heading)]">{card.title}</h3>
                  <p className="text-sm text-[var(--fipl-body)] leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-surface)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[320px] md:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden">
                <Image src={workingInFipl.image} alt="FIPL team" fill className="object-cover" />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  We are FIPL{' '}
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
                  {workingInFipl.heading}
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  {workingInFipl.body1}
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  {workingInFipl.body2}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                Join our Talent Pool{' '}
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
                {talentPool.heading}
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">{talentPool.body}</p>
            </div>
          </Reveal>

          {jobs.length === 0 ? (
            <Reveal variant="up">
              <p className="text-center text-[var(--fipl-body)] py-8">
                No open roles at this time. Check back soon.
              </p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {jobs.map((job, i) => (
                <Reveal key={job.id} variant="up" delay={i * 0.07}>
                  <div className="bg-[var(--fipl-bg)] border border-[var(--fipl-border)] p-6 hover:border-[#DB1B0C] hover:shadow-md transition-all fipl-card-hover h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#DB1B0C]/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-5 h-5 text-[#DB1B0C]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-[var(--fipl-heading)] text-sm">{job.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--fipl-body)] mb-1">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      {new Date(job.posted_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      <span className="ml-2 flex items-center gap-1">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                        </svg>
                        {job.department}
                      </span>
                    </div>
                    {job.description && (
                      <p className="text-xs text-[var(--fipl-body)] mt-2 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    )}
                    <Link
                      href={`/apply/${job.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#DB1B0C] mt-4 hover:gap-2 transition-all"
                    >
                      Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal variant="scale" delay={0.1}>
            <div className="flex justify-center">
              <div
                className="rounded-3xl p-6 sm:p-8 md:p-14 text-center relative overflow-hidden w-full max-w-3xl"
                style={{ background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {ctaCard.heading}
                </h3>
                <p className="text-white/85 mb-8 max-w-lg mx-auto text-base">{ctaCard.body}</p>
                <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-md cursor-default select-none">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Talent Pool — Coming Soon
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
