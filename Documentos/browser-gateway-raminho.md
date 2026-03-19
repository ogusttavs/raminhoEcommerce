# Browser Gateway da Raminho

## O que foi instalado

- `chrome-devtools-mcp`
- `@playwright/mcp`

## Melhor arquitetura para "qualquer IA"

Nao existe um jeito seguro e universal de qualquer IA sequestrar qualquer janela ja aberta do seu navegador pessoal.

O jeito mais forte e reutilizavel e:

1. usar o perfil real do Chrome com uma ponte MCP por extensao
2. ou usar um Chrome dedicado para automacao, quando quiser isolamento
3. expor essa sessao via MCP
4. conectar qualquer cliente de IA que suporte MCP

## Caminho recomendado para o perfil real da Raminho

Script:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\open-raminho-profile14-with-mcp-extension.ps1"
```

Esse script tenta abrir o Chrome no `Profile 14` real da Raminho com a extensao oficial `Playwright MCP Bridge` carregada.

Depois, suba o servidor MCP:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\start-playwright-mcp-extension-server.ps1"
```

Observacao:

- se o Chrome da Raminho ja estiver aberto, o Windows pode reaproveitar o processo existente e ignorar a flag de extensao
- se isso acontecer, feche todas as janelas do Chrome e rode o script novamente

## Como abrir a sessao controlavel

No PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\start-raminho-ai-browser.ps1"
```

Isso abre um Chrome separado com:

- Shopify admin da Raminho
- Reportana
- checkout seguro
- porta de depuracao em `http://127.0.0.1:9222`

## Como outras IAs podem usar

Use o arquivo:

- `C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\Documentos\mcp-config-raminho.example.json`

Ele traz dois modos:

- `raminho-chrome-live`
  - conecta numa sessao do Chrome ja aberta na porta 9222
  - melhor quando voce quer reaproveitar login e estado

- `raminho-browser-persistent`
  - usa Playwright MCP com um perfil persistente da Raminho
  - melhor quando voce quer mais compatibilidade de automacao

- `playwright-mcp --extension`
  - melhor quando voce quer usar o perfil real ja logado da Raminho
  - depende da extensao `Playwright MCP Bridge`

## Limite real

- Chrome/Edge/Brave e mais facil porque usam o ecossistema Chromium.
- Firefox e Safari exigem outro fluxo e nao sao tao bons para reaproveitar sessao viva.
- Para contas sensiveis, login manual continua sendo a forma correta.
