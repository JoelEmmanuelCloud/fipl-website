'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { ChatWidget } from '@/components/ChatWidget'
import AlertBanner from '@/components/AlertBanner'
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar'

const SplashScreen = dynamic(
  () => import('@/components/SplashScreen').then((m) => ({ default: m.SplashScreen })),
  { ssr: false },
)

interface Alert {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'critical'
}

export default function SiteShell({
  children,
  alerts,
}: {
  children: React.ReactNode
  alerts: Alert[]
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <ServiceWorkerRegistrar />
      <SplashScreen />
      <AlertBanner alerts={alerts} />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </>
  )
}
