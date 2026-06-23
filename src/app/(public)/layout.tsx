import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CookieBannerLoader } from '@/components/lgpd/cookie-banner-loader'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  let isAdmin = false
  if (userId) {
    const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
    isAdmin = user?.role === 'admin'
  }

  return (
    <>
      <Navbar isAdmin={isAdmin} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <CookieBannerLoader />
    </>
  )
}
