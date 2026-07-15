import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SiteShell from '@/components/SiteShell'
import { createServerClient } from '@/lib/supabase-server'
import { defaultContactContent } from '@/lib/page-content-defaults'
import type { ContactContent, PageContentRow } from '@/lib/database.types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fipl-ng.com'
const defaultDescription =
  'FIPL operates four world-class gas turbine power plants in Rivers State, providing reliable and sustainable energy solutions across Nigeria.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'First Independent Power Limited (FIPL)',
    template: '%s – FIPL',
  },
  description: defaultDescription,
  keywords: [
    'FIPL',
    'First Independent Power Limited',
    'power generation Nigeria',
    'gas turbine power plants',
    'Rivers State electricity',
    'independent power producer Nigeria',
  ],
  icons: {
    icon: '/images/sustainability/logoimage.png',
    shortcut: '/images/sustainability/logoimage.png',
    apple: '/images/sustainability/logoimage.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'First Independent Power Limited (FIPL)',
    title: 'First Independent Power Limited (FIPL)',
    description: defaultDescription,
    url: siteUrl,
    locale: 'en_NG',
    images: [
      {
        url: '/images/home/backgroundimage.png',
        width: 1200,
        height: 630,
        alt: 'First Independent Power Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Independent Power Limited (FIPL)',
    description: defaultDescription,
    images: ['/images/home/backgroundimage.png'],
  },
}

export const revalidate = 60

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()
  const [{ data: alerts }, { data: contactRow }] = await Promise.all([
    supabase
      .from('alerts')
      .select('id, title, message, type')
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabase.from('page_content').select('content').eq('page', 'contact').maybeSingle(),
  ])

  const contactStored = (contactRow as Pick<PageContentRow, 'content'> | null)?.content as
    | Partial<ContactContent>
    | undefined
  const contactItems = contactStored?.contactItems ?? defaultContactContent.contactItems
  const address = contactItems.find((i) => i.label === 'Head Office:')?.value ?? ''
  const phone = contactItems.find((i) => i.label === 'Phone:')?.value ?? ''
  const email = contactItems.find((i) => i.label === 'Email:')?.value ?? ''

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'First Independent Power Limited',
    alternateName: 'FIPL',
    url: siteUrl,
    logo: `${siteUrl}/images/sustainability/logoimage.png`,
    description: defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressRegion: 'Rivers State',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone,
      email,
      contactType: 'customer service',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden bg-[var(--fipl-bg)] text-[var(--fipl-heading)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('fipl-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <SiteShell alerts={alerts ?? []}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
