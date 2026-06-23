import { ProtocolForm } from '../_components/protocol-form'

export default function NovoProtocoloPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Novo protocolo</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Preencha as informações e adicione as etapas
        </p>
      </div>
      <ProtocolForm />
    </div>
  )
}
