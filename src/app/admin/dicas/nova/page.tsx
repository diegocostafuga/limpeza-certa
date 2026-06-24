import { TipForm } from '../_components/tip-form'

export default function NovaDicaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Nova dica</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Crie uma dica rápida ou indicação de produto
        </p>
      </div>
      <TipForm />
    </div>
  )
}
