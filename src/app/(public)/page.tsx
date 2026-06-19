import { Container, Section } from '@/components/layout/container'

export default function HomePage() {
  return (
    <Section>
      <Container>
        <h1 className="font-heading text-primary text-4xl font-bold">
          Testados, aprovados e recomendados!
        </h1>
        <p className="text-muted-foreground mt-4">Página inicial em construção — issue #4.</p>
      </Container>
    </Section>
  )
}
