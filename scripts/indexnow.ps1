# Avisa a Bing/Yandex (IndexNow) de las URLs nuevas del sitio. Lo llama publicar.ps1 despues de publicar.
# Google no usa IndexNow: a Google se le avisa con el sitemap y desde Search Console.
$ErrorActionPreference = 'Continue'
$raiz = Split-Path -Parent $PSScriptRoot
$log = Join-Path $PSScriptRoot 'publicar.log'
function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  [indexnow] $m" | Add-Content -Path $log -Encoding UTF8 }
$key = 'f56096266fee73596009014e58431c2c'
$host_ = 'www.inventariofacil.site'
$enviadas = Join-Path $PSScriptRoot 'indexnow_enviadas.txt'
try {
  # Netlify tarda unos minutos en desplegar: se espera a que la llave este publicada.
  $ok = $false
  for ($i = 0; $i -lt 20 -and -not $ok; $i++) {
    try { $ok = ((Invoke-WebRequest "https://$host_/$key.txt" -UseBasicParsing -TimeoutSec 20).Content.Trim() -eq $key) } catch { }
    if (-not $ok) { Start-Sleep -Seconds 30 }
  }
  if (-not $ok) { Log 'La llave de IndexNow no esta publicada todavia; se omite.'; exit 0 }
  $xml = (Invoke-WebRequest "https://$host_/sitemap.xml" -UseBasicParsing -TimeoutSec 30).Content
  $urls = [regex]::Matches($xml, '<loc>([^<]+)</loc>') | ForEach-Object { $_.Groups[1].Value }
  $previas = if (Test-Path $enviadas) { @(Get-Content $enviadas) } else { @() }
  $nuevas = @($urls | Where-Object { $previas -notcontains $_ })
  if (-not $nuevas) { Log 'Sin URLs nuevas que avisar.'; exit 0 }
  $cuerpo = @{ host = $host_; key = $key; keyLocation = "https://$host_/$key.txt"; urlList = $nuevas } | ConvertTo-Json
  $r = Invoke-WebRequest 'https://api.indexnow.org/indexnow' -Method Post -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes($cuerpo)) -UseBasicParsing -TimeoutSec 30
  Add-Content -Path $enviadas -Value $nuevas -Encoding UTF8
  Log "Avisadas $($nuevas.Count) URLs a IndexNow (HTTP $($r.StatusCode))."
} catch { Log "ERROR: $_"; exit 1 }
