# Acesso ao Perfil Chrome da Raminho

## Perfil correto

- Nome do perfil: `raminho`
- Diretorio do perfil: `Profile 14`
- Conta vinculada: `lojaraminhoimportadora@gmail.com`

## Caminhos

- Executavel do Chrome:
  - `C:\Program Files\Google\Chrome\Application\chrome.exe`

- Raiz dos perfis do Chrome:
  - `C:\Users\gusta\AppData\Local\Google\Chrome\User Data`

- Perfil da Raminho:
  - `C:\Users\gusta\AppData\Local\Google\Chrome\User Data\Profile 14`

## Comando para abrir o perfil da Raminho

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" "--profile-directory=Profile 14"
```

## Comando para abrir o perfil da Raminho com a extensao MCP

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\open-raminho-profile14-with-mcp-extension.ps1"
```

## Script criado no projeto

- Script de abertura do perfil real com MCP:
  - `C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\open-raminho-profile14-with-mcp-extension.ps1`

- Script para subir o servidor Playwright MCP por extensao:
  - `C:\Users\gusta\OneDrive\Área de Trabalho\Trabalho\Clientes\Raminho Importadora\scripts\start-playwright-mcp-extension-server.ps1`

## Observacao importante

- O perfil real da Raminho e o `Profile 14`.
- O perfil de automacao separado criado para testes fica em outro caminho e nao e o perfil real:
  - `C:\Users\gusta\AppData\Local\AIBrowserProfiles\RaminhoChrome`
