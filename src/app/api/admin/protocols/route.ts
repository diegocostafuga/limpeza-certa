import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
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

export async function POST(req: NextRequest) {
  const userId = await assertAdmin()
  if (!userId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

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

  const existing = await db.query.protocols.findFirst({ where: eq(protocols.slug, slug) })
  if (existing) return NextResponse.json({ error: 'slug_taken' }, { status: 409 })

  const [row] = await db
    .insert(protocols)
    .values({
      title,
      slug,
      category,
      objectType,
      visibility,
      steps,
      howToSchema,
      createdBy: userId,
    })
    .returning()

  return NextResponse.json(row, { status: 201 })
}
