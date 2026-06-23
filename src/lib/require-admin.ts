import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from './db'
import { users } from './schema'
import { ensureUser } from './ensure-user'

export async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) redirect('/entrar')

  await ensureUser(userId)

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (user?.role !== 'admin') redirect('/')

  return { userId, user }
}
