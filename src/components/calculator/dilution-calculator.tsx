'use client'

import { useState, useId } from 'react'
import { Droplets, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

type Unit = 'mL' | 'L'

interface Result {
  product: number
  water: number
  total: number
}

function formatVolume(ml: number): string {
  if (ml < 10) return `${ml.toFixed(1)} mL`
  if (ml >= 1000) return `${(ml / 1000).toFixed(2).replace(/\.?0+$/, '')} L`
  return `${Math.round(ml)} mL`
}

function calculate(
  ratioPart: number,
  ratioWater: number,
  volume: number,
  unit: Unit
): Result | null {
  const totalMl = unit === 'L' ? volume * 1000 : volume
  if (!totalMl || !ratioPart || ratioPart <= 0 || ratioWater < 0 || totalMl <= 0) return null

  const totalParts = ratioPart + ratioWater
  const productMl = (totalMl * ratioPart) / totalParts
  const waterMl = totalMl - productMl

  return { product: productMl, water: waterMl, total: totalMl }
}

const PRESETS = [
  { label: '1:5', ratioPart: 1, ratioWater: 5 },
  { label: '1:10', ratioPart: 1, ratioWater: 10 },
  { label: '1:20', ratioPart: 1, ratioWater: 20 },
  { label: '1:50', ratioPart: 1, ratioWater: 50 },
]

export function DilutionCalculator() {
  const id = useId()
  const [ratioPart, setRatioPart] = useState<string>('1')
  const [ratioWater, setRatioWater] = useState<string>('10')
  const [volume, setVolume] = useState<string>('500')
  const [unit, setUnit] = useState<Unit>('mL')

  const result = calculate(parseFloat(ratioPart), parseFloat(ratioWater), parseFloat(volume), unit)

  function applyPreset(preset: (typeof PRESETS)[0]) {
    setRatioPart(String(preset.ratioPart))
    setRatioWater(String(preset.ratioWater))
  }

  function reset() {
    setRatioPart('1')
    setRatioWater('10')
    setVolume('500')
    setUnit('mL')
  }

  return (
    <div className="border-border bg-surface rounded-2xl border shadow-sm">
      {/* Inputs */}
      <div className="space-y-6 p-6">
        {/* Proporção */}
        <fieldset>
          <legend className="text-foreground mb-3 text-sm font-semibold">
            Proporção indicada no rótulo
          </legend>

          {/* Presets */}
          <div className="mb-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  ratioPart === String(preset.ratioPart) && ratioWater === String(preset.ratioWater)
                    ? 'border-primary bg-primary text-white'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Inputs de proporção */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label htmlFor={`${id}-ratio-part`} className="sr-only">
                Partes de produto
              </label>
              <input
                id={`${id}-ratio-part`}
                type="number"
                inputMode="decimal"
                min="0.1"
                step="0.1"
                value={ratioPart}
                onChange={(e) => setRatioPart(e.target.value)}
                className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-offset-0"
              />
              <p className="text-muted-foreground mt-1 text-center text-xs">produto</p>
            </div>

            <span className="text-muted-foreground shrink-0 pb-5 text-sm font-medium">para</span>

            <div className="flex-1">
              <label htmlFor={`${id}-ratio-water`} className="sr-only">
                Partes de água
              </label>
              <input
                id={`${id}-ratio-water`}
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={ratioWater}
                onChange={(e) => setRatioWater(e.target.value)}
                className="border-border bg-background text-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-center text-lg font-bold outline-none focus:ring-2 focus:ring-offset-0"
              />
              <p className="text-muted-foreground mt-1 text-center text-xs">partes de água</p>
            </div>
          </div>
        </fieldset>

        {/* Tamanho do frasco */}
        <div>
          <label
            htmlFor={`${id}-volume`}
            className="text-foreground mb-3 block text-sm font-semibold"
          >
            Tamanho do frasco
          </label>
          <div className="flex gap-2">
            <input
              id={`${id}-volume`}
              type="number"
              inputMode="decimal"
              min="1"
              step="50"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="border-border bg-background text-foreground focus:border-primary focus:ring-primary flex-1 rounded-lg border px-3 py-2.5 text-lg font-bold outline-none focus:ring-2 focus:ring-offset-0"
            />
            {/* Unit toggle */}
            <div className="border-border flex overflow-hidden rounded-lg border">
              {(['mL', 'L'] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium transition-colors',
                    unit === u
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:bg-secondary'
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className={cn(
          'border-border rounded-b-2xl border-t p-6 transition-all',
          result ? 'bg-primary/5' : 'bg-secondary/30'
        )}
      >
        {result ? (
          <div>
            <p className="text-foreground mb-4 text-sm font-semibold">Resultado</p>
            <div className="space-y-3">
              {/* Product */}
              <div className="flex items-center gap-3">
                <div className="bg-accent/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Droplets className="text-accent h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Produto concentrado</p>
                  <p className="font-heading text-foreground text-xl font-bold">
                    {formatVolume(result.product)}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="w-10 shrink-0" />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <div className="bg-border h-px flex-1" />
                  <span>+ água</span>
                  <div className="bg-border h-px flex-1" />
                </div>
              </div>

              {/* Water */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <Droplets className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Água</p>
                  <p className="font-heading text-foreground text-xl font-bold">
                    {formatVolume(result.water)}
                  </p>
                </div>
              </div>
            </div>

            {/* Total reminder */}
            <p className="text-muted-foreground mt-4 border-t border-dashed pt-4 text-center text-xs">
              Frasco de {formatVolume(result.total)} — proporção {ratioPart}:{ratioWater}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">
            Preencha os campos acima para ver o resultado.
          </p>
        )}
      </div>

      {/* Reset */}
      {result && (
        <div className="px-6 pb-4">
          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-1.5 py-2 text-xs transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Limpar
          </button>
        </div>
      )}
    </div>
  )
}
