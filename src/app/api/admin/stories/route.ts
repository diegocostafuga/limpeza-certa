import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, stories } from '@/lib/schema'

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
  return user?.role === 'admin' ? userId : null
}

export async function POST(req: NextRequest) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { title, mediaUrl, mediaType, linkUrl, visibility, expiresAt } = await req.json()

  if (!title?.trim() || !mediaUrl?.trim() || !mediaType) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const [row] = await db
    .insert(stories)
    .values({
      title,
      mediaUrl,
      mediaType,
      linkUrl: linkUrl?.trim() || null,
      visibility: visibility ?? 'draft',
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    })
    .returning()

  return NextResponse.json(row, { status: 201 })
}
