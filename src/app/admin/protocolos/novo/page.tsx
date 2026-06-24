import { NovoProtocoloClient } from '../_components/novo-protocolo-client'

export default function NovoProtocoloPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-foreground text-2xl font-bold">Novo protocolo</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Importe via foto ou preencha manualmente
        </p>
      </div>
      <NovoProtocoloClient />
    </div>
  )
}
