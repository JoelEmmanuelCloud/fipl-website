import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PowerPlantsHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Power Plants & Operations' }


const plants = [
  {
    id: 'omoku',
    name: 'Omoku Plant',
    image: IMAGES.plants.omoku,
    desc: 'The Omoku Power Plant is located beside the NAOC Gas Processing Plant in Obrikiri. It was commissioned in December 2006 and has six units of 25MW GE Nuovo Pignone heavy-duty gas turbines, totaling 150MW installed capacity. The plant generates power and transmits it to the national grid via its on-site 132KV switching facility through the Rumuosi Transmission Substation.',
    supplier: 'Nigerian Agip Oil Company (NAOC)',
    imageLeft: true,
  },
  {
    id: 'trans-amadi',
    name: 'Trans Amadi Plant',
    image: IMAGES.plants.transAmadi,
    desc: 'The Trans-Amadi Power Plant is sited in a land area of about 4 Hectares. It has a total installed capacity of 136MW. The plant was commissioned in 2 phases. Phase I consists of 3 x 12MW solar mars gas turbines commissioned in October 2002, while Phase II consists of 4 x 25 MW Nuovo Pignone frame 5 gas turbines commissioned in May 2019. The Power plant has the following facilities: 4 x 25MW GE Nuovo Pignone gas turbines, 3 x 11 MW GE solar mars gas turbines, control buildings, 4 x 36MVA transformers (11KV/132KV), 3 X 73MVA (33KV/132KV) transformers and is supported by 2 black start generators for island mode startup.',
    supplier: 'Heirs Energies Limited',
    imageLeft: false,
  },
  {
    id: 'afam',
    name: 'Afam Plant',
    image: IMAGES.plants.afam,
    desc: 'The Afam Power Plant is in Oyigbo LGA of Rivers State. It was commissioned in December 2011 with an installed GE (formerly Alstom) GT13E2 gas turbine of 180MW capacity Installed Capacity and 160MW, exporting an average of 3500MWH per day into the national grid. Evacuation System: 33kV/132kV.',
    supplier: 'Ohuru Trading Company and Accugas Eleme',
    imageLeft: true,
  },
  {
    id: 'eleme',
    name: 'Eleme Plant',
    image: IMAGES.plants.eleme,
    desc: 'Eleme Power Station has 25MW currently available at the 75MW installed capacity. Plans are in progress to recover an additional 50MW by 2026. Commissioned Dec. 2023 Evacuation System: 33kV to Bilateral Customers. The plant has a provision for future evacuation at 132kV to the Grid.',
    supplier: 'Ohuru Trading Company',
    imageLeft: false,
  },
]

const steps = [
  {
    num: '01',
    title: 'Project Planning & Feasibility',
    desc: 'We begin with in-depth research, feasibility studies, and stakeholder consultations to ensure every project is technically sound and commercially viable.',
    image: IMAGES.plants.step1,
  },
  {
    num: '02',
    title: 'Engineering & Design',
    desc: 'Our team develops innovative and sustainable engineering solutions, leveraging global best practices while tailoring designs to local realities.',
    image: IMAGES.plants.step2,
  },
  {
    num: '03',
    title: 'Execution & Commissioning',
    desc: 'From procurement to construction and testing, we deliver projects with strict adherence to safety, timelines, and quality standards.',
    image: IMAGES.plants.step3,
  },
  {
    num: '04',
    title: 'Operation & Sustainability',
    desc: 'Once commissioned, we ensure smooth operations, continuous optimization, and sustainable practices to maximize efficiency and community impact.',
    image: IMAGES.plants.step4,
  },
]

export default function PowerPlantsPage() {
  return (
    <div className="page-bolt-bg">
      <PowerPlantsHero />

      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <Reveal variant="left" className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">Our Plants <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" /></svg></span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-4">Our Power Plants</h2>
              <p className="text-[#797979] leading-relaxed text-base">
                First Independent Power Limited is a company in the business of power generation in Nigeria
                located in Rivers State. We own and operate 4 gas turbine power plants within Rivers State located
                in Trans-Amadi Port-Harcourt, Afam, Omoku and Eleme. FIPL currently has a combined installed
                capacity of 541MW.
              </p>
            </Reveal>
            <Reveal variant="fade" delay={0.2} className="shrink-0">
              <Link
                href="#omoku"
                className="btn-shimmer inline-flex items-center gap-2 bg-[#DB1B0C] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#b81508] transition-colors text-sm whitespace-nowrap"
              >
                Explore All Plants ↗
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          {plants.map((plant, i) => (
            <Reveal
              key={plant.id}
              variant={plant.imageLeft ? 'left' : 'right'}
              delay={0}
              duration={0.8}
            >
              <div
                id={plant.id}
                className={`scroll-mt-20 flex flex-col ${plant.imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 bg-white shadow-sm border border-gray-100 fipl-card-hover`}
              >
                <div className="lg:w-[420px] shrink-0 overflow-hidden relative h-[240px] md:h-[280px] lg:self-stretch">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${plant.image}')`,
                      clipPath: plant.imageLeft
                        ? 'polygon(0 0, 90% 0, 78% 50%, 0 50%)'
                        : 'polygon(10% 0, 100% 0, 100% 50%, 22% 50%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${plant.image}')`,
                      clipPath: plant.imageLeft
                        ? 'polygon(0 50%, 89% 50%, 78% 100%, 0 100%)'
                        : 'polygon(11% 50%, 100% 50%, 100% 100%, 22% 100%)',
                    }}
                  />
                </div>
                <div className="flex-1 p-7 md:p-8 lg:p-10 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#D97300] mb-4">{plant.name}</h3>
                  <p className="text-[#797979] leading-relaxed text-sm md:text-base mb-4">{plant.desc}</p>
                  <p className="text-sm text-[#797979]">
                    <span className="font-semibold text-[#0E121D]">Primary Gas Supplier:</span>{' '}
                    {plant.supplier}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-we-work" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">Our Work Process <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" /></svg></span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E121D] mb-4">How We Power Nigeria</h2>
              <p className="text-[#797979] leading-relaxed text-base">
                Our approach ensures every project is executed with precision, safety, and sustainability at the core.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[21px] items-end">
            {steps.map((step, i) => {
              const isTop = i % 2 === 0
              return (
                <Reveal key={step.num} variant="up" delay={i * 0.1}>
                  <div className="relative flex flex-col">
                    {isTop ? (
                      <>
                        <div className="relative overflow-hidden h-[260px] rounded-tl-[200px] rounded-tr-[200px]">
                          <Image src={step.image} alt={step.title} fill className="object-cover" />
                        </div>
                        <div className="relative flex justify-center">
                          <div
                            className="absolute -top-[38px] w-[76px] h-[76px] bg-[#D97300] rounded-full flex items-center justify-center z-10"
                            style={{ border: '10px solid white' }}
                          >
                            <span className="text-white font-bold text-xl leading-none">{step.num}</span>
                          </div>
                        </div>
                        <div className="pt-14 text-center px-2">
                          <h4 className="font-bold text-[#0E121D] text-xl mb-3">{step.title}</h4>
                          <p className="text-[#797979] leading-relaxed text-base">{step.desc}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center px-2 pb-14">
                          <h4 className="font-bold text-[#0E121D] text-xl mb-3">{step.title}</h4>
                          <p className="text-[#797979] leading-relaxed text-base">{step.desc}</p>
                        </div>
                        <div className="relative flex justify-center">
                          <div
                            className="absolute -top-[38px] w-[76px] h-[76px] bg-[#D97300] rounded-full flex items-center justify-center z-10"
                            style={{ border: '10px solid white' }}
                          >
                            <span className="text-white font-bold text-xl leading-none">{step.num}</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden h-[260px] rounded-bl-[200px] rounded-br-[200px]">
                          <Image src={step.image} alt={step.title} fill className="object-cover" />
                        </div>
                      </>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
