import Link from 'next/link'
import { ChevronRight, Lightbulb, Lock } from 'lucide-react'

// Dados mock — serão substituídos por query ao banco na Milestone 2
const tips = [
  {
    slug: 'vinagre-limpeza-cheiro',
    title: 'Vinagre não deixa cheiro se você usar assim',
    preview: 'O segredo está na diluição e na ventilação do ambiente durante o processo...',
    locked: false,
    tag: 'Dica rápida',
  },
  {
    slug: 'bicarbonato-vaso-sanitario',
    title: 'Bicarbonato + vinagre no vaso: mito ou verdade?',
    preview: 'A reação química não é o que parece. O que realmente funciona é...',
    locked: false,
    tag: 'Dica rápida',
  },
  {
    slug: 'produto-certo-para-piso',
    title: 'Como escolher o produto certo para cada tipo de piso',
    preview: 'Porcelanato, laminado e cerâmica pedem cuidados diferentes. Cadastre-se para ver...',
    locked: true,
    tag: 'Exclusivo',
  },
  {
    slug: 'frequencia-limpeza-por-ambiente',
    title: 'Com que frequência limpar cada ambiente?',
    preview: 'Um guia prático de frequência mínima para manter a casa organizada sem...',
    locked: true,
    tag: 'Exclusivo',
  },
]

export function QuickTips() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
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

        {/* List */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tips.map((tip) => (
            <div
              key={tip.slug}
              className="border-border bg-surface relative flex gap-4 rounded-xl border p-5 shadow-sm"
            >
              {/* Icon */}
              <div className="bg-accent/10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <Lightbulb className="text-accent h-4 w-4" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      tip.locked
                        ? 'bg-primary/10 text-primary inline-flex rounded-full px-2 py-0.5 text-xs font-medium'
                        : 'bg-accent/10 text-accent inline-flex rounded-full px-2 py-0.5 text-xs font-medium'
                    }
                  >
                    {tip.tag}
                  </span>
                </div>
                <h3 className="font-heading text-foreground mt-1.5 text-sm leading-snug font-semibold">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">
                  {tip.preview}
                </p>

                {tip.locked ? (
                  <Link
                    href="/cadastro"
                    className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                  >
                    <Lock className="h-3 w-3" />
                    Cadastre-se para ver
                  </Link>
                ) : (
                  <Link
                    href={`/dicas/${tip.slug}`}
                    className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-medium hover:underline"
                  >
                    Ler dica completa
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile link */}
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
