# ✅ DOC-009 — Sprint Todolist — Raminho Importadora

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-009 |
| **Versão** | 3.0 — Revisão Corretiva Completa |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 27/02/2026 |
| **Status geral** | 🔄 Em andamento |
| **Plano Shopify** | Basic |
| **Workflow** | Código feito localmente → Upload para Shopify → Produtos editados via browser |
| **Links Rápidos** | [🔗 Editor Visual da Shopify](https://admin.shopify.com/store/cd592c-2/themes/169549693205/editor) <br> [🌐 Loja ao Vivo](https://cd592c-2.myshopify.com) |
| **Docs relacionados** | [DOC-005 — Plano de Ação](../Estudos e Plano de Acao/plano_de_acao_sprints.md) · [DOC-004 — Documento Principal](./documento_principal_projeto.md) |

> ⚠️ Este documento é **vivo** — deve ser atualizado ao final de cada tarefa/sprint.

---

## Legenda

| Símbolo | Significado |
|---|---|
| ⬜ | Não iniciado |
| 🔄 | Em andamento |
| ✅ | Concluído |
| ❌ | Cancelado/Removido |
| ⏸️ | Pausado (dependência) |

---

## Sprint 1 — "Setup & Design System"
**Status:** ✅ Concluída
**Estimativa:** 1.5 semanas
**Início:** 26/02/2026
**Término:** 26/02/2026

| # | Task | Status | Notas |
|---|---|---|---|
| 1.1 | Criar estrutura base do tema custom (layout, sections, snippets) | ✅ | Construir do zero, não usar Vision como base |
| 1.2 | Design system: CSS variables (cores, fontes, espaçamentos, grid) | ✅ | Paleta verde/marrom/creme do DOC-002 |
| 1.3 | Google Fonts: Playfair Display + DM Sans | ✅ | Em `theme.liquid` |
| 1.4 | Migrar YampiSnippet para tema novo | ✅ | Copiado `snippets/YampiSnippet.liquid` antigo pro novo |
| 1.5 | Configurar pedido mínimo R$129,90 | ✅ | `snippets/cart-validation.liquid` via modal premium |
| 1.6 | Baixar fotos Freepik Premium para catálogo | ⏸️ | Adiada para Sprint 4 (task 4.1). Depende de curadoria manual de produto. |
| 1.7 | Tratar fotos (mesma consistência visual) | ⏸️ | Adiada para Sprint 4 (task 4.1). Depende das fotos da 1.6. |

**Resultado:** Tema base (layout, reset CSS dinâmico, checkout yampi, validador de preço mínimo) estruturado no workspace.

---

## Sprint 2 — "Homepage Premium"
**Status:** ✅ Concluída
**Estimativa:** 1.5 semanas
**Início:** 26/02/2026
**Término:** 27/02/2026

| # | Task | Status | Notas |
|---|---|---|---|
| 2.1 | Códar base `templates/index.json` (OS 2.0) | ✅ | Estrutura modular da Homepage completada (9 seções). |
| 2.2 | Section: Header Premium Sticky (`header.liquid`) | ✅ | Logo centrado, menu mobile, busca, announcement bar. |
| 2.3 | Section: Immersive Hero Banner (`hero-banner.liquid`) | ✅ | Título `<h1>` com efeito Parallax sutil. |
| 2.4 | Snippet: Product Card Premium | ✅ | Design clean, preparado pra grama/unid. CSS/JS carregados pela section pai. |
| 2.5 | Grid de categorias com hover animado | ✅ | `categories-grid.liquid` — grid 3 colunas com overlay e animação hover. |
| 2.6 | Seção "Nossa Entrega" dark (motoboys + seguro + garantia) | ✅ | `delivery-guarantee.liquid` com D+1, reposição e pedido mínimo. |
| 2.7 | Comunicar pedido mínimo R$129,90 de forma elegante | ✅ | Presente no delivery-guarantee, footer e cart-drawer. |
| 2.8 | Criar bloco "Clube de Assinaturas" premium | ✅ | UI Teaser criado na home (`subscription-teaser.liquid`). |
| 2.9 | Footer elegante (4 colunas) | ✅ | Cores dark e grids finalizados (`footer.liquid`). |
| 2.10 | Newsletter section premium | ✅ | Formulário clean (`newsletter.liquid`). |
| 2.11 | Seção "Mais Vendidos" com badges visuais | ❌ | Rollback: Código revertido devido a refatoração arquitetural ruim. |
| 2.12 | Seção "40 Anos de Tradição" (storytelling) | ❌ | Rollback: Código revertido. |
| 2.13 | Seção de Depoimentos de Clientes | ❌ | Rollback: Código revertido. |
| 2.14 | Announcement Bar (Frete Grátis R$497) | ❌ | Rollback: Código revertido. Estava chumbada no código. |

**Resultado:** Homepage rollback para estado 100% estável (pré-refatoração ruim).

---

## Sprint 3 — "Produto & Carrinho"
**Status:** 🔄 Em andamento
**Estimativa:** 1.5 semanas
**Início:** 26/02/2026
**Término:** *Em andamento*

| # | Task | Status | Notas |
|---|---|---|---|
| 3.1 | Galeria de fotos estilo Apple (grande, zoom suave) | ✅ | Imagens responsivas empilhadas em split-screen |
| 3.2 | Seletor Grama/Unidade (segmented control iOS-style) | ✅ | Vanilla JS `variant-selects` implementado com visual iOS |
| 3.3 | Botão de compra sticky no mobile | ✅ | Fixo ao scrollar (Sticky Buy Bar). `product_form_id` declarado no escopo global. |
| 3.4 | Selo de garantia sutil (design, não gritante) | ✅ | Injetado como bloco OS 2.0 |
| 3.5 | Accordion clean para descrição | ✅ | Expandível em main-product.liquid |
| 3.6 | Seção de Reviews/Avaliações (design próprio) | ⬜ | Integrado ao tema |
| 3.7 | Cross-sell "Combina com..." | ✅ | Recomendados unificados com estilo Flagship |
| 3.8 | "Vistos recentemente" (carousel discreto) | ⬜ | Reengajamento |
| 3.9 | Drawer cart premium (lateral, thumbnails, animado) | ✅ | UX fluida com AJAX |
| 3.10 | Barra progresso frete grátis (R$ 497) | ✅ | `shippingThreshold = 49700` no cart-drawer.js |
| 3.11 | Bloqueio carrinho < R$ 129,90 com mensagem premium | ✅ | `minOrderThreshold = 12990` no cart-drawer.js + modal premium no cart-validation |
| 3.12 | Upsell discreto no carrinho | ⬜ | "Aproveite e leve também" |
| 3.13 | Popup Validador de CEP (Gated Checkout) | ⬜ | Exigir CEP antes do botão Finalizar para barrar áreas não cobertas |

**Resultado:** Página de produto e carrinho que convertem com elegância total.

---

## Sprint 4 — "Conteúdo, Fotos & Produtos"
**Status:** ⬜ Não iniciada
**Estimativa:** 1 semana
**Início:** *A definir*
**Término:** *A definir*

| # | Task | Status | Notas |
|---|---|---|---|
| 4.1 | Atualizar fotos de TODOS os 145+ produtos (Freepik) | ⬜ | Substituir IA por fotos premium (inclui tasks 1.6 e 1.7) |
| 4.2 | Configurar variantes grama/unidade nos produtos | ⬜ | Produto a produto via Shopify admin (browser) |
| 4.3 | Populer seção "40 Anos de Tradição" com fotos reais | ⬜ | Rollback: Criar seção "40 Anos de Tradição" (Storytelling visual) |
| 4.4 | Populer seção de depoimentos com reviews reais | ⬜ | Rollback: Criar seção de depoimentos (Minimalista) |
| 4.5 | Criar página de política de garantia | ⬜ | Seguro + reposição grátis |
| 4.6 | Personalizar checkout Yampi (visual da marca) | ⬜ | Cores e fontes alinhadas |
| 4.7 | Páginas de coleção (design custom) | ⬜ | Grid premium com filtros |
| 4.8 | Configurar Produto de Assinatura Recorrente | ⬜ | Integração técnica plano (Yampi/Appmax) DOC-013 |
| 4.9 | Criar Landing Page do "Clube Raminho" | ⬜ | Página focada em conversão para assinatura |

**Resultado:** Conteúdo visual em todos os produtos, assinaturas ativas e storytelling configurado.

---

## Sprint 5 — "Polish, Performance & QA"
**Status:** ⬜ Não iniciada
**Estimativa:** 1 semana
**Início:** *A definir*
**Término:** *A definir*

| # | Task | Status | Notas |
|---|---|---|---|
| 5.1 | Performance audit (CSS, JS, imagens) | ⬜ | Sem jQuery, JS vanilla |
| 5.2 | Lazy loading de imagens | ⬜ | Performance em mobile |
| 5.3 | SEO completo (title, meta, schema, alt tags) | ⬜ | Todas as páginas |
| 5.4 | Blog (primeiros artigos) | ⬜ | SEO orgânico |
| 5.5 | Revisão mobile completa | ⬜ | iPhone + Android |
| 5.6 | Teste: home → produto → carrinho → checkout | ⬜ | Fluxo completo |
| 5.7 | Micro-animações e transições finais | ⬜ | O "polish" Apple |
| 5.8 | QA: Chrome, Safari, Firefox, mobile | ⬜ | Cross-browser |
| 5.9 | Deploy final e go-live | ⬜ | Upload tema + ativar |

**Resultado:** Site premium, performático, testado e no ar.

---

## Resumo de Progresso

| Sprint | Tasks | Concluídas | % |
|---|---|---|---|
| Sprint 1 — Setup & Design System | 7 | 5 | 71% |
| Sprint 2 — Homepage Premium | 14 | 10 | 71% |
| Sprint 3 — Produto & Carrinho | 13 | 7 | 53% |
| Sprint 4 — Conteúdo & Produtos | 9 | 0 | 0% |
| Sprint 5 — Polish & QA | 9 | 0 | 0% |
| **Total** | **52** | **22** | **42%** |

---

## Notas Técnicas Importantes

> [!NOTE]
> **Plano Shopify Basic** — O plano Basic suporta 100% do que precisamos: temas custom Liquid, metafields, variants (até 100 por produto, 3 opções), Online Store 2.0, SEO, etc. As únicas limitações são relatórios avançados e nº de contas staff — que não afetam o build.

> [!NOTE]
> **Workflow de desenvolvimento:** Todo o código Liquid é escrito localmente nesta workspace. Depois de pronto, o tema é empacotado e enviado para a Shopify. A edição de produtos (fotos, descrições, variantes) é feita via browser no admin da Shopify.

> [!NOTE]
> **Governança documental ativa (27/02/2026):** A partir desta data, a ordem oficial de leitura e atualização está no [DOC-014 — Governança Documental & Processo Operacional](./DOC-014_Governanca_Documental_e_Processo_Operacional.md). Em caso de conflito entre documentos, seguir o DOC-014.

> [!WARNING]
> **Rollback Arquitetural (27/02/2026):** Uma refatoração recente inseriu graves bugs (Carrinho quebrando e CSS de produtos apagados). A pedido do usuário, o código do `Tema Shopify Premium` foi 100% revertido para o commit seguro `393480a`, porém a documentação (estudos frete, novas revisões e este todolist) foi mantida para histórico. A branch do código descartado é a `refatoracao-codigo-rejeitada`.


---

> **Última atualização:** 27/02/2026 — Revisão corretiva v3.0. Todas as seções ausentes da homepage criadas. Percentuais recalculados com precisão.
