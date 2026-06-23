import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { eq, ne } from 'drizzle-orm'
import Link from 'next/link'
import { BookOpen, Search } from 'lucide-react'
import { db } from '@/lib/db'
import { protocols } from '@/lib/schema'
import { ProtocolCard } from '@/components/protocols/protocol-card'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Protocolos de Limpeza',
  description:
    'Guias passo a passo para cada ambiente da sua casa. Testados e aprovados por Andreia Coelho Fuga.',
}

export default async function ProtocolosPage() {
  const { userId } = await auth()

  const items = await db.query.protocols.findMany({
    where: ne(protocols.visibility, 'draft'),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  })

  const authRequired = items.filter((p) => p.visibility === 'auth_required')
  const visible = userId ? items : items.filter((p) => p.visibility === 'public')

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
            <BookOpen className="text-primary h-7 w-7" />
          </div>
          <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Protocolos de Limpeza
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl">
            Guias passo a passo para cada ambiente. Testados e aprovados.
          </p>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <Search className="text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-foreground font-semibold">Nenhum protocolo publicado ainda</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Volte em breve — novos conteúdos chegando!
            </p>
          </div>
        )}

        {/* Public protocols */}
        {visible.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <ProtocolCard key={p.id} protocol={p} locked={false} />
            ))}

            {/* Show locked cards for guests */}
            {!userId &&
              authRequired.map((p) => <ProtocolCard key={p.id} protocol={p} locked={true} />)}
          </div>
        )}

        {/* Upsell for guests */}
        {!userId && authRequired.length > 0 && (
          <p className="text-muted-foreground mt-6 text-center text-sm">
            +{authRequired.length} protocolo{authRequired.length > 1 ? 's' : ''} exclusivo
            {authRequired.length > 1 ? 's' : ''} para membros.{' '}
            <Link href="/cadastro" className="text-primary font-medium hover:underline">
              Cadastre-se grátis
            </Link>
          </p>
        )}
      </Container>
    </Section>
  )
}
