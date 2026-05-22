import type { Metadata } from 'next'
import { ContactForm, SubscribeForm } from '@/components/ContactForms'
import { ContactHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Contact Us' }

function BoltIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4.5 13.5H11L10 22L20.5 10H14L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#DB1B0C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    label: 'Head Office:',
    value: '12 Circular Road, Presidential Estate, Off Aba Road, Port-Harcourt, Rivers State, Nigeria.',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#DB1B0C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.77a16 16 0 006 6l.86-.86a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z"/>
      </svg>
    ),
    label: 'Phone:',
    value: '+234 (0) 1262 0375',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#DB1B0C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email:',
    value: 'info@fipl-ng.com',
    href: 'mailto:info@fipl-ng.com',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#DB1B0C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Business Hours',
    value: 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday & Sunday: Closed',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <ContactHero />

      {/* ── Contact Form + Info ───────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left: info */}
            <Reveal variant="left">
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">Contact Us <BoltIcon /></span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-3">Get in Touch with Us</h2>
                <p className="text-[#797979] leading-relaxed mb-8 text-base">
                  Our team is ready to provide answers, offer solutions, and start your journey toward success.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {contactItems.map(({ icon, label, value, href }, i) => (
                    <Reveal key={label} variant="up" delay={i * 0.1}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 shrink-0 bg-[#DB1B0C]/10 rounded flex items-center justify-center mt-0.5">
                          {icon}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0E121D] text-sm mb-0.5">{label}</div>
                          {href ? (
                            <a href={href} className="text-sm text-[#DB1B0C] hover:underline whitespace-pre-line">{value}</a>
                          ) : (
                            <div className="text-sm text-[#797979] whitespace-pre-line">{value}</div>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal variant="right" delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────────────── */}
      <section className="pb-0">
        <Reveal variant="fade" duration={1}>
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="overflow-hidden h-[260px] sm:h-[340px] md:h-[440px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5673856263!2d7.0135!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s12+Circular+Road%2C+Port+Harcourt!5e0!3m2!1sen!2sng!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FIPL office location"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="scale">
            <div
              className="relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10 md:p-14"
              style={{ background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)' }}
            >
              <div className="absolute left-0 bottom-0 h-full w-[200px] hidden lg:block pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.contact.hero}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-30"
                />
              </div>
              <div className="relative z-10 lg:pl-[180px]">
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 mb-3">Stay in Touch <BoltIcon /></span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Subscribe For All The Top News!
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Learn how we can serve you better with our daily newsletter.
                </p>
              </div>
              <div className="relative z-10">
                <SubscribeForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
