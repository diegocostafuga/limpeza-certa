import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { savedDilutions } from '@/lib/schema'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params

  const deleted = await db
    .delete(savedDilutions)
    .where(and(eq(savedDilutions.id, id), eq(savedDilutions.userId, userId)))
    .returning()

  if (deleted.length === 0) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
