# 🎨 DOC-002 — Identidade Visual & Proposta de Rebranding — Raminho Importadora

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-002 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Autor** | Equipe de Estratégia |
| **Documentos relacionados** | [DOC-001 — Persona & Público-Alvo](./persona_publico_alvo.md) · [DOC-003 — Análise E-commerce](./analise_ecommerce_atual.md) |

> Análise da identidade visual atual do site [raminhoimportadora.com](https://raminhoimportadora.com/) e proposta de rebranding para o e-commerce em **Shopify Liquid**.

---

## 1. Estado Atual do Site

### Screenshots de Referência

````carousel
![Homepage atual da Raminho Importadora — Hero banner, value props e grid de produtos](/Users/gustavosilva/.gemini/antigravity/brain/43fc9af4-a426-4b9e-97a8-fbb4a5359fea/homepage_full_1772132168339.png)
<!-- slide -->
![Página de coleção de Frutas — Grid com 24 produtos, botões verdes e fundo branco](/Users/gustavosilva/.gemini/antigravity/brain/43fc9af4-a426-4b9e-97a8-fbb4a5359fea/fruits_page_full_1772132194707.png)
````

---

## 2. Paleta de Cores Atual (extraída do `settings_data.json`)

### Cores Primárias

| Cor | Hex | Uso Atual |
|---|---|---|
| 🔵 **Azul Marinho** | `#00276f` | Header, textos principais, links do menu, footer, labels "Produto Premium" |
| 🟡 **Amarelo/Dourado** | `#fae426` | Texto no header, acentos no footer, bordas, barra de anúncio |
| 🔴 **Vermelho** | `#c3341b` | Preço antigo/desconto, ícones de redes sociais, labels esgotado |
| 🟢 **Verde** | `#12ab0c` | Botões de comprar, preço principal, WhatsApp, estoque em dia |

### Cores Secundárias

| Cor | Hex | Uso |
|---|---|---|
| ⚪ **Branco** | `#ffffff` | Background geral, fundo dos cards |
| 🔷 **Azul Claro** | `#00c3ee` | Checkout, parcelamento, detalhes decorativos |
| 🌑 **Quase Preto** | `#131921` | Rastreio, barras escuras alternativas |
| 🔶 **Amarelo Ouro** | `#ffc200` / `#ffbd00` | Estrelas de review, acentos de coleção |

### Gradiente da Barra Superior
```css
background: linear-gradient(197deg, rgba(0, 39, 111, 1) 10%, rgba(250, 228, 38, 1) 50%, rgba(195, 52, 27, 1) 84%);
```
*(Azul → Amarelo → Vermelho — gradiente que mistura 3 cores, visualmente pesado)*

---

## 3. Tipografia Atual

| Elemento | Fonte | Peso |
|---|---|---|
| **Títulos (H1-H6)** | Poppins | Bold (700) |
| **Corpo de texto** | Poppins | Regular (400) |
| **Tamanho base** | 17px | — |
| **Títulos de produto** | 20px | — |
| **Preço** | 28px (desktop e mobile) | — |

---

## 4. Diagnóstico Visual — O Que Funciona e O Que Não Funciona

### ✅ Acertos
- Header fixo com busca, WhatsApp e carrinho — boa UX
- Grid de produtos limpo com fundo branco nos cards
- Botão de comprar verde com bom contraste
- Seção de "value props" (frete, entrega, suporte, segurança)

### ❌ Problemas Identificados

| Problema | Impacto | Severidade |
|---|---|---|
| **Paleta de cores confusa** — Azul marinho + Amarelo + Vermelho + Verde = "sopa cromática" | Marca não transmite frescor e saúde | 🔴 Alto |
| **Gradiente Brasil** (azul/amarelo/vermelho) no topo lembra bandeira do Brasil, não frutas | Confusão de identidade — parecer "patriótico" ao invés de "premium orgânico" | 🔴 Alto |
| **Imagens geradas por IA** — Muitas fotos de frutas são visivelmente artificiais | Quebra a confiança ("se a foto é fake, a fruta é boa mesmo?") | 🔴 Alto |
| **Hero banner** genérico — Muito texto, foto de banco de imagens | Não captura atenção nem conta uma história | 🟡 Médio |
| **Seção "Produto mais Vendido"** sem produto real | Parece site inacabado | 🔴 Alto |
| **Footer sobrecarregado** — Muitas informações compactadas | Difícil de navegar | 🟡 Médio |
| **Falta hierarquia visual** — Tudo tem o mesmo peso | Olho não sabe para onde ir primeiro | 🟡 Médio |

---

## 5. Proposta de Rebranding

### 5.1 Nova Direção Visual — Conceito: "Da Terra à Mesa"

> **Objetivo:** Transmitir **frescor, natureza, premium e confiança** — alinhado com frutas de alta qualidade da tradição do Mercado Municipal.

**Mood:** Natureza premium, mercado artesanal, saúde vibrante, sofisticação natural.

### 5.2 Nova Paleta de Cores Proposta

| Cor | Hex | Nome | Uso |
|---|---|---|---|
| 🟢 **Verde Esmeralda** | `#0D7C4A` | *Verde Principal* | Marca, header, CTAs primários |
| 🌿 **Verde Claro** | `#34C77B` | *Verde Destaque* | Badges, tags, hover states |
| 🍊 **Laranja Quente** | `#E87A2D` | *Laranja Acento* | Preço, promoções, chamadas de urgência |
| 🤎 **Marrom Terra** | `#4A3728` | *Marrom Base* | Textos, footer, headers secundários |
| 🍃 **Creme Natural** | `#F7F3EB` | *Creme Fundo* | Background geral (substituir o branco puro) |
| ⚪ **Branco Puro** | `#FFFFFF` | *Branco* | Cards, áreas de destaque |
| 🌑 **Verde Escuro** | `#073D24` | *Verde Footer* | Footer, seções escuras |

### Justificativa da Nova Paleta
- **Verde + Marrom:** Remetem diretamente à natureza, terra, frescor → Core da marca
- **Laranja:** Lembra frutas cítricas, transmite energia e apetite → Usado em promoções
- **Creme:** Mais quente e orgânico que branco puro → Sensação de mercado artesanal
- **Sem azul marinho:** A marca vende frutas, não serviços financeiros. O azul atual é frio e corporativo demais

### 5.3 Nova Tipografia Proposta

| Elemento | Fonte | Justificativa |
|---|---|---|
| **Títulos** | **Playfair Display** (serif) | Elegância e premium — contraste com corpo sans-serif |
| **Corpo** | **Inter** ou **DM Sans** | Moderna, legível, funcional |
| **Preço** | **Inter Bold** | Clareza e impacto |

> **Por quê a mudança?** Poppins é boa, mas genérica. Playfair Display nos títulos dá um toque "gourmet/mercado artesanal" que se alinha ao posicionamento premium.

### 5.4 Novo Layout Proposto — Principais Mudanças

#### Header
- Simplificar: logo + busca + menu hambúrguer (mobile) + carrinho
- Barra de anúncio sutil em creme com texto verde: *"Frete grátis acima de R$497 🚚"*
- Remover gradiente "bandeira do Brasil"

#### Hero Banner
- Foto profissional real de frutas Raminho (não IA)
- Título grande em Playfair Display: *"Frutas Premium do Mercado Municipal, na sua porta"*
- CTA único e claro: "Comprar Agora"
- Subtítulo: *"Entrega em D+1 na Grande SP"*

#### Grid de Produtos
- Cards com cantos mais arredondados (16px ao invés de 12px)
- Sombra sutil nos cards ao hover
- Badge "🏆 Mais Vendido" nos top sellers
- Badge "🍃 Orgânico" quando aplicável
- Foto real da fruta (sessão fotográfica profissional)

#### Seção Institucional
- "Nossa História" com timeline visual: 40 anos de jornada
- Fotos reais do Mercado Municipal
- Depoimentos de clientes

#### Footer
- Layout mais limpo e organizado em 4 colunas
- Redes sociais com ícones maiores
- Newsletter com design atrativo

---

## 6. Implementação Técnica no Liquid

### 6.1 Arquivos a Modificar

| Arquivo | Alteração |
|---|---|
| [settings_data.json](file:///Users/gustavosilva/Desktop/Trabalhos/Raminho%20Importadora/Ecommerce%20Raminho%20Importadora/theme_export__raminhoimportadora-com-tema-original__26FEB2026-0256pm/config/settings_data.json) | Todas as variáveis de cor, fontes e configurações |
| `assets/theme.css` | Override de estilos globais, nova paleta |
| `layout/theme.liquid` | Carregar novas fontes do Google Fonts |
| `sections/header.liquid` | Novo layout do header |
| `sections/footer.liquid` | Redesign do footer |
| `snippets/product-card.liquid` | Novos cards de produto |
| `templates/index.json` | Reorganizar seções da homepage |

### 6.2 Variáveis de Cor no `settings_data.json` — Mapeamento

```diff
- "text_color": "#00276f"
+ "text_color": "#4A3728"

- "accent_color": "#c3341b"
+ "accent_color": "#E87A2D"

- "background": "#ffffff"
+ "background": "#F7F3EB"

- "primary_button_background": "#12ab0c"
+ "primary_button_background": "#0D7C4A"

- "header_background_degrade": "#00276f"
+ "header_background_degrade": "#073D24"

- "header_text_color": "#fae426"
+ "header_text_color": "#F7F3EB"

- "rodape_background_degrade": "#00276f"
+ "rodape_background_degrade": "#073D24"

- "footer_body_text_color": "#fae426"
+ "footer_body_text_color": "#F7F3EB"

- "bar_color": "linear-gradient(197deg, rgba(0, 39, 111, 1) 10%, rgba(250, 228, 38, 1) 50%, rgba(195, 52, 27, 1) 84%)"
+ "bar_color": "linear-gradient(135deg, #073D24 0%, #0D7C4A 100%)"

- "branding_color_marcos": "#00276f"
+ "branding_color_marcos": "#0D7C4A"
```

### 6.3 Google Fonts a Adicionar em `theme.liquid`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
```

### 6.4 CSS Customizado Sugerido (`assets/theme.css`)

```css
/* === REBRANDING RAMINHO IMPORTADORA === */

:root {
  --color-primary: #0D7C4A;
  --color-primary-light: #34C77B;
  --color-accent: #E87A2D;
  --color-text: #4A3728;
  --color-bg: #F7F3EB;
  --color-white: #FFFFFF;
  --color-dark: #073D24;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

/* Cards de Produto */
.product-item {
  border-radius: var(--radius-md);
  background: var(--color-white);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(74, 55, 40, 0.12);
}

/* Botão Comprar */
.button--primary, 
.add-to-cart-btn {
  background: var(--color-primary);
  border-radius: var(--radius-sm);
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: background 0.3s ease;
}

.button--primary:hover {
  background: var(--color-primary-light);
}

/* Badge Mais Vendido */
.product-badge--bestseller {
  background: var(--color-accent);
  color: var(--color-white);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}
```

---

## 7. Plano de Implementação (4 Fases)

### Fase 1 — Quick Wins (Semana 1-2)
- [ ] Atualizar paleta de cores no `settings_data.json`
- [ ] Remover gradiente "bandeira" do topo
- [ ] Carregar novas fontes via Google Fonts
- [ ] Ajustar botões de comprar com nova cor verde
- [ ] Corrigir seção "Produto mais Vendido" sem produto

### Fase 2 — Conteúdo Visual (Semana 3-4)
- [ ] Sessão fotográfica profissional dos produtos
- [ ] Novo hero banner com foto real
- [ ] Badges visuais de "Mais Vendido" e "Premium"
- [ ] Criar seção "Nossa História" com fotos do Mercado Municipal

### Fase 3 — UX & Layout (Semana 5-6)
- [ ] Redesign do header (simplificar)
- [ ] Redesign do footer (organizar)
- [ ] Novos cards de produto com hover effects
- [ ] Melhorar página de coleção com filtros
- [ ] Otimizar versão mobile

### Fase 4 — Funcionalidades (Semana 7-8)
- [ ] Programa de assinatura de cesta semanal
- [ ] Cestas temáticas presenteáveis
- [ ] Blog com receitas e sazonalidade
- [ ] Reviews de clientes visíveis
- [ ] Pop-up de desconto na primeira compra

---

## 8. Antes vs Depois — Visão Comparativa

| Elemento | Antes | Depois |
|---|---|---|
| **Header** | Azul marinho com amarelo = corporativo | Verde escuro com creme = natural premium |
| **Background** | Branco puro = hospitalar | Creme `#F7F3EB` = acolhedor, orgânico |
| **Botão Comprar** | Verde genérico `#12ab0c` | Verde esmeralda `#0D7C4A` = mais sofisticado |
| **Fonte títulos** | Poppins Bold = genérica | Playfair Display = gourmet, premium |
| **Fotos** | IA/banco de imagens | Fotos reais profissionais |
| **Gradiente topo** | Azul→Amarelo→Vermelho = confuso | Verde escuro→Verde médio = coeso |
| **Footer** | Sobrecarregado, difícil de ler | Limpo, 4 colunas organizadas |

---

> **Resultado esperado:** Um site que comunica visualmente **frescor, qualidade premium e tradição**, alinhado ao posicionamento de 40+ anos do Mercado Municipal — mas com estética digital contemporânea que converte visitantes em clientes.
