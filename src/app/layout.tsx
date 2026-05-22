import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { SplashScreen } from '@/components/SplashScreen'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased text-gray-800 bg-white overflow-x-hidden">
        <SplashScreen />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <a
          href="/contact"
          aria-label="Chat with us"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent hover:bg-primary transition-colors shadow-lg flex items-center justify-center z-40"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </a>
      </body>
    </html>
  )
}
