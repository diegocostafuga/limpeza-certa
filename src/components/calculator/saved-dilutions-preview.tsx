import Link from 'next/link'
import { Lock, BookmarkCheck, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Exemplos visuais do que o usuário terá ao se cadastrar
const examples = [
  { name: 'Piso Laminado', ratio: '1:20', bottle: '500 mL', result: '23 mL produto + 477 mL água' },
  { name: 'Vaso Sanitário', ratio: '1:5', bottle: '1 L', result: '167 mL produto + 833 mL água' },
  { name: 'Cozinha Geral', ratio: '1:10', bottle: '750 mL', result: '68 mL produto + 682 mL água' },
]

export function SavedDilutionsPreview() {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="mb-4 flex items-center gap-2">
        <BookmarkCheck className="text-primary h-5 w-5" />
        <h2 className="font-heading text-foreground text-lg font-semibold">
          Minhas diluições salvas
        </h2>
      </div>

      {/* Preview list (blurred) */}
      <div className="relative">
        <ul className="space-y-3 select-none" aria-hidden="true">
          {examples.map((ex) => (
            <li
              key={ex.name}
              className="border-border bg-surface flex items-center justify-between rounded-xl border px-4 py-3 blur-[2px]"
            >
              <div>
                <p className="text-foreground text-sm font-medium">{ex.name}</p>
                <p className="text-muted-foreground text-xs">
                  {ex.ratio} · {ex.bottle}
                </p>
              </div>
              <p className="text-muted-foreground max-w-[160px] text-right text-xs">{ex.result}</p>
            </li>
          ))}
        </ul>

        {/* Lock overlay */}
        <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center rounded-xl backdrop-blur-[2px]">
          <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <Lock className="text-primary h-5 w-5" />
          </div>
          <p className="text-foreground mb-1 text-sm font-semibold">
            Salve suas diluições favoritas
          </p>
          <p className="text-muted-foreground mb-4 max-w-xs text-center text-xs">
            Crie sua conta grátis e nunca mais precise calcular a mesma proporção duas vezes.
          </p>
          <Link href="/cadastro" className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}>
            Criar conta grátis
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <p className="text-muted-foreground mt-3 text-center text-xs">
        Já tem conta?{' '}
        <Link href="/entrar" className="text-primary font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
