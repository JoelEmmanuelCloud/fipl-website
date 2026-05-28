import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { ChatWidget } from '@/components/ChatWidget'
import { ThemeProvider } from '@/components/ThemeProvider'
import AlertBanner from '@/components/AlertBanner'
import { createServerClient } from '@/lib/supabase-server'

const SplashScreen = dynamic(
  () => import('@/components/SplashScreen').then((m) => ({ default: m.SplashScreen })),
  { ssr: false },
)

export const metadata: Metadata = {
  title: {
    default: 'First Independent Power Limited (FIPL)',
    template: '%s – FIPL',
  },
  description:
    'FIPL operates four world-class gas turbine power plants in Rivers State, providing reliable and sustainable energy solutions across Nigeria.',
  icons: {
    icon: '/images/sustainability/logoimage.png',
    shortcut: '/images/sustainability/logoimage.png',
    apple: '/images/sustainability/logoimage.png',
  },
}

export const revalidate = 60

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()
  const { data: alerts } = await supabase
    .from('alerts')
    .select('id, title, message, type')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden bg-[var(--fipl-bg)] text-[var(--fipl-heading)]">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('fipl-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <SplashScreen />
          <AlertBanner alerts={alerts ?? []} />
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
