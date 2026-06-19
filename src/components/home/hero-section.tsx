import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const stats = [
  { value: '50+', label: 'Protocolos testados' },
  { value: '100%', label: 'Aprovados na prática' },
  { value: '0', label: 'Segredos guardados' },
]

export function HeroSection() {
  return (
    <section className="from-primary-light via-background to-accent-light relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="bg-primary/10 pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Testados, aprovados e recomendados!
          </div>

          {/* Heading */}
          <h1 className="font-heading text-foreground text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
            A casa mais limpa começa com o <span className="text-primary">protocolo certo</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            Guias passo a passo para cada cantinho da sua casa. Sem mistério, sem improviso — só
            resultado.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/protocolos"
              className={cn(buttonVariants({ size: 'lg' }), 'w-full gap-2 sm:w-auto')}
            >
              Explorar protocolos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/cadastro"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
            >
              Cadastre-se grátis
            </Link>
          </div>

          {/* Stats */}
          <div className="divide-border border-border bg-surface mt-12 grid grid-cols-3 divide-x rounded-2xl border px-4 py-5 shadow-sm">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 text-center">
                <p className="font-heading text-primary text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground mt-1 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
