# ⚙️ DOC-006 — Guia da Plataforma: Shopify & Liquid

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-006 |
| **Versão** | 2.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Plano Shopify** | **Basic** |
| **Documentos relacionados** | [DOC-004 — Documento Principal](./documento_principal_projeto.md) |

---

## 1. O Que é Shopify + Liquid

A **Shopify** é a plataforma de e-commerce que hospeda a loja da Raminho Importadora. O tema da loja será **construído do zero em Liquid** — a linguagem de templates da Shopify.

> [!IMPORTANT]
> **Plano atual: Shopify Basic.** Isso suporta 100% do que precisamos: temas custom, Liquid, metafields, variants (até 100/produto), Online Store 2.0, SEO e apps. As limitações do Basic (relatórios avançados, contas staff) não afetam o build.

> [!NOTE]
> **Workflow:** Todo o código é escrito **localmente** nesta workspace. Depois de pronto, o tema é empacotado e enviado (upload) para a Shopify. A edição de **produtos** (fotos, descrições, variantes, preços) é feita via browser no admin da Shopify.

**Liquid** permite misturar HTML com lógica dinâmica:
```liquid
{% if product.available %}
  <span class="price">{{ product.price | money }}</span>
{% else %}
  <span class="sold-out">Esgotado</span>
{% endif %}
```

---

## 2. Estrutura do Tema Atual

O tema exportado está em:
```
Ecommerce Raminho Importadora/
└── theme_export__raminhoimportadora-com-tema-original__26FEB2026-0256pm/
    ├── assets/          → CSS, JS, imagens, fontes (43 arquivos)
    ├── config/          → Configurações do tema (settings_data.json)
    ├── layout/          → Layout principal (theme.liquid)
    ├── locales/         → Traduções (pt-BR)
    ├── sections/        → Seções de página (61 seções)
    ├── snippets/        → Partials reutilizáveis (43 snippets)
    └── templates/       → Templates JSON de páginas (28 templates)
```

### Arquivos-chave para este projeto

| Arquivo | Função | Quando mexer |
|---|---|---|
| `config/settings_data.json` | **Todas** as cores, fontes, configurações | Rebranding visual |
| `layout/theme.liquid` | Layout base (head, body, scripts) | Adicionar fontes, limpar scripts |
| `snippets/css-variables.liquid` | CSS custom properties do tema | Qualquer mudança visual |
| `sections/header.liquid` | Navegação principal | Redesign do header |
| `sections/footer.liquid` | Rodapé | Redesign do footer |
| `sections/main-product.liquid` | Página de produto | Badges, garantia |
| `sections/main-cart.liquid` | Página do carrinho | Pedido mínimo, msgs |
| `snippets/product-item.liquid` | Card de produto (grid) | Redesign dos cards |
| `templates/index.json` | Seções da homepage | Reorganizar home |
| `templates/product.json` | Seções da pág. produto | Ativar reviews, recomendações |

---

## 3. Como o Tema Funciona

### Fluxo de Renderização
```
layout/theme.liquid (base)
  └── {{ content_for_layout }}
       └── templates/index.json (define quais seções)
            └── sections/slideshow.liquid
            └── sections/featured-collection.liquid
            └── sections/image-with-text.liquid
            └── ...
```

### Templates JSON vs Liquid
As **templates** são arquivos JSON que listam quais seções aparecem em cada página:
```json
{
  "sections": {
    "slideshow_ca3MpX": { "type": "slideshow", ... },
    "featured_collection_9B6AaM": { "type": "featured-collection", ... }
  },
  "order": ["slideshow_ca3MpX", "featured_collection_9B6AaM"]
}
```

Para **ativar/desativar** uma seção, basta adicionar/remover `"disabled": true` no JSON.

---

## 4. Como Editar Cores e Fontes

As cores do tema são controladas por `config/settings_data.json`. As variáveis principais:

| Variável | Controla |
|---|---|
| `text_color` | Cor do texto geral |
| `accent_color` | Cor de destaque/acento |
| `background` | Fundo geral |
| `primary_button_background` | Botão principal (comprar) |
| `header_background_degrade` | Fundo do header |
| `header_text_color` | Texto do header |
| `rodape_background_degrade` | Fundo do footer |
| `footer_body_text_color` | Texto do footer |
| `bar_color` | Gradiente da barra superior |

> As variáveis são consumidas por `snippets/css-variables.liquid` e transformadas em CSS custom properties.

---

## 5. Como Ativar Funcionalidades Desativadas

Para ativar uma seção desabilitada na página de produto (exemplo: reviews):

**Antes (`templates/product.json`):**
```json
"product-recommendations": {
  "type": "product-recommendations",
  "disabled": true,
  ...
}
```

**Depois:**
```json
"product-recommendations": {
  "type": "product-recommendations",
  ...
}
```

Basta remover a linha `"disabled": true`.

---

## 6. Tema Base

O tema é baseado no **Vision** — um tema Shopify customizado. Principais características:
- Suporte a mega menu
- Carrinho drawer (mini-cart lateral)
- Parcelamento integrado (snippet `visionparcelamento.liquid`)
- Kits de produtos (`kitsvision.liquid`)
- Sticky elements (`stickyvision.liquid`)
- Bloqueadores de conteúdo (F12, clique direito) — **a serem removidos**

---

## 7. Comandos Úteis

### Shopify CLI (se disponível)
```bash
# Puxar tema
shopify theme pull --store raminhoimportadora.com

# Enviar alterações
shopify theme push --store raminhoimportadora.com

# Preview local
shopify theme dev --store raminhoimportadora.com
```

### Sem CLI (via Admin)
1. Acesse `raminhoimportadora.com/admin` → **Online Store** → **Themes**
2. **Edit code** para editar arquivos Liquid diretamente
3. **Customize** para editar via painel visual (seções e configurações)
