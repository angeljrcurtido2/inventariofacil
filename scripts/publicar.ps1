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
  }

  # Aviso de cola corta: cuando quedan pocos articulos programados, avisa en pantalla y deja un archivo en el Escritorio.
  $umbral = 4
  $aviso = Join-Path ([Environment]::GetFolderPath('Desktop')) 'AVISO_inventariofacil_escribir_articulos.txt'
  if ($pendientes -le $umbral) {
    $ultimaFecha = ($fechas | Sort-Object | Select-Object -Last 1)
    $texto = "Quedan $pendientes articulos programados en el blog de inventariofacil.site (el ultimo sale el $ultimaFecha).`r`n`r`nPara que el sitio no se quede sin contenido:`r`n1) Abri Claude Code.`r`n2) Decile: escribi la siguiente tanda de articulos para el blog de inventariofacil.`r`n3) Lee los articulos, y decile que los suba."
    Set-Content -Path $aviso -Value $texto -Encoding UTF8
    Log "AVISO: quedan $pendientes articulos programados. Se dejo $aviso y se mostro la notificacion."
    try {
      Add-Type -AssemblyName System.Windows.Forms, System.Drawing
      $n = New-Object System.Windows.Forms.NotifyIcon
      $n.Icon = [System.Drawing.SystemIcons]::Information
      $n.BalloonTipTitle = 'inventariofacil.site: hay que escribir mas articulos'
      $n.BalloonTipText = "Quedan $pendientes programados. Abri Claude Code y pedile la siguiente tanda."
      $n.Visible = $true
      $n.ShowBalloonTip(20000)
      Start-Sleep -Seconds 21
      $n.Dispose()
    } catch { Log "No se pudo mostrar la notificacion: $_" }
  } elseif (Test-Path $aviso) {
    Remove-Item $aviso -Force   # ya se cargaron mas articulos: se borra el recordatorio
  }
} catch {
  Log "ERROR: $_"
  exit 1
}
