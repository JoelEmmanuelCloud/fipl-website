import type { Metadata } from 'next'
import Link from 'next/link'
import { Accordion } from '@/components/Accordion'
import { SectionImage } from '@/components/SectionImage'

export const metadata: Metadata = { title: 'Register With Us – Vendor Programme' }

const accordionItems = [
  {
    question: 'Requirements for Proposal Submission With DUN',
    answer: (
      <ul className="space-y-1.5 mt-1">
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
          <li key={item} className="flex items-start gap-2 text-gray-600">
            <span className="text-primary mt-0.5 shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    question: 'Required Documents / Attachments',
    answer: (
      <ul className="space-y-1.5 mt-1">
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
          <li key={item} className="flex items-start gap-2 text-gray-600">
            <span className="text-primary mt-0.5 shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    question: 'For Vendors With Existing DUN Bradstreet Number',
    answer: (
      <div>
        <ul className="space-y-1.5 mt-1">
          {[
            'Provide your existing DUNS Number on the registration form',
            'Submit all other mandatory documents as listed in the requirements',
            'FIPL will verify your DUNS Number directly with Dun & Bradstreet',
            'Upon successful verification, registration will be processed within 10–15 working days',
            'You will receive an email confirmation and your Vendor ID upon successful registration',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-600">
              <span className="text-primary mt-0.5 shrink-0">•</span> {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 mt-3">
          Note: DUNS Numbers must be current and active. Expired or invalid DUNS Numbers will result in
          rejection of the registration application.
        </p>
      </div>
    ),
  },
]

export default function RegisterPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative mt-[72px] min-h-[240px] md:min-h-[320px] lg:min-h-[380px] flex items-center bg-gray-800 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/fipl-r1/1920/1080')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            Vendor Programme ⚡
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-xl">Register with Us</h1>
          <p className="text-white/80 mt-4 max-w-lg leading-relaxed">
            Join FIPL&apos;s trusted network of suppliers and service providers through our formal
            Vendor Registration Programme.
          </p>
        </div>
      </section>

      {/* VENDOR PROGRAMME */}
      <section className="py-20 bolt-watermark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionImage src="https://picsum.photos/seed/fipl-r2/900/650" alt="FIPL vendor registration" className="h-[280px] md:h-[360px] lg:h-[380px] w-full rounded-2xl" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-4">Register With Us ⚡</span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Vendor Registration Program</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At FIPL, we ensure that operations are always compliant with the highest standards of
                business ethics. We require all vendors/suppliers to formally{' '}
                <strong>register with FIPL</strong>. This serves to ensure the best quality of service
                to our operations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We require all services to be provided by registered companies. A vendor is generally a
                registered company and will be required to register with the Sahara Group. The company
                must provide a complete set of vendor documents, including an office address.{' '}
                <strong>The mandatory document should include a DUNS Number Certificate.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-7">
                Without complete registration, FIPL does not engage in any business transaction with
                your organisation.
              </p>
              <a href="#registration" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
                Register With Us ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DUNS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">About DUNS Number ⚡</span>
            <h2 className="text-3xl font-bold text-gray-800">What is a DUNS Number?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            A DUNS Number is a unique business status number that is provided only to companies that are
            certified to have met acceptable vendor registration requirements. The number gives the company
            the benefit of being part of a global database of credible companies that have been certified
            by Dun &amp; Bradstreet, and the number can be quoted in all your correspondence with any
            company both locally and globally.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Companies who have paid the stipulated registration fee will be contacted by Dun &amp; Bradstreet
            and required to provide some documents for the registration exercise.
          </p>

          <div className="text-center mb-12">
            <Link href="#" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-md hover:bg-primary-dark transition-colors">
              Click Here to View Vendor Registration Category ↗
            </Link>
          </div>

          {/* Accordion */}
          <Accordion items={accordionItems} />

          {/* Final Notes */}
          <div className="mt-10 border-l-4 border-primary bg-primary/5 rounded-r-xl p-5">
            <h4 className="font-bold text-primary mb-2">Final Notes</h4>
            <p className="text-sm text-gray-600 mb-2">
              FIPL reserves the right to reject PROPOSALS where requirements are not satisfactorily met,
              or false information has been provided.
            </p>
            <ul className="space-y-1.5">
              {[
                'Vendor registration is open all year round.',
                'All costs incurred by respondents because of this PROPOSAL invitation and any subsequent requests for information shall be borne by the respondents only.',
                "Without complete registration, FIPL won't engage in any business transaction with your organisation.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary shrink-0">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 border border-gray-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3">Disclaimer</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              This Invitation FOR PROPOSAL does not constitute any commitment on the part of First
              Independent Power Limited. Furthermore, the submission of documents shall not entitle any
              of the interested parties to any claims against First Independent Power Limited by virtue
              of such parties having responded to the PROPOSAL invitation.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              By submitting your registration documents, you confirm that all information provided is
              accurate, complete, and up to date. Any misrepresentation may result in immediate
              disqualification and potential legal action.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="registration" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-3">Get Registered ⚡</span>
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { label: '📞 First Independent Power Company Limited', value: 'vendorregistration@fipl-ng.com', sub: 'For vendor registration enquiries' },
              { label: '📄 DUN & Bradstreet', value: 'Nigeria & West Africa Office', sub: 'For DUNS Number registration' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{label}</div>
                <div className="font-semibold text-gray-800 mb-1">{value}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="mailto:vendorregistration@fipl-ng.com"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-md hover:bg-primary-dark transition-colors"
            >
              Contact Vendor Management ↗
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
