import type { Metadata } from 'next'
import { ContactForm, SubscribeForm } from '@/components/ContactForms'

export const metadata: Metadata = { title: 'Contact Us' }

export default function ContactPage() {
  return (
    <>
      <section
        className="relative mt-[72px] min-h-[240px] md:min-h-[320px] lg:min-h-[380px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/fipl-ct1/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-7">Contact Information</h3>
              {[
                { icon: '🏢', label: 'Head Office',    value: '12 Circular Road, Presidential Estate, GRA, Port Harcourt, Rivers State, Nigeria' },
                { icon: '📞', label: 'Phone',          value: '+234 (0) 908 102 2226' },
                { icon: '✉',  label: 'Email',          value: 'info@fipl-ng.com' },
                { icon: '🕐', label: 'Business Hours', value: 'Monday – Friday: 8:00 AM – 5:00 PM WAT' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex gap-4 mb-5">
                  <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-lg">
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
          <div className="rounded-2xl overflow-hidden h-[360px] bg-gray-200">
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
