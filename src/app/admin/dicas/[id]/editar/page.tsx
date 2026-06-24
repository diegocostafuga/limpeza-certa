import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { tips } from '@/lib/schema'
import { TipForm } from '../../_components/tip-form'

export default async function EditarDicaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tip = await db.query.tips.findFirst({ where: eq(tips.id, id) })
  if (!tip) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Editar dica</h1>
        <p className="text-muted-foreground mt-1 text-sm">{tip.title}</p>
      </div>
      <TipForm tip={tip} />
    </div>
  )
}
