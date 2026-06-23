import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AuthTeaserProps {
  title: string
  stepCount: number
}

export function AuthTeaser({ title, stepCount }: AuthTeaserProps) {
  return (
    <div className="border-border bg-surface rounded-2xl border">
      {/* Blurred preview */}
      <div className="relative overflow-hidden rounded-t-2xl px-6 pt-6 pb-2">
        <div className="pointer-events-none space-y-4 blur-sm select-none">
          {Array.from({ length: Math.min(stepCount, 3) }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="bg-border h-3 w-3/4 rounded" />
                <div className="bg-border h-3 w-full rounded" />
                <div className="bg-border h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="from-surface absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent" />
      </div>

      {/* CTA */}
      <div className="border-border border-t px-6 py-6 text-center">
        <div className="bg-primary/10 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
          <Lock className="text-primary h-5 w-5" />
        </div>
        <p className="text-foreground mb-1 text-sm font-semibold">
          Protocolo exclusivo para membros
        </p>
        <p className="text-muted-foreground mb-4 text-xs">
          Crie sua conta grátis para ver todos os {stepCount} passos do protocolo{' '}
          <strong>{title}</strong>.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/cadastro" className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}>
            Criar conta grátis
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/entrar" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
            Já tenho conta
          </Link>
        </div>
      </div>
    </div>
  )
}
