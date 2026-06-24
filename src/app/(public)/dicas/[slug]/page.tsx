import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { Lightbulb, ArrowLeft, Lock } from 'lucide-react'
import { db } from '@/lib/db'
import { tips } from '@/lib/schema'
import { Container, Section } from '@/components/layout/container'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tip = await db.query.tips.findFirst({ where: eq(tips.slug, slug) })
  if (!tip) return {}
  return { title: tip.title, description: tip.body.slice(0, 160) }
}

const TYPE_LABEL: Record<string, string> = {
  quick_tip: 'Dica rápida',
  product_tip: 'Indicação de produto',
}

export default async function DicaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { userId } = await auth()

  const tip = await db.query.tips.findFirst({ where: eq(tips.slug, slug) })

  if (!tip || tip.visibility === 'draft') notFound()

  const locked = tip.visibility === 'auth_required' && !userId

  return (
    <Section>
      <Container className="max-w-2xl">
        <Link
          href="/dicas"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Todas as dicas
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="bg-accent/10 flex h-11 w-11 items-center justify-center rounded-xl">
            <Lightbulb className="text-accent h-5 w-5" />
          </div>
          <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-semibold">
            {TYPE_LABEL[tip.type] ?? 'Dica'}
          </span>
        </div>

        <h1 className="font-heading text-foreground text-2xl leading-snug font-bold md:text-3xl">
          {tip.title}
        </h1>

        {locked ? (
          <div className="mt-8 rounded-2xl border border-dashed border-violet-200 bg-violet-50 p-8 text-center">
            <Lock className="text-primary mx-auto mb-3 h-8 w-8" />
            <p className="text-foreground font-semibold">Conteúdo exclusivo para membros</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Cadastre-se gratuitamente para acessar esta e outras dicas exclusivas.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                href="/cadastro"
                className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                Criar conta grátis
              </Link>
              <Link
                href="/entrar"
                className="border-border rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-foreground mt-6 leading-relaxed whitespace-pre-line">{tip.body}</div>
        )}
      </Container>
    </Section>
  )
}
