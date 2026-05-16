import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaqSection } from '@/components/FaqSection'
import { CounterStats } from '@/components/CounterStats'
import { WhoWeAreSection } from '@/components/WhoWeAreSection'
import { HeroSlideshow } from '@/components/HeroSlideshow'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Home – First Independent Power Limited (FIPL)',
}

const PlantIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <circle cx="12" cy="7" r="5" />
    <line x1="12" y1="2" x2="12" y2="12" />
    <line x1="7" y1="7" x2="17" y2="7" />
    <line x1="8.5" y1="3.5" x2="15.5" y2="10.5" />
    <line x1="15.5" y1="3.5" x2="8.5" y2="10.5" />
    <circle cx="12" cy="7" r="1.2" fill="white" />
    <path d="M10 12 L8 22" />
    <path d="M14 12 L16 22" />
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
    question: 'What services does FIPL provide?',
    answer: <p>We specialise in power generation through our four gas turbine power plants located in Trans-Amadi, Afam, Omoku, and Eleme. Our services focus on providing reliable and sustainable energy solutions for industries, businesses, and communities across Nigeria.</p>,
  },
  {
    question: 'Where are your power plants located?',
    answer: <p>FIPL operates four world-class thermal power plants, all situated in Rivers State, Nigeria: the Afam Power Plant, Omoku Power Plant, Trans-Amadi Power Plant (Port Harcourt), and the Eleme Gas Turbine Power Plant. Together they deliver a combined installed capacity of 541 MW.</p>,
  },
  {
    question: 'How does FIPL ensure sustainability in its operations?',
    answer: <p>FIPL is deeply committed to ESG principles. We implement rigorous HSE standards, invest in community development programmes, support rural electrification, fund STEM education scholarships, and align our operations with the UN Sustainable Development Goals (SDGs).</p>,
  },
  {
    question: 'How does FIPL contribute to local communities?',
    answer: <p>FIPL is conscious of the environment within which we operate. As a socially responsible company, we embark on community development projects within our host communities, including healthcare support, education funding, and rural infrastructure development.</p>,
  },
  {
    question: 'Can individuals or organizations partner with FIPL?',
    answer: <p>Yes. FIPL operates a formal Vendor Registration Programme open to qualified organizations. Vendors must hold a valid DUNS Number and submit required compliance documents. Visit our <Link href="/register" className="text-primary font-semibold underline">Register With Us</Link> page for full requirements.</p>,
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative h-[600px] md:h-[660px] lg:h-[740px] bg-gray-900">
        <HeroSlideshow />
      </section>

      <section className="relative z-10 -mt-[200px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-stretch justify-center">
            <div className="hidden lg:block shrink-0 rounded-t-2xl bg-cover bg-center" style={{
              width: '420px', height: '430px',
              backgroundImage: `url('${IMAGES.home.workerLeft}')`,
            }} />
            <div className="shrink-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center text-center px-6 py-5 w-[280px] sm:w-[308px] h-[240px] sm:h-[257px]">
              <Image
                src="/images/home/hero-icon.png"
                alt=""
                width={36}
                height={36}
                className="shrink-0 mb-2.5"
              />
              <h2 className="text-sm font-bold text-gray-800 leading-snug mb-1.5">
                Our Power Plants,<br />Our Impact
              </h2>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-[240px]">
                FIPL operates four world-class thermal power plants – Omoku, Afam, Trans-Amadi, and
                Eleme – generating electricity that supports Nigeria&apos;s industrial and economic growth.
              </p>
            </div>
            <div className="hidden lg:block shrink-0 rounded-t-2xl bg-cover bg-center" style={{
              width: '420px', height: '430px',
              backgroundImage: `url('${IMAGES.home.workerRight}')`,
            }} />
          </div>
        </div>
      </section>

      <div className="-mt-[60px]">
        <WhoWeAreSection />
      </div>

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
            <p className="mb-2" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '24px', letterSpacing: '0%', textAlign: 'center', verticalAlign: 'middle', color: 'rgba(255,255,255,0.9)' }}>
              Sustainability &amp; CSR{' '}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white" style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
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

      <div className="bg-white h-4 md:h-6" />
      <section
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.home.community}')` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #DB1B0C 0%, rgba(217, 115, 0, 0.8) 25%, rgba(217, 115, 0, 0.4) 50%, rgba(217, 115, 0, 0.2) 75%, rgba(219, 27, 12, 0) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <div className="max-w-[520px]">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-3">
              FIPL Foundation{' '}
              <svg viewBox="0 0 24 24" width="12" height="12" fill="white" style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
                <path d="M13 2L4.5 13.5H11L10 22l9.5-11.5H13L14 2z" />
              </svg>
            </p>
            <h2 className="text-white mb-5" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 5vw, 40px)', lineHeight: '1.15' }}>
              Empowering Communities,<br />Preserving the Environment
            </h2>
            <p className="mb-7" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '26px', color: 'rgba(255,255,255,0.88)', maxWidth: '400px' }}>
              FIPL is conscious of the environment within which we operate, and we ensure
              that as a socially responsible company, we embark on community development
              projects within our host communities to benefit the host community residents.
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

      <section className="py-16 md:py-24 bg-white bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-[300px] md:h-[420px] lg:h-[500px] w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${IMAGES.home.team}')`,
                  clipPath: 'polygon(0 0, 90% 0, 78% 50%, 0 50%)',
                }}
              />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${IMAGES.home.team}')`,
                  clipPath: 'polygon(0 50%, 89% 50%, 78% 100%, 0 100%)',
                }}
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Careers{' '}
                <svg viewBox="0 0 24 24" width="12" height="12" fill="#E03027" style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true">
                  <path d="M13 2L4.5 13.5H11L10 22l9.5-11.5H13L14 2z" />
                </svg>
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-gray-800 leading-snug mb-4">
                Build Your Future With Us
              </h2>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                Join a team powering progress and driving innovation in Nigeria&apos;s energy sector.
                At FIPL, we are committed to building sustainable solutions and empowering the next
                generation of leaders in oil and gas and power.
              </p>
              <p className="font-semibold text-gray-800 text-[15px] mb-4">Why Work With Us?</p>
              <ul className="space-y-4 mb-8">
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
                    <span className="text-[13px] text-gray-600 leading-relaxed">{item}</span>
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

      <FaqSection items={faqs} />
    </>
  )
}
