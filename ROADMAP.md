# LimpezaCerta — Roadmap

## Visão geral

SaaS de protocolos de limpeza doméstica para Andreia Coelho Fuga.
Iniciado em: 2026-06-19

---

## Milestone 1 — Base & Calculadora ✅
> Meta: site funcional com layout, identidade visual, calculadora e PWA

- [x] Scaffold Next.js 15 + Tailwind + TypeScript
- [x] Configurar ESLint, Prettier, Husky, commitlint
- [x] Criar CLAUDE.md, ROADMAP.md, docs/
- [x] Repositório GitHub com branches main/develop
- [x] GitHub Actions (lint + type-check + build)
- [x] Design tokens (cores, fontes, espaçamentos)
- [x] shadcn/ui instalado e configurado
- [x] PWA manifest + service worker
- [x] Layout base (navbar, footer, grid)
- [x] Página inicial (hero, seções)
- [x] Calculadora de diluição (versão pública)
- [x] Página de calculadora com resultado visual
- [x] Deploy inicial na Vercel (limpeza-certa.vercel.app)

---

## Milestone 2 — Auth & Conteúdo Protegido
> Meta: usuários podem se cadastrar e acessar conteúdo exclusivo

- [ ] Configurar Clerk (cadastro, login, perfil)
- [ ] Middleware de autenticação Next.js
- [ ] Schema do banco (Neon + Drizzle ORM)
- [ ] Migração inicial do banco
- [ ] Protocolos: listagem pública
- [ ] Protocolos: detalhe com Schema HowTo (SEO)
- [ ] Sistema de visibilidade por conteúdo (public/auth_required/draft)
- [ ] CTA de cadastro para conteúdo bloqueado
- [ ] Calculadora: diluições salvas (usuários logados)
- [ ] LGPD: banner de cookies + política de privacidade + termos

---

## Milestone 3 — Admin & OCR
> Meta: administradora consegue criar e publicar conteúdo facilmente

- [ ] Painel admin (/admin protegido por role)
- [ ] Upload de protocolo via foto (OCR com Claude API)
- [ ] Editor de protocolo (revisão pós-OCR)
- [ ] Toggle de visibilidade por conteúdo
- [ ] Gestão de dicas
- [ ] Upload de Stories
- [ ] Dashboard: views e conversões por conteúdo
- [ ] Gestão de produtos afiliados

---

## Milestone 4 — Vídeos & Afiliados
> Meta: conteúdo em vídeo e sistema de afiliados operacional

- [ ] Seção de vídeos (embed YouTube)
- [ ] Seção de Shorts
- [ ] Sistema de links afiliados rastreados (/go/[slug])
- [ ] Dashboard de cliques por produto afiliado
- [ ] Dicas de produtos com indicação visual de parceria

---

## Milestone 5 — Analytics & Personalização
> Meta: dados orientando decisões de conteúdo

- [ ] Posthog integrado (eventos customizados)
- [ ] GA4 integrado
- [ ] Dashboard admin: conteúdos mais acessados
- [ ] Funil de conversão: visitante → cadastro
- [ ] Newsletter via Resend
- [ ] Personalização de home baseada em histórico do usuário

---

## Backlog (futuro)

- Plano premium (conteúdo pago)
- App nativo (React Native / Expo)
- Sistema de comentários nos protocolos
- Busca full-text de protocolos
- Notificações push (novo conteúdo)
- Integração com Instagram API
