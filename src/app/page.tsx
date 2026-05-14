import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion } from '@/components/Accordion'
import { CounterStats } from '@/components/CounterStats'
import { SectionImage } from '@/components/SectionImage'
import { WhoWeAreSection } from '@/components/WhoWeAreSection'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Home – First Independent Power Limited (FIPL)',
}

/* ─── stat icons ─────────────────────────────────────────── */
const PlantIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    {/* Fan blades — multi-blade farm windmill wheel */}
    <circle cx="12" cy="7" r="5" />
    <line x1="12" y1="2" x2="12" y2="12" />
    <line x1="7" y1="7" x2="17" y2="7" />
    <line x1="8.5" y1="3.5" x2="15.5" y2="10.5" />
    <line x1="15.5" y1="3.5" x2="8.5" y2="10.5" />
    {/* Hub */}
    <circle cx="12" cy="7" r="1.2" fill="white" />
    {/* Tower legs */}
    <path d="M10 12 L8 22" />
    <path d="M14 12 L16 22" />
    {/* Cross brace */}
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
)
const TimerIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9.5 3h5M12 3v2" />
  </svg>
)
const BulbIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
)
const HomeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
  </svg>
)

const stats = [
  { icon: PlantIcon, value: 4,       display: '4',          label: 'Plants'                          },
  { icon: TimerIcon, value: 2500000, display: '2.5M+',      label: 'Man-Hrs Without Lost Time Injury' },
  { icon: BulbIcon,  value: 541,     suffix: 'MW',          label: 'Installed Capacity'              },
  { icon: HomeIcon,  value: 7000,    display: '7,000',      label: 'Households & Industries Powered' },
]

const faqs = [
  {
    question: 'What services does FIPL  provide?',
    answer: <p>We specialise in power generation through our four gas turbine power plants located in Trans-Amadi, Afam, Omoku, and Eleme. Our services focus on providing reliable and sustainable energy solutions for industries, businesses, and communities across Nigeria.</p>,
  },
  {
    question: "Where are FIPL's power plants located?",
    answer: <p>FIPL operates four world-class thermal power plants, all situated in Rivers State, Nigeria: the Afam Power Plant, Omoku Power Plant, Trans-Amadi Power Plant (Port Harcourt), and the Eleme Gas Turbine Power Plant. Together they deliver a combined installed capacity of 541 MW.</p>,
  },
  {
    question: 'How does FIPL contribute to sustainability?',
    answer: <p>FIPL is deeply committed to ESG principles. We implement rigorous HSE standards, invest in community development programmes, support rural electrification, fund STEM education scholarships, and align our operations with the UN Sustainable Development Goals (SDGs).</p>,
  },
  {
    question: 'How can vendors register with FIPL?',
    answer: <p>FIPL operates a formal Vendor Registration Programme. Vendors must hold a valid DUNS Number and submit required compliance documents. Visit our <Link href="/register" className="text-primary font-semibold underline">Register With Us</Link> page for full requirements.</p>,
  },
  {
    question: 'Does FIPL offer career opportunities?',
    answer: <p>Yes! FIPL continuously seeks talented professionals across engineering, operations, finance, and management. Visit our <Link href="/careers" className="text-primary font-semibold underline">Careers</Link> page to explore current openings.</p>,
  },
]

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════
          1 · HERO
      ══════════════════════════════════ */}
      <section className="relative h-[600px] md:h-[660px] lg:h-[740px] overflow-hidden bg-gray-900">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${IMAGES.home.hero}')` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Title only – shifted up to leave room for the card overlay */}
        <div className="absolute inset-0 z-10 flex items-end justify-center text-center px-4 pb-[260px] md:pb-[280px] lg:pb-[320px]">
          <h1
            className="text-white text-center"
            style={{
              fontFamily: 'Arial',
              fontWeight: 700,
              fontSize: '38px',
              lineHeight: '100%',
              letterSpacing: '0%',
            }}
          >
            Committed to<br />Efficient Power Generation
          </h1>
        </div>
      </section>

      {/* ══════════════════════════════════
          2 · OUR POWER PLANTS — three separate floating cards
      ══════════════════════════════════ */}
      <section className="relative z-10 -mt-[200px] md:-mt-[200px] lg:-mt-[200px]">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Three cards — each with its own explicit width and height */}
          <div style={{ display: 'flex', gap: '0px', alignItems: 'stretch', justifyContent: 'center' }}>

            {/* Left — image card */}
            <div style={{
              width: '420px', height: '430px', flexShrink: 0,
              borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
              backgroundImage: `url('${IMAGES.home.workerLeft}')`,
              backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
            }} />

            {/* Centre — white content card */}
            <div style={{
              width: '308px', height: '257px', flexShrink: 0,
              background: '#fff', borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.15)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', textAlign: 'center', padding: '20px 24px',
            }}>
              <Image
                src="/images/home/hero-icon.png"
                alt=""
                width={36}
                height={36}
                style={{ flexShrink: 0, marginBottom: '10px' }}
              />
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', lineHeight: 1.3, marginBottom: '6px' }}>
                Our Power Plants,<br />Our Impact
              </h2>
              <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5, maxWidth: '240px', margin: 0 }}>
                FIPL operates four world-class thermal power plants – Omoku, Afam, Trans-Amadi, and
                Eleme – generating electricity that supports Nigeria&apos;s industrial and economic growth.
              </p>
            </div>

            {/* Right — image card */}
            <div style={{
              width: '420px', height: '430px', flexShrink: 0,
              borderTopLeftRadius: '16px', borderTopRightRadius: '16px',
              backgroundImage: `url('${IMAGES.home.workerRight}')`,
              backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
            }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3 · WHO WE ARE
      ══════════════════════════════════ */}
      <div className="-mt-[60px]">
        <WhoWeAreSection />
      </div>

      {/* ══════════════════════════════════
          4 · STATS BAND  (diagonal top)
      ══════════════════════════════════ */}
      <section
        className="pb-16 md:pb-20"
        style={{
          background: 'linear-gradient(270.14deg, #D97300 0.14%, #DB1B0C 98.03%)',
          clipPath: 'polygon(0 70px, 54% 0, 50% 90px, 100% 25px, 100% 100%, 0 100%)',
          paddingTop: 'calc(90px + 3.5rem)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10 md:mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              Sustainability &amp; CSR{' '}
              <svg viewBox="0 0 24 24" width="12" height="12" fill="white" style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
                <path d="M13 2L4.5 13.5H11L10 22l9.5-11.5H13L14 2z" />
              </svg>
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-white leading-tight mb-3">
              Sustainability Beyond Power
            </h2>
            <p className="text-white/75 text-[14px] leading-relaxed max-w-2xl mx-auto">
              Our responsibility goes beyond megawatts. Through CSR and sustainable practices we are
              empowering communities, protecting the environment, and driving progress aligned with
              the UN SDGs.
            </p>
          </div>
          <CounterStats stats={stats} />
        </div>
      </section>

      {/* ══════════════════════════════════
          4 · CSR / COMMUNITY
      ══════════════════════════════════ */}
      <section
        className="relative py-20 md:py-28 bg-cover bg-center bg-gray-900"
        style={{ backgroundImage: `url('${IMAGES.home.community}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="max-w-[520px]">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
              CSR &amp; Community ⚡
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[38px] font-bold text-white leading-snug mb-5">
              Empowering Communities,<br />Preserving the Environment
            </h2>
            <p className="text-white/80 text-[14px] leading-relaxed mb-7 max-w-[420px]">
              Our responsibility goes beyond megawatts. We are deeply committed to the communities
              in which we operate — investing in education, healthcare, rural electrification, and
              youth empowerment while protecting our natural environment.
            </p>
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Learn More ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          5 · CAREERS
      ══════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* left – image */}
            <SectionImage
              src={IMAGES.home.team}
              alt="FIPL team"
              className="h-[300px] md:h-[400px] lg:h-[480px] w-full rounded-2xl"
            />

            {/* right – content */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Careers ⚡
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-gray-800 leading-snug mb-4">
                Build Your Future With Us
              </h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5">
                Join a team powering progress and driving innovation in Nigeria&apos;s energy sector.
                At FIPL, we are committed to building sustainable solutions and empowering the next
                generation of leaders in oil and gas and power.
              </p>
              <p className="font-semibold text-gray-800 text-[14px] mb-4">Why Work With Us?</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Be part of impactful projects that keep the lights on across communities',
                  'Grow your career with continuous learning and professional development',
                  'Work in a culture of safety, integrity, and excellence',
                  'Collaborate with passionate teams across engineering, operations, and management',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-[13px] text-gray-500 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors"
              >
                Explore Opportunities ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          6 · FAQ
      ══════════════════════════════════ */}
      <section className="py-16 md:py-24 bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start">

            {/* sticky info card */}
            <div className="lg:sticky lg:top-[96px]">
              <div className="border border-gray-200 rounded-2xl p-7 bg-white shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">FAQ ⚡</p>
                <h3 className="text-xl font-bold text-gray-800 leading-snug mb-3">
                  Frequently Asked Questions
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Find answers to common questions about FIPL&apos;s operations, services, and
                  commitment to sustainable power generation.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-[13px] px-5 py-2.5 rounded-md transition-colors"
                >
                  Get In Touch ↗
                </Link>
              </div>
            </div>

            {/* accordion */}
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
