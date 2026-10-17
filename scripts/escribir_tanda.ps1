# Escribe una nueva tanda de articulos para el blog con Claude Code (modo sin pantalla), la valida y la sube.
# Lo llama publicar.ps1 cuando quedan pocos articulos programados. Tambien se puede correr a mano:
#   powershell -File scripts\escribir_tanda.ps1 -N 1 -SoloProbar      (prueba: escribe, valida y DESHACE todo, no sube nada)
#
# Seguridad: Claude solo puede leer y editar archivos (no ejecuta comandos). Este script valida el resultado
# (cantidad, fechas, palabras prohibidas, compilacion) y recien ahi hace commit y push. Si algo falla, deshace todo y avisa.
param([int]$N = 12, [switch]$SoloProbar)

$ErrorActionPreference = 'Continue'
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz
$log = Join-Path $PSScriptRoot 'publicar.log'
function Log($m) { "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  [tanda] $m" | Add-Content -Path $log -Encoding UTF8 }
function Git([string]$a) { $o = cmd /c "git $a 2>&1" | Out-String; if ($LASTEXITCODE -ne 0) { throw "git $a -> $o" }; return $o }
function Avisar([string]$titulo, [string]$texto, [string]$archivoTxt) {
  if ($archivoTxt) { Set-Content -Path (Join-Path ([Environment]::GetFolderPath('Desktop')) $archivoTxt) -Value $texto -Encoding UTF8 }
  try {
    Add-Type -AssemblyName System.Windows.Forms, System.Drawing
    $n = New-Object System.Windows.Forms.NotifyIcon
    $n.Icon = [System.Drawing.SystemIcons]::Information
    $n.BalloonTipTitle = $titulo; $n.BalloonTipText = $texto.Substring(0, [Math]::Min(250, $texto.Length))
    $n.Visible = $true; $n.ShowBalloonTip(20000); Start-Sleep -Seconds 21; $n.Dispose()
  } catch { }
}
function Deshacer { cmd /c "git checkout -- src/config/blog-cola.ts TEMAS_PENDIENTES.md 2>&1" | Out-Null }

$archivosTanda = @('src/config/blog-cola.ts', 'TEMAS_PENDIENTES.md')
try {
  # 0) Un intento por dia como maximo (si falla, no insiste en bucle).
  $intento = Join-Path $raiz '.tanda_intento'
  $hoy = Get-Date -Format 'yyyy-MM-dd'
  if (-not $SoloProbar -and (Test-Path $intento) -and ((Get-Content $intento -Raw).Trim() -eq $hoy)) { Log 'Ya se intento hoy; se reintenta en la proxima corrida.'; exit 2 }
  if (-not $SoloProbar) { Set-Content -Path $intento -Value $hoy -Encoding ASCII }

  # 1) Que no haya cambios pendientes en los archivos que Claude va a tocar.
  $sucio = (Git 'status --porcelain -- src/config/blog-cola.ts TEMAS_PENDIENTES.md').Trim()
  if ($sucio) { throw "Hay cambios sin guardar en los archivos de la cola; no se escribe la tanda. $sucio" }
  if (-not $SoloProbar) { Git 'pull --rebase origin main' | Out-Null }

  # 2) Temas y fechas.
  $temasTxt = Get-Content 'TEMAS_PENDIENTES.md' -Raw -Encoding UTF8
  $pend = [regex]::Match($temasTxt, '(?s)## PENDIENTES(.*?)## USADOS').Groups[1].Value
  $cantTemas = ([regex]::Matches($pend, '(?m)^\d+\.\s')).Count
  if ($cantTemas -lt $N) {
    Avisar 'inventariofacil.site: faltan TEMAS para el blog' "Solo quedan $cantTemas temas en TEMAS_PENDIENTES.md. Abri Claude Code y pedile que proponga una lista nueva de temas." 'AVISO_inventariofacil_faltan_temas.txt'
    throw "Solo quedan $cantTemas temas pendientes (se necesitan $N)."
  }
  $fechas = Select-String -Path 'src\config\blog.ts', 'src\config\blog-cola.ts' -Pattern 'fecha: "(\d{4}-\d{2}-\d{2})"' | ForEach-Object { $_.Matches[0].Groups[1].Value }
  $ultima = [datetime]::ParseExact(($fechas | Sort-Object | Select-Object -Last 1), 'yyyy-MM-dd', $null)
  $nuevas = @(); $d = $ultima
  while ($nuevas.Count -lt $N) { $d = $d.AddDays(1); if ($d.DayOfWeek -eq 'Tuesday' -or $d.DayOfWeek -eq 'Friday') { $nuevas += $d.ToString('yyyy-MM-dd') } }
  $slugsAntes = ([regex]::Matches((Get-Content 'src/config/blog-cola.ts' -Raw -Encoding UTF8), '(?m)^\s+slug: "')).Count

  # 3) Claude escribe (solo lectura/edicion, sin comandos), con limite de tiempo.
  $claude = Get-ChildItem "$env:USERPROFILE\.vscode\extensions\anthropic.claude-code-*\resources\native-binary\claude.exe" -ErrorAction SilentlyContinue | Sort-Object FullName | Select-Object -Last 1
  if (-not $claude) { throw 'No se encontro claude.exe (extension de Claude Code de VS Code).' }
  $prompt = (Get-Content (Join-Path $PSScriptRoot 'PROMPT_TANDA.md') -Raw -Encoding UTF8).Replace('{N}', "$N").Replace('{FECHAS}', ($nuevas -join ', '))
  Log "Escribiendo $N articulos con Claude (fechas $($nuevas[0]) a $($nuevas[-1]))..."
  $job = Start-Job -ScriptBlock {
    param($exe, $dir, $p)
    Set-Location $dir
    $p | & $exe -p --allowedTools 'Read,Edit,Write,Glob,Grep' --permission-mode acceptEdits --max-turns 80 2>&1 | Out-String
  } -ArgumentList $claude.FullName, $raiz, $prompt
  if (-not (Wait-Job $job -Timeout 1800)) { Stop-Job $job; Remove-Job $job -Force; throw 'Claude tardo mas de 30 minutos; se cancela.' }
  $salida = Receive-Job $job; Remove-Job $job -Force
  Log ("Respuesta de Claude: " + ($salida.Trim() -replace '\s+', ' ').Substring(0, [Math]::Min(300, $salida.Trim().Length)))

  # 4) Validaciones.
  $cambiados = (Git 'status --porcelain').Split("`n") | Where-Object { $_.Trim() } | ForEach-Object { $_.Substring(3).Trim() }
  $extra = $cambiados | Where-Object { $archivosTanda -notcontains $_ -and $_ -ne 'scripts/publicar.log' -and $_ -ne '.tanda_intento' }
  if ($extra) { throw "Claude toco archivos no permitidos: $($extra -join ', ')" }
  $cola = Get-Content 'src/config/blog-cola.ts' -Raw -Encoding UTF8
  $slugsDespues = ([regex]::Matches($cola, '(?m)^\s+slug: "')).Count
  if ($slugsDespues -ne $slugsAntes + $N) { throw "Se esperaban $N articulos nuevos y hay $($slugsDespues - $slugsAntes)." }
  $fechasDespues = [regex]::Matches($cola, 'fecha: "(\d{4}-\d{2}-\d{2})"') | ForEach-Object { $_.Groups[1].Value }
  $ultimas = $fechasDespues | Select-Object -Last $N
  if (($ultimas -join ',') -ne ($nuevas -join ',')) { throw "Las fechas de los articulos nuevos no coinciden con las pedidas." }
  $slugs = [regex]::Matches($cola, '(?m)^\s+slug: "([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
  if (($slugs | Select-Object -Unique).Count -ne $slugs.Count) { throw 'Hay slugs repetidos.' }
  $prohibidas = 'SIFEN|factura electr|sin internet|offline|pasarela|tarjeta de cr.dito integrada|aumenta(s|ra)? tus ventas|garantiz'
  $nuevoTexto = $cola.Substring($cola.IndexOf($slugs[$slugs.Count - $N]) - 20)
  $m = [regex]::Match($nuevoTexto, $prohibidas, 'IgnoreCase')
  if (-not $m.Success) { $m = [regex]::Match($nuevoTexto, '\b(iOS|iPhone|iPad)\b') }
  if ($m.Success) { throw "Aparece una frase prohibida en los articulos nuevos: '$($m.Value)'." }
  if ($nuevoTexto.Length -lt $N * 2500) { throw 'Los articulos nuevos son demasiado cortos.' }

  # 5) Compilacion (con fecha lejana para que tambien compile lo programado).
  $env:PUBLICAR_HASTA = '2099-12-31'
  cmd /c "npx tsc --noEmit 2>&1" | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Error de tipos (tsc) en los articulos nuevos.' }
  cmd /c "npm run build 2>&1" | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'La compilacion del sitio fallo con los articulos nuevos.' }
  Remove-Item Env:PUBLICAR_HASTA -ErrorAction SilentlyContinue

  # 6) Publicar (o deshacer si es prueba).
  if ($SoloProbar) { Set-Content -Path (Join-Path $PSScriptRoot 'ultima_prueba.txt') -Value $nuevoTexto -Encoding UTF8; Deshacer; Log "PRUEBA OK: se escribieron y validaron $N articulo(s) ($($slugs[-$N..-1] -join ', ')). Se deshizo todo."; exit 0 }
  Git "add src/config/blog-cola.ts TEMAS_PENDIENTES.md" | Out-Null
  Git "commit -m `"Blog: nueva tanda de $N articulos programados ($($nuevas[0]) a $($nuevas[-1]))`"" | Out-Null
  Git 'push origin main' | Out-Null
  Log "Tanda publicada en GitHub: $N articulos del $($nuevas[0]) al $($nuevas[-1])."
  $dest = Join-Path ([Environment]::GetFolderPath('Desktop')) 'AVISO_inventariofacil_escribir_articulos.txt'
  if (Test-Path $dest) { Remove-Item $dest -Force }
  Avisar 'inventariofacil.site: se escribieron articulos nuevos' "Se escribieron $N articulos para el blog (del $($nuevas[0]) al $($nuevas[-1])). Revisalos en src\config\blog-cola.ts; si alguno no te gusta, borralo o avisale a Claude. El primero sale el $($nuevas[0])." 'REVISAR_inventariofacil_articulos_nuevos.txt'
  exit 0
} catch {
  Log "ERROR: $_"
  Remove-Item Env:PUBLICAR_HASTA -ErrorAction SilentlyContinue
  Deshacer
  if (-not $SoloProbar) { Avisar 'inventariofacil.site: no se pudo escribir la tanda' "Fallo la escritura automatica de articulos nuevos: $_ Abri Claude Code y pedile la siguiente tanda." 'AVISO_inventariofacil_escribir_articulos.txt' }
  exit 1
}
