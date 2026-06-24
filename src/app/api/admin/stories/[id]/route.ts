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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params
  const { title, mediaUrl, mediaType, linkUrl, visibility, expiresAt } = await req.json()

  if (!title?.trim() || !mediaUrl?.trim() || !mediaType) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const [row] = await db
    .update(stories)
    .set({
      title,
      mediaUrl,
      mediaType,
      linkUrl: linkUrl?.trim() || null,
      visibility,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    })
    .where(eq(stories.id, id))
    .returning()

  if (!row) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params
  const deleted = await db.delete(stories).where(eq(stories.id, id)).returning()
  if (deleted.length === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
