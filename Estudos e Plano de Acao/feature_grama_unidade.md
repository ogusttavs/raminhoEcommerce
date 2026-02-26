# ⚖️ DOC-010 — Feature: Compra por Grama ou Unidade

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-010 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |
| **Última atualização** | 26/02/2026 |
| **Documentos relacionados** | [DOC-005 — Plano de Ação](./plano_de_acao_sprints.md) · [DOC-006 — Guia Shopify](./guia_shopify_liquid.md) |

---

## 1. Descrição da Feature

Permitir que o cliente escolha, em **produtos específicos**, se quer comprar por **grama** ou por **unidade**.

**Exemplo prático:**
- **Figo Roxo:** O cliente pode comprar "500g por R$44,95" ou "1 unidade por R$12,00"
- **Banana Prata:** Vende só por KG (R$15,99/kg) — sem opção de unidade
- **Maracujá Granadilla:** Vende só por unidade (R$46,68/un) — sem opção de grama

---

## 2. Tipos de Produto

| Tipo | Como vende | Exemplo |
|---|---|---|
| **Grama + Unidade** | Cliente escolhe | Figo, maçã, pêssego |
| **Só por Grama/KG** | Peso fixo | Banana (por cacho/kg), uva |
| **Só por Unidade** | Quantidade fixa | Melão, abacaxi, mamão |

---

## 3. Implementação Técnica em Shopify Liquid

### Opção A — Via Variants (Recomendada)

Cada produto com dupla opção terá **variantes** no Shopify:

```
Produto: Figo Roxo
├── Variante 1: "250g" — R$24,95
├── Variante 2: "500g" — R$44,95
├── Variante 3: "1kg" — R$84,90
├── Variante 4: "1 unidade" — R$12,00
└── Variante 5: "3 unidades" — R$32,00
```

**Prós:** Funciona nativamente com Shopify, Yampi e controle de estoque  
**Contras:** Muitas variantes por produto (limite Shopify: 100 por produto)

### Opção B — Via Line Item Properties

```liquid
<div class="purchase-type-selector">
  <button class="type-btn active" data-type="gram">Por Grama</button>
  <button class="type-btn" data-type="unit">Por Unidade</button>
</div>

<div class="gram-options" id="gram-selector">
  <select name="properties[Peso]">
    <option value="250g">250g — R$24,95</option>
    <option value="500g">500g — R$44,95</option>
    <option value="1kg">1kg — R$84,90</option>
  </select>
</div>

<div class="unit-options hidden" id="unit-selector">
  <input type="number" name="properties[Quantidade]" min="1" value="1" />
  <span>unidades — R$12,00/un</span>
</div>
```

**Prós:** Mais flexível, UI mais rica  
**Contras:** Properties não afetam preço nativamente, precisa de app ou JS custom

### Opção C — Via Metafields + Custom Liquid (Mais Premium)

Usar **metafields** para definir quais produtos têm opção de grama/unidade, e um snippet Liquid que renderiza o UI dinâmicamente.

```liquid
{% if product.metafields.custom.sell_by_gram %}
  {% render 'gram-unit-selector', product: product %}
{% endif %}
```

**Prós:** Mais clean, configurável por produto  
**Contras:** Requer JS custom para lógica de preço

---

## 4. Design do Seletor — Estilo Apple

O seletor deve parecer o **Segmented Control** do iOS:

```
┌──────────────┬──────────────┐
│  Por Grama   │  Por Unidade │
└──────────────┴──────────────┘
     ▲ selecionado
```

**Visual:**
- Cantos arredondados (pill shape)
- Opção ativa com fundo `--color-primary` e texto branco
- Opção inativa com fundo transparente e texto escuro
- Transição suave ao trocar (0.3s ease)
- Mobile-friendly (toque amigável)

---

## 5. Decisões a Tomar

| Decisão | Opções | Recomendação |
|---|---|---|
| **Abordagem técnica** | Variants vs Line Properties vs Metafields | **Variants** para MVP, **Metafields** na versão final |
| **Quais produtos têm dupla opção?** | Definir lista com o cliente | Verificar catálogo produto a produto |
| **Opções de peso** | 100g, 250g, 500g, 1kg? | **250g, 500g, 1kg** (3 opções = clean) |
| **Preço por grama ou por peso fixo?** | Calculadora de peso vs opções fixas | **Opções fixas** (mais simples, mais premium) |

---

## 6. Prioridade nas Sprints

| Sprint | Ação |
|---|---|
| **Sprint 2** | Definir com o cliente quais produtos terão dupla opção |
| **Sprint 3** | Implementar seletor visual (UI) nos novos cards de produto |
| **Sprint 4** | Configurar variantes/metafields produto a produto na Shopify |
