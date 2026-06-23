import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { eq, desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { savedDilutions } from '@/lib/schema'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const items = await db.query.savedDilutions.findMany({
    where: eq(savedDilutions.userId, userId),
    orderBy: [desc(savedDilutions.createdAt)],
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

  const [row] = await db
    .insert(savedDilutions)
    .values({ userId, name: name.trim(), ratioProduct, ratioWater, bottleSizeMl })
    .returning()

  return NextResponse.json(row, { status: 201 })
}
