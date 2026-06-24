import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { put } from '@vercel/blob'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
  return user?.role === 'admin' ? userId : null
}

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/quicktime',
]
const MAX_SIZE = 50 * 1024 * 1024 // 50 MB

export async function POST(req: NextRequest) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'missing_file' }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'invalid_type' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'file_too_large' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'bin'
  const filename = `stories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const blob = await put(filename, file, { access: 'public' })

  return NextResponse.json({
    url: blob.url,
    mediaType: file.type.startsWith('video/') ? 'video' : 'image',
  })
}
