param(
  [int]$Port = 9222
)

$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profileRoot = Join-Path $env:LOCALAPPDATA "AIBrowserProfiles\RaminhoChrome"

if (-not (Test-Path $chromePath)) {
  Write-Error "Chrome nao encontrado em $chromePath"
  exit 1
}

New-Item -ItemType Directory -Force -Path $profileRoot | Out-Null

$urls = @(
  "https://admin.shopify.com/store/cd592c-2?ui_locales=pt-BR&country=BR",
  "https://app.reportana.com/#/dashboard/overview",
  "https://seguro.raminhoimportadora.com/checkout/address"
)

$args = @(
  "--remote-debugging-port=$Port",
  "--user-data-dir=$profileRoot",
  "--new-window"
) + $urls

$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $chromePath
$psi.Arguments = [string]::Join(" ", ($args | ForEach-Object { '"{0}"' -f $_ }))
$psi.UseShellExecute = $true
[System.Diagnostics.Process]::Start($psi) | Out-Null

Write-Output "Chrome da Raminho iniciado."
Write-Output "Perfil controlavel: $profileRoot"
Write-Output "Debug URL: http://127.0.0.1:$Port"
Write-Output "Depois do login manual, qualquer cliente MCP pode conectar nessa sessao."
