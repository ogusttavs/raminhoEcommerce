# 📜 LOG-001 — Registro Geral de Ações (Action Logs)

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | LOG-001 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |

> **Propósito:** Registrar cronologicamente **todas** as modificações de arquitetura, configurações, alterações no código e execuções no Shopify, com Data, Hora, e o "Por Quê".
>
> 🔴 **REGRA DE OURO PARA AGENTES:**
> **VOCÊ DEVE ATUALIZAR ESTE ARQUIVO A CADA ÚNICA TAREFA CONCLUÍDA.** Não espere o fim do dia. Não espere a Sprint acabar. Acabou de criar um arquivo CSS? Faça o log. Acabou de alterar uma cor? Faça o log. *Isto garante que se o chat cair ou o desenvolvedor mudar, o projeto não se perde.*

---

## 🕒 Histórico de Execução (Sprints)

### [Pré-Sprint] — Fase de Estudos e Planejamento
- **[26/02/2026 - 16:30]** Criação do Estudo de Persona (DOC-001) e Identidade Visual (DOC-002).
- **[26/02/2026 - 17:00]** Auditoria do tema atual Vision (DOC-003). Identificadas falhas críticas: bloqueadores de UX, imagens de IA, assets pesados.
- **[26/02/2026 - 23:59]** **Sticky Buy Bar Excellence:** Redesenhada a barra para padrão de luxo Apple; agora é uma pílula de alto contraste com botão bold e preço integrado. Gatilho de scroll ajustado para "Sobre esta Colheita".
- **[26/02/2026 - 23:59]** **Header Branding Logic:** "Tudo Verde menos o Número". Ícones e logo agora são Verde Raminho por padrão. O contador do carrinho agora é Bege Heritage com número verde (alto contraste).
- **[26/02/2026 - 24:00]** **Navigation & Mobile:** Menu Desktop implementado com coleções estratégicas (Frutas de Época, Cestas, Colheita do Dia). Drawer Mobile fixado com efeito glassmorphism Apple. Progress 85%.
- **[26/02/2026 - 18:15]** Criação da pasta "Documentos de Aplicacao". Mapeado Fluxo de Engenharia (Best Practices) no DOC-000 e inicialização deste LOG-001.

### [Sprint 1] — Setup & Design System
- **[26/02/2026 - 19:00]** Criado layout mestre `Tema Shopify Premium/layout/theme.liquid`. Integradas as fontes _DM Sans_ e _Playfair Display_.
- **[26/02/2026 - 19:00]** Criada arquitetura de cores em `config/settings_schema.json` e `snippets/css-variables.liquid` (para atender ao requisito de fail-proof/fácil mudança caso o cliente decida reverter a paleta).
- **[26/02/2026 - 19:00]** Criado o arquivo base `assets/design-system.css`.
- **[26/02/2026 - 19:00]** Snippet vital de checkout da Yampi copiado para `snippets/YampiSnippet.liquid` para garantir integrações.
- **[26/02/2026 - 19:00]** Adicionada trava de fluxo do Cliente: `snippets/cart-validation.liquid` injetado no layout global para evitar compras menores que R$ 129,90, disparando alerta modal premium. (Commit: `feat: base theme layout and minimum order cart validation`).
- **[26/02/2026 - 19:15]** Criado o `DOC-013_Plano_de_Assinatura.md` para arquitetar o modelo de Clube de Assinaturas contornando as limitações do Shopify Basic via Yampi/Appmax. Inseridas as tasks de Assinatura na Sprint 2 (Frontend) e Sprint 4 (Backend). Tabela da Sprint 1 corrigida para 71% concluída.

### [Sprint 2] — Homepage Premium
- **[26/02/2026 - 19:30]** Estruturado o JSON `templates/index.json` definindo a ordem e arquitetura (OS 2.0) da Homepage.
- **[26/02/2026 - 19:30]** Desenvolvido `sections/header.liquid` (Navegação Sticky Glassmorphism) e `sections/hero-banner.liquid` (Banner imersivo com CSS parallax).
- **[26/02/2026 - 19:30]** Desenvolvidos os componentes de prateleira: `snippets/product-card-premium.liquid` (Card minimalista) e `sections/featured-collection-netflix.liquid` (Carrossel Horizontal).
- **[26/02/2026 - 19:30]** Adicionadas quebras de credibilidade: `sections/delivery-guarantee.liquid` (Motoboys e Seguro em Dark Mode); e `sections/newsletter.liquid` (Footer Capture).
- **[26/02/2026 - 19:40]** Para finalizar a Sprint 2 em 100%, criado o Bloco UI "O Culto ao Frescor" (`sections/subscription-teaser.liquid`), que faz o teaser visual do Clube de Assinaturas exigido na Homepage.
- **[26/02/2026 - 19:40]** Sprint 2 marcada como 100% "Concluída" em `task.md` e `sprint_todolist.md`. (Commit Final: `feat: finalize sprint 2 with subscription UI teaser`).
- **[26/02/2026 - 20:00]** QA & Refinamento: Resolvidos alertas de schema CLI no JSON e tamanho de labels.
- **[26/02/2026 - 20:05]** Ajuste de Copy/Tom de Voz: Removida linguagem agressiva "Culto" das seções de Assinatura e Newsletter. Reescrita sessão de Logística para refletir as entregas de Motoboy/Carro em D+1 exatamente como a operação exige.
- **[26/02/2026 - 20:10]** Correção Urgente B1: Ajustado parse de Liquid no `product-card-premium.liquid` que acusava erro "new_comment" ao usar form append direto na tag nativa; substituído por variável `assign form_id`.
- **[26/02/2026 - 20:10]** 🚀 **SPRINT 2 ENCERRADA BEM SUCEDIDA E APROVADA PELO DIRETOR.**

### [Sprint 3] — Produto & Carrinho
- **[26/02/2026 - 20:20]** Bootstrapp da Sprint 3: Criados os 3 pilares da nova Página de Produto -> `templates/product.json`, `sections/main-product.liquid`, e `assets/product-page.css`. 
- **[26/02/2026 - 20:20]** Arquitetado o Seletor de Variantes (Grama vs Unidade) usando um Web Component nativo `<variant-selects>` em Vanilla JS, desenhado no layout _Segmented Control_ da Apple para fluidez máxima, alterando o preço sem reloads da página.
- **[26/02/2026 - 20:20]** Blocos OS 2.0 liberados na página (`price`, `title`, `description`, `buy_buttons`, `trust_badge`).
- **[27/02/2026 - 00:30]** **Flagship Carousel Architecture:** Unificação das vitrines (Home e Recomendados) com o padrão "Netflix Flagship". Implementada rolagem horizontal full-bleed, primeiro item alinhado ao grid e setas de navegação inteligentes (hidden on mobile, hover-only on desktop).
- **[27/02/2026 - 00:45]** **Mathematical Logo Centering:** Migração do Header para CSS Grid com slots laterais fixos (70px). Garante que a logo Raminho esteja sempre no centro absoluto geométrico da tela, eliminando desvios causados por ícones ou menus.
- **[27/02/2026 - 01:00]** **UX Polish & Bug Fixes:** Resolvido bug crítico de overlap no mobile (títulos cortados pelo header fixo). Corrigida lógica de pedido mínimo (R$ 129,90) e frete grátis (R$ 497,00) no Drawer Cart para conformidade com DOC-004.
- **[27/02/2026 - 01:10]** **Card Cleanup:** Removida a 2ª imagem (hover) dos product cards para priorizar a estética "Clean Apple" e evitar instabilidades em conexões mobile.
- **[27/02/2026 - 02:00]** ⚠️ **ROLLBACK ARQUITETURAL (REVISÃO 002):** Após uma série de implementações que introduziram bugs gravíssimos de escopo JS e carregamento de assets (quebrando o carrinho em páginas secundárias e removendo o CSS de vitrines inteiras), o código fonte do tema foi **revertido 100% para o estado estável pré-refatoração** (commit `393480a`). A documentação (arquivos MD, análise de fretes, logos novos) gerada durante esse período foi preservada para histórico contínuo da operação, garantindo que nenhum conhecimento seja perdido.

---

*(Os próximos logs deverão ser registrados imediatamente após cada commit/ação na Sprint).*
