# Estudo Inicial de Reposicionamento - Raminho Importadora

Data: 2026-03-18

## 1. Escopo analisado

- Ativos locais da pasta `Raminho Importadora`
- Site institucional/atacado: `https://raminhoimportadora.com.br/`
- Front Shopify/varejo: `https://raminhoimportadora.com/`
- Tema exportado em `Sites/Ecommerce - Varejo/tema Ativo`
- Materiais visuais como logo, paleta e fotos reais da operacao

Observacao:
- Nao foi possivel entrar nas areas logadas ja abertas no seu Chrome pessoal. A sessao disponivel para automacao nao estava conectada ao navegador ja autenticado, entao Shopify admin, Iamp, Apimex e Reportana ainda dependem de login manual seu quando formos auditar a parte interna.

## 2. Leitura da marca hoje

### O que a marca comunica de forma forte

- Tradicao: a marca se ancora em "mais de 40 anos", Mercadao e historia real.
- Autoridade: o simbolo oval, o nome "Importadora" e a fachada fisica passam confianca de negocio antigo e estabelecido.
- Premium: ha repeticao de "frutas premium", "padrao extra", "selecionadas", "excelencia".
- Agilidade: entrega, atacado, giro e atendimento por WhatsApp aparecem com frequencia.
- Capilaridade: a marca atende atacado e varejo, com operacao fisica e ecommerce.

### O que esta fragmentado

- Hoje existem duas caras de marca:
  - `.com.br` fala com atacado e posiciona bem a operacao.
  - `.com` vende no varejo, mas visualmente parece outro negocio.
- A identidade visual mistura muitas funcoes ao mesmo tempo:
  - azul institucional
  - amarelo forte de destaque
  - vermelho da marca
  - verde de CTA
  - preto/azul escuro no header e footer
- O resultado nao e "premium sofisticado". Fica mais proximo de "loja promocional com elementos premium".

## 3. Diagnostico estrategico

### QFD da marca

O que o cliente pede:
- fruta boa
- preco justo
- entrega
- praticidade

O que ele realmente quer:
- nao errar na compra
- receber mercadoria bonita, fresca e no ponto
- ter previsibilidade e confianca
- comprar de quem entende mais do que ele

O que ele deseja no nivel emocional:
- servir melhor o proprio cliente/familia
- sentir que comprou "padrao acima da media"
- ter relacao com um fornecedor/casa de frutas que transmite tradicao e criterio

### Mecanismo unico sugerido

A melhor alavanca para a Raminho nao e disputar so por preco nem so por variedade.

O diferencial mais forte e:

**Curadoria de frutas premium com criterio de Mercadao + tradicao de 40 anos + entrega pratica para atacado e varejo em Sao Paulo.**

Isso posiciona a marca como especialista de abastecimento e selecao, nao apenas como loja de frutas.

## 4. Diagnostico dos canais

### 4.1 Site institucional / atacado (`.com.br`)

Pontos fortes:
- narrativa mais madura
- foco claro em atacado
- boa valorizacao de segmentos como restaurantes, mercados, hoteis e eventos
- usa historia, operacao e confianca melhor do que o Shopify

Pontos de atencao:
- visual mais moderno do que o ecommerce, mas ainda sem sistema de marca totalmente consolidado
- a promessa de atacado esta melhor que a experiencia de varejo, criando ruptura entre descoberta e compra

### 4.2 Shopify / varejo (`.com`)

Pontos fortes:
- catalogo vivo e funcional
- categorias claras
- prova de operacao real com varios produtos
- PDP com opcoes de peso e maturacao ajuda a percepcao de cuidado

Pontos de atencao:
- popup de frete aparece cedo e toma a tela
- a home mistura banner promocional, cards de confianca e um bloco quebrado de "Produto mais Vendido"
- a secao de destaque esta puxando placeholder, com "Nome do produto" e imagem generica
- ha excesso de bordas amarelas, azul escuro e verde forte concorrendo entre si
- a sensacao geral e mais de tema adaptado do que de marca propria
- existe erro de console no site ao carregar, ligado a uma propriedade `protect`, o que indica ruido tecnico em script do front

## 5. Achados concretos no tema exportado

### Identidade atual configurada

Base encontrada no tema:
- azul principal: `#00276f`
- vermelho/acento: `#c3341b`
- amarelo: `#fae426` e `#fff600`
- verde de acao: `#12ab0c`
- fonte principal: `Poppins`

Leitura:
- a paleta conversa com a fachada e com o selo historico, entao nao deve ser abandonada
- o problema nao e a existencia das cores
- o problema e a hierarquia ruim entre elas

### Problemas de implementacao observados

- O tema da home esta configurado com `featured_product = morango-hidroponico`, o que muito provavelmente explica o bloco quebrado de "Produto mais Vendido" no ar.
- O popup de `Frete GRATIS` esta ativo na home.
- A secao institucional do Shopify usa um bom texto de marca, mas fica espremida dentro de uma home muito promocional.

Arquivos-chave:
- `Sites/Ecommerce - Varejo/tema Ativo/templates/index.json`
- `Sites/Ecommerce - Varejo/tema Ativo/config/settings_data.json`
- `Sites/Ecommerce - Varejo/tema Ativo/sections/featured-product.liquid`

## 6. Direcao de reposicionamento recomendada

### Tese central

Reposicionar a Raminho como:

**A casa de frutas premium do Mercadao que une tradicao, criterio de selecao e abastecimento confiavel para negocio e consumidor final.**

### Arquitetura de marca recomendada

Marca-mae:
- Raminho Importadora

Frentes:
- Raminho Atacado
- Raminho em Casa ou Raminho Varejo

Importante:
- nao criar duas marcas diferentes
- criar dois discursos dentro do mesmo sistema visual

### Pilares de mensagem

1. Tradicao que gera confianca
- Mais de 40 anos
- Mercadao
- conhecimento real de produto e safra

2. Curadoria de padrao extra
- selecao
- ponto ideal
- frutas nacionais, importadas e exoticas

3. Operacao que resolve
- entrega
- atendimento rapido
- cotacao e compra simples

4. Premium sem pose artificial
- qualidade alta, mas com raiz popular e credibilidade real

## 7. Direcao visual recomendada

### O que manter

- selo oval como ativo de heranca
- azul como cor principal institucional
- amarelo como energia e assinatura da marca
- vermelho como acento de heranca e origem
- fotos reais da banca, fachada, Mercadao e operacao

### O que mudar

- reduzir o verde para funcao comercial/CTA, nao para liderar a marca
- sair do visual "oferta gritante"
- usar mais respiro, branco quente e composicao editorial
- trocar blocos genricos por fotografia real de produto, caixa, equipe e mercado
- criar hierarquia clara:
  - azul = confianca
  - amarelo = destaque
  - vermelho = assinatura/heranca
  - verde = acao de compra

### Linguagem visual sugerida

- heranca + frescor + criterio
- menos cara de template
- mais cara de marca curadora
- tipografia com mais personalidade na comunicacao institucional e mais clareza no ecommerce

## 8. Prioridades praticas

### Prioridade 1 - alinhar narrativa

- separar claramente atacado e varejo no ecossistema
- manter a mesma espinha dorsal de marca nos dois canais
- definir uma frase-mestra oficial da marca

Sugestao de frase-mestra:
- "Tradicao em frutas premium, do Mercadao para o seu negocio e para a sua casa."

### Prioridade 2 - limpar o Shopify

- corrigir o bloco quebrado da home
- revisar popup de frete
- simplificar hero
- trocar imagens genericas por fotos reais
- revisar cards, bordas e pesos visuais
- padronizar CTA e selos

### Prioridade 3 - padronizar a experiencia ponta a ponta

- Shopify
- Iamp
- Apimex
- Reportana

Tudo precisa parecer parte do mesmo negocio:
- mesma assinatura visual
- mesma promessa
- mesma linguagem
- mesma confianca

## 9. Riscos e cuidados

- Existe pelo menos um arquivo sensivel/pessoal misturado com o material da marca em `Documentos`. Vale separar isso em pasta restrita para nao contaminar operacao, design e compartilhamento.
- A pasta tem muito material visual util, mas ainda sem curadoria. Antes do redesign, vale montar uma biblioteca final com:
  - fotos aprovadas
  - logos oficiais
  - paleta final
  - textos mestres
  - regras por canal

## 10. Proximo passo recomendado

Fase 1:
- consolidar a direcao de marca e identidade visual

Fase 2:
- aplicar primeiro no front Shopify

Fase 3:
- entrar nas areas logadas para alinhar checkout, gateway e mensagens

Quando voce quiser, eu posso seguir para a proxima etapa em duas trilhas:

1. Montar a nova proposta visual e textual da marca dentro do proprio tema Shopify
2. Auditar com voce, ja logado, Shopify admin + Iamp + Apimex + Reportana para reconfigurar toda a jornada
