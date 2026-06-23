'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Cookie } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CONSENT_KEY = 'lc_consent'

function getSessionId(): string {
  let id = sessionStorage.getItem('lc_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('lc_session_id', id)
  }
  return id
}

async function saveConsent(analytics: boolean, marketing: boolean) {
  try {
    await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analytics, marketing, sessionId: getSessionId() }),
    })
  } catch {
    // falha silenciosa — consentimento já salvo em localStorage
  }
}

// Este componente só é renderizado no cliente (importado com ssr: false)
// por isso é seguro ler localStorage no inicializador do useState.
export function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(CONSENT_KEY))

  function accept() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: true }))
    setVisible(false)
    saveConsent(true, true)
  }

  function rejectOptional() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false }))
    setVisible(false)
    saveConsent(false, false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="border-border bg-surface fixed right-4 bottom-4 left-4 z-50 rounded-2xl border p-5 shadow-lg sm:left-auto sm:max-w-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <Cookie className="text-primary h-5 w-5 shrink-0" />
        <p className="text-foreground text-sm font-semibold">Usamos cookies</p>
      </div>
      <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
        Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar o tráfego
        do site. Veja nossa{' '}
        <Link href="/privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button onClick={accept} className={cn(buttonVariants({ size: 'sm' }), 'flex-1')}>
          Aceitar todos
        </button>
        <button
          onClick={rejectOptional}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'flex-1')}
        >
          Apenas essenciais
        </button>
      </div>
    </div>
  )
}
