import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const benefits = [
  'Acesso a todos os protocolos completos',
  'Dicas exclusivas para membros',
  'Calculadora com diluições salvas',
  'Novidades em primeira mão',
]

export function SignupCta() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-primary relative overflow-hidden rounded-3xl px-8 py-12 md:px-16 md:py-16">
          {/* Decorative elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/5"
          />
          <div
            aria-hidden="true"
            className="bg-accent/20 pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full"
          />

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
                <Star className="h-4 w-4 fill-white text-white" />
                Cadastro 100% gratuito
              </div>
              <h2 className="font-heading mt-4 text-3xl leading-tight font-bold text-white md:text-4xl">
                Acesse tudo o que o LimpezaCerta tem a oferecer
              </h2>
              <p className="mt-4 text-white/80">
                Crie sua conta grátis e tenha acesso imediato a protocolos completos, dicas
                exclusivas e muito mais.
              </p>
              <Link
                href="/cadastro"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'text-primary mt-6 gap-2 bg-white hover:bg-white/90'
                )}
              >
                Criar conta grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right — Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
