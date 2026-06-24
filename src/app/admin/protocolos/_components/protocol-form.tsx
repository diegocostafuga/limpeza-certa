'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import type { Protocol } from '@/lib/schema'

interface Step {
  order: number
  title: string
  description: string
  tip?: string
}

interface ProtocolFormProps {
  protocol?: Protocol
}

const CATEGORIES = ['Banheiro', 'Cozinha', 'Sala', 'Quarto', 'Área de serviço', 'Geral']
const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Público — qualquer visitante vê' },
  { value: 'auth_required', label: 'Membros — requer cadastro' },
  { value: 'draft', label: 'Rascunho — só admin vê' },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function ProtocolForm({ protocol }: ProtocolFormProps) {
  const router = useRouter()
  const isEdit = !!protocol

  const [title, setTitle] = useState(protocol?.title ?? '')
  const [slug, setSlug] = useState(protocol?.slug ?? '')
  const [slugManual, setSlugManual] = useState(isEdit)
  const [category, setCategory] = useState(protocol?.category ?? CATEGORIES[0])
  const [objectType, setObjectType] = useState(protocol?.objectType ?? '')
  const [visibility, setVisibility] = useState<string>(protocol?.visibility ?? 'draft')
  const [steps, setSteps] = useState<Step[]>(
    Array.isArray(protocol?.steps) && (protocol.steps as Step[]).length > 0
      ? (protocol.steps as Step[])
      : [{ order: 1, title: '', description: '', tip: '' }]
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(v: string) {
    setTitle(v)
    if (!slugManual) setSlug(slugify(v))
  }

  function addStep() {
    setSteps((prev) => [...prev, { order: prev.length + 1, title: '', description: '', tip: '' }])
  }

  function removeStep(idx: number) {
    setSteps((prev) => prev.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i + 1 })))
  }

  function updateStep(idx: number, field: keyof Step, value: string) {
    setSteps((prev) => prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const cleanSteps = steps
      .map((s) => ({ ...s, tip: s.tip?.trim() || undefined }))
      .filter((s) => s.title.trim() && s.description.trim())

    if (cleanSteps.length === 0) {
      setError('Adicione pelo menos uma etapa com título e descrição.')
      return
    }

    setSaving(true)
    const payload = {
      title,
      slug,
      category,
      objectType: objectType || null,
      visibility,
      steps: cleanSteps,
    }

    const res = await fetch(
      isEdit ? `/api/admin/protocols/${protocol.id}` : '/api/admin/protocols',
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Erro ao salvar. Tente novamente.')
      return
    }

    router.push('/admin/protocolos')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informações básicas */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-foreground mb-4 font-semibold">Informações básicas</h2>
        <div className="space-y-4">
          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">Título</label>
            <input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Ex: Limpeza completa do banheiro"
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">
              Slug (URL)
              <span className="text-muted-foreground ml-2 text-xs font-normal">
                /protocolos/{slug || '...'}
              </span>
            </label>
            <input
              required
              value={slug}
              onChange={(e) => {
                setSlugManual(true)
                setSlug(slugify(e.target.value))
              }}
              placeholder="limpeza-banheiro"
              className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-offset-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-foreground mb-1 block text-sm font-medium">
                Objeto/ambiente
                <span className="text-muted-foreground ml-1 font-normal">(opcional)</span>
              </label>
              <input
                value={objectType}
                onChange={(e) => setObjectType(e.target.value)}
                placeholder="Ex: vaso sanitário"
                className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
              />
            </div>
          </div>

          <div>
            <label className="text-foreground mb-1 block text-sm font-medium">Visibilidade</label>
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

      {/* Etapas */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground font-semibold">Etapas</h2>
          <button
            type="button"
            onClick={addStep}
            className="group text-primary hover:bg-primary/8 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:scale-[1.03] active:scale-100"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
            Adicionar etapa
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative rounded-lg border border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Etapa {idx + 1}
                </span>
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <input
                  required
                  value={step.title}
                  onChange={(e) => updateStep(idx, 'title', e.target.value)}
                  placeholder="Título da etapa"
                  className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-offset-0"
                />
                <textarea
                  required
                  rows={2}
                  value={step.description}
                  onChange={(e) => updateStep(idx, 'description', e.target.value)}
                  placeholder="Descrição do que fazer nesta etapa"
                  className="text-foreground focus:border-primary focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
                />
                <input
                  value={step.tip ?? ''}
                  onChange={(e) => updateStep(idx, 'tip', e.target.value)}
                  placeholder="Dica extra (opcional)"
                  className="text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin/protocolos')}
          className="text-foreground rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-primary/90 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60"
        >
          {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar protocolo'}
        </button>
      </div>
    </form>
  )
}
