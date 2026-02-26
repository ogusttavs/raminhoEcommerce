# 💰 DOC-008 — Guia da Plataforma: Appmax (Gateway de Pagamento)

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-008 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Documentos relacionados** | [DOC-004 — Documento Principal](./documento_principal_projeto.md) · [DOC-007 — Yampi Checkout](./guia_yampi_checkout.md) |

---

## 1. O Que é Appmax

A **Appmax** é o **gateway de pagamento** utilizado pela Raminho Importadora. Ela é a camada que processa as transações financeiras (cartões, PIX) entre o cliente e a loja.

**Fluxo:**
```
Cliente → Yampi (checkout) → Appmax (gateway) → Adquirente/Banco → Aprovação → Shopify (pedido)
```

**Site oficial:** [appmax.com.br](https://appmax.com.br/)

---

## 2. Como Appmax se Conecta

### Cadeia de Integração
```
Shopify (loja) ←→ Yampi (checkout) ←→ Appmax (gateway) ←→ Bancos/Adquirentes
```

A **Appmax não se conecta diretamente ao Shopify** — ela é o gateway configurado **dentro da Yampi**. A Yampi é o intermediário.

### Métodos de Pagamento Ativos

| Método | Status | Detalhes |
|---|---|---|
| **Cartão de Crédito** | ✅ Ativo | Visa, Mastercard, Elo, Amex, Hipercard, Discover |
| **PIX** | ✅ Ativo | Pagamento instantâneo |
| **Boleto** | ❌ Desabilitado | Não configurado atualmente |

---

## 3. Configuração de Parcelamento

As taxas de parcelamento configuradas no tema (`settings_data.json`):

| Parcelas | Taxa | Valor para R$100 |
|---|---|---|
| 1x | 0% | R$100,00 |
| 2x | 5,45% | R$52,73 |
| 3x | 6,78% | R$35,59 |
| 4x | 8,25% | R$27,06 |
| 5x | 9,66% | R$21,93 |
| 6x | 11,04% | R$18,51 |
| 7x | 12,25% | R$16,04 |
| 8x | 13,85% | R$14,23 |
| 9x | 15,44% | R$12,83 |
| 10x | 16,59% | R$11,66 |
| 11x | 18,19% | R$10,74 |
| 12x | 19,79% | R$9,98 |

> Atualmente o site mostra parcelamento **até 4x sem juros**. As taxas acima são para compras parceladas com juros (5x+).

---

## 4. Painel Appmax — Onde Configurar

| Seção | O que fazer |
|---|---|
| **Dashboard** | Visão geral de transações e faturamento |
| **Transações** | Histórico de pagamentos, chargebacks |
| **Configurações** | Métodos de pagamento, taxas, antifraude |
| **PIX** | Configurar chave PIX e políticas |
| **Antifraude** | Regras de segurança para transações |

---

## 5. Cuidados ao Editar

> [!CAUTION]
> - **A Appmax é configurada via painel da Yampi** — não mexer no código Liquid para alterar pagamentos
> - **Taxas de parcelamento** no `settings_data.json` são apenas para **exibição visual** — as taxas reais são da Appmax
> - **Nunca** alterar credenciais do gateway sem autorização
> - Qualquer mudança em métodos de pagamento deve ser testada com transação real

---

## 6. Próximas Ações com Appmax

| Ação | Sprint | Status | Observação |
|---|---|---|---|
| Verificar suporte a desconto PIX | Sprint 4 | ⬜ Pendente | Precisa confirmar com Appmax se suporta desconto automático |
| Avaliar ativar boleto | Futuro | ⬜ Pendente | Público premium pode não usar, avaliar demanda |
| Revisar taxas de parcelamento | Sprint 1 | ⬜ Pendente | Alinhar taxas exibidas no site com taxas reais da Appmax |

---

## 7. Diferença entre Yampi e Appmax

| | Yampi | Appmax |
|---|---|---|
| **O que faz** | Interface do checkout (formulário, UX) | Processa o pagamento (autoriza transação) |
| **Cliente vê?** | Sim — é a tela do checkout | Não — processa em background |
| **Onde configurar** | app.yampi.com.br | Painel Appmax (via Yampi ou direto) |
| **Se falhar** | Checkout não carrega | Pagamento é recusado |
| **Código no tema** | `YampiSnippet.liquid` | Nenhum (via Yampi API) |
