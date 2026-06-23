import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, savedDilutions } from '@/lib/schema'

async function ensureUser(userId: string) {
  const clerkUser = await currentUser()
  await db
    .insert(users)
    .values({
      id: userId,
      email: clerkUser?.emailAddresses[0]?.emailAddress ?? `${userId}@clerk`,
      name: clerkUser
        ? `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || null
        : null,
    })
    .onConflictDoNothing()
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  await ensureUser(userId)

  const items = await db.query.savedDilutions.findMany({
    where: eq(savedDilutions.userId, userId),
    orderBy: (t, { desc: d }) => [d(t.createdAt)],
  })

  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { name, ratioProduct, ratioWater, bottleSizeMl } = await req.json()

  if (
    !name?.trim() ||
    typeof ratioProduct !== 'number' ||
    typeof ratioWater !== 'number' ||
    typeof bottleSizeMl !== 'number'
  ) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  await ensureUser(userId)

  const [row] = await db
    .insert(savedDilutions)
    .values({
      userId,
      name: name.trim(),
      ratioProduct: Math.round(ratioProduct),
      ratioWater: Math.round(ratioWater),
      bottleSizeMl: Math.round(bottleSizeMl),
    })
    .returning()

  return NextResponse.json(row, { status: 201 })
}
