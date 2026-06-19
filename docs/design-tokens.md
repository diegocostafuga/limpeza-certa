# Design Tokens — LimpezaCerta

## Identidade visual

Marca inspirada no Linktree de @andreiacoelhofuga.
Tom: acolhedor + lifestyle + dona de casa que bota a mão na massa.

## Paleta de cores

### Cores principais
```
--color-primary:       #7C3AED   Violet 600 — botões principais, navbar
--color-primary-dark:  #5B21B6   Violet 700 — hover estados
--color-primary-light: #EDE9FE   Violet 100 — backgrounds de seções
--color-accent:        #DB2777   Pink 600   — CTAs secundários, badges
--color-accent-light:  #FCE7F3   Pink 100   — tags, chips
```

### Cores neutras
```
--color-background:    #F8F7FF   Fundo geral (branco com leve toque roxo)
--color-surface:       #FFFFFF   Cards, modais, formulários
--color-border:        #E5E7EB   Bordas suaves
--color-text-primary:  #1E1B4B   Texto principal (roxo muito escuro)
--color-text-secondary:#4B5563   Texto secundário
--color-text-muted:    #6B7280   Legendas, metadados
```

### Cores de estado
```
--color-success:       #059669   Verde — ações completadas
--color-warning:       #D97706   Âmbar — alertas leves
--color-error:         #DC2626   Vermelho — erros
--color-info:          #2563EB   Azul — informações
```

## Tipografia

### Famílias
```
--font-display: 'Plus Jakarta Sans', sans-serif  → Títulos H1–H3
--font-body:    'Inter', sans-serif               → Corpo, UI, formulários
```

### Escala tipográfica
```
text-xs:   12px / 0.75rem
text-sm:   14px / 0.875rem
text-base: 16px / 1rem
text-lg:   18px / 1.125rem
text-xl:   20px / 1.25rem
text-2xl:  24px / 1.5rem
text-3xl:  30px / 1.875rem
text-4xl:  36px / 2.25rem
```

### Pesos
```
font-normal:   400  → Corpo de texto
font-medium:   500  → Labels, navegação
font-semibold: 600  → Subtítulos, botões
font-bold:     700  → Títulos principais
```

## Espaçamento

Base: 4px (0.25rem)
```
spacing-1:  4px
spacing-2:  8px
spacing-3:  12px
spacing-4:  16px
spacing-6:  24px
spacing-8:  32px
spacing-12: 48px
spacing-16: 64px
```

## Border radius
```
rounded-sm:  4px   → Inputs, badges pequenos
rounded:     6px   → Botões pequenos
rounded-md:  8px   → Cards, botões padrão
rounded-lg:  12px  → Cards grandes
rounded-xl:  16px  → Modais, sheets
rounded-full        → Avatares, pills
```

## Sombras
```
shadow-sm:  Separação sutil (cards em fundo branco)
shadow:     Cards padrão
shadow-md:  Cards em hover
shadow-lg:  Dropdowns, modais
```

## Breakpoints (mobile-first)

```
sm:  640px   → Tablet pequeno
md:  768px   → Tablet
lg:  1024px  → Desktop
xl:  1280px  → Desktop largo
```

## Componentes recorrentes

### Botão primário
```
Fundo: primary (#7C3AED)
Texto: branco
Hover: primary-dark (#5B21B6)
Radius: rounded-md
Padding: py-2.5 px-5
Font: font-semibold text-sm
```

### Botão secundário (outline)
```
Borda: primary
Texto: primary
Hover: primary-light (fundo)
```

### Card de conteúdo
```
Fundo: surface (#FFFFFF)
Borda: border (#E5E7EB)
Radius: rounded-lg
Sombra: shadow-sm → shadow-md no hover
```

### Badge de categoria
```
Fundo: accent-light (#FCE7F3)
Texto: accent (#DB2777)
Radius: rounded-full
Padding: py-0.5 px-2.5
Font: font-medium text-xs
```
