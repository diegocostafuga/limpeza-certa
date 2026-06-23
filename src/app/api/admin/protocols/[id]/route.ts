import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users, protocols } from '@/lib/schema'
import { buildHowToSchema } from '@/lib/types'
import type { ProtocolStep } from '@/lib/types'

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
  return user?.role === 'admin' ? userId : null
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await assertAdmin()
  if (!userId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params
  const { title, slug, category, objectType, visibility, steps } = await req.json()

  if (
    !title?.trim() ||
    !slug?.trim() ||
    !category?.trim() ||
    !Array.isArray(steps) ||
    steps.length === 0
  ) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const howToSchema = buildHowToSchema(title, steps as ProtocolStep[])

  const [row] = await db
    .update(protocols)
    .set({
      title,
      slug,
      category,
      objectType,
      visibility,
      steps,
      howToSchema,
      updatedAt: new Date(),
    })
    .where(eq(protocols.id, id))
    .returning()

  if (!row) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  return NextResponse.json(row)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await assertAdmin()
  if (!userId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { id } = await params

  const deleted = await db.delete(protocols).where(eq(protocols.id, id)).returning()
  if (deleted.length === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
