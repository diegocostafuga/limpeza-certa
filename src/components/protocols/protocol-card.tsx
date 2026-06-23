import Link from 'next/link'
import { ChevronRight, Lock, ListChecks } from 'lucide-react'
import { type Protocol } from '@/lib/schema'

const categoryColors: Record<string, string> = {
  banheiro: 'bg-blue-50 text-blue-700',
  cozinha: 'bg-amber-50 text-amber-700',
  quarto: 'bg-purple-50 text-purple-700',
  sala: 'bg-green-50 text-green-700',
  lavanderia: 'bg-cyan-50 text-cyan-700',
}

function categoryColor(cat: string) {
  return categoryColors[cat.toLowerCase()] ?? 'bg-secondary text-primary'
}

interface ProtocolCardProps {
  protocol: Protocol
  locked?: boolean
}

export function ProtocolCard({ protocol, locked = false }: ProtocolCardProps) {
  const steps = Array.isArray(protocol.steps) ? protocol.steps : []

  return (
    <div className="border-border bg-surface group relative flex flex-col rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
      {/* Category badge */}
      <div className="px-5 pt-5">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${categoryColor(protocol.category)}`}
        >
          {protocol.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <h3 className="font-heading text-foreground mb-1 text-base leading-snug font-semibold">
          {protocol.title}
        </h3>

        <div className="text-muted-foreground mt-auto flex items-center gap-3 pt-4 text-xs">
          <span className="flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5" />
            {steps.length} {steps.length === 1 ? 'passo' : 'passos'}
          </span>
          {protocol.objectType && <span className="capitalize">{protocol.objectType}</span>}
        </div>
      </div>

      {/* Footer */}
      <div className="border-border border-t px-5 py-3">
        {locked ? (
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <Lock className="h-3.5 w-3.5" />
            Requer cadastro
          </span>
        ) : (
          <Link
            href={`/protocolos/${protocol.slug}`}
            className="text-primary group-hover:text-primary/80 flex items-center gap-1 text-xs font-medium transition-colors"
          >
            Ver protocolo
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Make the whole card clickable when not locked */}
      {!locked && (
        <Link href={`/protocolos/${protocol.slug}`} className="absolute inset-0" aria-hidden />
      )}
    </div>
  )
}
