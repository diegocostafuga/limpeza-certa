import Link from 'next/link'
import { PlusCircle, ImageIcon, Video, Pencil } from 'lucide-react'
import { requireAdmin } from '@/lib/require-admin'
import { db } from '@/lib/db'
import { stories } from '@/lib/schema'
import { desc } from 'drizzle-orm'

const VISIBILITY_LABEL: Record<string, { label: string; cls: string }> = {
  public: { label: 'Público', cls: 'bg-green-100 text-green-700' },
  auth_required: { label: 'Membros', cls: 'bg-blue-100 text-blue-700' },
  draft: { label: 'Rascunho', cls: 'bg-gray-100 text-gray-600' },
}

export default async function AdminStoriesPage() {
  await requireAdmin()

  const rows = await db.query.stories.findMany({
    orderBy: [desc(stories.createdAt)],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Stories</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {rows.length} {rows.length === 1 ? 'story' : 'stories'} cadastrados
          </p>
        </div>
        <Link
          href="/admin/stories/novo"
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Novo story
        </Link>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-20 text-center">
          <p className="text-muted-foreground text-sm">Nenhum story ainda.</p>
          <Link
            href="/admin/stories/novo"
            className="text-primary mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            <PlusCircle className="h-4 w-4" />
            Criar o primeiro
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Mídia
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Título
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Tipo
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Visibilidade
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
                  Expira
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((story) => {
                const vis = VISIBILITY_LABEL[story.visibility] ?? VISIBILITY_LABEL.draft
                const expired = story.expiresAt && new Date(story.expiresAt) < new Date()
                return (
                  <tr key={story.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="h-12 w-20 overflow-hidden rounded-lg bg-gray-100">
                        {story.mediaType === 'video' ? (
                          <div className="flex h-full items-center justify-center">
                            <Video className="text-muted-foreground h-5 w-5" />
                          </div>
                        ) : (
                          <img
                            src={story.mediaUrl}
                            alt={story.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-foreground line-clamp-1 font-medium">{story.title}</p>
                      {story.linkUrl && (
                        <p className="text-muted-foreground mt-0.5 truncate text-xs">
                          {story.linkUrl}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        {story.mediaType === 'video' ? (
                          <Video className="h-3.5 w-3.5" />
                        ) : (
                          <ImageIcon className="h-3.5 w-3.5" />
                        )}
                        {story.mediaType === 'video' ? 'Vídeo' : 'Imagem'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${vis.cls}`}
                      >
                        {vis.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {story.expiresAt ? (
                        <span
                          className={`text-xs ${expired ? 'text-red-500' : 'text-muted-foreground'}`}
                        >
                          {expired ? 'Expirado · ' : ''}
                          {new Date(story.expiresAt).toLocaleDateString('pt-BR')}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/stories/${story.id}/editar`}
                        className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-xs font-medium transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
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
