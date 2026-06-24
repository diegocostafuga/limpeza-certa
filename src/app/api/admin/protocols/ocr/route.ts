import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'

const client = new Anthropic()

const SYSTEM_PROMPT = `Você é um assistente especializado em extrair protocolos de limpeza de imagens.

Analise a imagem e extraia as informações do protocolo em JSON com esta estrutura exata:
{
  "title": "título do protocolo",
  "category": "uma de: Banheiro | Cozinha | Sala | Quarto | Área de serviço | Geral",
  "objectType": "objeto ou superfície específica (ex: 'vaso sanitário', 'pia') ou null se não especificado",
  "steps": [
    {
      "order": 1,
      "title": "título curto da etapa",
      "description": "descrição detalhada do que fazer",
      "tip": "dica extra opcional ou null"
    }
  ]
}

Regras:
- Extraia TODAS as etapas visíveis na imagem, na ordem correta
- Se o título não estiver claro, crie um título descritivo baseado no conteúdo
- Escolha a categoria mais adequada
- Se houver dicas ou observações no texto, coloque-as no campo "tip" da etapa correspondente
- Retorne APENAS o JSON, sem markdown, sem explicações`

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) return null
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) })
  return user?.role === 'admin' ? userId : null
}

export async function POST(req: NextRequest) {
  const adminId = await assertAdmin()
  if (!adminId) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const formData = await req.formData()
  const file = formData.get('image') as File | null

  if (!file) return NextResponse.json({ error: 'missing_image' }, { status: 400 })

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'invalid_type' }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'file_too_large' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const base64 = Buffer.from(bytes).toString('base64')
  const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          {
            type: 'text',
            text: 'Extraia o protocolo de limpeza desta imagem e retorne o JSON conforme instruído.',
          },
        ],
      },
    ],
  })

  const raw = message.content[0]?.type === 'text' ? message.content[0].text : ''

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) return NextResponse.json({ error: 'parse_error', raw }, { status: 422 })
    parsed = JSON.parse(match[0])
  }

  return NextResponse.json(parsed)
}
