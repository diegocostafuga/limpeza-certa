# LimpezaCerta — Contexto do Projeto para Claude Code

## Regras obrigatórias ao iniciar qualquer sessão

1. **Verificar o branch atual**: executar `git branch --show-current` e confirmar que está em `develop`.
2. Se estiver em `main`: mudar imediatamente com `git checkout develop` antes de qualquer alteração.
3. Nunca commitar diretamente em `main`. Todo trabalho vai em `develop`.

---

## O que é este projeto

SaaS de protocolos de limpeza doméstica criado para Andreia Coelho Fuga, criadora de conteúdo no Instagram (@andreiacoelhofuga). O site oferece guias passo a passo de limpeza, dicas de produtos com links afiliados rastreados, calculadora de diluição de produtos, e um sistema de acesso por conteúdo controlado pela administradora.

Tagline: *"Testados, aprovados e recomendados!"*

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Deploy | Vercel (main → produção, develop → preview) |
| Banco de dados | Neon PostgreSQL + Drizzle ORM |
| Auth | Clerk |
| Storage | Vercel Blob |
| OCR/IA | Claude API (vision) — converte foto de papel em protocolo estruturado |
| Analytics | GA4 + Posthog |
| UI | Tailwind CSS v4 + shadcn/ui |
| Fontes | Plus Jakarta Sans (títulos) + Inter (corpo) |

## Branches

- `main` → produção. Branch protegida — nunca fazer push direto.
- `develop` → desenvolvimento. Todo trabalho vai aqui.
- Merges de `develop → main` apenas quando a feature estiver testada.

## Commits

Usar **Conventional Commits** obrigatoriamente:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` apenas formatação/css
- `refactor:` refatoração sem mudança de comportamento
- `chore:` configuração, dependências
- `ci:` GitHub Actions

## Roles de usuário

| Role | Acesso |
|------|--------|
| `guest` | Página inicial, conteúdos marcados como públicos |
| `user` | Tudo acima + conteúdos marcados como "requer cadastro" + calculadora completa |
| `admin` | Tudo + painel de administração |

## Controle de acesso por conteúdo

Cada item de conteúdo tem um campo `visibility`:
- `public` — qualquer visitante vê
- `auth_required` — exibe teaser + CTA de cadastro para visitantes
- `draft` — só a admin vê

## Paleta de cores

```
primary:       #7C3AED  (roxo — cor principal da marca)
primary-dark:  #5B21B6  (roxo escuro — hover)
primary-light: #EDE9FE  (roxo claro — backgrounds)
accent:        #DB2777  (rosa/magenta — CTAs secundários)
accent-light:  #FCE7F3  (rosa claro — tags)
background:    #F8F7FF  (fundo geral)
surface:       #FFFFFF  (cards, modais)
text-primary:  #1E1B4B  (texto principal)
text-muted:    #6B7280  (texto secundário)
```

## Estrutura de conteúdo

```
Protocolos    → guias passo a passo por ambiente (banheiro, cozinha...) e objeto
Dicas         → cards curtos com dica rápida ou indicação de produto
Stories       → conteúdo curto estilo stories
Calculadora   → diluição de produtos (livre) + diluições salvas (cadastrado)
```

## LGPD

- Banner de consentimento de cookies obrigatório
- Política de privacidade e termos de uso na v1
- Tabelas `user_consent` e `data_deletion_requests` no banco
- Finalidade declarada: personalização, marketing e melhoria do serviço

## Rastreamento de afiliados

Links de parceiros nunca vão direto ao destino. Fluxo:
`/go/[slug]` → registra `affiliate_click` no banco → redirect 302 para URL externa

## Variáveis de ambiente necessárias

Ver `.env.example` na raiz do projeto.

## Documentação adicional

- `docs/architecture.md` — decisões de arquitetura
- `docs/database-schema.md` — schema completo do banco
- `docs/access-control.md` — regras de permissão detalhadas
- `docs/design-tokens.md` — sistema de design completo
- `docs/affiliate-tracking.md` — implementação de rastreamento
- `ROADMAP.md` — fases do projeto e status atual
