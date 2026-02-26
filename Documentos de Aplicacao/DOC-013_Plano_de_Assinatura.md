# 📦 DOC-013 — Arquitetura do Plano de Assinaturas (Clube Premium)

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-013 |
| **Status** | 🟡 Em Planejamento |
| **Data de criação** | 26/02/2026 |

Dado que o nosso público é Premium (Classe A, consome alta qualidade recorrentemente), um modelo de Clube de Assinaturas (ex: "Caixa Raminho Essencial Semanal") é o ápice da fidelização de receita previsível.

---

## 1. O Desafio Técnico (Shopify Basic)
A Shopify em seu plano Basic não possui um motor *nativo* maduro para assinaturas recorrentes B2C sem depender de aplicativos terceiros muito caros (como o Recharge ou Skio), que muitas vezes quebram o checkout transparente. 

**A Vantagem:** Nós usamos **Yampi + Appmax**. O Appmax e a Yampi possuem motores nativos robustos para lidar com transações recorrentes e cartões de crédito salvos, sendo ideal para o Brasil.

## 2. Abordagem de Implementação (O Caminho "Apple")

Para não criarmos uma experiência de usuário (UX) fragmentada, vamos utilizar a seguinte arquitetura técnica:

### Passo A: Criação do "Produto - Assinatura" na Shopify
Na Shopify, criaremos um produto chamado, por exemplo, "Clube Raminho — Cesta Seleção Semanal".
- **Preço:** Valor fixo da assinatura (ex: R$ 249,90).
- **Variantes:** O cliente pode escolher "Semanal", "Quinzenal" ou "Mensal". Neste caso, criamos um Produto para cada ciclo ou lidamos isso no Checkout.

### Passo B: Setup no Checkout Yampi / Gateway Appmax
A mágica acontece fora da Shopify (no nosso checkout transparente atual):
1. Quando o cliente clica em "Assinar", ele é levado para a **Yampi**.
2. Na Yampi (que se integra com a **Appmax**), configuramos aquele produto específico (o SKUs do Clube) para ser um produto do tipo **Recorrência (Assinatura)** no painel deles.
3. O Appmax assumirá a tokenização do cartão do cliente e fará as cobranças nos intervalos de 7, 15 ou 30 dias automaticamente.

### Passo C: Gestão Logística
Sempre que a recorrência bater no Appmax e o pagamento for aprovado, a Yampi gera um **novo pedido** automaticamente na Shopify com a tag "Assinatura". 
- A sua equipe de separação simplesmente recebe um pedido normal na tela toda semana e despacha a caixa com o motoboy.

---

## 3. UI/UX (O que o usuário vê)

Para comunicarmos isso de forma premium na **Homepage (Sprint 2)** e na **Página de Produtos (Sprint 3)**:
- Teremos uma seção dedicada "Assine o Frescor" na Homepage.
- No card do produto do Clube, em vez de "Adicionar ao Carrinho", o botão principal será **"Fazer Parte do Clube"** ou **"Assinar e Receber em Casa"**.
- Criaremos uma *Landing Page* específica (Página Customizada via JSON) apenas para vender o conceito da assinatura: a comodidade, a exclusividade das melhores frutas reservadas primeiro para os assinantes, e o frete grátis garantido.

## 4. Próximos Passos (Sprints)

1. **Sprint 2:** Incluir bloco visual da assinatura na Homepage.
2. **Sprint 3:** Layout focado em recorrência para a página desse produto.
3. **Sprint 4:** Configurar a recorrência técnica exata do seu produto no painel da **Yampi/Appmax**.
