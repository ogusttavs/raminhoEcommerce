# Fretes — Raminho Importadora

## Status
✅ Planilha criada em 26/02/2026 — `Tabela_de_Fretes_Raminho_Lalamove.xlsx`

## Regras de Negócio (Definidas)
- **Parceiro logístico:** Lalamove
- **Central de despacho:** Mercado Municipal de São Paulo (Sé — CEP 01049-000)
- **Mínimo cobrado:** R$ 24,99 (mesmo que o Lalamove custe menos)
- **Margem:** Se Lalamove > R$ 24,99 → cobrar Lalamove + R$ 5,00
- **Arredondamento:** Sempre para X,99 (charm pricing — impressão de menos)
- **Veículos referência:** LalaPro (moto baú grande, placa vermelha) + Utilitário/Fiorino
- **Valor único por zona:** média entre LalaPro final e Fiorino final (1 frete único p/ cliente)

## Tabela de Valores Cobrados ao Cliente (26 zonas por bairro)

| Zona / Bairros | CEPs | **Frete** |
|---|---|---|
| **SP - CENTRO HISTÓRICO** — Sé, República, Bela Vista, Liberdade, Cambuci, Brás, Pari, Bom Retiro, Santa Cecília, Higienópolis, Consolação, Jardins, Cerqueira César, Paulista | 01000–01999 | **R$ 30,99** |
| **SP - ZONA NORTE — Santana / Casa Verde** — Santana, Casa Verde, Vila Guilherme, Vila Maria, Vila Medeiros | 02000–02299 | **R$ 35,99** |
| **SP - ZONA NORTE — Tucuruvi / Mandaqui** — Mandaqui, Tucuruvi, Tremembé, Vila Nova Cachoeirinha, Parada de Taipas | 02300–02699 | **R$ 45,99** |
| **SP - ZONA NORTE — Pirituba / Jaraguá** — Jaraguá, Perus, Brasilândia, Pirituba, Jaguaré Norte | 02700–02999 | **R$ 55,99** |
| **SP - ZONA LESTE — Mooca / Tatuapé** — Mooca, Tatuapé, Belenzinho, Brás Leste, Parque São Domingos | 03000–03199 | **R$ 34,99** |
| **SP - ZONA LESTE — Vila Formosa / Carrão** — Vila Formosa, Carrão, Aricanduva, Parque São Lucas, Vila Prudente, Água Rasa, Anália Franco | 03200–03599 | **R$ 42,99** |
| **SP - ZONA LESTE — Penha / São Miguel** — Penha, Cangaíba, Artur Alvim, Ermelino Matarazzo, São Miguel Paulista, Vila Jacuí | 03600–03999 | **R$ 51,99** |
| **SP - ZONA LESTE — Itaquera / São Mateus** — Itaquera, São Mateus, José Bonifácio, Iguatemi, Parque do Carmo | 08000–08299 | **R$ 64,99** |
| **SP - ZONA LESTE — Guaianazes / Tiradentes** — Guaianazes, Cidade Tiradentes, Lajeado, Sapopemba extremo | 08300–08499 | **R$ 72,99** |
| **SP - ZONA SUL — Vila Mariana / Moema** — Vila Mariana, Moema, Ibirapuera, Planalto Paulista | 04000–04099 | **R$ 34,99** |
| **SP - ZONA SUL — Ipiranga / Jabaquara** — Sacomã, Ipiranga, Cursino, Jabaquara, Vila Carioca, Heliópolis | 04100–04599 | **R$ 42,99** |
| **SP - ZONA SUL — Campo Limpo / M'Boi Mirim** — Cidade Ademar, Campo Limpo, M'Boi Mirim, Santo Amaro, Interlagos | 04600–04799 | **R$ 53,99** |
| **SP - ZONA SUL — Grajaú / Parelheiros** — Pedreira, Grajaú, Parelheiros, Cidade Dutra, Marsilac | 04800–04999 | **R$ 64,99** |
| **SP - ZONA OESTE — Pinheiros / Lapa** — Lapa, Perdizes, Pinheiros, Vila Madalena, Itaim Bibi, Jardim Europa | 05000–05199 | **R$ 34,99** |
| **SP - ZONA OESTE — Butantã / Jaguaré** — Butantã, Rio Pequeno, Jaguaré, Vila Sônia, Raposo Tavares próx. | 05200–05599 | **R$ 45,99** |
| **SP - ZONA OESTE — Campo Grande / Capão Redondo** — Campo Grande, Capão Redondo, Raposo Tavares, Jardim Ângela | 05600–05999 | **R$ 56,99** |
| **OSASCO + CARAPICUÍBA** | 06000–06299 | **R$ 58,99** |
| **BARUERI + ALPHAVILLE + JANDIRA** | 06300–06499 | **R$ 67,99** |
| **SANTANA DE PARNAÍBA** | 06500–06599 | **R$ 77,99** |
| **GUARULHOS — Cumbica / Vila Augusta** | 07000–07199 | **R$ 64,99** |
| **GUARULHOS — Centro / Bonsucesso** | 07200–07299 | **R$ 69,99** |
| **SÃO CAETANO DO SUL** | 09500–09599 | **R$ 47,99** |
| **SANTO ANDRÉ** | 09000–09299 | **R$ 67,99** |
| **MAUÁ** | 09300–09499 | **R$ 71,99** |
| **SÃO BERNARDO DO CAMPO** | 09600–09799 | **R$ 74,99** |
| **DIADEMA** | 09800–09999 | **R$ 66,99** |

## Arquivo
`Tabela_de_Fretes_Raminho_Lalamove.xlsx` (3 abas):
1. **Tabela de Fretes - Yampi** → pronta para importar no Yampi
2. **Referência de Cálculo** → cálculo transparente zona a zona
3. **Tabela Lalamove (Fonte)** → tabela oficial Lalamove SP consultada
