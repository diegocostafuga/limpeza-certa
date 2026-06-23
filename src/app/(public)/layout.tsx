import dynamic from 'next/dynamic'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const CookieBanner = dynamic(
  () => import('@/components/lgpd/cookie-banner').then((m) => m.CookieBanner),
  { ssr: false }
)

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  )
}
