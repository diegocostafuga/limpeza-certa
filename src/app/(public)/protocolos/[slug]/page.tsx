import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { CheckCircle2, Clock, ListChecks } from 'lucide-react'
import { db } from '@/lib/db'
import { protocols } from '@/lib/schema'
import { type ProtocolStep } from '@/lib/types'
import { AuthTeaser } from '@/components/protocols/auth-teaser'
import { Container, Section } from '@/components/layout/container'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const protocol = await db.query.protocols.findFirst({
    where: eq(protocols.slug, slug),
  })

  if (!protocol || protocol.visibility === 'draft') return {}

  return {
    title: protocol.title,
    description: `Protocolo de limpeza: ${protocol.title}. Guia passo a passo testado e aprovado.`,
  }
}

export default async function ProtocolPage({ params }: Props) {
  const { slug } = await params
  const { userId } = await auth()

  const protocol = await db.query.protocols.findFirst({
    where: eq(protocols.slug, slug),
  })

  if (!protocol || protocol.visibility === 'draft') notFound()

  const steps = (protocol.steps ?? []) as ProtocolStep[]
  const isLocked = protocol.visibility === 'auth_required' && !userId

  // Schema.org HowTo JSON-LD
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: protocol.title,
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.order,
      name: s.title,
      text: s.description,
    })),
  }

  return (
    <>
      {!isLocked && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <Section>
        <Container className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <span className="text-primary mb-2 inline-block text-xs font-semibold tracking-widest uppercase">
              {protocol.category}
              {protocol.objectType && ` · ${protocol.objectType}`}
            </span>
            <h1 className="font-heading text-foreground text-3xl leading-tight font-bold md:text-4xl">
              {protocol.title}
            </h1>

            <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <ListChecks className="h-4 w-4" />
                {steps.length} {steps.length === 1 ? 'passo' : 'passos'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />~{Math.max(5, steps.length * 3)} min
              </span>
            </div>
          </div>

          {isLocked ? (
            <AuthTeaser title={protocol.title} stepCount={steps.length} />
          ) : steps.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Os passos deste protocolo ainda estão sendo preparados.
            </p>
          ) : (
            <ol className="space-y-6">
              {steps.map((step) => (
                <li key={step.order} className="border-border bg-surface rounded-2xl border p-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      {step.order}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h2 className="font-heading text-foreground mb-2 text-base font-semibold">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                      {step.tip && (
                        <div className="bg-accent/10 mt-3 flex gap-2 rounded-lg px-3 py-2">
                          <CheckCircle2 className="text-accent mt-0.5 h-4 w-4 shrink-0" />
                          <p className="text-accent text-xs leading-relaxed">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </Section>
    </>
  )
}
