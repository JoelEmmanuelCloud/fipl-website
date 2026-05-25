import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CareersHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Careers' }

function Check() {
  return (
    <svg
      className="w-5 h-5 text-[#DB1B0C] shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

const jobs = [
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
  { title: 'Creative Product Developer', date: 'May 9, 2023', dept: 'Creative' },
]

const evpCards = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#DB1B0C]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 4l4 8h8l-6.5 5 2.5 8.5L16 21l-8 4.5 2.5-8.5L4 12h8z" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Growth Opportunity',
    desc: 'We prioritise career development through our performance-based promotions, robust learning interventions, talent mobility programs, cross-functional projects and higher-level responsibilities that align with personal career objectives.',
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#DB1B0C]"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M16 28C22.627 28 28 22.627 28 16S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" />
        <path d="M12 12c1-3 7-3 8 0s-2 5-4 6c-2-1-5-3-4-6z" />
      </svg>
    ),
    title: 'Culture',
    desc: 'Our inclusive culture is imbued with family values, originality, mutual respect, integrity, open and honest communication.',
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: 'Collaboration',
    desc: 'Networking is a fundamental aspect of our cross-functional collaborations. We offer our employees a strong sense of purpose and support them with the resources to succeed.',
  },
]

export default function CareersPage() {
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E121D]">
                  Why Join FIPL
                </h2>
              </div>
              <p className="text-[#797979] leading-relaxed text-base max-w-5xl mx-auto">
                First Independent Power Limited is passionate about supporting employees&apos;
                aspirations by providing limitless opportunities, a growth enabling and
                collaborative work environment. Our human capital strategies are centred around
                staff engagement, motivation, productivity and job satisfaction. At FIPL, our EVP
                tagline is Growth-Opportunity. Culture. Collaboration.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {evpCards.map((card, i) => (
              <Reveal key={card.title} variant="scale" delay={i * 0.12}>
                <div className="bg-[#f3f5f5] flex flex-col items-center gap-4 p-7 text-center fipl-card-hover h-full">
                  <div
                    style={{
                      animation: `floatOrb ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0E121D]">{card.title}</h3>
                  <p className="text-sm text-[#797979] leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-[#f8f8f8]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[320px] md:h-[400px] lg:h-[460px]">
                <Image src={IMAGES.careers.team} alt="FIPL team" fill className="object-cover" />
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
                <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-4">
                  What Drives Us
                </h2>
                <p className="text-[#797979] leading-relaxed mb-6 text-base">
                  Our work is guided by values that define who we are and how we operate — ensuring
                  that every watt of energy we generate comes from a place of excellence and
                  responsibility.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Integrity', desc: "We do what's right, always." },
                    { title: 'Innovation', desc: 'We challenge limits and improve continuously.' },
                    { title: 'Safety', desc: 'We put people and environment first.' },
                    {
                      title: 'Collaboration & Sustainability',
                      desc: 'We achieve more, together and are committed to lasting impact.',
                    },
                  ].map(({ title, desc }, i) => (
                    <Reveal key={title} variant="up" delay={i * 0.08}>
                      <div className="flex items-start gap-3">
                        <Check />
                        <div>
                          <span className="font-semibold text-[#0E121D] text-sm">{title}</span>
                          <p className="text-sm text-[#797979] mt-0.5">{desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E121D] mb-4">
                We are committed to lasting impact
              </h2>
              <p className="text-[#797979] leading-relaxed text-base">
                Explore roles across engineering, plant operations, administration, and management.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {jobs.map((job, i) => (
              <Reveal key={i} variant="up" delay={i * 0.07}>
                <div className="bg-white border border-gray-200 p-6 hover:border-[#DB1B0C] hover:shadow-md transition-all fipl-card-hover h-full">
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
                    <h3 className="font-bold text-[#0E121D] text-sm">{job.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#797979] mb-1">
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
                    {job.date}
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
                      {job.dept}
                    </span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#DB1B0C] mt-4 hover:gap-2 transition-all"
                  >
                    Apply Now ↗
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delay={0.1}>
            <div className="flex justify-center">
              <div
                className="rounded-3xl p-6 sm:p-8 md:p-14 text-center relative overflow-hidden w-full max-w-3xl"
                style={{ background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)' }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Don&apos;t See Your Role?
                </h3>
                <p className="text-white/85 mb-8 max-w-lg mx-auto text-base">
                  We&apos;re always looking for talented individuals. Join our talent pool and
                  we&apos;ll reach out when opportunities match your skills.
                </p>
                <Link
                  href="#"
                  className="btn-shimmer inline-flex items-center gap-2 bg-white text-[#DB1B0C] font-bold px-7 py-3.5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Join Our Talent Pool ↗
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
