param()

$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$projectRoot = Split-Path $PSScriptRoot -Parent
$extensionPath = Join-Path $projectRoot "tools\playwright-mcp-extension\unpacked"

if (-not (Test-Path $chromePath)) {
  Write-Error "Chrome nao encontrado em $chromePath"
  exit 1
}

if (-not (Test-Path $extensionPath)) {
  Write-Error "Extensao MCP nao encontrada em $extensionPath"
  exit 1
}

$urls = @(
  "chrome://extensions/",
  "https://admin.shopify.com/store/cd592c-2?ui_locales=pt-BR&country=BR",
  "https://app.reportana.com/#/dashboard/overview",
  "https://seguro.raminhoimportadora.com/checkout/address"
)

$args = @(
  "--profile-directory=Profile 14",
  "--load-extension=$extensionPath",
  "--new-window"
) + $urls

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $chromePath
$psi.Arguments = [string]::Join(" ", ($args | ForEach-Object { '"{0}"' -f $_ }))
$psi.UseShellExecute = $true
[System.Diagnostics.Process]::Start($psi) | Out-Null

Write-Output "Chrome aberto no Profile 14 da Raminho com a extensao MCP carregada."
Write-Output "Se a extensao nao aparecer, feche todas as janelas do Chrome e rode novamente."
Write-Output "Perfil esperado: raminho / lojaraminhoimportadora@gmail.com"
