import type { Metadata } from 'next'
import { Carousel } from '@/components/Carousel'
import { SectionImage } from '@/components/SectionImage'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'About Us' }

const testimonials = [
  { quote: "FIPL's commitment to reliable power generation has been transformational. Their professionalism and expertise ensure seamless project execution every time.", name: 'Sarah L.', role: 'Lahore, Pakistan' },
  { quote: 'Working with FIPL over the years has shown us what true dedication to power reliability looks like. They have consistently exceeded expectations on every project.', name: 'James T.', role: 'CEO of Red Button' },
  { quote: 'The level of technical expertise and customer focus that FIPL brings to the table is unmatched in the Nigerian power sector. A truly world-class organisation.', name: 'Chukwudi O.', role: 'Director, Lagos Industries Ltd' },
]

const values = [
  { icon: '🛡', title: 'Safety',                     desc: 'The safety of our people, assets, and communities is non-negotiable. We maintain the highest HSE standards across all operations.' },
  { icon: '💼', title: 'Professionalism',             desc: 'We hold ourselves to world-class standards, delivering on our promises with discipline, skill, and dedication.' },
  { icon: '⚖', title: 'Integrity',                   desc: 'Honesty and transparency guide every decision we make — with our clients, partners, people, and communities.' },
  { icon: '🤝', title: 'Commitment to Stakeholders',  desc: 'We are accountable to all our stakeholders — employees, investors, regulators, customers, and communities.' },
  { icon: '🌿', title: 'Environmental Consciousness', desc: 'We continuously work to reduce our footprint and protect the natural resources we depend on.' },
  { icon: '☀', title: 'Sustainability',              desc: 'From operational efficiency to community investment, sustainability is embedded in everything we do.' },
]

const timeline = [
  { year: '1998', title: 'Company Founded',          desc: "FIPL was established by the Sahara Group with a vision to transform Nigeria's power generation landscape." },
  { year: '2001', title: 'Omoku Power Plant',         desc: 'Received our first major asset, establishing the Omoku Gas Turbine Power Plant and expanding initial capacity.' },
  { year: '2005', title: 'Afam Power Plant',          desc: 'Successfully took over the Afam Power Station, significantly increasing generation capacity in Rivers State.' },
  { year: '2010', title: 'Trans Amadi Expansion',     desc: 'Added the Trans-Amadi Power Plant, strengthening our presence in Port Harcourt.' },
  { year: '2015', title: 'Eleme Integration',         desc: 'Folded the Eleme Gas Turbine Power Plant into our portfolio, completing our four-plant ecosystem.' },
  { year: '2020', title: 'Sustainability Initiatives', desc: 'Launched comprehensive environmental sustainability and community development programs aligned with UN SDGs.' },
  { year: '2024', title: 'Digital Transformation',    desc: 'Deployed advanced monitoring and control systems across all facilities to enhance efficiency and reliability.' },
]

export default function AboutPage() {
  return (
    <>
      <section
        className="relative min-h-[260px] md:min-h-[360px] lg:min-h-[420px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.about.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-14">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            About Us ⚡
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-xl">
            Change to Powering<br />Nigeria&apos;s Progress since 2006
          </h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed text-sm md:text-base">
            From a single power plant to four world-class facilities, FIPL has grown into one of
            Nigeria&apos;s most trusted independent power producers.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Story ⚡</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Our Purpose, Our Promise</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              First Independent Power Limited was founded with a singular purpose — to provide reliable,
              efficient, and sustainable power to Nigerian industries, businesses, and communities.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
            <div>
              <div className="flex gap-10 mb-8">
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary">541+</div>
                  <div className="text-sm text-gray-400 mt-1">MW Installed Capacity</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-primary">10+</div>
                  <div className="text-sm text-gray-400 mt-1">Years of Excellence</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                Since our founding in 1998 and operational launch in the early 2000s, FIPL has
                consistently delivered on its promise of reliable power. Our four plants — Afam, Omoku,
                Trans-Amadi, and Eleme — stand as testament to our engineering excellence.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We are proud members of the Sahara Group family, a leading diversified energy and
                infrastructure conglomerate operating across Africa, Asia, Europe, and the Middle East.
              </p>
            </div>
            <SectionImage
              src={IMAGES.about.facility}
              alt="FIPL facility"
              className="h-[280px] md:h-[340px] lg:h-[360px] w-full rounded-2xl"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              { icon: '👁', title: 'Our Vision',  text: 'To be the leading independent power producer in Nigeria, driving economic growth and energy security through the consistent delivery of safe, reliable, and sustainable power generation solutions.' },
              { icon: '🎯', title: 'Our Mission', text: 'To generate and deliver efficient, reliable, and environmentally responsible power by leveraging world-class technology, a safety-first culture, and the dedication of our people — while creating lasting value for all stakeholders.' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 border-t-4 border-t-primary shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Our History ⚡</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">A Legacy of Power &amp; Progress</h2>
            <p className="text-gray-600 text-sm md:text-base">From humble beginnings in 1998 to a cornerstone of Nigeria&apos;s power sector.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent -translate-x-1/2 hidden md:block" />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                  <div className="flex-1 bg-white rounded-xl p-4 md:p-5 shadow-sm border-l-4 border-primary">
                    <div className="text-xs font-bold text-primary mb-1">{item.year}</div>
                    <div className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{item.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{item.desc}</div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md shrink-0 z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Values ⚡</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-sm md:text-base">We are driven by a deep commitment to integrity, ensuring transparency and accountability in all operations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6 md:p-8 border border-gray-200 rounded-2xl hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
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
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Leadership ⚡</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-5">Meet The CEO</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                Our Chief Executive Officer leads FIPL with a steadfast commitment to operational
                excellence, innovation, and the long-term development of Nigeria&apos;s power sector.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                With decades of experience in energy, engineering, and business leadership, the CEO
                continues to drive FIPL&apos;s strategic vision — ensuring that every megawatt we generate
                contributes to Nigeria&apos;s growth story.
              </p>
              <blockquote className="border-l-4 border-primary bg-primary/5 rounded-r-lg pl-5 pr-4 py-4">
                <p className="italic text-sm md:text-[15px] text-gray-800">
                  &ldquo;Our commitment is not just to power generation — it is to powering lives,
                  communities, and the future of Nigeria.&rdquo;
                </p>
              </blockquote>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <SectionImage
                src={IMAGES.about.ceo}
                alt="FIPL CEO"
                className="h-[300px] md:h-[360px] w-full rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center text-2xl shadow-[0_0_0_12px_rgba(224,48,39,0.2)]">
                  ▶
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Testimonials ⚡</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                What Our Stakeholders<br />Say About Us.
              </h2>
            </div>
            <Carousel testimonials={testimonials} />
          </div>
        </div>
      </section>
    </>
  )
}
