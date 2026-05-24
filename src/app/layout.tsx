import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { ChatWidget } from '@/components/ChatWidget'

const SplashScreen = dynamic(
  () => import('@/components/SplashScreen').then(m => ({ default: m.SplashScreen })),
  { ssr: false }
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-800 bg-white overflow-x-hidden">
        <SplashScreen />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <ChatWidget />
      </body>
    </html>
  )
}
