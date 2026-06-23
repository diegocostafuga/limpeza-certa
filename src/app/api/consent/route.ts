import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createHash } from 'crypto'
import { db } from '@/lib/db'
import { userConsent } from '@/lib/schema'

function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + process.env.CLERK_SECRET_KEY)
    .digest('hex')
    .slice(0, 16)
}

export async function POST(req: NextRequest) {
  try {
    const { analytics, marketing, sessionId } = await req.json()

    if (typeof analytics !== 'boolean' || typeof marketing !== 'boolean') {
      return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
    }

    const { userId } = await auth()

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    await db.insert(userConsent).values({
      userId: userId ?? null,
      sessionId: sessionId ?? null,
      analytics,
      marketing,
      ipHash: hashIp(ip),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
