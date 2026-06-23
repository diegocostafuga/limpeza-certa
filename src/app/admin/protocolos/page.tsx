import Link from 'next/link'
import { Plus, Eye, EyeOff, FileEdit, Lock } from 'lucide-react'
import { db } from '@/lib/db'
import { protocols } from '@/lib/schema'
import { desc } from 'drizzle-orm'

const VISIBILITY_BADGE: Record<string, { label: string; className: string }> = {
  public: { label: 'Público', className: 'bg-green-100 text-green-700' },
  auth_required: { label: 'Membros', className: 'bg-violet-100 text-violet-700' },
  draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-600' },
}

export default async function AdminProtocolosPage() {
  const items = await db.query.protocols.findMany({
    orderBy: [desc(protocols.createdAt)],
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Protocolos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {items.length} protocolo{items.length !== 1 ? 's' : ''} no total
          </p>
        </div>
        <Link
          href="/admin/protocolos/novo"
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo protocolo
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-muted-foreground text-sm">Nenhum protocolo criado ainda.</p>
          <Link
            href="/admin/protocolos/novo"
            className="text-primary mt-2 inline-block text-sm font-medium hover:underline"
          >
            Criar primeiro protocolo
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Título</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Categoria</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Etapas</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Visibilidade</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((p) => {
                const badge = VISIBILITY_BADGE[p.visibility] ?? VISIBILITY_BADGE.draft
                const steps = Array.isArray(p.steps) ? p.steps.length : 0
                return (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-foreground font-medium">{p.title}</p>
                      <p className="text-muted-foreground text-xs">{p.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 text-gray-600">{steps}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/protocolos/${p.id}/editar`}
                        className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-xs font-medium transition-colors"
                      >
                        <FileEdit className="h-3.5 w-3.5" />
                        Editar
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
