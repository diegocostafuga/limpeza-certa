'use client'

import { useEffect, useState } from 'react'
import { BookmarkCheck, Trash2, Droplets } from 'lucide-react'
import type { SavedDilution } from '@/lib/schema'

function formatVolume(ml: number): string {
  if (ml < 10) return `${ml.toFixed(1)} mL`
  if (ml >= 1000) return `${(ml / 1000).toFixed(2).replace(/\.?0+$/, '')} L`
  return `${Math.round(ml)} mL`
}

function calcResult(d: SavedDilution) {
  const total = d.bottleSizeMl
  const product = (total * d.ratioProduct) / (d.ratioProduct + d.ratioWater)
  const water = total - product
  return { product, water, total }
}

interface SavedDilutionsProps {
  refreshKey: number
}

export function SavedDilutions({ refreshKey }: SavedDilutionsProps) {
  const [data, setData] = useState<{ key: number; items: SavedDilution[] } | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loading = data === null || data.key !== refreshKey
  const items = data?.key === refreshKey ? data.items : []

  useEffect(() => {
    fetch('/api/dilutions')
      .then((r) => r.json())
      .then((fetched: SavedDilution[]) => setData({ key: refreshKey, items: fetched }))
  }, [refreshKey])

  async function remove(id: string) {
    setDeleting(id)
    await fetch(`/api/dilutions/${id}`, { method: 'DELETE' })
    setData((prev) => (prev ? { ...prev, items: prev.items.filter((d) => d.id !== id) } : prev))
    setDeleting(null)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <BookmarkCheck className="text-primary h-5 w-5" />
        <h2 className="font-heading text-foreground text-lg font-semibold">
          Minhas diluições salvas
        </h2>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border-border h-16 animate-pulse rounded-xl border bg-gray-50"
            />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="border-border rounded-xl border border-dashed px-4 py-8 text-center">
          <Droplets className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
          <p className="text-muted-foreground text-sm">
            Nenhuma diluição salva ainda. <br />
            Calcule e salve sua primeira!
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((d) => {
            const { product, water, total } = calcResult(d)
            return (
              <li
                key={d.id}
                className="border-border bg-surface flex items-center justify-between rounded-xl border px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">{d.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {d.ratioProduct}:{d.ratioWater} · {formatVolume(total)} →{' '}
                    <span className="text-accent font-medium">{formatVolume(product)} produto</span>{' '}
                    + {formatVolume(water)} água
                  </p>
                </div>
                <button
                  onClick={() => remove(d.id)}
                  disabled={deleting === d.id}
                  className="text-muted-foreground hover:text-destructive ml-3 shrink-0 p-1 transition-colors disabled:opacity-40"
                  aria-label={`Excluir ${d.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
