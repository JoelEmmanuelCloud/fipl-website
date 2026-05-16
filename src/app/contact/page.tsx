import type { Metadata } from 'next'
import { ContactForm, SubscribeForm } from '@/components/ContactForms'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Contact Us' }

export default function ContactPage() {
  return (
    <>
      <section
        className="relative min-h-[240px] md:min-h-[320px] lg:min-h-[380px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.contact.hero}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Contact Us ⚡
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl">
            Get in Touch with<br />First Independent Power Limited
          </h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed">
            We are always happy to hear from customers, partners, vendors, and future employees.
          </p>
        </div>
      </section>

      <section className="py-20 bolt-watermark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Contact Us ⚡</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Get in Touch with Us</h2>
            <p className="text-gray-600 max-w-xl leading-relaxed">
              Our team is ready to answer your questions and connect you with the right people.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <ContactForm />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-7">Contact Information</h3>
              {[
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                  label: 'Head Office', value: '12 Circular Road, Presidential Estate, GRA, Port Harcourt, Rivers State, Nigeria',
                },
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>,
                  label: 'Phone', value: '+234 (0) 908 102 2226',
                },
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: 'Email', value: 'info@fipl-ng.com',
                },
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  label: 'Business Hours', value: 'Monday – Friday: 8:00 AM – 5:00 PM WAT',
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-4 mb-5">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-gray-800">{value}</div>
                  </div>
                </div>
              ))}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Follow Us</h4>
                <div className="flex gap-2.5">
                  {['f', '𝕏', '●', 'in'].map((icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm hover:bg-primary hover:text-white transition-colors">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden h-[220px] sm:h-[280px] md:h-[360px] bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5673856263!2d7.0135!3d4.8156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPort+Harcourt%2C+Rivers+State!5e0!3m2!1sen!2sng!4v1234567890"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FIPL office location"
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-fipl rounded-2xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-3">Stay in Touch ⚡</span>
              <h2 className="text-3xl font-bold text-white mb-3">Subscribe For All The Top News!</h2>
              <p className="text-white/80 leading-relaxed text-sm">
                Don&apos;t miss the latest updates from FIPL. Sign up for our newsletter and stay informed.
              </p>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  )
}
