'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Tip } from '@/lib/schema'

interface TipFormProps {
  tip?: Tip
}

const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Público — qualquer visitante vê' },
  { value: 'auth_required', label: 'Membros — requer cadastro' },
  { value: 'draft', label: 'Rascunho — só admin vê' },
]

const TYPE_OPTIONS = [
  { value: 'quick_tip', label: 'Dica rápida — conselho ou truque de limpeza' },
  { value: 'product_tip', label: 'Produto — indicação de produto com link afiliado' },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function TipForm({ tip }: TipFormProps) {
  const router = useRouter()
  const isEdit = !!tip

  const [title, setTitle] = useState(tip?.title ?? '')
  const [slug, setSlug] = useState(tip?.slug ?? '')
  const [slugManual, setSlugManual] = useState(isEdit)
  const [type, setType] = useState<string>(tip?.type ?? 'quick_tip')
  const [body, setBody] = useState(tip?.body ?? '')
  const [visibility, setVisibility] = useState<string>(tip?.visibility ?? 'draft')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!slugManual) setSlug(slugify(v))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!body.trim()) {
      setError('O corpo da dica não pode estar vazio.')
      return
    }

    setSaving(true)
    const payload = { title, slug, type, body, visibility }

    const res = await fetch(isEdit ? `/api/admin/tips/${tip.id}` : '/api/admin/tips', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const messages: Record<string, string> = {
        slug_taken: 'Esse slug já está em uso. Escolha outro.',
        invalid_payload: 'Dados inválidos. Verifique os campos.',
      }
      setError(messages[data.error] ?? 'Erro ao salvar. Tente novamente.')
      return
    }

    router.push('/admin/dicas')
    router.refresh()
  }

  async function handleDelete() {
    if (!tip || !confirm('Excluir esta dica? Esta ação não pode ser desfeita.')) return
    await fetch(`/api/admin/tips/${tip.id}`, { method: 'DELETE' })
    router.push('/admin/dicas')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-foreground mb-4 font-semibold">Informações da dica</h2>
        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">Tipo</label>
            <div className="space-y-2">
              {TYPE_OPTIONS.map(({ value, label }) => (
                <label key={value} className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="type"
                    value={value}
                    checked={type === value}
                    onChange={() => setType(value)}
                    className="text-primary"
                  />
                  <span className="text-foreground text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">Título</label>
            <input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Como limpar rejunte sem esforço"
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              Slug
              <span className="text-muted-foreground ml-2 text-xs font-normal">
                /dicas/{slug || '...'}
              </span>
            </label>
            <input
              required
              value={slug}
              onChange={(e) => {
                setSlugManual(true)
                setSlug(slugify(e.target.value))
              }}
              placeholder="limpar-rejunte"
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          {/* Corpo */}
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">Conteúdo</label>
            <textarea
              required
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                type === 'product_tip'
                  ? 'Descreva o produto e por que você recomenda...'
                  : 'Escreva a dica de limpeza...'
              }
              className="text-foreground focus:border-primary focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
            <p className="text-muted-foreground mt-1 text-xs">{body.length} caracteres</p>
          </div>

          {/* Visibilidade */}
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
            Excluir dica
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/dicas')}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60"
          >
            {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar dica'}
          </button>
        </div>
      </div>
    </form>
  )
}
