import Link from 'next/link'
import { Plus, FileEdit } from 'lucide-react'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { tips } from '@/lib/schema'

const VISIBILITY_BADGE: Record<string, { label: string; className: string }> = {
  public: { label: 'Público', className: 'bg-green-100 text-green-700' },
  auth_required: { label: 'Membros', className: 'bg-violet-100 text-violet-700' },
  draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-600' },
}

const TYPE_LABEL: Record<string, string> = {
  quick_tip: 'Dica rápida',
  product_tip: 'Produto',
}

export default async function AdminDicasPage() {
  const items = await db.query.tips.findMany({
    orderBy: [desc(tips.createdAt)],
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Dicas</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {items.length} dica{items.length !== 1 ? 's' : ''} no total
          </p>
        </div>
        <Link
          href="/admin/dicas/nova"
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova dica
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-muted-foreground text-sm">Nenhuma dica criada ainda.</p>
          <Link
            href="/admin/dicas/nova"
            className="text-primary mt-2 inline-block text-sm font-medium hover:underline"
          >
            Criar primeira dica
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Título</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Tipo</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Visibilidade</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((tip) => {
                const badge = VISIBILITY_BADGE[tip.visibility] ?? VISIBILITY_BADGE.draft
                return (
                  <tr key={tip.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="text-foreground font-medium">{tip.title}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {tip.body.slice(0, 60)}
                        {tip.body.length > 60 ? '…' : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{TYPE_LABEL[tip.type] ?? tip.type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/dicas/${tip.id}/editar`}
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
