import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, tips } from '@/lib/schema'

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
  return user?.role === 'admin' ? userId : null
}

export async function POST(req: NextRequest) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { title, slug, type, body, visibility } = await req.json()

  if (!title?.trim() || !slug?.trim() || !body?.trim() || !type) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const existing = await db.query.tips.findFirst({ where: eq(tips.slug, slug) })
  if (existing) return NextResponse.json({ error: 'slug_taken' }, { status: 409 })

  const [row] = await db
    .insert(tips)
    .values({ title, slug, type, body, visibility: visibility ?? 'draft' })
    .returning()

  return NextResponse.json(row, { status: 201 })
}
