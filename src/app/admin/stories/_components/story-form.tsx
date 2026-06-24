'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, X, Loader2, ImageIcon, Video } from 'lucide-react'
import type { Story } from '@/lib/schema'

interface StoryFormProps {
  story?: Story
}

const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Público — qualquer visitante vê' },
  { value: 'auth_required', label: 'Membros — requer cadastro' },
  { value: 'draft', label: 'Rascunho — só admin vê' },
]

export function StoryForm({ story }: StoryFormProps) {
  const router = useRouter()
  const isEdit = !!story
  const inputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(story?.title ?? '')
  const [mediaUrl, setMediaUrl] = useState(story?.mediaUrl ?? '')
  const [mediaType, setMediaType] = useState<'image' | 'video'>(story?.mediaType ?? 'image')
  const [linkUrl, setLinkUrl] = useState(story?.linkUrl ?? '')
  const [visibility, setVisibility] = useState<string>(story?.visibility ?? 'draft')
  const [expiresAt, setExpiresAt] = useState(
    story?.expiresAt ? new Date(story.expiresAt).toISOString().slice(0, 16) : ''
  )

  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/quicktime',
    ]
    if (!allowed.includes(file.type)) {
      setError('Formato não suportado. Use JPG, PNG, WEBP, GIF ou MP4.')
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 50 MB.')
      return
    }

    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    setUploading(false)

    if (!res.ok) {
      setError('Erro ao fazer upload. Tente novamente.')
      return
    }

    const data = await res.json()
    setMediaUrl(data.url)
    setMediaType(data.mediaType)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!mediaUrl) {
      setError('Faça upload de uma imagem ou vídeo primeiro.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      title,
      mediaUrl,
      mediaType,
      linkUrl,
      visibility,
      expiresAt: expiresAt || null,
    }

    const res = await fetch(isEdit ? `/api/admin/stories/${story.id}` : '/api/admin/stories', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)

    if (!res.ok) {
      setError('Erro ao salvar. Tente novamente.')
      return
    }

    router.push('/admin/stories')
    router.refresh()
  }

  async function handleDelete() {
    if (!story || !confirm('Excluir este story? Esta ação não pode ser desfeita.')) return
    await fetch(`/api/admin/stories/${story.id}`, { method: 'DELETE' })
    router.push('/admin/stories')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-foreground mb-4 font-semibold">Mídia</h2>

        {mediaUrl ? (
          <div className="relative overflow-hidden rounded-xl border border-gray-200">
            {mediaType === 'video' ? (
              <video src={mediaUrl} controls className="max-h-64 w-full object-cover" />
            ) : (
              <img src={mediaUrl} alt="Preview" className="max-h-64 w-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => {
                setMediaUrl('')
                setMediaType('image')
              }}
              className="text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-full bg-white p-1 shadow transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5 border-t border-gray-100 px-3 py-2 text-xs text-gray-500">
              {mediaType === 'video' ? (
                <Video className="h-3.5 w-3.5" />
              ) : (
                <ImageIcon className="h-3.5 w-3.5" />
              )}
              {mediaType === 'video' ? 'Vídeo' : 'Imagem'} carregado
            </div>
          </div>
        ) : (
          <div
            onDrop={(e) => {
              e.preventDefault()
              const f = e.dataTransfer.files[0]
              if (f) handleFile(f)
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="hover:border-primary hover:bg-primary/3 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 text-center transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
                <p className="text-foreground text-sm font-medium">Enviando...</p>
              </>
            ) : (
              <>
                <Upload className="text-muted-foreground h-8 w-8" />
                <div>
                  <p className="text-foreground text-sm font-medium">
                    Clique ou arraste o arquivo aqui
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    JPG, PNG, WEBP, GIF ou MP4 · máx. 50 MB
                  </p>
                </div>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
          </div>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-foreground mb-4 font-semibold">Informações</h2>
        <div className="space-y-4">
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">Título</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dica de limpeza do banheiro"
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              Link ao clicar
              <span className="text-muted-foreground ml-1 font-normal">(opcional)</span>
            </label>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              Expira em
              <span className="text-muted-foreground ml-1 font-normal">(opcional)</span>
            </label>
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
            <p className="text-muted-foreground mt-1 text-xs">Deixe em branco para não expirar.</p>
          </div>

          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">Visibilidade</label>
            <div className="space-y-2">
              {VISIBILITY_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="visibility"
                    value={value}
                    checked={visibility === value}
                    onChange={() => setVisibility(value)}
                    className="text-primary"
                  />
                  <span className="text-foreground text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="flex items-center justify-between">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Excluir story
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/stories')}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60"
          >
            {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar story'}
          </button>
        </div>
      </div>
    </form>
  )
}
