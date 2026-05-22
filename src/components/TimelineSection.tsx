import { Reveal } from '@/components/Reveal'

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const milestones = [
  {
    year: '1998',
    title: 'Company Founded',
    desc: "FIPL was established as part of the Sahara Group with a vision to transform Nigeria's power generation landscape.",
  },
  {
    year: '2001',
    title: 'Omoku Power Plant',
    desc: 'Received our first major award, marking a reputation for excellence in tailored business solutions.',
  },
  {
    year: '2005',
    title: 'Afam Power Plant',
    desc: 'Successfully integrated the Afam Power Station, significantly increasing our generation capacity.',
  },
  {
    year: '2010',
    title: 'Trans Amadi Expansion',
    desc: 'Developed the Trans-Amadi Gas Turbine Power Plant, strengthening our presence in Rivers State.',
  },
  {
    year: '2015',
    title: 'Eleme Integration',
    desc: 'Added the Eleme Gas Turbine Power Plant to our portfolio, enhancing regional power supply.',
  },
  {
    year: '2020',
    title: 'Sustainability Initiatives',
    desc: 'Launched comprehensive environmental and sustainability programs across all facilities.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'Launched comprehensive digital transformation initiatives across all FIPL facilities.',
  },
]

function MilestoneCard({ item }: { item: typeof milestones[0] }) {
  return (
    <div className="border border-gray-200 p-5 bg-white hover:border-[#DB1B0C] hover:shadow-md transition-all">
      <div className="text-[#DB1B0C] text-2xl font-bold mb-1">{item.year}</div>
      <h3 className="font-bold text-[#0E121D] text-sm mb-2">{item.title}</h3>
      <p className="text-xs text-[#797979] leading-relaxed">{item.desc}</p>
    </div>
  )
}

export function TimelineSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DB1B0C] mb-3">
              Our Journey <BoltIcon />
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              A Legacy of Power &amp; Progress
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              From our founding to today, FIPL has consistently evolved to meet Nigeria&apos;s growing energy
              needs while maintaining our commitment to excellence and innovation.
            </p>
          </div>
        </Reveal>

        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#D97300] to-[#DB1B0C]" />
          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <Reveal key={item.year} variant={isLeft ? 'left' : 'right'} delay={i * 0.08}>
                <div className="grid grid-cols-[1fr_40px_1fr] items-center py-4">
                  <div className="pr-8">
                    {isLeft && <MilestoneCard item={item} />}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#DB1B0C] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#DB1B0C]" />
                    </div>
                  </div>
                  <div className="pl-8">
                    {!isLeft && <MilestoneCard item={item} />}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="relative md:hidden">
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D97300] to-[#DB1B0C]" />
          <div className="space-y-6">
            {milestones.map((item, i) => (
              <Reveal key={item.year} variant="right" delay={i * 0.06}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#DB1B0C] flex items-center justify-center mt-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#DB1B0C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <MilestoneCard item={item} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
