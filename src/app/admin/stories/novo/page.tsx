import { requireAdmin } from '@/lib/require-admin'
import { StoryForm } from '../_components/story-form'

export default async function NovoStoryPage() {
  await requireAdmin()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Novo story</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Faça upload de uma imagem ou vídeo para criar um story.
        </p>
      </div>
      <StoryForm />
    </div>
  )
}
