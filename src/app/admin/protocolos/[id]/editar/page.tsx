import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { protocols } from '@/lib/schema'
import { ProtocolForm } from '../../_components/protocol-form'

export default async function EditarProtocoloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const protocol = await db.query.protocols.findFirst({ where: eq(protocols.id, id) })
  if (!protocol) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Editar protocolo</h1>
        <p className="text-muted-foreground mt-1 text-sm">{protocol.title}</p>
      </div>
      <ProtocolForm protocol={protocol} />
    </div>
  )
}
