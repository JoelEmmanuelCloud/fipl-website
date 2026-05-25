import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Accordion } from '@/components/Accordion'
import { RegisterHero } from '@/components/PageHeroes'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/images'

export const metadata: Metadata = { title: 'Register With Us – Vendor Programme' }

const accordionItems = [
  {
    question: 'Requirements for Proposal Submission With DUN',
    answer: (
      <ul className="space-y-2 mt-1">
        {[
          'Valid DUNS Number Certificate issued by Dun & Bradstreet',
          'Certificate of Incorporation from the Corporate Affairs Commission (CAC)',
          'Tax Identification Number (TIN) and evidence of tax compliance',
          'Three years audited financial statements',
          'Evidence of technical capability and track record',
          'Completed and signed FIPL Vendor Registration Form',
          'Company profile, including details of key personnel',
          'Valid evidence of insurance coverage (public liability, professional indemnity, etc.)',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-[#797979] text-sm">
            <span className="text-[#DB1B0C] mt-0.5 shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    question: 'Required Documents/Attachments',
    answer: (
      <ul className="space-y-2 mt-1">
        {[
          'Certificate of Incorporation / Business Registration Certificate',
          'Memorandum and Articles of Association',
          'DUNS Number Certificate (mandatory)',
          'Tax Clearance Certificate (last 3 years)',
          'Evidence of VAT Registration',
          'Audited Financial Statements (last 3 years)',
          'Company Profile and capability statement',
          'Bank reference letter',
          'Evidence of compliance with Local Content Act (where applicable)',
          'HSE Policy and evidence of implementation',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-[#797979] text-sm">
            <span className="text-[#DB1B0C] mt-0.5 shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    question: 'For Vendors With Existing DUN Bradsheet Number',
    answer: (
      <ul className="space-y-2 mt-1">
        {[
          'Provide your existing DUNS Number on the registration form',
          'Submit all other mandatory documents as listed in the requirements',
          'FIPL will verify your DUNS Number directly with Dun & Bradstreet',
          'Upon successful verification, registration will be processed within 10–15 working days',
          'You will receive an email confirmation and your Vendor ID upon successful registration',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-[#797979] text-sm">
            <span className="text-[#DB1B0C] mt-0.5 shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    ),
  },
]

export default function RegisterPage() {
  return (
    <div className="page-bolt-bg">
      <RegisterHero />

      <section className="py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal variant="clip" duration={0.9}>
              <div className="relative w-full h-[300px] md:h-[380px]">
                <Image
                  src={IMAGES.register.vendor}
                  alt="Vendor registration"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal variant="right" delay={0.15}>
              <div>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                  Register With Us{' '}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" />
                  </svg>
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-5">
                  Vendor Registration Program
                </h2>
                <p className="text-[#797979] leading-relaxed mb-4 text-base">
                  In our bid to enhance our business relationship with our vendors and ensure that
                  their operations are guided professionally with the highest form of standards,{' '}
                  <strong className="text-[#0E121D]">
                    we require all existing and intending vendors to register with FIPL.
                  </strong>{' '}
                  The services of a globally reputable company, Dun &amp; Bradstreet, have been
                  engaged to support FIPL in this exercise.
                </p>
                <p className="text-[#797979] leading-relaxed mb-7 text-base">
                  The company shall review vendor&apos;s documents, conduct office, workshop, and
                  business premises inspection to validate vendor&apos;s claims on the registration
                  document. Upon satisfactory review, the company shall be issued a{' '}
                  <strong className="text-[#0E121D]">DUNS Number Certificate.</strong>
                </p>
                <Link
                  href="#registration"
                  className="btn-shimmer inline-flex items-center gap-2 bg-[#DB1B0C] text-white font-semibold px-7 py-3.5 rounded-md hover:bg-[#b81508] transition-colors"
                >
                  Register With Us ↗
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#f8f8f8]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] mb-3">
                About DUNS Number{' '}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.5 0.5L1 7.5h5L4.5 12.5l7.5-8h-5z" />
                </svg>
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D]">
                What is a DUNS Number?
              </h2>
            </div>
          </Reveal>
          <Reveal variant="fade" delay={0.1}>
            <p className="text-[#797979] leading-relaxed mb-4 text-base text-center">
              A DUNS Number is a unique business status number that is provided only to companies
              that are certified to have met acceptable vendor registration requirements. The number
              gives the company the benefit of being part of a global database of credible companies
              that have been certified by Dun &amp; Bradstreet, and the number can be quoted in all
              your correspondence with any company both locally and globally.
            </p>
            <p className="text-[#797979] leading-relaxed mb-10 text-base text-center">
              Companies who have paid the stipulated registration fee will be contacted by Dun &amp;
              Bradstreet and required to provide some documents for the registration exercise. See
              below.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.1}>
            <div className="text-center mb-12">
              <Link
                href="#"
                className="btn-shimmer inline-flex items-center gap-2 bg-[#DB1B0C] text-white font-semibold px-7 py-3.5 rounded-md hover:bg-[#b81508] transition-colors"
              >
                Click Here to View Vendor Registration Category ↗
              </Link>
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.15}>
            <Accordion items={accordionItems} />

            <div className="mt-10 border-l-4 border-[#DB1B0C] bg-[#DB1B0C]/5 p-5">
              <h4 className="font-bold text-[#DB1B0C] mb-2 text-base">Final Notes</h4>
              <p className="text-sm text-[#797979] mb-2">
                FIPL reserves the right to reject PROPOSALS where requirements are not
                satisfactorily met, or false information has been provided.
              </p>
              <ul className="space-y-1.5">
                {[
                  'Vendor registration is open all year round. All costs incurred by respondents because of this PROPOSAL invitation and any subsequent requests for information shall be borne by the respondents only.',
                  "Without complete registration, FIPL won't engage in any business transaction with your organisation.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#797979]">
                    <span className="text-[#DB1B0C] shrink-0">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-[#D97300] mb-2 text-base">Disclaimer</h4>
              <p className="text-sm text-[#797979] leading-relaxed italic">
                This Invitation FOR PROPOSAL does not constitute any commitment on the part of First
                Independent Power Limited. Furthermore, the submission of documents shall not
                entitle any of the interested parties to any claims against First Independent Power
                Limited by virtue of such parties having responded to the PROPOSAL invitation
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="registration" className="py-14 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <Reveal variant="up">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E121D] mb-8">Contact Us</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  icon: (
                    <svg
                      className="w-4 h-4 text-[#DB1B0C]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  title: 'First Independent Power  Company Limited',
                  content: (
                    <a
                      href="mailto:vendorsupport@fipl-ng.com"
                      className="text-sm text-[#797979] hover:text-[#DB1B0C]"
                    >
                      vendorsupport@fipl-ng.com
                    </a>
                  ),
                },
                {
                  icon: (
                    <svg
                      className="w-4 h-4 text-[#DB1B0C]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.77a16 16 0 006 6l.86-.86a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z" />
                    </svg>
                  ),
                  title: 'DUN & Bradsheet',
                  content: (
                    <>
                      <p className="text-sm text-[#797979]">Adelola ADEYINKA: +23401-2803777</p>
                      <p className="text-sm text-[#797979]">Akinuke Williams: 07043387900</p>
                    </>
                  ),
                },
              ].map(({ icon, title, content }, i) => (
                <Reveal key={title} variant="up" delay={i * 0.1}>
                  <div className="border border-gray-200 p-6 fipl-card-hover h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-[#DB1B0C]/10 rounded-xl flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <h3 className="font-bold text-[#0E121D] text-sm">{title}</h3>
                    </div>
                    {content}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal variant="scale" delay={0.15}>
              <div
                className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(269deg, #D97300 1%, #DB1B0C 100%)' }}
              >
                <Link
                  href="mailto:vendorsupport@fipl-ng.com"
                  className="btn-shimmer inline-flex items-center gap-2 bg-white text-[#DB1B0C] font-bold px-8 py-3.5 rounded-md hover:bg-gray-100 transition-colors mb-3"
                >
                  Click to Register with Us ↗
                </Link>
                <p className="text-white/80 text-sm">Signed: Management</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
