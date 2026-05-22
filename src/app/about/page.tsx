import type { Metadata } from 'next'
import { Carousel } from '@/components/Carousel'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { TimelineSection } from '@/components/TimelineSection'
import { AboutHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'About Us' }

const testimonials = [
  {
    quote: "FIPL's commitment to reliable power generation has been transformational. Their professionalism and expertise ensure seamless project execution every time.",
    name: 'Sarah L.',
    role: 'Lahore, Pakistan',
  },
  {
    quote: 'Working with FIPL over the years has shown us what true dedication to power reliability looks like. They have consistently exceeded expectations on every project.',
    name: 'James T.',
    role: 'CEO of Red Button',
  },
  {
    quote: 'The level of technical expertise and customer focus that FIPL brings to the table is unmatched in the Nigerian power sector. A truly world-class organisation.',
    name: 'Chukwudi O.',
    role: 'Director, Lagos Industries Ltd',
  },
]

const values = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <path d="M20 4L6 9v9c0 9 6 17 14 19 8-2 14-10 14-19V9L20 4z" strokeLinejoin="round"/>
        <path d="M14 20l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Safety',
    desc: 'We ensure safety in all areas of our operation.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <rect x="8" y="14" width="24" height="18" rx="2"/>
        <path d="M14 14v-4a6 6 0 0112 0v4" strokeLinecap="round"/>
        <circle cx="20" cy="23" r="3"/>
      </svg>
    ),
    title: 'Professionalism',
    desc: 'To deliver on all our endeavors with the highest level of professionalism.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <path d="M20 4c-4 6-10 10-10 16a10 10 0 0020 0c0-6-6-10-10-16z" strokeLinejoin="round"/>
        <line x1="20" y1="20" x2="20" y2="28" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Integrity',
    desc: 'To maintain integrity through discipline in all our actions.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <path d="M8 28c2-4 6-5 10-6l2-1 2 1c4 1 8 2 10 6" strokeLinecap="round"/>
        <circle cx="20" cy="14" r="6"/>
        <path d="M6 36c1-2 3-3 5-3M34 36c-1-2-3-3-5-3" strokeLinecap="round"/>
        <circle cx="9" cy="22" r="4"/>
        <circle cx="31" cy="22" r="4"/>
      </svg>
    ),
    title: 'Commitment to Stakeholders',
    desc: 'To maintain our commitment to delivering quality service to all our stakeholders.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <path d="M20 6c-8 4-10 12-6 18 2 3 5 5 6 10 1-5 4-7 6-10 4-6 2-14-6-18z" strokeLinejoin="round"/>
        <line x1="20" y1="14" x2="20" y2="34" strokeLinecap="round" strokeDasharray="2 3"/>
      </svg>
    ),
    title: 'Environmental Consciousness',
    desc: 'To ensure all our operations are environmentally friendly.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="white" strokeWidth="2">
        <rect x="12" y="6" width="16" height="28" rx="4"/>
        <path d="M12 20h16" strokeLinecap="round"/>
        <path d="M18 28h4" strokeLinecap="round"/>
        <path d="M16 3h8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sustainability',
    desc: 'To ensure our operations drive long-term environmental and social sustainability.',
  },
]

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <AboutHero />

      {/* ── 2. Our Purpose, Our Promise ─────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 w-[427px] h-[2278px] opacity-10 overflow-hidden -z-0 hidden xl:block">
          <div className="rotate-90 -translate-y-1/2 w-[2278px] h-[427px] bg-gradient-to-r from-[#D97300] to-[#DB1B0C]" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
            <Reveal variant="left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm font-normal text-[#DB1B0C] mb-3">
                  We are FIPL <BoltIcon />
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0E121D] mb-6">
                  Our Purpose, Our Promise
                </h2>
                <p className="text-[#797979] leading-[1.75] text-base mb-4">
                  First Independent Power Limited is a company in the business of power generation in Nigeria
                  located in Rivers State. We own and operate 4 gas turbine power plants within Rivers State
                  located in Trans-Amadi Port-Harcourt, Afam, Omoku and Eleme.
                </p>
                <p className="text-[#797979] leading-[1.75] text-base">
                  FIPL currently has a combined installed capacity of 541MW. FIPL has a vision of being the
                  largest and most stable power generation company in the South-South region of the country
                  while contributing significantly the power grid of Nigeria and thereby catalyzing the
                  socio-economic growth of the nation. In FIPL, we have a very dynamic team of intelligent,
                  driven and innovative young men and women who continually work to ensure that the vision of
                  the business is progressively realized.
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={0.15}>
              <div className="flex flex-row lg:flex-col gap-8 lg:gap-14 lg:pt-20 lg:pl-10 lg:border-l lg:border-[#e4e4e4] shrink-0">
                <div>
                  <div className="flex items-end gap-0.5 text-[56px] font-extrabold leading-none text-[#D97300]">
                    <AnimatedNumber value={541} /><span>+</span>
                  </div>
                  <p className="text-sm text-[#24283E] mt-4">MW Installed Capacity</p>
                </div>
                <div>
                  <div className="flex items-end gap-0.5 text-[56px] font-extrabold leading-none text-[#D97300]">
                    <AnimatedNumber value={10} /><span>+</span>
                  </div>
                  <p className="text-sm text-[#24283E] mt-4">Years Experiences</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Vision / Mission cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {[
              {
                icon: <svg className="w-8 h-8 text-[#DB1B0C]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>,
                title: 'Our Vision',
                body: 'To be the provider of choice wherever energy is consumed.',
              },
              {
                icon: <svg className="w-8 h-8 text-[#DB1B0C]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z"/></svg>,
                title: 'Our Mission',
                body: 'To transform through sustainable and reliable innovation in energy generation, connecting lives and positively impacting livelihoods.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} variant="scale" delay={i * 0.15}>
                <div className="bg-[#f3f5f5] flex flex-col items-center gap-3 px-10 py-6 text-center h-full fipl-card-hover">
                  {card.icon}
                  <h3 className="text-xl font-bold text-black">{card.title}</h3>
                  <p className="text-[#797979] text-sm leading-relaxed">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Journey / Timeline ────────────────────────────────── */}
      <TimelineSection />

      {/* ── 4. Core Values ──────────────────────────────────────── */}
      <section
        className="py-14 md:py-20 lg:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM39 0h1v40h-1zM0 0v1h40V0zM0 39v1h40v-1z' fill='%23fff'/%3E%3C/svg%3E")` }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="inline-flex items-center gap-2 text-sm text-white mb-3">Our Values <BoltIcon /></span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-white/80 text-base leading-relaxed max-w-[685px]">
                We are driven by a deep commitment to integrity, ensuring transparency and accountability in all our operations.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-stretch">
            {values.slice(0, 3).map((v, i) => (
              <div key={v.title} className="flex flex-1 items-stretch">
                <Reveal variant="scale" delay={i * 0.12} className="flex-1 flex flex-col items-center text-center gap-6 px-6 lg:px-8 py-8">
                  {v.icon}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{v.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
                {i < 2 && (
                  <div className="hidden sm:block w-px self-stretch flex-shrink-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.99) 50%, transparent 95%)' }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="hidden sm:block h-px w-full"
            style={{ background: 'linear-gradient(to right, transparent 5%, rgba(255,255,255,0.3) 50%, transparent 95%)' }}
          />

          <div className="flex flex-col sm:flex-row items-stretch">
            {values.slice(3).map((v, i) => (
              <div key={v.title} className="flex flex-1 items-stretch">
                <Reveal variant="scale" delay={i * 0.12} className="flex-1 flex flex-col items-center text-center gap-6 px-6 lg:px-8 py-8">
                  {v.icon}
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{v.title}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
                {i < 2 && (
                  <div className="hidden sm:block w-px self-stretch flex-shrink-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.99) 50%, transparent 95%)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Meet The CEO ─────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="flex flex-col items-center text-center mb-10">
              <span className="inline-flex items-center gap-2 text-sm text-[#DB1B0C] mb-3">More <BoltIcon /></span>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">Meet The CEO</h2>
              <p className="text-[#797979] text-base">A video address from our Chief Executive Officer</p>
            </div>
          </Reveal>

          <Reveal variant="scale" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden w-full h-[280px] sm:h-[400px] md:h-[520px] lg:h-[600px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.about.ceo} alt="FIPL CEO" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  aria-label="Play CEO video"
                  className="w-20 h-20 lg:w-28 lg:h-28 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                  style={{ background: 'rgba(219,27,12,0.9)', animation: 'glowPulse 2.5s ease-in-out infinite' }}
                >
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 translate-x-0.5" fill="white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Testimonials ─────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#f8f8f8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal variant="left">
              <div>
                <span className="inline-flex items-center gap-2 text-sm text-[#DB1B0C] mb-4">Testimonials <BoltIcon /></span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0E121D] leading-tight">
                  What Our Stakeholders<br />Say About Us.
                </h2>
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.1}>
              <Carousel testimonials={testimonials} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
