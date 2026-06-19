# Schema do Banco de Dados — LimpezaCerta

## Entidades principais

### users
Espelho do usuário Clerk. Criado via webhook quando alguém se cadastra.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | text PK | ID do Clerk |
| email | text unique | Email do usuário |
| name | text | Nome completo |
| role | enum | guest / user / admin |
| created_at | timestamp | Data de cadastro |
| updated_at | timestamp | |

### protocols
Protocolos de limpeza passo a passo.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| slug | text unique | URL amigável |
| title | text | Título do protocolo |
| category | text | Ambiente (banheiro, cozinha...) |
| object_type | text | Objeto (pia, vaso...) — opcional |
| steps | jsonb | Array de passos [{order, title, description, tip?}] |
| visibility | enum | public / auth_required / draft |
| cover_image_url | text | URL da imagem de capa |
| how_to_schema | jsonb | Schema.org HowTo pré-gerado para SEO |
| created_by | text FK → users.id | |
| created_at | timestamp | |
| updated_at | timestamp | |

### tips
Dicas rápidas e indicações de produtos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| slug | text unique | |
| type | enum | quick_tip / product_tip |
| title | text | |
| body | text | Conteúdo da dica |
| product_id | uuid FK → products.id | Opcional — se for dica de produto |
| visibility | enum | public / auth_required / draft |
| created_at | timestamp | |

### stories
Conteúdo curto estilo stories.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| title | text | |
| media_url | text | URL da mídia (imagem ou vídeo curto) |
| media_type | enum | image / video |
| link_url | text | Link opcional ao clicar |
| visibility | enum | public / auth_required / draft |
| expires_at | timestamp | Opcional — expiração automática |
| created_at | timestamp | |

### products
Produtos afiliados indicados pela administradora.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| slug | text unique | Usado na rota /go/[slug] |
| name | text | Nome do produto |
| description | text | Descrição curta |
| image_url | text | |
| affiliate_url | text | URL final do afiliado |
| partner | text | Ex: Amazon, Shopee, Zellin |
| is_active | boolean | |
| created_at | timestamp | |

### affiliate_clicks
Rastreamento de cliques em links afiliados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| product_id | uuid FK → products.id | |
| user_id | text FK → users.id | Nullable (visitante sem login) |
| source_path | text | Página onde o clique aconteceu |
| ip_hash | text | Hash do IP (LGPD — não armazenar IP bruto) |
| created_at | timestamp | |

### saved_dilutions
Diluições favoritas salvas por usuários logados.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| user_id | text FK → users.id | |
| name | text | Ex: "Piso Laminado" |
| ratio_product | integer | Ex: 1 |
| ratio_water | integer | Ex: 20 |
| bottle_size_ml | integer | Ex: 500 |
| created_at | timestamp | |

### user_consent
Registro de consentimento LGPD.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| user_id | text FK → users.id | Nullable (visitante) |
| session_id | text | ID de sessão anônima |
| analytics | boolean | Consentiu com analytics |
| marketing | boolean | Consentiu com marketing |
| ip_hash | text | |
| created_at | timestamp | |

### data_deletion_requests
Solicitações de exclusão de dados (LGPD Art. 18).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid PK | |
| user_id | text FK → users.id | |
| status | enum | pending / processing / completed |
| requested_at | timestamp | |
| completed_at | timestamp | Nullable |

## Índices a criar

```sql
-- Busca por slug (rota de detalhe)
CREATE INDEX ON protocols (slug);
CREATE INDEX ON tips (slug);
CREATE INDEX ON products (slug);

-- Filtros mais comuns
CREATE INDEX ON protocols (visibility, category);
CREATE INDEX ON tips (visibility, type);

-- Analytics
CREATE INDEX ON affiliate_clicks (product_id, created_at);
CREATE INDEX ON affiliate_clicks (user_id);
```
