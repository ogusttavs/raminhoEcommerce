# ✅ DOC-009 — Sprint Todolist — Raminho Importadora

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-009 |
| **Versão** | 2.0 — Full Custom Build |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Status geral** | ⬜ Aguardando aprovação do plano |
| **Plano Shopify** | Basic |
| **Workflow** | Código feito localmente → Upload para Shopify → Produtos editados via browser |
| **Docs relacionados** | [DOC-005 — Plano de Ação](./plano_de_acao_sprints.md) · [DOC-004 — Documento Principal](./documento_principal_projeto.md) |

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
| 1.5 | Configurar pedido mínimo R$129,90 | ✅ | `snippets/cart-validation.liquid` via JS com UI elegante |
| 1.6 | Baixar fotos Freepik Premium para catálogo | ⏸️ | A ser feito paralelo ao design |
| 1.7 | Tratar fotos (mesma consistência visual) | ⏸️ | A ser feito paralelo ao design |

**Resultado:** Tema base (layout, reset CSS dinâmico, checkout yampi, validador de preço mínimo) estruturado no workspace.

---

## Sprint 2 — "Homepage Premium"
**Status:** 🔄 Em andamento  
**Estimativa:** 1.5 semanas  
**Início:** 26/02/2026  
**Término:** *A definir*

| # | Task | Status | Notas |
|---|---|---|---|
| 2.1 | Hero section imersiva (foto premium + tipografia grande) | ⬜ | Parallax sutil, CTA claro |
| 2.2 | Header premium (logo + busca + carrinho, sticky) | ⬜ | Animação ao scroll |
| 2.3 | Cards de produto premium (hover, badges) | ⬜ | Produto como protagonista |
| 2.4 | Carousel horizontal tipo Netflix ("Frutas da Estação") | ⬜ | Categorização inteligente |
| 2.5 | Grid de categorias com hover animado | ⬜ | Frutas / Verduras / Empório |
| 2.6 | Seção "Nossa Entrega" dark (motoboys + seguro + garantia) | ⬜ | Comunicar entrega premium |
| 2.7 | Comunicar pedido mínimo R$129,90 de forma elegante | ⬜ | Barra ou tooltip |
| 2.8 | Criar bloco "Clube de Assinaturas" premium | ⬜ | Teaser visual do clube de frutas |
| 2.9 | Footer elegante (4 colunas) | ⬜ | Newsletter, contato, redes |
| 2.10 | Newsletter section premium | ⬜ | Design com incentivo |

**Resultado:** Homepage completa nível Apple — primeira impressão vende sozinha.

---

## Sprint 3 — "Produto & Carrinho"
**Status:** ⬜ Não iniciada  
**Estimativa:** 1.5 semanas  
**Início:** *A definir*  
**Término:** *A definir*

| # | Task | Status | Notas |
|---|---|---|---|
| 3.1 | Galeria de fotos estilo Apple (grande, zoom suave) | ⬜ | Destaque visual máximo |
| 3.2 | Seletor Grama/Unidade (segmented control iOS-style) | ⬜ | Via variants (Shopify Basic suporta) — DOC-010 |
| 3.3 | Botão de compra sticky no mobile | ⬜ | Fixo ao scrollar |
| 3.4 | Selo de garantia sutil (design, não gritante) | ⬜ | Confiança pelo design |
| 3.5 | Accordion clean para descrição | ⬜ | Expandível |
| 3.6 | Seção de Reviews/Avaliações (design próprio) | ⬜ | Integrado ao tema |
| 3.7 | Cross-sell "Combina com..." | ⬜ | Recomendações visuais elegantes |
| 3.8 | "Vistos recentemente" (carousel discreto) | ⬜ | Reengajamento |
| 3.9 | Drawer cart premium (lateral, thumbnails, animado) | ⬜ | UX fluida |
| 3.10 | Barra progresso frete grátis | ⬜ | "Faltam R$X para frete grátis" |
| 3.11 | Bloqueio carrinho < R$129,90 com mensagem premium | ⬜ | Mensagem elegante, não agressiva |
| 3.12 | Upsell discreto no carrinho | ⬜ | "Aproveite e leve também" |

**Resultado:** Página de produto e carrinho que convertem com elegância total.

---

## Sprint 4 — "Conteúdo, Fotos & Produtos"
**Status:** ⬜ Não iniciada  
**Estimativa:** 1 semana  
**Início:** *A definir*  
**Término:** *A definir*

| # | Task | Status | Notas |
|---|---|---|---|
| 4.1 | Atualizar fotos de TODOS os 145+ produtos (Freepik) | ⬜ | Substituir IA por fotos premium |
| 4.2 | Configurar variantes grama/unidade nos produtos | ⬜ | Produto a produto via Shopify admin (browser) |
| 4.3 | Criar seção "40 Anos de Tradição" | ⬜ | Storytelling visual |
| 4.4 | Criar seção de depoimentos | ⬜ | Minimalista |
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
| Sprint 2 — Homepage Premium | 9 | 0 | 0% |
| Sprint 3 — Produto & Carrinho | 12 | 0 | 0% |
| Sprint 4 — Conteúdo & Produtos | 7 | 0 | 0% |
| Sprint 5 — Polish & QA | 9 | 0 | 0% |
| **Total** | **44** | **5** | **11%** |

---

## Notas Técnicas Importantes

> [!NOTE]
> **Plano Shopify Basic** — O plano Basic suporta 100% do que precisamos: temas custom Liquid, metafields, variants (até 100 por produto, 3 opções), Online Store 2.0, SEO, etc. As únicas limitações são relatórios avançados e nº de contas staff — que não afetam o build.

> [!NOTE]
> **Workflow de desenvolvimento:** Todo o código Liquid é escrito localmente nesta workspace. Depois de pronto, o tema é empacotado e enviado para a Shopify. A edição de produtos (fotos, descrições, variantes) é feita via browser no admin da Shopify.

---

> **Última atualização:** 26/02/2026 — Documentação v2.0 criada (Full Custom Build), aguardando aprovação para iniciar Sprint 1.
