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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params
  const { title, slug, type, body, visibility } = await req.json()

  if (!title?.trim() || !slug?.trim() || !body?.trim() || !type) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const [row] = await db
    .update(tips)
    .set({ title, slug, type, body, visibility })
    .where(eq(tips.id, id))
    .returning()

  if (!row) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  return NextResponse.json(row)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params
  const deleted = await db.delete(tips).where(eq(tips.id, id)).returning()
  if (deleted.length === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
