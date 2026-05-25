import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { SustainabilityHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Sustainability & CSR' }

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

const esgCards = [
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: 'Environmental',
    desc: 'Committed to reducing our carbon footprint, optimising energy efficiency, and implementing sustainable practices across all operations. We prioritise renewable energy and environmental stewardship.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-[#DB1B0C]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="20" cy="14" r="6" />
        <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" strokeLinecap="round" />
      </svg>
    ),
    title: 'Social Impact',
    desc: 'Empowering communities through education, healthcare, and economic initiatives. We invest in people, fostering inclusive growth and creating lasting positive change in society.',
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: 'Robust Government',
    desc: 'Upholding the highest standards of transparency, ethics, and accountability. Our governance framework ensures responsible decision-making and builds trust with all stakeholders.',
  },
]

export default function SustainabilityPage() {
  return (
    <div className="page-bolt-bg">
      <SustainabilityHero />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                ESG Commitment{' '}
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
                Environment, Social, and Governance (ESG)
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                Our ESG framework reflects our promise to operate responsibly and transparently. We
                are committed to minimising environmental impact, upholding ethical standards in
                governance, and creating social impact that empowers people and communities.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-col sm:flex-row items-stretch">
            {esgCards.map((card, i) => (
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
                {i < esgCards.length - 1 && (
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
                  Sustainability
                </h2>
                <p className="text-[var(--fipl-body)] mb-4 text-base leading-relaxed">
                  Our operations &amp; maintenance philosophy and strategy has evolved and is
                  aligned with:
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'Improving efficiency through reducing carbon emissions',
                    'Reducing fugitive emissions',
                    'Explore hardware upgrade options, combine-cycle integration',
                    'Maintained Ethical Practices that has fostered shared growth for us and our stakeholders',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--fipl-body)]">
                      <span className="text-[#DB1B0C] font-bold shrink-0 mt-0.5">→</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[var(--fipl-body)] mb-3 text-base">
                  We have built strong relationships with host communities in areas of our operation
                  by:
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Executing community development and high impact projects ranging from skills acquisitions, scholarship programs etc.',
                    'Local human capital integration in projects, participation in special programs e.g STEM',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--fipl-body)]">
                      <span className="text-[#DB1B0C] font-bold shrink-0 mt-0.5">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={0.15} duration={0.9}>
              <div className="relative h-[320px] md:h-[400px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.sustainability.nature}')`,
                    clipPath: 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.sustainability.nature}')`,
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
                    backgroundImage: `url('${IMAGES.sustainability.workplace}')`,
                    clipPath: 'polygon(0 0, 90% 0, 78% 50%, 0 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.sustainability.workplace}')`,
                    clipPath: 'polygon(0 50%, 89% 50%, 78% 100%, 0 100%)',
                  }}
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D97300] mb-4">
                  Health &amp; Safety First
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  FIPL is committed to maintaining the highest Environment, Health, Safety, Security
                  &amp; Quality (EHSSQ) standards across all entries and partners. We focus on
                  Injury prevention and the protection of all employees and sub-contractors from
                  occupational hazards in the execution of their responsibilities. Through a
                  systematic implementation of our Environmental Health and Safety Management
                  System, we ensure that our operations within our host communities are safe,
                  environmentally friendly, socially responsible, and efficiency-driven.
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
                  Corporate Governance
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  FIPL operates under a set of corporate governance and business principles in order
                  to deliver sustaining and sustainable performance over the long term. This we can
                  only achieve when everyone conforms to a set of high standards and binding values.
                  At FIPL, we strongly uphold our corporate values (SPICES) and engage in our
                  business activities in a transparent manner in accordance with the laid down
                  processes and procedures. We are also bound by the corporate governance standards
                  set out in the regulated Nigerian Electricity Supply Industry (NESI) and we ensure
                  to abide by these standards accordingly.
                </p>
              </div>
            </Reveal>
            <Reveal variant="fade" delay={0.15} duration={0.9}>
              <div className="relative h-[320px] md:h-[400px] w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.sustainability.governance}')`,
                    clipPath: 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
                  }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${IMAGES.sustainability.governance}')`,
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
                <Image
                  src={IMAGES.sustainability.sdg}
                  alt="SDG Goals"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  Our SDG Goals{' '}
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
                  Our Commitment to SDG Goals
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  We align our projects with the United Nations Sustainable Development Goals
                  (SDGs), ensuring our impact contributes to building a better future for all.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Affordable & Clean Energy',
                      desc: 'We align our projects with the United Nations Sustainable Development Goals, ensuring our impact contributes to building a better future for all.',
                    },
                    {
                      title: 'Quality Education',
                      desc: 'Supporting educational programs, STEM initiatives, and scholarships to empower the next generation of leaders.',
                    },
                    {
                      title: 'Decent Work & Economic Growth',
                      desc: 'Creating employment opportunities and fostering economic development in communities where we operate.',
                    },
                  ].map(({ title, desc }, i) => (
                    <Reveal key={title} variant="up" delay={i * 0.1}>
                      <div className="flex items-start gap-3">
                        <Check />
                        <div>
                          <h4 className="font-semibold text-[var(--fipl-heading)] text-sm mb-1">{title}</h4>
                          <p className="text-sm text-[var(--fipl-body)] leading-relaxed">{desc}</p>
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

      <section className="py-12 md:py-16 lg:py-20 bg-[var(--fipl-surface)]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px]">
                <Image
                  src={IMAGES.sustainability.community}
                  alt="Community empowerment"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.1}>
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  Our Initiatives{' '}
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
                  Empowering Communities,
                  <br />
                  Building Futures
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  We partner with our host communities to drive development initiatives in health,
                  education, empowerment, and infrastructure.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: 'Rural Electrification Projects',
                      desc: 'Providing electricity to underserved communities, enabling education, healthcare, and economic activities after dark.',
                    },
                    {
                      title: 'STEM Education & Scholarship Programs',
                      desc: 'Supporting students with scholarships, mentorship programs, and hands-on learning opportunities in science and technology.',
                    },
                    {
                      title: 'Healthcare Access Programs',
                      desc: 'Organizing medical camps, health screenings, and awareness campaigns to improve community health outcomes.',
                    },
                    {
                      title: 'Youth Empowerment Initiatives',
                      desc: 'Providing vocational training, skill development workshops, and entrepreneurial support for young people.',
                    },
                  ].map(({ title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <Check />
                      <div>
                        <h4 className="font-semibold text-[var(--fipl-heading)] text-sm mb-1">{title}</h4>
                        <p className="text-sm text-[var(--fipl-body)] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="#"
                  className="btn-shimmer inline-flex items-center gap-2 bg-[#DB1B0C] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#b81508] transition-colors text-sm"
                >
                  Export CSR Report ↗
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
