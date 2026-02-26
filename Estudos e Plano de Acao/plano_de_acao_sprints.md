# 🚀 DOC-005 — Plano de Ação & Sprints — Raminho Importadora

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-005 |
| **Versão** | 2.0 — Full Custom Build |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Documentos relacionados** | [DOC-004](./documento_principal_projeto.md) · [DOC-009 — Sprint Todolist](./sprint_todolist.md) · [DOC-011 — Direção Criativa](./direcao_criativa_referencias.md) |

> [!IMPORTANT]
> **Este plano foi atualizado.** O projeto mudou de "otimizar tema existente" para **construir experiência 100% customizada do zero** — nível Apple/Disney/Netflix. O tema Vision original serve apenas como referência de funcionalidades.

---

## 1. Objetivo

Criar um e-commerce que faça o cliente sentir que a **Apple entrou no negócio de frutas.** Cada pixel, transição e palavra comunica: premium, cuidado e excelência.

---

## 2. Decisões de Negócio

| Decisão | Valor | Justificativa |
|---|---|---|
| **Build** | 100% custom Liquid | Tema genérico não atinge nível Apple |
| **Pedido mínimo** | R$129,90 | Viabilidade logística motoboys + seguro |
| **Frete grátis** | Acima de R$497 | Elevar ticket médio (atual ~R$300) |
| **Entrega** | Motoboys próprios + seguro | Diferencial premium |
| **Garantia** | Reposição grátis via WhatsApp | Confiança total |
| **Fotos** | Freepik (fase 1) + Sessão real (fase 2) | Upgrade imediato sem depender de sessão |
| **Grama/Unidade** | Seletor em produtos específicos | Feature premium diferenciadora |

---

## 3. Plano de Ação — Organizado por Área

### 3.1 🏗️ Infraestrutura & Base

| # | Ação | Detalhes |
|---|---|---|
| 3.1.1 | Criar estrutura do tema custom | Layout base, CSS variables, grid system |
| 3.1.2 | Implementar design system | Cores, tipografia, espaçamentos, componentes base |
| 3.1.3 | Configurar Google Fonts | Playfair Display + DM Sans |
| 3.1.4 | Migrar Yampi Snippet | Garantir integração checkout no tema novo |
| 3.1.5 | Configurar pedido mínimo R$129,90 | Liquid + Yampi |
| 3.1.6 | Implementar CSS custom properties | Variáveis de tema para fácil customização |

### 3.2 🎨 Design & Componentes UI

| # | Ação | Detalhes |
|---|---|---|
| 3.2.1 | Hero Section imersiva | Full-width, tipografia grande, parallax sutil |
| 3.2.2 | Header premium | Logo + busca + carrinho, sticky, animação ao scroll |
| 3.2.3 | Cards de produto premium | Hover state, badges, foto como protagonista |
| 3.2.4 | Footer elegante | 4 colunas, newsletter, redes sociais |
| 3.2.5 | Carousel horizontal (Netflix-style) | Para "Frutas da Estação", categorias |
| 3.2.6 | Grid de categorias com hover animado | Frutas / Verduras / Empório |
| 3.2.7 | Seção "Nossa Entrega" (dark) | Motoboys + seguro + garantia |
| 3.2.8 | Seção "40 Anos de Tradição" | Timeline ou storytelling visual |
| 3.2.9 | Seção de depoimentos | Minimalista, com foto do cliente |
| 3.2.10 | Newsletter section | Design premium com incentivo |

### 3.3 🛍️ Página de Produto

| # | Ação | Detalhes |
|---|---|---|
| 3.3.1 | Galeria de fotos estilo Apple | Grande, clean, zoom suave |
| 3.3.2 | Seletor Grama/Unidade | Segmented control iOS-style (DOC-010) |
| 3.3.3 | Botão de compra sticky | Fixo no mobile ao scrollar |
| 3.3.4 | Selo de garantia sutil | Não gritante, confiança pelo design |
| 3.3.5 | Accordion de descrição | Expandível, clean |
| 3.3.6 | Reviews/Avaliações | Design próprio, integrado |
| 3.3.7 | "Combina com..." (cross-sell) | Recomendações visuais elegantes |
| 3.3.8 | "Vistos recentemente" | Carousel discreto |

### 3.4 🛒 Carrinho & Checkout

| # | Ação | Detalhes |
|---|---|---|
| 3.4.1 | Drawer cart premium | Lateral, thumbnails, animação |
| 3.4.2 | Barra de progresso frete grátis | Gamificação: "Faltam R$X para frete grátis" |
| 3.4.3 | Mensagem pedido mínimo | Se < R$129,90, bloquear com mensagem premium |
| 3.4.4 | Upsell discreto | "Aproveite e leve também" |
| 3.4.5 | Selo de garantia no carrinho | Reforço de confiança |
| 3.4.6 | Personalizar checkout Yampi | Visual alinhado com a marca |

### 3.5 📸 Conteúdo & Fotos

| # | Ação | Detalhes |
|---|---|---|
| 3.5.1 | Baixar fotos Freepik Premium | Frutas em alta resolução, fundo clean |
| 3.5.2 | Tratar fotos (consistência visual) | Mesmo tom, iluminação, qualidade |
| 3.5.3 | Atualizar fotos de todos os produtos | Substituir IA por Freepik |
| 3.5.4 | Criar página de política de garantia | Explicar seguro + reposição |
| 3.5.5 | Configurar produto a produto na Shopify | Variantes, metafields, fotos, descrições |

### 3.6 🔧 Performance & SEO

| # | Ação | Detalhes |
|---|---|---|
| 3.6.1 | Performance-first CSS | Minificado, sem libs desnecessárias |
| 3.6.2 | JS mínimo | Vanilla JS ou Alpine.js leve, sem jQuery |
| 3.6.3 | Lazy loading de imagens | Performance em conexões lentas |
| 3.6.4 | SEO tags otimizadas | Title, meta, Schema.org, OG |
| 3.6.5 | Alt tags em todas as imagens | SEO de imagens |
| 3.6.6 | Blog ( primeiros artigos) | SEO orgânico |

---

## 4. Distribuição em Sprints

### Sprint 1 — "Setup & Design System" (1.5 semanas)
**Foco:** Criar a base do tema custom, design system e configurações

| Task | Ref. |
|---|---|
| Criar estrutura do tema custom Liquid (layout, sections, snippets) | 3.1.1 |
| Implementar design system (CSS variables, cores, fontes, grid) | 3.1.2 |
| Configurar Google Fonts (Playfair + DM Sans) | 3.1.3 |
| Migrar YampiSnippet para tema novo | 3.1.4 |
| Configurar pedido mínimo R$129,90 | 3.1.5 |
| Baixar e tratar fotos Freepik para catálogo | 3.5.1, 3.5.2 |

---

### Sprint 2 — "Homepage Premium" (1.5 semanas)
**Foco:** Construir a homepage do zero — primeira impressão Apple-level

| Task | Ref. |
|---|---|
| Hero section imersiva (foto premium, tipografia grande) | 3.2.1 |
| Header premium (sticky, animado) | 3.2.2 |
| Cards de produto premium | 3.2.3 |
| Carousel horizontal tipo Netflix | 3.2.5 |
| Grid de categorias com hover animado | 3.2.6 |
| Seção "Nossa Entrega" (dark, motoboys + seguro + garantia) | 3.2.7 |
| Footer elegante | 3.2.4 |
| Newsletter section | 3.2.10 |

---

### Sprint 3 — "Produto & Carrinho" (1.5 semanas)
**Foco:** Página de produto Apple-level e carrinho premium

| Task | Ref. |
|---|---|
| Galeria de fotos estilo Apple | 3.3.1 |
| Seletor Grama/Unidade (segmented control) | 3.3.2 |
| Botão de compra sticky (mobile) | 3.3.3 |
| Selo de garantia sutil | 3.3.4 |
| Accordion de descrição | 3.3.5 |
| Reviews/Avaliações | 3.3.6 |
| Cross-sell "Combina com..." | 3.3.7 |
| Drawer cart premium | 3.4.1 |
| Barra progresso frete grátis | 3.4.2 |
| Mensagem pedido mínimo + upsell | 3.4.3, 3.4.4 |

---

### Sprint 4 — "Conteúdo, Fotos & Storytelling" (1 semana)
**Foco:** Conteúdo real, fotos de produto e storytelling

| Task | Ref. |
|---|---|
| Atualizar fotos de TODOS os 145+ produtos (Freepik) | 3.5.3 |
| Configurar produto a produto na Shopify (variantes, metafields) | 3.5.5 |
| Criar seção "40 Anos de Tradição" | 3.2.8 |
| Criar seção de depoimentos | 3.2.9 |
| Criar página de política de garantia | 3.5.4 |
| Personalizar visual do checkout Yampi | 3.4.6 |

---

### Sprint 5 — "Polish, Performance & QA" (1 semana)
**Foco:** Polimento final, performance e testes end-to-end

| Task | Ref. |
|---|---|
| Performance audit (CSS, JS, imagens) | 3.6.1, 3.6.2, 3.6.3 |
| SEO completo | 3.6.4, 3.6.5 |
| Blog (primeiros artigos) | 3.6.6 |
| Revisão mobile completa | — |
| Teste end-to-end (home → produto → carrinho → checkout) | — |
| Micro-animações e transições finais | — |
| QA: verificar tudo em Chrome, Safari, mobile | — |

---

## 5. Dependências & Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Build custom demora mais que otimizar tema | Prazo mais longo | Sprints bem definidas, priorizar MVP |
| Freepik pode não ter TODAS as frutas do catálogo | Algumas fotos faltando | Usar as melhores disponíveis, marcar quais precisam de foto real |
| Seletor Grama/Unidade pode ser complexo | Feature técnica | Usar Variants como MVP (DOC-010) |
| Personalizar Yampi visualmente | Pode ter limitações | Verificar o que é customizável antes |

---

## 6. Critérios de Sucesso

| Critério | Como medir |
|---|---|
| **"Parece que a Apple fez"** | Feedback visual do time e clientes |
| **Funcionalidades ativas** | 100% das features planejadas |
| **Ticket médio** | R$400+ |
| **Conversão** | +40% vs site atual |
| **Mobile** | Experiência perfeita em iPhone e Android |
| **Performance** | Lighthouse 90+ |
| **Entrega comunicada** | 100% dos clientes entendem motoboys + garantia |
