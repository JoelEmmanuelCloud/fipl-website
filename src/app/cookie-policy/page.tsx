import type { Metadata } from 'next'
import ManageCookiesButton from '@/components/ManageCookiesButton'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn how First Independent Power Limited (FIPL) uses cookies, the categories of cookies used across this site, and how to manage your preferences.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--fipl-bg)]">
      <div className="h-[72px]" aria-hidden="true" />

      <div className="bg-[var(--fipl-surface)] border-b border-[var(--fipl-border)]">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--fipl-heading)] mb-2">
            Cookie Policy
          </h1>
          <p className="text-sm text-[var(--fipl-body)]">Last updated 14 August 2026</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="fipl-prose">
          <p>
            This Cookie Policy explains how First Independent Power Limited (&ldquo;FIPL&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) uses cookies and similar technologies on{' '}
            <strong>fipl-ng.com</strong>, and the choices you have in relation to them.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They
            allow the site to recognise your device, remember your preferences, and understand
            how the site is used.
          </p>

          <h2>Categories of cookies we use</h2>
          <ul>
            <li>
              <strong>Necessary cookies</strong> — required for the site to function correctly,
              including navigation, security, and session management. These cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us understand how visitors interact with
              the site so we can improve content, layout, and performance. These are only set
              with your consent.
            </li>
            <li>
              <strong>Marketing cookies</strong> — used to measure the reach and effectiveness of
              our outreach and campaigns across channels. These are only set with your consent.
            </li>
          </ul>

          <h2>How we ask for your consent</h2>
          <p>
            When you first visit the site, a banner lets you accept all cookies, reject
            non-essential cookies, or choose your preferences by category. You can change your
            choice at any time using the button below, which reopens the preferences panel.
          </p>

          <h2>Managing cookies in your browser</h2>
          <p>
            Most browsers also let you block or delete cookies through their settings. Doing so
            may affect how parts of the site function.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in the cookies
            we use or for legal or regulatory reasons. Any changes will be posted on this page.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this Cookie Policy, contact us at{' '}
            <a href="mailto:info@fipl-ng.com" className="underline hover:text-primary">
              info@fipl-ng.com
            </a>{' '}
            or 12 Circular Road, Presidential Estate, GRA, Port Harcourt.
          </p>
        </div>

        <ManageCookiesButton className="mt-8 px-5 py-3 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors" />
      </div>
    </div>
  )
}
