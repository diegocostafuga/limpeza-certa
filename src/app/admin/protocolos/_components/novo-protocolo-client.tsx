'use client'

import { useState } from 'react'
import { OcrUpload } from './ocr-upload'
import { ProtocolForm } from './protocol-form'

interface OcrResult {
  title: string
  category: string
  objectType: string | null
  steps: { order: number; title: string; description: string; tip?: string | null }[]
}

export function NovoProtocoloClient() {
  const [ocrData, setOcrData] = useState<OcrResult | null>(null)
  const [formKey, setFormKey] = useState(0)

  function handleExtracted(data: OcrResult) {
    setOcrData(data)
    setFormKey((k) => k + 1)
  }

  return (
    <div className="space-y-6">
      <OcrUpload onExtracted={handleExtracted} />
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-3 text-xs text-gray-500">
            {ocrData ? 'Revise e edite os dados extraídos' : 'ou preencha manualmente'}
          </span>
        </div>
      </div>
      <ProtocolForm key={formKey} initialData={ocrData ?? undefined} />
    </div>
  )
}
