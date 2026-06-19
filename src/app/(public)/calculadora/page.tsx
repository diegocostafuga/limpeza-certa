import type { Metadata } from 'next'
import { FlaskConical } from 'lucide-react'
import { DilutionCalculator } from '@/components/calculator/dilution-calculator'
import { SavedDilutionsPreview } from '@/components/calculator/saved-dilutions-preview'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Calculadora de Diluição',
  description:
    'Calcule a proporção certa de produto e água para qualquer frasco. Simples, rápido e sem erro.',
}

export default function CalculadoraPage() {
  return (
    <Section>
      <Container className="max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <FlaskConical className="text-primary h-7 w-7" />
          </div>
          <h1 className="font-heading text-foreground text-3xl font-bold">
            Calculadora de Diluição
          </h1>
          <p className="text-muted-foreground mx-auto mt-2 max-w-sm">
            Informe a proporção do rótulo e o tamanho do frasco. A gente calcula o resto.
          </p>
        </div>

        {/* Calculator */}
        <DilutionCalculator />

        {/* Saved dilutions — locked for guests */}
        <div className="mt-10">
          <SavedDilutionsPreview />
        </div>
      </Container>
    </Section>
  )
}
