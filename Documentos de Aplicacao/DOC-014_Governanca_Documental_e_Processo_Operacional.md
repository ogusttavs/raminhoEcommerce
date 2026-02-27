# 🧭 DOC-014 — Governança Documental & Processo Operacional

| Metadado | Detalhe |
|---|---|
| **Nº do Documento** | DOC-014 |
| **Versão** | 1.0 |
| **Data de criação** | 27/02/2026 |
| **Status** | ✅ Ativo |
| **Objetivo** | Eliminar ambiguidade operacional e definir um fluxo único de execução daqui em diante |

---

## 1. Princípio de Não-Perda

Nada do histórico será apagado ou reescrito para "maquiar" passado.  
Quando houver informação conflitante entre documentos, aplica-se a hierarquia deste DOC-014.

---

## 2. Hierarquia Oficial de Fonte de Verdade

| Prioridade | Documento / Pasta | Papel |
|---|---|---|
| 1 (mais alta) | [DOC-000](./DOC-000_Diretrizes_Projeto.md) + este DOC-014 | Regras de engenharia, governança e processo |
| 2 | [DOC-004](./documento_principal_projeto.md) | Regras de negócio e direção do projeto |
| 3 | [DOC-009](./sprint_todolist.md) | Plano vivo e status de execução |
| 4 | [LOG-001](./LOG-001_Registro_de_Acoes.md) | Trilha cronológica das ações realizadas |
| 5 | `Estudos e Plano de Acao/` | Base estratégica e especificações de referência |
| 6 (histórico) | `Documentos de Aplicacao/revisoes/` | Auditorias pontuais (snapshot de época) |

Regra prática: se uma revisão antiga contradizer o estado atual, prevalecem `DOC-009` + `LOG-001`.

---

## 3. Conflitos Operacionais Já Resolvidos

### 3.1 Frete: "Motoboys próprios" vs "Lalamove"
- **Decisão ativa:** operação padrão com equipe própria (moto/carro), mantendo o posicionamento premium.
- **Uso da Lalamove:** referência de precificação e fallback operacional, conforme planilhas de `Organização de Frete/`.

### 3.2 Imagens: Freepik/Sessão Real vs IA
- **Decisão ativa:** estratégia oficial do produto segue DOC-004 (Freepik na fase 1 + sessão real na fase 2).
- **IA:** permitida como trilha paralela de P&D e contingência, nunca como substituição automática sem validação visual e registro no LOG.

### 3.3 Numeração DOC-012 duplicada
- **Contexto:** existe DOC-012 para logo e DOC-012 para imagens IA.
- **Regra de leitura para evitar ambiguidade:**
  - `DOC-012A` (alias operacional): `Estudos e Plano de Acao/rebranding_logo.md`
  - `DOC-012B` (alias operacional): `Imagens de Produto IA/DOC-012_Plano_Estrategico_Imagens_IA.md`
- Os nomes físicos dos arquivos foram preservados para manter histórico intacto.

---

## 4. Processo de Trabalho Único (a partir de agora)

### 4.1 Checklist de início de tarefa
1. Ler `DOC-000`, `DOC-014`, `DOC-009` e os últimos registros do `LOG-001`.
2. Escolher 1 microtarefa objetiva (escopo fechado).
3. Definir critério de pronto (DoD) antes de editar qualquer arquivo.

### 4.2 Execução
1. Implementar a mudança.
2. Validar rapidamente o impacto (funcional e/ou visual).
3. Evitar mudanças paralelas fora do escopo da microtarefa.

### 4.3 Encerramento obrigatório do ciclo
1. Atualizar `LOG-001` com data/hora, ação e motivo.
2. Atualizar `DOC-009` (status, nota ou checklist relacionado).
3. Só depois reportar a tarefa como concluída.

---

## 5. Regra de Mudança de Documentação

1. Novas regras operacionais entram primeiro neste DOC-014.
2. Mudanças de negócio entram no DOC-004 e refletem no DOC-009.
3. Revisões (`revisoes/`) não atualizam status vivo; servem para diagnóstico e histórico.
4. Qualquer novo documento deve ter:
   - metadados mínimos (número, versão, data, status);
   - links para documentos relacionados;
   - indicação clara se é "ativo", "referência" ou "histórico".

---

## 6. Definição de Pronto Documental (DoD de Docs)

Uma alteração só é considerada concluída quando:
1. os links entre documentos envolvidos funcionam;
2. não há conflito com as decisões ativas listadas neste DOC-014;
3. `LOG-001` e `DOC-009` foram atualizados no mesmo ciclo.
