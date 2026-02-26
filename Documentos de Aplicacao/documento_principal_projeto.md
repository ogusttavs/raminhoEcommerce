# 📋 DOC-004 — Documento Principal do Projeto

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-004 |
| **Versão** | 2.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Autor** | Equipe de Estratégia |

---

## 1. O Que É Este Projeto

> **"Como seria se a Apple, Disney ou Netflix vendessem frutas?"**

Construção de um **e-commerce premium completamente customizado** para a Raminho Importadora — 40+ anos de tradição no Mercado Municipal de São Paulo. Não é uma "reforma" do site atual. É uma **experiência digital de classe mundial** pensada do zero.

> [!IMPORTANT]
> O tema atual (Vision) **não será a base**. Vamos construir uma experiência totalmente nova e personalizada dentro do Shopify Liquid.

---

## 2. Informações da Empresa

| Item | Detalhe |
|---|---|
| **Razão Social** | Raminho Importadora |
| **CNPJ** | 04.890.131/0001-42 |
| **Endereço** | R. da Cantareira, 306 – Box 16 – Mercado Municipal, SP |
| **Tempo de mercado** | 40+ anos |
| **WhatsApp** | (11) 94036-1803 |
| **Instagram** | [@raminhoimportadoraoficial](https://instagram.com/raminhoimportadoraoficial) |

---

## 3. Stack Tecnológico

| Camada | Plataforma | Função | Docs |
|---|---|---|---|
| **Hospedagem & CMS** | Shopify | Loja, catálogo, tema 100% custom em Liquid | [DOC-006](./guia_shopify_liquid.md) |
| **Checkout** | Yampi | Checkout transparente | [DOC-007](./guia_yampi_checkout.md) |
| **Gateway** | Appmax | Processamento de pagamentos | [DOC-008](./guia_appmax_gateway.md) |
| **Entrega** | Motoboys próprios | Entrega D+1 com seguro de qualidade | — |
| **Fotos (Fase 1)** | Freepik Premium | Fotos de produto em alta resolução | — |
| **Fotos (Fase 2)** | Sessão profissional | Mercado Municipal, lifestyle, equipe | — |

---

## 4. Regras de Negócio

### Pedidos
| Regra | Valor |
|---|---|
| **Pedido mínimo** | R$129,90 |
| **Frete grátis** | Acima de R$497 |
| **Ticket médio atual** | ~R$300 |
| **Objetivo ticket médio** | R$400+ |

### Entrega & Garantia Premium
- **Motoboys próprios** — controle total de qualidade, não terceirizada
- **Frete = entrega + seguro de qualidade** — justifica o valor
- **Garantia total:** produto com mancha, defeito ou gosto ruim → reposição grátis via WhatsApp, sem custo adicional
- **Área:** Grande São Paulo (Capital, ABC, Guarulhos, Santana de Parnaíba)

### Features Especiais
- **Compra por Grama ou Unidade** em produtos específicos (ver [DOC-010](./feature_grama_unidade.md))

---

## 5. Direção Criativa

**Mantra:** *"Se não parece que a Apple fez, refaz."*

- Apple → Simplicidade, produto como herói, espaço branco
- Disney → Encantamento, atenção ao detalhe, emoção
- Netflix → Fluidez, personalização, categorização inteligente

> Detalhes completos em [DOC-011 — Direção Criativa](./direcao_criativa_referencias.md)

---

## 6. Índice de Documentos

| Nº | Documento | Descrição |
|---|---|---|
| **DOC-001** | [Persona & Público-Alvo](./persona_publico_alvo.md) | Personas, público-alvo, marketing |
| **DOC-002** | [Identidade Visual & Rebranding](./identidade_visual_rebranding.md) | Paleta, tipografia, implementação |
| **DOC-003** | [Análise E-commerce Atual](./analise_ecommerce_atual.md) | Auditoria do site atual (referência) |
| **DOC-004** | **Este documento** | Visão geral para qualquer agente |
| **DOC-005** | [Plano de Ação & Sprints](./plano_de_acao_sprints.md) | Plano completo com sprints |
| **DOC-006** | [Guia Shopify / Liquid](./guia_shopify_liquid.md) | Guia técnico da plataforma |
| **DOC-007** | [Guia Yampi Checkout](./guia_yampi_checkout.md) | Guia do checkout |
| **DOC-008** | [Guia Appmax Gateway](./guia_appmax_gateway.md) | Guia do gateway |
| **DOC-009** | [Sprint Todolist](./sprint_todolist.md) | Checklist vivo |
| **DOC-010** | [Feature Grama/Unidade](./feature_grama_unidade.md) | Spec da feature de compra por peso |
| **DOC-011** | [Direção Criativa](./direcao_criativa_referencias.md) | Referências Apple/Disney/Netflix |

---

## 7. Para Novos Agentes/Desenvolvedores

1. **Leia este documento** para entender o contexto geral
2. **Leia DOC-011** para entender a direção criativa (Apple/Disney/Netflix)
3. **Leia DOC-005** para ver o plano de ação e sprints
4. **Consulte DOC-009** para ver tasks pendentes
5. **Leia o guia da plataforma** (DOC-006/007/008) antes de tocar em código

### Regras:
- ⚠️ **Build custom** — não mexer no tema Vision, construir do zero
- ⚠️ **Linguagem: Liquid** — Shopify templates + custom sections
- ⚠️ **Checkout via Yampi** — `YampiSnippet.liquid` é sagrado
- ⚠️ **Fotos: Freepik** para produtos, sessão real para storytelling
- ⚠️ **Tom: Premium** — cada pixel e cada palavra comunicam qualidade
- ⚠️ **Mantra:** *"Se não parece que a Apple fez, refaz."*
