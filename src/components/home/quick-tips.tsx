import Link from 'next/link'
import { ChevronRight, Lightbulb, Lock } from 'lucide-react'
import { ne } from 'drizzle-orm'
import { db } from '@/lib/db'
import { tips } from '@/lib/schema'
import { auth } from '@clerk/nextjs/server'

export async function QuickTips() {
  const { userId } = await auth()

  const items = await db.query.tips.findMany({
    where: ne(tips.visibility, 'draft'),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
    limit: 4,
  })

  const visible = userId ? items : items.filter((t) => t.visibility === 'public')
  const locked = userId ? [] : items.filter((t) => t.visibility === 'auth_required')

  if (items.length === 0) return null

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase">Dicas</p>
            <h2 className="font-heading text-foreground mt-2 text-3xl font-bold md:text-4xl">
              Dicas que fazem diferença
            </h2>
            <p className="text-muted-foreground mt-2">Testadas na prática. Direto ao ponto.</p>
          </div>
          <Link
            href="/dicas"
            className="text-primary hidden items-center gap-1 text-sm font-medium hover:underline sm:flex"
          >
            Ver todas
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visible.map((tip) => (
            <div
              key={tip.id}
              className="border-border bg-surface relative flex gap-4 rounded-xl border p-5 shadow-sm"
            >
              <div className="bg-accent/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Lightbulb className="text-accent h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="bg-accent/10 text-accent inline-flex rounded-full px-2 py-0.5 text-xs font-medium">
                  Dica rápida
                </span>
                <h3 className="font-heading text-foreground mt-1.5 text-sm leading-snug font-semibold">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
                  {tip.body}
                </p>
                <Link
                  href={`/dicas/${tip.slug}`}
                  className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                >
                  Ler dica completa
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}

          {locked.map((tip) => (
            <div
              key={tip.id}
              className="border-border bg-surface relative flex gap-4 rounded-xl border p-5 shadow-sm"
            >
              <div className="bg-primary/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Lock className="text-primary h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="bg-primary/10 text-primary inline-flex rounded-full px-2 py-0.5 text-xs font-medium">
                  Exclusivo
                </span>
                <h3 className="font-heading text-foreground mt-1.5 text-sm leading-snug font-semibold">
                  {tip.title}
                </h3>
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

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/dicas"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            Ver todas as dicas
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
