import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SiteShell from '@/components/SiteShell'
import { createServerClient } from '@/lib/supabase-server'

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
          <SiteShell alerts={alerts ?? []}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
