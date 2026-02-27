# 💳 DOC-007 — Guia da Plataforma: Yampi (Checkout)

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-007 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Documentos relacionados** | [DOC-004 — Documento Principal](../Documentos de Aplicacao/documento_principal_projeto.md) · [DOC-008 — Appmax Gateway](./guia_appmax_gateway.md) |

---

## 1. O Que é Yampi

A **Yampi** é a plataforma de **checkout transparente** usada pela Raminho Importadora. Ela substitui o checkout padrão do Shopify, oferecendo:
- Checkout transparente (sem redirecionar para Shopify Checkout)
- One-page checkout otimizado para conversão
- Integração com múltiplos gateways de pagamento
- Upsell e order bump nativos
- Personalização visual do checkout
- Controles avançados de pedido

**Site oficial:** [yampi.com.br](https://yampi.com.br/)

---

## 2. Como a Yampi se Integra ao Shopify

### Snippet de Integração
A integração Yampi ↔ Shopify é feita via o snippet:
```
snippets/YampiSnippet.liquid (17KB)
```

Este snippet é incluído no `layout/theme.liquid`:
```liquid
{% capture yampi_snippet_content %}
  {% include 'YampiSnippet' %}
{% endcapture %}
{% unless yampi_snippet_content contains 'Liquid error' %}
  {% include 'YampiSnippet' %}
{% endunless %}
```

> ⚠️ **CUIDADO:** Não remover nem alterar o YampiSnippet sem entender a integração. Isso pode quebrar todo o checkout.

### Fluxo de Checkout
```
Página do Produto
  → Adicionar ao Carrinho (Shopify cart drawer)
    → "Finalizar Compra" (botão)
      → Yampi Checkout (transparente)
        → Appmax Gateway (processamento)
          → Pedido criado no Shopify
```

---

## 3. Configurações Relevantes para o Projeto

### Pedido Mínimo (R$129,90)
A configuração de pedido mínimo pode ser feita:

1. **Via Yampi Dashboard** — Configurações → Checkout → Regras de Pedido
2. **Via Liquid** — Validação no `sections/main-cart.liquid` antes de ir ao checkout
3. **Combinação** — Validação visual no Liquid + bloqueio no Yampi

> **Recomendação:** Implementar **nas duas camadas** para garantir. O Liquid mostra a mensagem amigável, o Yampi bloqueia de fato.

### Configurações de Pagamento
| Método | Status | Gateway |
|---|---|---|
| Cartão de Crédito | ✅ Ativo | Appmax |
| PIX | ✅ Ativo | Appmax |
| Boleto | ❌ Desabilitado | — |

### Parcelamento
| Parcelas | Taxa | Status |
|---|---|---|
| 1x | Sem juros | ✅ |
| 2x | Sem juros | ✅ |
| 3x | Sem juros | ✅ |
| 4x | Sem juros | ✅ |
| 5x+ | Com juros | Configurável |

---

## 4. Painel Yampi — Onde Configurar

| Seção | URL | O que fazer |
|---|---|---|
| **Dashboard** | `app.yampi.com.br` | Visão geral de pedidos |
| **Checkout** | Configurações → Checkout | Personalizar aparência e regras |
| **Pagamentos** | Configurações → Pagamentos | Gerenciar gateways (Appmax) |
| **Pedido Mínimo** | Configurações → Regras | Definir valor mínimo |
| **Upsell** | Marketing → Upsell | Configurar ofertas no checkout |
| **Order Bump** | Marketing → Order Bump | Ofertas adicionais |

---

## 5. Cuidados ao Editar

> [!CAUTION]
> - **Nunca** remover o `YampiSnippet.liquid` sem teste
> - **Nunca** alterar o fluxo do botão "Finalizar Compra" sem testar o checkout completo
> - Alterações no carrinho (`main-cart.liquid`) devem ser testadas até o checkout final
> - Se o checkout parar de funcionar, verificar se o snippet não está retornando `Liquid error`

---

## 6. Próximas Ações no Yampi

| Ação | Sprint | Status |
|---|---|---|
| Configurar pedido mínimo R$129,90 | Sprint 1 | ⬜ Pendente |
| Verificar possibilidade de desconto PIX | Sprint 4 | ⬜ Pendente |
| Personalizar visual do checkout (rebranding) | Sprint 3 | ⬜ Pendente |
| Configurar upsell no checkout | Futuro | ⬜ Pendente |
