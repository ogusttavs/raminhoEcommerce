## Tema Final Premium

Base nova para o e-commerce Shopify da Raminho Importadora.

### Princípios desta base

- Referência visual: continuidade direta da LP atacado em `Sites/Lp-Atacado`.
- Posicionamento: varejo premium, classes A/B, foco em exclusividade, conveniência e confiança.
- Stack: Shopify OS 2.0 com Liquid, CSS e JS vanilla.
- Checkout: camada isolada em `snippets/checkout-provider.liquid`, agora apontada para `Yampi` por padrão.

### O que já existe

- Layout global com tokens de design.
- Header e footer configuráveis por menu do Shopify.
- Homepage editorial inicial.
- Cart drawer AJAX.
- Base de página de produto, coleção, busca, carrinho e 404.

### Decisões assumidas

- O checkout confirmado é `Yampi`, mas a integração segue isolada para evitar acoplamento estrutural ao tema.
- Enquanto a identidade visual final do e-commerce não chegar, a paleta continua no eixo azul, bege e dourado.
- A logo definitiva será plugada via tema settings, sem exigir refactor.

### Próximos blocos

1. Conectar o snippet oficial do checkout confirmado.
2. Refinar PDP com regras específicas de grama/unidade.
3. Integrar coleção/busca com filtros avançados e estados editoriais.
4. Aplicar a nova identidade visual assim que a pasta for entregue.
