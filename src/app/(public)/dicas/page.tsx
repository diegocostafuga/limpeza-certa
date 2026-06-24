import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { ne } from 'drizzle-orm'
import { Lightbulb, ChevronRight, Lock } from 'lucide-react'
import { db } from '@/lib/db'
import { tips } from '@/lib/schema'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Dicas de Limpeza',
  description: 'Dicas práticas e testadas para facilitar a limpeza da sua casa.',
}

const TYPE_LABEL: Record<string, string> = {
  quick_tip: 'Dica rápida',
  product_tip: 'Produto',
}

export default async function DicasPage() {
  const { userId } = await auth()

  const items = await db.query.tips.findMany({
    where: ne(tips.visibility, 'draft'),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  })

  const authRequired = items.filter((t) => t.visibility === 'auth_required')
  const visible = userId ? items : items.filter((t) => t.visibility === 'public')
  const locked = userId ? [] : authRequired

  return (
    <Section>
      <Container>
        <div className="mb-10 text-center">
          <div className="bg-accent/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <Lightbulb className="text-accent h-7 w-7" />
          </div>
          <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Dicas de Limpeza
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl">
            Testadas na prática. Direto ao ponto.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center text-sm">
            Nenhuma dica publicada ainda. Volte em breve!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {visible.map((tip) => (
                <Link
                  key={tip.id}
                  href={`/dicas/${tip.slug}`}
                  className="border-border bg-surface group flex gap-4 rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="bg-accent/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                    <Lightbulb className="text-accent h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="bg-accent/10 text-accent inline-flex rounded-full px-2 py-0.5 text-xs font-medium">
                      {TYPE_LABEL[tip.type] ?? 'Dica'}
                    </span>
                    <h2 className="font-heading text-foreground mt-1.5 text-sm leading-snug font-semibold">
                      {tip.title}
                    </h2>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
                      {tip.body}
                    </p>
                    <span className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium group-hover:underline">
                      Ler dica completa
                      <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}

              {locked.map((tip) => (
                <div
                  key={tip.id}
                  className="border-border bg-surface relative flex gap-4 overflow-hidden rounded-xl border p-5 shadow-sm"
                >
                  <div className="bg-primary/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                    <Lock className="text-primary h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="bg-primary/10 text-primary inline-flex rounded-full px-2 py-0.5 text-xs font-medium">
                      Exclusivo
                    </span>
                    <h2 className="font-heading text-foreground mt-1.5 text-sm leading-snug font-semibold">
                      {tip.title}
                    </h2>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed blur-sm select-none">
                      {tip.body}
                    </p>
                    <Link
                      href="/cadastro"
                      className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                    >
                      <Lock className="h-3 w-3" />
                      Cadastre-se para ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {!userId && authRequired.length > 0 && (
              <p className="text-muted-foreground mt-6 text-center text-sm">
                +{authRequired.length} dica{authRequired.length > 1 ? 's' : ''} exclusiva
                {authRequired.length > 1 ? 's' : ''} para membros.{' '}
                <Link href="/cadastro" className="text-primary font-medium hover:underline">
                  Cadastre-se grátis
                </Link>
              </p>
            )}
          </>
        )}
      </Container>
    </Section>
  )
}
