import Link from 'next/link'
import { ArrowRight, ChevronRight, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dados mock — serão substituídos por query ao banco na Milestone 2
const protocols = [
  {
    slug: 'limpeza-completa-banheiro',
    title: 'Limpeza Completa do Banheiro',
    category: 'Banheiro',
    stepCount: 8,
    description: 'Do vaso ao espelho: passo a passo para um banheiro impecável sem esforço extra.',
    color: 'bg-violet-100 text-violet-700',
    accent: 'bg-violet-500',
  },
  {
    slug: 'desengordurando-cozinha',
    title: 'Desgordurando a Cozinha',
    category: 'Cozinha',
    stepCount: 6,
    description: 'Fogão, exaustor, bancadas e armários. Chega de gordura grudada com essas dicas.',
    color: 'bg-pink-100 text-pink-700',
    accent: 'bg-pink-500',
  },
  {
    slug: 'limpeza-piso-laminado',
    title: 'Cuidando do Piso Laminado',
    category: 'Pisos',
    stepCount: 5,
    description:
      'Como limpar sem danificar. A proporção certa de produto e a técnica que conserva.',
    color: 'bg-amber-100 text-amber-700',
    accent: 'bg-amber-500',
  },
  {
    slug: 'higienizando-vaso-sanitario',
    title: 'Vaso Sanitário Impecável',
    category: 'Banheiro',
    stepCount: 4,
    description: 'Protocolo rápido e eficaz. Os produtos certos e a sequência que faz diferença.',
    color: 'bg-emerald-100 text-emerald-700',
    accent: 'bg-emerald-500',
  },
]

export function FeaturedProtocols() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase">
              Protocolos
            </p>
            <h2 className="font-heading text-foreground mt-2 text-3xl font-bold md:text-4xl">
              Por onde começar?
            </h2>
            <p className="text-muted-foreground mt-2">
              Os mais acessados por quem já usa o LimpezaCerta.
            </p>
          </div>
          <Link
            href="/protocolos"
            className="text-primary hidden items-center gap-1 text-sm font-medium hover:underline sm:flex"
          >
            Ver todos
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {protocols.map((protocol) => (
            <Link
              key={protocol.slug}
              href={`/protocolos/${protocol.slug}`}
              className="group border-border bg-surface flex flex-col rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Category badge */}
              <span
                className={cn(
                  'inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
                  protocol.color
                )}
              >
                {protocol.category}
              </span>

              {/* Title */}
              <h3 className="font-heading text-foreground group-hover:text-primary mt-3 text-base leading-snug font-semibold">
                {protocol.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                {protocol.description}
              </p>

              {/* Footer */}
              <div className="border-border mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <ListChecks className="h-3.5 w-3.5" />
                  {protocol.stepCount} passos
                </span>
                <span className="text-primary flex items-center gap-1 text-xs font-medium">
                  Ver protocolo
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/protocolos"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            Ver todos os protocolos
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
