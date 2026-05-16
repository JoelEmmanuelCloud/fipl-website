import type { Metadata } from 'next'
import Link from 'next/link'
import { Carousel } from '@/components/Carousel'
import { SectionImage } from '@/components/SectionImage'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Careers' }

const jobs = [
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'Engineering' },
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'Operations' },
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'Finance' },
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'HSE' },
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'HR' },
  { title: 'Creative Product Developer', date: 'May 5, 2025', location: 'Port Harcourt', type: 'Full Time', dept: 'IT' },
]

const testimonials = [
  { quote: 'Working at FIPL has given me the chance to grow professionally while contributing to something that truly matters — energy for all.', name: 'Sarah L.', role: 'Lahore, Pakistan' },
  { quote: 'The culture here is second to none. FIPL genuinely invests in its people and creates real opportunities for career growth across all departments.', name: 'James T.', role: 'CEO of Red Button' },
  { quote: 'I joined FIPL as a graduate engineer and have grown into a senior operations role. The mentorship and training have been truly exceptional.', name: 'Emeka N.', role: 'Senior Operations Engineer' },
]

export default function CareersPage() {
  return (
    <>
      <section
        className="relative min-h-[300px] md:min-h-[420px] lg:min-h-[520px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.careers.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 pt-24 pb-16">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Join Our Team ⚡
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-xl">
            Powering the Future Starts With You
          </h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed text-sm md:text-base">
            Be part of the team driving Nigeria&apos;s energy transition. At FIPL, your work keeps the
            lights on for thousands of communities and industries.
          </p>
          <a href="#open-roles" className="inline-flex items-center gap-2 mt-8 bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-primary-dark transition-colors text-sm md:text-base">
            See Open Roles ↓
          </a>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Employee Value Proposition ⚡</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Choose FIPL?</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">At FIPL, every role matters. Your contribution directly powers Nigeria&apos;s growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📈', title: 'Growth Opportunity', desc: 'Structured learning programmes, mentorship, and clear career advancement pathways across all functions.' },
              { icon: '🌟', title: 'Culture',            desc: 'An inclusive environment where every team member is heard, valued, and celebrated.' },
              { icon: '🤝', title: 'Collaboration',      desc: 'Work alongside passionate engineers, operators, and business professionals united by a single mission.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm border-t-4 border-primary hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bolt-watermark">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <SectionImage
              src={IMAGES.careers.team}
              alt="FIPL team"
              className="h-[280px] md:h-[380px] lg:h-[440px] w-full rounded-2xl"
            />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Our DNA ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">What Drives Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                Our mission to keep Nigeria powered shapes everything we do — the way we think, the way
                we work, and the values we live by every day.
              </p>
              <div className="divide-y divide-gray-100">
                {[
                  { n: 1, title: 'Integrity',                     desc: 'We do the right thing — even when no one is watching.' },
                  { n: 2, title: 'Innovation',                    desc: 'We embrace new technologies and approaches to continuously improve our operations.' },
                  { n: 3, title: 'Safety',                        desc: 'The safety of our people, communities, and environment is always our first priority.' },
                  { n: 4, title: 'Collaboration & Sustainability', desc: 'We build partnerships that create lasting value for Nigeria and the communities we serve.' },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4 py-4">
                    <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {n}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">{title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="open-roles" className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Open Roles ⚡</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">We are committed to lasting impact</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">Explore current openings and find your place in our team.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all">
                <h3 className="font-bold text-gray-800 mb-2.5 text-sm md:text-base">{job.title}</h3>
                <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  {job.date}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  {job.location}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                  {job.type} · {job.dept}
                </div>
                <Link href="#" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 hover:gap-3 transition-all">
                  Apply Now ↗
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-gradient-fipl rounded-2xl p-6 md:p-8 lg:p-12 text-center mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Don&apos;t See Your Role?</h3>
            <p className="text-white/85 mb-6 max-w-lg mx-auto text-sm md:text-base">
              We&apos;re always looking for talented individuals. Join our talent pool and we&apos;ll reach out
              when opportunities match your skills.
            </p>
            <Link href="#" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
              Join Our Talent Pool ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Testimonials ⚡</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What Our Employees<br />Say About Us.</h2>
            </div>
            <Carousel testimonials={testimonials} />
          </div>
        </div>
      </section>
    </>
  )
}
