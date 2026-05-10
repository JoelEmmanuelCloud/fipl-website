import type { Metadata } from 'next'
import Link from 'next/link'
import { Accordion } from '@/components/Accordion'
import { CounterStats } from '@/components/CounterStats'
import { SectionImage } from '@/components/SectionImage'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Home – First Independent Power Limited (FIPL)',
}

/* ─── stat icons ─────────────────────────────────────────── */
const PlantIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)
const TimerIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9.5 3h5M12 3v2" />
  </svg>
)
const BoltIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M13 2L4.5 13.5H11L10 22l9.5-11.5H13L14 2z" />
  </svg>
)
const HomeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
  </svg>
)

const stats = [
  { icon: PlantIcon, value: 4,    display: '4',             label: 'Plants'                         },
  { icon: TimerIcon, value: 0,    display: '0.1+ Man-Hrs',  label: 'Without Lost Time Injury'       },
  { icon: BoltIcon,  value: 541,  suffix: ' MW',            label: 'Installed Capacity'             },
  { icon: HomeIcon,  value: 1000, suffix: '+',              label: 'Households & Industries Powered'},
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
      <section className="relative h-[520px] md:h-[600px] lg:h-[680px] overflow-hidden bg-gray-900">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${IMAGES.home.hero}')` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Copy – centred over full hero width */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4">
          <div className="max-w-[520px] w-full">
            <h1 className="text-[34px] md:text-[44px] lg:text-[52px] font-bold text-white leading-tight mb-4">
              Committed to<br />Efficient Power Generation
            </h1>
            <p className="text-white/75 text-[14px] leading-relaxed mb-8 max-w-[400px] mx-auto">
              First Independent Power Limited operates cutting-edge gas turbine power plants in
              Rivers State, generating electricity that supports Nigeria&apos;s industrial growth.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/power-plants"
                className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-7 py-3 rounded-md transition-colors"
              >
                Explore Our Plants ↗
              </Link>
              <Link
                href="/about"
                className="border border-white/60 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-7 py-3 rounded-md transition-colors backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          2 · OUR POWER PLANTS  (3-panel card)
      ══════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px_1fr] rounded-2xl overflow-hidden shadow-xl">

            {/* Left image panel */}
            <div
              className="hidden lg:block relative h-[340px] bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.home.workerLeft}')` }}
            >
              <div className="absolute inset-0 bg-black/35" />
            </div>

            {/* Centre card */}
            <div className="bg-white flex flex-col items-center justify-center text-center px-8 py-10">
              {/* Icon badge */}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md">
                <svg viewBox="0 0 32 32" width="28" height="28" fill="white" aria-hidden="true">
                  <rect x="3" y="16" width="6" height="13" rx="1" />
                  <rect x="13" y="11" width="6" height="18" rx="1" />
                  <rect x="23" y="7" width="6" height="22" rx="1" />
                  <rect x="1" y="28" width="30" height="2" rx="1" />
                  <path d="M16 3 L20 9 H17 V13 H15 V9 H12 Z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug mb-4">
                Our Power Plants,<br />Our Impact
              </h2>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-[300px]">
                FIPL operates four world-class thermal power plants – Omoku, Afam, Trans-Amadi, and
                Eleme – generating electricity that supports Nigeria&apos;s industrial and economic growth.
              </p>
            </div>

            {/* Right image panel */}
            <div
              className="hidden lg:block relative h-[340px] bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.home.workerRight}')` }}
            >
              <div className="absolute inset-0 bg-black/35" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3 · STATS BAND  (diagonal top)
      ══════════════════════════════════ */}
      <section
        className="bg-gradient-fipl pb-16 md:pb-20"
        style={{
          clipPath: 'polygon(0 60px, 100% 0, 100% 100%, 0 100%)',
          paddingTop: 'calc(60px + 3.5rem)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
              Sustainability &amp; CSR ⚡
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-white leading-tight mb-3">
              Sustainability Beyond Power
            </h2>
            <p className="text-white/75 text-[14px] leading-relaxed max-w-2xl">
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
