# Arquitetura — LimpezaCerta

## Visão geral

Aplicação monolítica Next.js 15 com App Router. Toda a lógica de servidor roda em Server Components e Server Actions. Rotas de API usadas apenas para webhooks externos (Clerk) e redirects de afiliados.

## Decisões de arquitetura

### Next.js App Router (e não Pages Router)
Server Components permitem buscar dados diretamente no servidor sem expor queries ao cliente. Melhor para SEO e performance inicial.

### Neon PostgreSQL + Drizzle ORM (e não Prisma)
Drizzle tem menor overhead em cold starts serverless, é type-safe sem geração de código e tem suporte nativo a Neon. Prisma seria mais pesado para o ambiente serverless do Vercel.

### Clerk (e não NextAuth)
Clerk oferece UI pronta, gestão de usuários, webhooks e suporte a roles sem implementar nada manualmente. Para um projeto solo com foco em produto, o tempo economizado compensa o custo.

### Vercel Blob (e não S3)
Integração nativa com Vercel, sem configuração de CORS, IAM roles ou buckets. Suficiente para o volume esperado.

### Claude API para OCR (e não Google Vision ou AWS Textract)
Claude entende contexto e pode converter texto de papel diretamente em JSON estruturado com os campos corretos do protocolo, sem pós-processamento.

## Estrutura de pastas

```
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── (public)/           # Rotas públicas (home, protocolos, dicas)
│   ├── (auth)/             # Rotas autenticadas (calculadora salva, perfil)
│   ├── admin/              # Painel admin (protegido por role)
│   ├── go/[slug]/          # Redirects de afiliados
│   ├── api/                # Webhooks (Clerk)
│   └── layout.tsx          # Layout raiz
├── components/
│   ├── ui/                 # Componentes shadcn/ui (não editar)
│   └── [feature]/          # Componentes por feature
├── lib/
│   ├── db/                 # Schema Drizzle + cliente
│   ├── auth/               # Helpers de autenticação
│   └── utils.ts            # Utilitários gerais
└── hooks/                  # React hooks customizados
```

## Fluxo de dados

```
Visitante → Server Component → Drizzle → Neon PostgreSQL
                ↓
         Verifica visibilidade do conteúdo
                ↓
         public → renderiza
         auth_required → renderiza teaser + CTA
         draft → 404 (exceto admin)
```

## Rotas principais

| Rota | Tipo | Descrição |
|------|------|-----------|
| `/` | público | Home |
| `/protocolos` | público | Listagem de protocolos |
| `/protocolos/[slug]` | público/auth | Detalhe do protocolo |
| `/dicas` | público | Listagem de dicas |
| `/stories` | público/auth | Stories |
| `/calculadora` | público/auth | Calculadora de diluição |
| `/entrar` | público | Login (Clerk) |
| `/cadastro` | público | Cadastro (Clerk) |
| `/admin` | admin only | Painel administrativo |
| `/go/[slug]` | público | Redirect afiliado rastreado |
