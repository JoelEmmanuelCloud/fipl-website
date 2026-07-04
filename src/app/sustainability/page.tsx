import type { Metadata } from 'next'
import Image from 'next/image'
import { SustainabilityHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Sustainability & CSR' }

const focusAreas = [
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
          d="M20 34s-13-8-13-17a7 7 0 0113-3.5A7 7 0 0133 17c0 9-13 17-13 17z"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Health',
    desc: 'We are committed to the health and well-being of the people and community in which we operate.',
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
    title: 'Education',
    desc: 'Our multiple education intervention schemes, including scholarships, seminars etc., restate our commitment to improving lives.',
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
        <path
          d="M20 6c-8 4-10 12-6 18 2 3 5 5 6 10 1-5 4-7 6-10 4-6 2-14-6-18z"
          strokeLinejoin="round"
        />
        <line x1="20" y1="14" x2="20" y2="30" strokeLinecap="round" />
      </svg>
    ),
    title: 'Environment',
    desc: 'We are environmentally aware and understand the importance of environmental protection and sustainability.',
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
                We Care
              </h2>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base mb-4">
                FIPL is conscious of the environment within which we operate, and we ensure that as
                a socially responsible company, we embark on some community development projects
                within our host communities to benefit the host community residents.
              </p>
              <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                At the heart of our business objectives lies an unwavering commitment to promoting
                good corporate citizenship across the globe. This is achieved through FIPL
                Foundation – the vehicle for our Corporate Social Responsibility (CSR) initiatives.
                The activities of FIPL Foundation are aimed at empowering the communities where we
                operate in a sustainable, transparent, and efficient manner.
              </p>
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
                  Sustainability
                </h2>
                <p className="text-[var(--fipl-body)] mb-4 text-base leading-relaxed">
                  Our operations and maintenance philosophy is driven by efficiency, sustainability,
                  and continuous improvement. We are committed to reducing carbon and fugitive
                  emissions while exploring hardware upgrades and combined-cycle integration to
                  enhance plant performance and reliability. Guided by ethical business practices,
                  we continue to create shared value for our stakeholders and deliver sustainable
                  growth.
                </p>
                <p className="text-[var(--fipl-body)] text-base leading-relaxed">
                  We have also built strong partnerships with our host communities through impactful
                  development initiatives, including skills acquisition programs, scholarship
                  schemes, and STEM education. By promoting local human capital integration and
                  community participation in our projects, we continue to foster inclusive growth
                  and long-term social impact.
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
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--fipl-heading)] mb-4">
                  Our SDG Goals
                </h2>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  At FIPL, sustainability is embedded in the way we operate. We align our business
                  and community development initiatives with the United Nations Sustainable
                  Development Goals (SDGs), ensuring our actions create lasting value for people,
                  communities, and the environment.
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  Our commitment to affordable and clean energy is reflected in our efforts to
                  provide reliable and efficient power while continuously improving environmental
                  performance. Through our investment in quality education, we support STEM
                  programs, scholarships, and learning opportunities that equip young people with
                  the knowledge and skills to shape the future. We also promote decent work and
                  economic growth by creating employment opportunities, developing local talent, and
                  supporting initiatives that stimulate inclusive and sustainable economic
                  development within our host communities.
                </p>
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
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  We partner with our host communities to drive sustainable development through
                  impactful initiatives in health, education, empowerment, and infrastructure.
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-4 text-base">
                  Our community investment programmes include rural electrification projects that
                  bring reliable electricity to underserved communities, enabling education,
                  healthcare, and economic activities. We also support STEM education through
                  scholarships, mentorship, and hands-on learning opportunities that inspire the
                  next generation of innovators.
                </p>
                <p className="text-[var(--fipl-body)] leading-relaxed mb-6 text-base">
                  Our healthcare access programmes provide medical outreach, health screenings, and
                  awareness campaigns to improve community well-being, while our youth empowerment
                  initiatives equip young people with vocational skills, entrepreneurship training,
                  and the resources needed to build sustainable livelihoods.
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
                Making a Difference in Our Host Communities
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <Reveal variant="left">
              <div>
                <div className="relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={IMAGES.sustainability.projectHealth}
                    alt="FIPL Health Fair for Obrikom Community"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--fipl-heading)] mb-3">
                  Health Fair (Health is Wealth)
                </h3>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  We organized a health fair for the Obrikom Community residents tagged
                  &ldquo;Health is Wealth&rdquo;, where up to 200 people were given basic health
                  education, vital signs checks, eye checks and mild corrective lenses, anti-malaria
                  treatments for pregnant women, and mosquito nets to use at home.
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={0.1}>
              <div>
                <div className="relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={IMAGES.sustainability.projectSchool}
                    alt="Renovation of UBE Primary School, Obrikom"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--fipl-heading)] mb-3">
                  Renovation of UBE Primary School
                </h3>
                <p className="text-[var(--fipl-body)] leading-relaxed text-base">
                  The UBE Primary School Obrikom, which was previously in a deplorable state with
                  open roofs, broken doors and windows, no boards, and broken furniture, and no
                  toilets, received an intervention from FIPL as the entire school block was
                  renovated, furniture was provided, and a block of six toilets was built and
                  commissioned in January 2019.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
