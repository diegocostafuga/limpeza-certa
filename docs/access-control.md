# Controle de Acesso — LimpezaCerta

## Roles

| Role | Como é atribuído | Descrição |
|------|-----------------|-----------|
| `guest` | Padrão para visitantes | Sem conta |
| `user` | Ao se cadastrar via Clerk | Usuário com conta ativa |
| `admin` | Atribuído manualmente no Clerk | Administradora do site |

## Matriz de permissões por área

| Área | guest | user | admin |
|------|-------|------|-------|
| Home | ✅ | ✅ | ✅ |
| Protocolos (público) | ✅ | ✅ | ✅ |
| Protocolos (auth_required) | Teaser + CTA | ✅ | ✅ |
| Protocolos (draft) | ❌ | ❌ | ✅ |
| Dicas (público) | ✅ | ✅ | ✅ |
| Dicas (auth_required) | Teaser + CTA | ✅ | ✅ |
| Stories (público) | ✅ | ✅ | ✅ |
| Stories (auth_required) | Teaser + CTA | ✅ | ✅ |
| Calculadora básica | ✅ | ✅ | ✅ |
| Diluições salvas | ❌ | ✅ | ✅ |
| Links afiliados (/go/*) | ✅ | ✅ | ✅ |
| Painel admin (/admin) | ❌ | ❌ | ✅ |

## Visibilidade de conteúdo

Cada item de conteúdo (protocol, tip, story) tem um campo `visibility`:

### `public`
- Renderiza normalmente para todos os visitantes
- Indexado por motores de busca
- Aparece em listagens sem restrição

### `auth_required`
- Para visitantes: renderiza título, imagem de capa, e os **2 primeiros passos** (no caso de protocolos)
- Exibe um card de CTA: "Cadastre-se grátis para ver o protocolo completo"
- Para usuários logados: renderiza normalmente
- Indexado por motores de busca (apenas o teaser)

### `draft`
- Invisível para guests e users
- Admin vê normalmente e pode editar
- Não indexado

## Implementação

### Middleware Next.js
```
/admin/* → requer role admin
/perfil/* → requer role user ou admin
```

### Server Components
Cada página de conteúdo verifica `visibility` antes de renderizar:
```typescript
if (content.visibility === 'draft' && role !== 'admin') return notFound()
if (content.visibility === 'auth_required' && !userId) return <AuthTeaser />
```

### Webhook Clerk
Ao criar usuário → inserir em `users` com role `user`
Ao deletar usuário → iniciar `data_deletion_request`
