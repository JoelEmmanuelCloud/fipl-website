import type { Metadata } from 'next'
import Image from 'next/image'
import { TestimonialsBlock } from '@/components/TestimonialsBlock'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { TimelineSection } from '@/components/TimelineSection'
import { AboutHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'
import { createServerClient } from '@/lib/supabase-server'
import { defaultAboutContent } from '@/lib/page-content-defaults'
import type { AboutContent, PageContentRow, TestimonialRow } from '@/lib/database.types'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about First Independent Power Limited (FIPL) — our purpose, vision, mission, core values, and a decade of restoring and expanding power generation in Rivers State, Nigeria.',
  alternates: { canonical: '/about' },
}
export const dynamic = 'force-dynamic'

const fallbackTestimonials = [
  {
    quote:
      'Working at FIPL has been quite exciting and greatly insightful. My enthusiasm for growth has been met with overwhelming support and opportunities to develop in more ways than I could ever imagine.',
    name: 'Godwin Emmanuel',
    role: 'FIPL Staff',
  },
]

const valueIcons = [
  <svg
    key="safety"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <path d="M20 4L6 9v9c0 9 6 17 14 19 8-2 14-10 14-19V9L20 4z" strokeLinejoin="round" />
    <path d="M14 20l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg
    key="professionalism"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <rect x="8" y="14" width="24" height="18" rx="2" />
    <path d="M14 14v-4a6 6 0 0112 0v4" strokeLinecap="round" />
    <circle cx="20" cy="23" r="3" />
  </svg>,
  <svg
    key="integrity"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <path d="M20 4c-4 6-10 10-10 16a10 10 0 0020 0c0-6-6-10-10-16z" strokeLinejoin="round" />
    <line x1="20" y1="20" x2="20" y2="28" strokeLinecap="round" />
  </svg>,
  <svg
    key="stakeholders"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <path d="M8 28c2-4 6-5 10-6l2-1 2 1c4 1 8 2 10 6" strokeLinecap="round" />
    <circle cx="20" cy="14" r="6" />
    <path d="M6 36c1-2 3-3 5-3M34 36c-1-2-3-3-5-3" strokeLinecap="round" />
    <circle cx="9" cy="22" r="4" />
    <circle cx="31" cy="22" r="4" />
  </svg>,
  <svg
    key="environment"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <path
      d="M20 6c-8 4-10 12-6 18 2 3 5 5 6 10 1-5 4-7 6-10 4-6 2-14-6-18z"
      strokeLinejoin="round"
    />
    <line x1="20" y1="14" x2="20" y2="34" strokeLinecap="round" strokeDasharray="2 3" />
  </svg>,
  <svg
    key="sustainability"
    viewBox="0 0 40 40"
    className="w-10 h-10"
    fill="none"
    stroke="white"
    strokeWidth="2"
  >
    <rect x="12" y="6" width="16" height="28" rx="4" />
    <path d="M12 20h16" strokeLinecap="round" />
    <path d="M18 28h4" strokeLinecap="round" />
    <path d="M16 3h8" strokeLinecap="round" />
  </svg>,
]

export default async function AboutPage() {
  const supabase = createServerClient()
  const [{ data }, { data: pageRow }] = await Promise.all([
    supabase
      .from('testimonials')
      .select('quote, name, role')
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabase.from('page_content').select('content').eq('page', 'about').maybeSingle(),
  ])

  const rows = (data ?? []) as Pick<TestimonialRow, 'quote' | 'name' | 'role'>[]
  const testimonials = rows.length > 0 ? rows : fallbackTestimonials

  const stored = (pageRow as Pick<PageContentRow, 'content'> | null)?.content as
    | Partial<AboutContent>
    | undefined
  const purpose = stored?.purpose ?? defaultAboutContent.purpose
  const vision = stored?.vision ?? defaultAboutContent.vision
  const mission = stored?.mission ?? defaultAboutContent.mission
  const coreValues = stored?.coreValues ?? defaultAboutContent.coreValues
  const ceo = stored?.ceo ?? defaultAboutContent.ceo
  const integrity = stored?.integrity ?? defaultAboutContent.integrity
  const values = coreValues.map((v, i) => ({ ...v, icon: valueIcons[i] }))

  return (
    <div className="page-bolt-bg">
      <AboutHero />

      <section className="py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 w-[427px] h-[2278px] opacity-10 overflow-hidden -z-0 hidden xl:block">
          <div className="rotate-90 -translate-y-1/2 w-[2278px] h-[427px] bg-gradient-to-r from-[#D97300] to-[#DB1B0C]" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
            <Reveal variant="left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm font-normal text-[#DB1B0C] mb-3">
                  {purpose.eyebrow}{' '}
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
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--fipl-heading)] mb-6">
                  {purpose.heading}
                </h2>
                <p className="text-[var(--fipl-body)] leading-[1.75] text-base mb-4">
                  {purpose.body1}
                </p>
                <p className="text-[var(--fipl-body)] leading-[1.75] text-base mb-4">
                  {purpose.body2}
                </p>
                <p className="text-[var(--fipl-body)] leading-[1.75] text-base">{purpose.body3}</p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={0.15}>
              <div className="flex flex-row lg:flex-col gap-8 lg:gap-14 lg:pt-20 lg:pl-10 lg:border-l lg:border-[var(--fipl-border)] shrink-0">
                <div>
                  <div className="flex items-end gap-0.5 text-[38px] sm:text-[48px] lg:text-[56px] font-extrabold leading-none text-[#D97300]">
                    <AnimatedNumber value={parseInt(purpose.stat1Value, 10) || 0} />
                    <span>+</span>
                  </div>
                  <p className="text-sm text-[var(--fipl-secondary)] mt-4">{purpose.stat1Label}</p>
                </div>
                <div>
                  <div className="flex items-end gap-0.5 text-[38px] sm:text-[48px] lg:text-[56px] font-extrabold leading-none text-[#D97300]">
                    <AnimatedNumber value={parseInt(purpose.stat2Value, 10) || 0} />
                    <span>+</span>
                  </div>
                  <p className="text-sm text-[var(--fipl-secondary)] mt-4">{purpose.stat2Label}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#DB1B0C]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      strokeLinecap="round"
                      d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"
                    />
                  </svg>
                ),
                title: 'Our Vision',
                body: vision.body,
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-[#DB1B0C]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z"
                    />
                  </svg>
                ),
                title: 'Our Mission',
                body: mission.body,
              },
            ].map((card, i) => (
              <Reveal key={card.title} variant="scale" delay={i * 0.15}>
                <div className="bg-[var(--fipl-card)] flex flex-col items-center gap-3 px-10 py-6 text-center h-full fipl-card-hover">
                  {card.icon}
                  <h3 className="text-xl font-bold text-[var(--fipl-heading)]">{card.title}</h3>
                  <p className="text-[var(--fipl-body)] text-sm leading-relaxed">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection />

      <section
        className="pb-14 md:pb-20 lg:pb-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)',
          clipPath: 'polygon(0 70px, 54% 0, 50% 90px, 100% 25px, 100% 100%, 0 100%)',
          paddingTop: 'calc(90px + 3.5rem)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM39 0h1v40h-1zM0 0v1h40V0zM0 39v1h40v-1z' fill='%23fff'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-white/80 text-base leading-relaxed max-w-[685px]">
                We are driven by a deep commitment to integrity, ensuring transparency and
                accountability in all our operations.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-stretch">
            {values.slice(0, 3).map((v, i) => (
              <div key={v.title} className="flex flex-1 items-stretch">
                <Reveal
                  variant="scale"
                  delay={i * 0.12}
                  className="flex-1 flex flex-col items-center text-center gap-6 px-6 lg:px-8 py-8"
                >
                  {v.icon}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{v.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
                {i < 2 && (
                  <div
                    className="hidden sm:block w-px self-stretch flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.99) 50%, transparent 95%)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="hidden sm:block h-px w-full"
            style={{
              background:
                'linear-gradient(to right, transparent 5%, rgba(255,255,255,0.3) 50%, transparent 95%)',
            }}
          />

          <div className="flex flex-col sm:flex-row items-stretch">
            {values.slice(3).map((v, i) => (
              <div key={v.title} className="flex flex-1 items-stretch">
                <Reveal
                  variant="scale"
                  delay={i * 0.12}
                  className="flex-1 flex flex-col items-center text-center gap-6 px-6 lg:px-8 py-8"
                >
                  {v.icon}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{v.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
                {i < 2 && (
                  <div
                    className="hidden sm:block w-px self-stretch flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.99) 50%, transparent 95%)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--fipl-heading)] mb-3">
                {ceo.heading}
              </h2>
              <p className="text-[var(--fipl-body)] text-base">{ceo.subheading}</p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden w-full h-[280px] sm:h-[400px] md:h-[520px] lg:h-[600px]">
              <Image src={IMAGES.about.ceo} alt="FIPL CEO" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Play CEO video"
                  className="w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{
                    background: 'rgba(219,27,12,0.9)',
                    animation: 'glowPulse 2.5s ease-in-out infinite',
                  }}
                >
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 translate-x-0.5"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-8"
              style={{
                background: 'linear-gradient(135deg, #13132B 60%, #1e1e40 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(219,27,12,0.15)',
                  border: '1px solid rgba(219,27,12,0.3)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  fill="none"
                  stroke="#DB1B0C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {integrity.heading}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-2xl">{integrity.body}</p>
              </div>
              <a
                href={integrity.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(135deg, #DB1B0C, #D97300)' }}
              >
                {integrity.buttonLabel}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialsBlock testimonials={testimonials} heading={'Our FIPL Story.'} />
    </div>
  )
}
