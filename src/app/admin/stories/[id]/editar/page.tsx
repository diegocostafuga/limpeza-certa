import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '@/lib/require-admin'
import { db } from '@/lib/db'
import { stories } from '@/lib/schema'
import { StoryForm } from '../../_components/story-form'

export default async function EditarStoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  const story = await db.query.stories.findFirst({ where: eq(stories.id, id) })
  if (!story) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Editar story</h1>
        <p className="text-muted-foreground mt-1 truncate text-sm">{story.title}</p>
      </div>
      <StoryForm story={story} />
    </div>
  )
}
