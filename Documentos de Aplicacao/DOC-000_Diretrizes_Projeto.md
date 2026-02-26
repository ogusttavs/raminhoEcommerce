# 🎯 DOC-000 — Diretrizes Mestre do Projeto (Engineering Playbook)

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-000 |
| **Versão** | 1.0 |
| **Data de criação** | 26/02/2026 |

Este é o **Documento Mestre** que rege 100% da forma como a engenharia, design e processos de negócio deverão ser conduzidos no e-commerce da Raminho Importadora. Todo Agente de IA ou Desenvolvedor Humano que entrar no projeto **deve** ler este documento PRIMEIRO e seguir estas regras estritamente.

> 🔴 **REGRA DE OURO PARA AGENTES AVULSOS:**
> Se você é um novo Agente de IA assumindo este projeto agora, sua primeira ação obrigatória é abrir o arquivo `Documentos de Aplicacao/LOG-001_Registro_de_Acoes.md` e o `Documentos de Aplicacao/sprint_todolist.md`. Lá você entenderá exatamente onde o projeto parou e qual é a sua próxima micro-tarefa. Não tome ações destrutivas sem ler o log.

---

## 1. O Padrão de Qualidade ("A Regra de Ouro")
> *"Se não parece que a Apple fez, apague e refaça."*

Nosso e-commerce não é uma lojinha comum; é a vitrine digital sustentada por 40 anos de autoridade do Mercado Municipal de SP. A entrega tem que ser premium, fluida, silenciosamente elegante e sem nenhuma fricção para o cliente (UX Nível A).

---

## 2. Boas Práticas de Engenharia (Workflow)

Abaixo estão as práticas obrigatórias que guiam o nosso ciclo de vida de desenvolvimento:

### 2.1 Git Versioning (Dia 0)
> **Ação:** O GitHub será inicializado **antes** mesmo da primeira linha de código da Sprint 1 ser escrita, e não depois. Isso garante que teremos um ponto de *rollback* limpo da infraestrutura.

- A branch `main` é a fonte da verdade (produção).
- Jamais faça *commits* diretamente na `main` que não sejam testados.
- Criação de branches deve seguir o padrão: `feature/nome-da-feature`, `fix/nome-do-bug`.

### 2.2 Conventional Commits
Para manter os Action Logs organizados, todo *commit* (e toda mensagem de atualização do Agente) deve seguir a conversão semântica:
- `feat:` Uma nova funcionalidade (ex: `feat: add seletor grama/unidade`)
- `fix:` Correção de algo que quebrou (ex: `fix: resolver erro do checkout Yampi`)
- `docs:` Mudanças apenas na documentação (ex: `docs: atualizar DOC-005 sprints`)
- `style:` Formatação de visual/UI, sem mudar lógica.
- `chore:` Tarefas de manutenção (ex: atualizar versão do bundle).

### 2.3 Registro Obrigatório de Ações (Logging) Contínuo
Toda alteração de arquitetura, variável de CSS criada, ou nova funcionalidade inserida deve ser imediatamente documentada no documento **`LOG-001_Registro_de_Acoes.md`** e no respectivo **`sprint_todolist.md`**. 

> ⚠️ **MANDATÓRIO:** O registro não é feito "no final do dia". Ele é feito **a cada ação concluída**. Ao iniciar uma requisição do Cliente, o Agente sempre atua no ciclo:
1. Analisa e constrói a solução.
2. Escreve a solução/código.
3. **ATUALIZA simultaneamente o `LOG-001` (com a ação) e o `sprint_todolist` (marcando checklist).**
4. Só então informa sucesso ao cliente.

### 2.4 Testes de QA e Mobile-First
O código deverá ser primariamente responsivo ("Mobile-First"), afinal a esmagadora maioria das compras será feita via smartphone. Toda vez que uma sessão ou template for concluída, ela não é comemorada como pronta sem antes um teste severo no *Checkout Transparente da Yampi*.

---

## 3. Topologia de Código e Ferramentas

| Ferramenta / Arquitetura | Regra Específica |
|---|---|
| **Shopify Temas (Liquid)** | Não clonaremos temas prontos (Vision extinto). O build é 100% Scratch usando *Sections Everywhere*. |
| **CSS (Design System)** | Sem bibliotecas pesadas. Tudo via Custom Properties / Variáveis injetadas a partir do Settings (Theme Admin). |
| **Imagens / Assets** | Nunca fazer upload de `.PNG` pesados para o *assets* do tema se puder ser convertido para `.WebP` otimizado via CDN Shopify. |
| **Yampi e Appmax** | Nenhum JavaScript que intercepta o botão "Finalizar Compra" deve ser alterado sem validar a string oficial `YampiSnippet`. |

---

## 4. ONDE ENCONTRAR O QUE (A Árvore de Documentos)

A pasta principal de inteligência do projeto é a **`Documentos de Aplicacao/`**, que atua como o cérebro central. A pasta secundária **`Estudos e Plano de Acao/`** contém as diretrizes criativas.

1. **`LOG-001_Registro_de_Acoes.md`**: O que aconteceu, hoje.
2. **`sprint_todolist.md`** (DOC-009): Para onde vamos amanhã (checklists).
3. **`documento_principal_projeto.md`** (DOC-004): Regras do Negócio.
4. **`direcao_criativa_referencias.md`** (DOC-011): A estética visual do projeto.

---
**Fim das Diretrizes.** Com a aprovação destas regras e com o Git inicializado, a Sprint 1 (Design System & Infraestrutura CSS) tem autorização para começar.
