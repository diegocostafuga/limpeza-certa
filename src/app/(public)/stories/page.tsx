import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, Play } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { and, ne, or, eq, gt, isNull } from 'drizzle-orm'
import { db } from '@/lib/db'
import { stories } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Stories | LimpezaCerta',
  description: 'Dicas rápidas de limpeza em formato stories. Conteúdo exclusivo da Andreia.',
}

export default async function StoriesPage() {
  const { userId } = await auth()

  const now = new Date()
  const rows = await db.query.stories.findMany({
    where: and(
      ne(stories.visibility, 'draft'),
      or(isNull(stories.expiresAt), gt(stories.expiresAt, now))
    ),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  })

  const visible = userId ? rows : rows.filter((s) => s.visibility === 'public')
  const locked = userId ? [] : rows.filter((s) => s.visibility === 'auth_required')
  const all = [...visible, ...locked]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase">Stories</p>
        <h1 className="font-heading text-foreground mt-2 text-3xl font-bold md:text-4xl">
          Dicas rápidas
        </h1>
        <p className="text-muted-foreground mt-2">Conteúdo curto e direto. Testado por Andreia.</p>
      </div>

      {all.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-24 text-center">
          <p className="text-muted-foreground">Nenhum story publicado ainda. Volte em breve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {all.map((story) => {
            const isLocked = story.visibility === 'auth_required' && !userId
            const inner = (
              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gray-200 shadow-sm">
                {story.mediaType === 'video' ? (
                  <>
                    <video
                      src={story.mediaUrl}
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-10 w-10 fill-white text-white drop-shadow" />
                    </div>
                  </>
                ) : (
                  <img
                    src={story.mediaUrl}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}

                {isLocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 backdrop-blur-sm">
                    <Lock className="h-6 w-6 text-white" />
                    <p className="px-2 text-center text-xs font-medium text-white">
                      Exclusivo para membros
                    </p>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="line-clamp-2 text-xs leading-snug font-medium text-white">
                    {story.title}
                  </p>
                </div>
              </div>
            )

            if (isLocked) {
              return (
                <Link key={story.id} href="/cadastro" className="block">
                  {inner}
                </Link>
              )
            }

            if (story.linkUrl) {
              return (
                <a
                  key={story.id}
                  href={story.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              )
            }

            return <div key={story.id}>{inner}</div>
          })}
        </div>
      )}

      {!userId && locked.length > 0 && (
        <div className="bg-primary/5 border-primary/20 mt-12 rounded-2xl border px-6 py-8 text-center">
          <p className="text-foreground font-semibold">
            {locked.length} {locked.length === 1 ? 'story exclusivo' : 'stories exclusivos'} para
            membros
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Crie sua conta grátis para desbloquear todo o conteúdo.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/cadastro"
              className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors"
            >
              Criar conta grátis
            </Link>
            <Link
              href="/entrar"
              className="text-primary border-primary/30 hover:bg-primary/5 rounded-lg border px-5 py-2 text-sm font-semibold transition-colors"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
