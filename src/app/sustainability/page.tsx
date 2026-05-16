import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionImage } from '@/components/SectionImage'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Sustainability & CSR' }

export default function SustainabilityPage() {
  return (
    <>
      <section
        className="relative min-h-[260px] md:min-h-[360px] lg:min-h-[420px] flex items-center bg-gray-700 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.sustainability.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-14">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Sustainability ⚡
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-xl">
            Powering Progress,<br />Sustaining the Future
          </h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed text-sm md:text-base">
            Sustainability is not an afterthought at FIPL — it is central to who we are and how we operate.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">ESG Commitment ⚡</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Environment, Social, and Governance (ESG)</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">FIPL integrates ESG principles across every dimension of our business.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌿', stat: 'Environmental', title: 'Reducing Our Footprint',   desc: 'We continuously invest in cleaner technologies, emission reduction programmes, and environmental monitoring systems to minimise our ecological impact.' },
              { icon: '👥', stat: 'Social',         title: 'Empowering Communities',  desc: 'Through structured CSR programmes, we invest in education, healthcare, rural electrification, and youth empowerment across surrounding communities.' },
              { icon: '⚖',  stat: 'Governance',    title: 'Transparent Leadership',  desc: 'Our governance framework upholds the highest standards of accountability, transparency, and ethical business practice across all levels.' },
            ].map(({ icon, stat, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 md:p-7 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{icon}</div>
                <div className="text-2xl md:text-3xl font-extrabold text-primary mb-2">{stat}</div>
                <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">ESG Practices ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sustainability</h2>
              <p className="text-gray-600 mb-4 text-sm md:text-base">Our operations &amp; maintenance philosophy and strategy has evolved and is aligned to support:</p>
              <ul className="space-y-2.5">
                {[
                  'Innovative thinking by reducing energy consumption',
                  'Improving efficiency through reducing downtime',
                  'Utilising environmentally-sound operational strategies',
                  'Continuous reliability improvement programs for equipment',
                  'Driving long-range reliability planning programmes',
                  'Implementing effective talent-retention and capability building',
                  'Being committed to local content development',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-primary font-bold shrink-0">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <SectionImage
              src={IMAGES.sustainability.nature}
              alt="Sustainability — environmental photo"
              className="h-[280px] md:h-[360px] lg:h-[400px] w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionImage
              src={IMAGES.sustainability.workplace}
              alt="Health and Safety at FIPL"
              className="h-[280px] md:h-[360px] lg:h-[380px] w-full rounded-2xl"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">HSE ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Health &amp; Safety First</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                FIPL is committed to maintaining the highest Health, Safety, and Environment (HSE)
                standards. Our comprehensive HSE Management System is built on industry best practices
                and regulatory compliance.
              </p>
              <ul className="space-y-3">
                {[
                  'Zero-tolerance policy for unsafe work practices',
                  'Continuous safety training and refresher programmes',
                  'Regular emergency response drills and simulations',
                  'Comprehensive incident investigation and preventive action system',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Governance ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Corporate Governance</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                We operate corporate governance principles of reliability, safety, and environmental
                stewardship in order to deliver reliable and sustainable power for the long-term economic
                benefit of the company, its shareholders, and their stakeholders.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                FIPL has adopted and maintained an Anti-Bribery, Corruption &amp; Fraud (ABCF) Policy in
                line with the UK Bribery Act 2010 and the US FCPA regulation, applying across all operations.
              </p>
            </div>
            <SectionImage
              src={IMAGES.sustainability.governance}
              alt="Corporate governance at FIPL"
              className="h-[280px] md:h-[360px] lg:h-[380px] w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionImage
              src={IMAGES.sustainability.community}
              alt="FIPL community programmes"
              className="h-[280px] md:h-[360px] lg:h-[380px] w-full rounded-2xl"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">CSR Commitment ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Commitment to SDG Goals</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                Aligned with the United Nations Sustainable Development Goals, our impact extends beyond
                providing electricity to building a better society and stronger economy.
              </p>
              {[
                { icon: '⚡', title: 'Affordable & Clean Energy (SDG 7)',      desc: "Our mission to increase Nigeria's energy access with reliable, affordable, and clean power generation." },
                { icon: '🎓', title: 'Quality Education (SDG 4)',              desc: 'Creating learning opportunities through scholarships, STEM support, and school infrastructure investments.' },
                { icon: '💼', title: 'Decent Work & Economic Growth (SDG 8)', desc: 'Generating sustainable employment and supporting local suppliers to drive inclusive economic development.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 border border-gray-200 rounded-xl p-4 mb-3 hover:border-primary hover:shadow-sm transition-all">
                  <div className="text-2xl shrink-0">{icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm">{title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">CSR Initiatives ⚡</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Empowering Communities,<br />Building Futures</h2>
            <p className="text-gray-600 max-w-xl leading-relaxed text-sm md:text-base">
              We partner with our host communities in deep, long-term social development initiatives to
              improve livelihoods and create positive, lasting change.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: '💡', title: 'Rural Electrification Projects',    desc: 'Extending access to clean, reliable electricity to remote communities in Rivers State that have historically been underserved by the national grid.' },
              { icon: '📚', title: 'STEM Education & Scholarships',      desc: 'Funding scholarships, supplying educational materials, and building science laboratories to nurture the next generation of Nigerian engineers.' },
              { icon: '🏥', title: 'Healthcare Access Programs',         desc: 'Supporting medical outreach, funding health centres, and providing free health screenings to improve community wellbeing.' },
              { icon: '🏗', title: 'Youth Empowerment Initiatives',     desc: 'Creating vocational training, entrepreneurship support, and employment pathways to empower young Nigerians in host communities.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 md:p-7 border-l-4 border-primary shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="#" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-md hover:bg-primary-dark transition-colors">
              Export CSR Report ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
