# Publicación automática: se ejecuta martes y viernes (Programador de tareas de Windows).
# Si hay artículos cuya fecha ya llegó y todavía no se publicaron, hace un commit y un push; Netlify, que escucha a GitHub,
# recompila el sitio y los artículos aparecen. No toca nada más.
# Prueba sin subir nada:  powershell -File scripts\publicar.ps1 -Hoy 2026-10-20 -SoloProbar
param([string]$Hoy = (Get-Date -Format 'yyyy-MM-dd'), [switch]$SoloProbar)

$ErrorActionPreference = 'Continue'
Set-Location (Split-Path -Parent $PSScriptRoot)
$log = Join-Path $PSScriptRoot 'publicar.log'
function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $m" | Add-Content -Path $log -Encoding UTF8 }
function Git([string]$args_) {
  $o = cmd /c "git $args_ 2>&1" | Out-String
  if ($LASTEXITCODE -ne 0) { throw "git $args_ -> $o" }
  return $o
}

try {
  if (-not $SoloProbar) { Git 'pull --rebase origin main' | Out-Null }
  $fechas = Select-String -Path 'src\config\blog.ts', 'src\config\blog-cola.ts' -Pattern 'fecha: "(\d{4}-\d{2}-\d{2})"' |
    ForEach-Object { $_.Matches[0].Groups[1].Value }
  $vencida = $fechas | Where-Object { $_ -le $Hoy } | Sort-Object | Select-Object -Last 1
  $ultima = if (Test-Path '.publicado') { (Get-Content '.publicado' -Raw).Trim() } else { '' }
  $pendientes = ($fechas | Where-Object { $_ -gt $Hoy }).Count

  if (-not $vencida -or $vencida -eq $ultima) {
    Log "Nada nuevo para publicar (hoy $Hoy, ultima publicada $ultima, programados a futuro: $pendientes)."
  } elseif ($SoloProbar) {
    Log "PRUEBA: publicaria hasta la fecha $vencida (ultima publicada $ultima, programados a futuro: $pendientes)."
  } else {
    Set-Content -Path '.publicado' -Value $vencida -Encoding ASCII
    Git 'add .publicado' | Out-Null
    Git "commit -m `"Publicar contenido programado hasta $vencida`"" | Out-Null
    Git 'push origin main' | Out-Null
    Log "Publicado hasta $vencida y enviado a GitHub. Programados a futuro: $pendientes."
    if ($pendientes -le 2) { Log "AVISO: quedan $pendientes articulos programados. Hay que escribir mas." }
  }
} catch {
  Log "ERROR: $_"
  exit 1
}
