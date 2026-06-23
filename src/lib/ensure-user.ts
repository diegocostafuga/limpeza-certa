import { currentUser } from '@clerk/nextjs/server'
import { db } from './db'
import { users } from './schema'

export async function ensureUser(userId: string) {
  const clerkUser = await currentUser()
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? `${userId}@clerk`
  const name = clerkUser
    ? `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null
    : null

  const adminEmail = process.env.ADMIN_EMAIL
  const isAdmin = !!adminEmail && email === adminEmail

  if (isAdmin) {
    await db
      .insert(users)
      .values({ id: userId, email, name, role: 'admin' })
      .onConflictDoUpdate({ target: users.id, set: { role: 'admin', email } })
  } else {
    await db.insert(users).values({ id: userId, email, name }).onConflictDoNothing()
  }
}
