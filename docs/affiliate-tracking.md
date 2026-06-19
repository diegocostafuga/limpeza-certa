# Rastreamento de Afiliados — LimpezaCerta

## Fluxo

Todo link afiliado passa por uma rota interna antes de redirecionar:

```
Usuário clica no produto
        ↓
GET /go/[slug]
        ↓
Server Action registra affiliate_click no banco
        ↓
redirect(302) → URL afiliada externa
```

## Por que não usar o link direto

1. Rastrear quais produtos têm mais cliques
2. Saber de qual página/contexto veio o clique
3. Associar o clique a um usuário logado (quando possível)
4. Poder trocar a URL afiliada sem alterar todos os conteúdos do site

## Dados registrados por clique

```typescript
{
  product_id: string,
  user_id: string | null,       // null para visitantes
  source_path: string,           // ex: "/protocolos/limpeza-banheiro"
  ip_hash: string,               // SHA-256 do IP — nunca o IP bruto (LGPD)
  created_at: Date
}
```

## Dashboard admin

A administradora vê:
- Total de cliques por produto (últimos 7, 30, 90 dias)
- Produto com mais cliques
- Página que mais gera cliques para afiliados
- Usuários vs. visitantes anônimos

## Parceiros atuais

| Parceiro | Prefixo slug sugerido |
|----------|----------------------|
| Amazon | `amz-` |
| Shopee | `spe-` |
| Zellin | `zel-` |

Exemplo: `/go/amz-ype-amaciante`

## Adicionando um novo produto afiliado (admin)

1. Painel admin → Produtos → Novo produto
2. Preencher: nome, descrição, imagem, URL afiliada, parceiro
3. O slug é gerado automaticamente (editável)
4. Ativar o produto → link `/go/[slug]` passa a funcionar
