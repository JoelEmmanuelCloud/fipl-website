import { Fragment } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { SustainabilityHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { createServerClient } from '@/lib/supabase-server'
import { defaultSustainabilityContent } from '@/lib/page-content-defaults'
import type { PageContentRow, SustainabilityContent } from '@/lib/database.types'

export const metadata: Metadata = { title: 'Sustainability & CSR' }
export const dynamic = 'force-dynamic'

const focusIcons = [
  <svg
    key="health"
    className="w-10 h-10 text-[#DB1B0C]"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M20 34s-13-8-13-17a7 7 0 0113-3.5A7 7 0 0133 17c0 9-13 17-13 17z"
      strokeLinejoin="round"
    />
  </svg>,
  <svg
    key="education"
    className="w-10 h-10 text-[#DB1B0C]"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="8" y="10" width="24" height="24" rx="2" />
    <path d="M14 10V8a2 2 0 012-2h8a2 2 0 012 2v2" />
    <line x1="14" y1="20" x2="26" y2="20" strokeLinecap="round" />
    <line x1="14" y1="26" x2="20" y2="26" strokeLinecap="round" />
  </svg>,
  <svg
    key="environment"
    className="w-10 h-10 text-[#DB1B0C]"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M20 6c-8 4-10 12-6 18 2 3 5 5 6 10 1-5 4-7 6-10 4-6 2-14-6-18z"
      strokeLinejoin="round"
    />
    <line x1="20" y1="14" x2="20" y2="30" strokeLinecap="round" />
  </svg>,
]

export default async function SustainabilityPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('page_content')
    .select('content')
    .eq('page', 'sustainability')
    .maybeSingle()

  const stored = (data as Pick<PageContentRow, 'content'> | null)?.content as
    | Partial<SustainabilityContent>
    | undefined
  const weCare = stored?.weCare ?? defaultSustainabilityContent.weCare
  const focusAreas = (stored?.focusAreas ?? defaultSustainabilityContent.focusAreas).map(
    (f, i) => ({ ...f, icon: focusIcons[i] }),
  )
  const sustainabilityBlock =
    stored?.sustainabilityBlock ?? defaultSustainabilityContent.sustainabilityBlock
  const healthSafety = stored?.healthSafety ?? defaultSustainabilityContent.healthSafety
  const governance = stored?.governance ?? defaultSustainabilityContent.governance
  const sdg = stored?.sdg ?? defaultSustainabilityContent.sdg
  const community = stored?.community ?? defaultSustainabilityContent.community
  const projects = stored?.projects ?? defaultSustainabilityContent.projects
  const communityHeadingLines = community.heading.split('\n')

  return (
    <div className="page-bolt-bg">
      <SustainabilityHero />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                We Care{' '}
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
                {weCare.heading}
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base mb-4">
                {weCare.body1}
              </p>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">{weCare.body2}</p>
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--fipl-heading)]">
                Focus Areas
              </h3>
            </div>
          </Reveal>
          <div className="flex flex-col sm:flex-row items-stretch">
            {focusAreas.map((card, i) => (
              <div key={card.title} className="flex flex-1 items-stretch">
                <Reveal variant="scale" delay={i * 0.15} className="flex-1">
                  <div className="text-center flex flex-col items-center gap-4 fipl-card-hover p-6">
                    <div
                      style={{
                        animation: `floatOrb ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--fipl-heading)]">{card.title}</h3>
                    <p className="text-[var(--fipl-body)] text-base leading-relaxed">{card.desc}</p>
                  </div>
                </Reveal>
                {i < focusAreas.length - 1 && (
                  <div
                    className="hidden sm:block w-px self-stretch flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.12) 50%, transparent 95%)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-surface)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="left">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D97300] mb-4">
                  {sustainabilityBlock.heading}
                </h2>
                <p className="text-[var(--fipl-body)] mb-4 text-base leading-relaxed">
                  {sustainabilityBlock.body1}
                </p>
                <p className="text-[var(--fipl-body)] text-base leading-relaxed">
                  {sustainabilityBlock.body2}
                </p>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={0.15} duration={0.9}>
              <div className="relative h-[320px] md:h-[400px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${sustainabilityBlock.image}')`,
                    clipPath: 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${sustainabilityBlock.image}')`,
                    clipPath: 'polygon(11% 50%, 100% 50%, 100% 100%, 22% 100%)',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="fade" duration={0.9}>
              <div className="relative h-[320px] md:h-[400px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${healthSafety.image}')`,
                    clipPath: 'polygon(0 0, 90% 0, 78% 50%, 0 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${healthSafety.image}')`,
                    clipPath: 'polygon(0 50%, 89% 50%, 78% 100%, 0 100%)',
                  }}
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D97300] mb-4">
                  {healthSafety.heading}
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  {healthSafety.body}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-surface)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="left" delay={0.1}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D97300] mb-4">
                  {governance.heading}
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  {governance.body}
                </p>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={0.15} duration={0.9}>
              <div className="relative h-[320px] md:h-[400px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${governance.image}')`,
                    clipPath: 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${governance.image}')`,
                    clipPath: 'polygon(11% 50%, 100% 50%, 100% 100%, 22% 100%)',
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[320px] md:h-[400px]">
                <Image src={sdg.image} alt="SDG Goals" fill className="object-cover rounded-2xl" />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--fipl-heading)] mb-4">
                  {sdg.heading}
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  {sdg.body1}
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">{sdg.body2}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-surface)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px]">
                <Image
                  src={community.image}
                  alt="Community empowerment"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.1}>
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  {community.eyebrow}{' '}
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
                  {communityHeadingLines.map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      {i < communityHeadingLines.length - 1 && <br />}
                    </Fragment>
                  ))}
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  {community.body1}
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  {community.body2}
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  {community.body3}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                Our Projects{' '}
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
                {projects.heading}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <Reveal variant="left">
              <div>
                <div className="relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={projects.project1.image}
                    alt={projects.project1.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--fipl-heading)] mb-3">
                  {projects.project1.title}
                </h3>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  {projects.project1.desc}
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={0.1}>
              <div>
                <div className="relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={projects.project2.image}
                    alt={projects.project2.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--fipl-heading)] mb-3">
                  {projects.project2.title}
                </h3>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  {projects.project2.desc}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
