import Link from 'next/link'
import { ExternalLink, ChevronRight, ShoppingBag } from 'lucide-react'

// Dados mock — serão substituídos por query ao banco na Milestone 2
// Links /go/[slug] serão rastreados internamente antes de redirecionar
const products = [
  {
    slug: 'amz-ype-amaciante',
    name: 'Ypê Amaciante Concentrado',
    partner: 'Amazon',
    description: 'Concentrado para diluir. Rende muito mais e custa menos por uso.',
    badge: 'Mais pedido',
    badgeColor: 'bg-accent/10 text-accent',
  },
  {
    slug: 'zel-klyo-pine-gel',
    name: 'Detergente Klyo Pine Gel 1:200',
    partner: 'Zellin',
    description: 'Concentração 1:200. Um litro vira 200 litros de solução pronta.',
    badge: 'Favorito',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    slug: 'amz-pastilha-maquina-lavar',
    name: 'Pastilha Limpa Máquina de Lavar',
    partner: 'Amazon',
    description: 'Manutenção mensal que prolonga a vida da máquina e elimina odores.',
    badge: 'Aprovado',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
]

export function FeaturedProducts() {
  return (
    <section className="bg-secondary/30 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-accent text-sm font-semibold tracking-widest uppercase">
              Produtos indicados
            </p>
            <h2 className="font-heading text-foreground mt-2 text-3xl font-bold md:text-4xl">
              Testados e aprovados
            </h2>
            <p className="text-muted-foreground mt-2">
              Os produtos que a Andreia usa e recomenda de verdade.
            </p>
          </div>
          <Link
            href="/dicas?tipo=produto"
            className="text-primary hidden items-center gap-1 text-sm font-medium hover:underline sm:flex"
          >
            Ver todos
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="border-border bg-surface flex flex-col rounded-xl border p-5 shadow-sm"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                  <ShoppingBag className="text-primary h-5 w-5" />
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${product.badgeColor}`}
                >
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-heading text-foreground mt-3 text-sm leading-snug font-semibold">
                {product.name}
              </h3>
              <p className="text-muted-foreground mt-1 flex-1 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Footer */}
              <div className="border-border mt-4 flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground text-xs">{product.partner}</span>
                <Link
                  href={`/go/${product.slug}`}
                  className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver produto
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          * Links de parceiros. Ao comprar, você apoia o LimpezaCerta sem pagar nada a mais.
        </p>
      </div>
    </section>
  )
}
