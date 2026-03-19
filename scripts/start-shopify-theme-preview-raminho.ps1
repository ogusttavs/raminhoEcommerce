param(
  [string]$Store = "cd592c-2",
  [int]$Port = 9292
)

$projectRoot = Split-Path $PSScriptRoot -Parent
$themePath = Join-Path $projectRoot "Sites\Ecommerce - Varejo\tema Apple Frutas"
$logPath = Join-Path $projectRoot "logs\shopify-theme-dev.log"

New-Item -ItemType Directory -Force -Path (Split-Path $logPath -Parent) | Out-Null
Remove-Item $logPath -ErrorAction SilentlyContinue

if (-not (Test-Path $themePath)) {
  Write-Error "Tema nao encontrado em $themePath"
  exit 1
}

Write-Output "Subindo preview do tema..."
Write-Output "Loja: $Store.myshopify.com"
Write-Output "Tema: $themePath"
Write-Output "Log: $logPath"

shopify theme dev `
  --store $Store `
  --path $themePath `
  --host 127.0.0.1 `
  --port $Port `
  --no-color 2>&1 | Tee-Object -FilePath $logPath
