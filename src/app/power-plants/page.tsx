import type { Metadata } from 'next'
import { SectionImage } from '@/components/SectionImage'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Power Plants & Operations' }

const plants = [
  {
    id: 'omoku',
    name: 'Omoku Plant',
    location: 'Omoku, Rivers State',
    image: IMAGES.plants.omoku,
    desc: "The Omoku Power Plant was commissioned in December 2009 as one of Nigeria's critical gas turbine facilities. It operates as a medium-capacity generation plant with a total capacity of 150MW. It was recently decommissioned for upgrading through the Eligible Customer initiative.",
    supplier: 'Nigeria Agip Oil Company (NAOC)',
  },
  {
    id: 'trans-amadi',
    name: 'Trans Amadi Plant',
    location: 'Trans-Amadi, Port Harcourt',
    image: IMAGES.plants.transAmadi,
    desc: "Located in the heart of Port Harcourt's industrial district, the Trans-Amadi Power Plant serves the dense commercial and industrial zones of Rivers State capital. In 2012, the Plant was rated at a total capacity of 2 × 37.5MW with Frame 6B, Frame 5P and Frame 5 machines.",
    supplier: 'Nigeria LNG (NLNG) and SPDC',
  },
  {
    id: 'afam',
    name: 'Afam Plant',
    location: 'Afam, Rivers State',
    image: IMAGES.plants.afam,
    desc: "The Afam Power Plant is located in Rivers State in Nigeria. It was commissioned in December 2005 with an installed capacity of 13MW, later expanded to 220MW. FIPL's strategic oversight has driven targeted maintenance and optimisation programmes, gradually increasing Afam's available capacity.",
    supplier: 'Nigeria Agip Trading (NABT) and Eleme Petrochemicals',
  },
  {
    id: 'eleme',
    name: 'Eleme Plant',
    location: 'Eleme, Rivers State',
    image: IMAGES.plants.eleme,
    desc: "Eleme Power Station is currently a 75MW installed capacity plant, with an average capacity of 40MW, currently being expanded to increase overall output and efficiency. The plant provides 1 × 25MW Gas Turbine and 2 × 25MW Gas Turbines for a total installed capacity of 75MW.",
    supplier: 'Eleme Trading Company (ETC)',
  },
]

const steps = [
  { icon: '⚙', color: 'bg-primary/10 text-primary', title: 'Engineering & Design',          desc: 'Our engineering teams design and optimise every plant to maximise efficiency, safety, and long-term performance while minimising environmental impact.' },
  { icon: '📊', color: 'bg-accent/10 text-accent',   title: 'Operation & Sustainability',     desc: 'Operational teams maintain peak performance through continuous monitoring, preventive maintenance, and rigorous HSE compliance frameworks.' },
  { icon: '📋', color: 'bg-primary/10 text-primary', title: 'Project Planning & Feasibility', desc: 'Feasibility studies and detailed planning allow us to make evidence-based decisions, ensuring each investment delivers measurable results.' },
  { icon: '🔧', color: 'bg-accent/10 text-accent',   title: 'Execution & Commissioning',      desc: 'Stringent testing and commissioning protocols guarantee that every system meets international standards before going live.' },
]

export default function PowerPlantsPage() {
  return (
    <>
      <section
        className="relative min-h-[260px] md:min-h-[380px] lg:min-h-[460px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.plants.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-14">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Operations ⚡
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Our Energy Hubs</h1>
          <p className="text-white/80 max-w-lg leading-relaxed mb-8 text-sm md:text-base">
            Four strategically located power plants delivering reliable electricity across Rivers State —
            the backbone of Nigeria&apos;s industrial power supply.
          </p>
          <div className="flex gap-6 md:gap-12 flex-wrap">
            {[['541MW', 'Combined Capacity'], ['4', 'Power Plants'], ['0%', 'Lost Time Injury Rate']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl md:text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs md:text-sm text-white/70">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Portfolio ⚡</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Power Plants</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            FIPL operates a portfolio of four cutting-edge gas turbine power plants, all situated in Rivers
            State, Nigeria. Together these facilities represent the operational core of FIPL&apos;s mission to
            provide reliable, efficient, and sustainable power generation.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-6">
          {plants.map((plant, i) => (
            <div
              key={plant.id}
              id={plant.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-20 last:mb-0 ${
                i % 2 !== 0 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <SectionImage
                src={plant.image}
                alt={`${plant.name}`}
                className={`h-[240px] md:h-[300px] lg:h-[320px] w-full rounded-2xl ${i % 2 !== 0 ? 'lg:col-start-2' : ''}`}
              />
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {plant.location}
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{plant.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">{plant.desc}</p>
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-600">Primary Gas Supplier:</strong> {plant.supplier}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-we-work" className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Work Process ⚡</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">How We Power Nigeria</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">Our approach ensures every project is executed with precision, safety, and sustainability at the core.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-9">
            {steps.map(({ icon, color, title, desc }) => (
              <div key={title} className="flex gap-4 md:gap-5">
                <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>
                  {icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1.5 text-sm md:text-base">{title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
