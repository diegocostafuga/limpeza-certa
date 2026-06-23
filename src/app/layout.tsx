import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#7C3AED',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'LimpezaCerta — Testados, aprovados e recomendados!',
    template: '%s | LimpezaCerta',
  },
  description:
    'Protocolos de limpeza passo a passo para cada ambiente da sua casa. Dicas testadas e aprovadas por quem entende.',
  keywords: ['limpeza', 'protocolos de limpeza', 'dicas de limpeza', 'organização', 'casa limpa'],
  authors: [{ name: 'Andreia Coelho Fuga' }],
  creator: 'Andreia Coelho Fuga',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LimpezaCerta',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'LimpezaCerta',
    title: 'LimpezaCerta — Testados, aprovados e recomendados!',
    description: 'Protocolos de limpeza passo a passo para cada ambiente da sua casa.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
        <body className="bg-background text-foreground flex min-h-full flex-col">{children}</body>
      </html>
    </ClerkProvider>
  )
}
