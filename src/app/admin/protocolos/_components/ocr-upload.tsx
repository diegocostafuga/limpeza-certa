'use client'

import { useRef, useState } from 'react'
import { Camera, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react'

interface OcrResult {
  title: string
  category: string
  objectType: string | null
  steps: { order: number; title: string; description: string; tip?: string | null }[]
}

interface OcrUploadProps {
  onExtracted: (data: OcrResult) => void
}

export function OcrUpload({ onExtracted }: OcrUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Envie uma imagem (JPG, PNG ou WEBP).')
      setStatus('error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Imagem muito grande. Máximo 5 MB.')
      setStatus('error')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    processImage(file)
  }

  async function processImage(file: File) {
    setStatus('loading')
    setErrorMsg('')

    const form = new FormData()
    form.append('image', file)

    const res = await fetch('/api/admin/protocols/ocr', { method: 'POST', body: form })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const messages: Record<string, string> = {
        file_too_large: 'Imagem muito grande. Máximo 5 MB.',
        invalid_type: 'Formato não suportado. Use JPG, PNG ou WEBP.',
        parse_error: 'Não consegui interpretar a imagem. Tente uma foto mais nítida.',
        forbidden: 'Sem permissão.',
      }
      setErrorMsg(messages[data.error] ?? 'Erro ao processar a imagem. Tente novamente.')
      setStatus('error')
      return
    }

    const data: OcrResult = await res.json()
    setStatus('success')
    onExtracted(data)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function reset() {
    setPreview(null)
    setStatus('idle')
    setErrorMsg('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Camera className="text-primary h-5 w-5" />
        <h2 className="text-foreground font-semibold">Importar via foto</h2>
        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
          IA
        </span>
      </div>
      <p className="text-muted-foreground mb-4 text-sm">
        Tire uma foto do protocolo escrito à mão ou impresso. O Claude extrai as etapas
        automaticamente.
      </p>

      {status === 'idle' || status === 'error' ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="hover:border-primary hover:bg-primary/3 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 text-center transition-colors"
        >
          <Camera className="text-muted-foreground h-8 w-8" />
          <div>
            <p className="text-foreground text-sm font-medium">Clique ou arraste a imagem aqui</p>
            <p className="text-muted-foreground mt-1 text-xs">JPG, PNG ou WEBP · máx. 5 MB</p>
          </div>
          {status === 'error' && (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errorMsg}
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          {preview && <img src={preview} alt="Preview" className="max-h-48 w-full object-cover" />}

          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm">
              <Loader2 className="text-primary h-7 w-7 animate-spin" />
              <p className="text-foreground text-sm font-medium">Analisando a imagem...</p>
              <p className="text-muted-foreground text-xs">Isso pode levar alguns segundos</p>
            </div>
          )}

          {status === 'success' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
              <p className="text-foreground text-sm font-medium">Protocolo extraído!</p>
              <p className="text-muted-foreground text-xs">Revise os campos abaixo e salve</p>
            </div>
          )}

          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-full bg-white p-1 shadow transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
