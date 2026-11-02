# Contexto del proyecto: inventariofacil.site (blog automatizado + SEO)

Última actualización: 2026-11-02. Sirve para retomar el trabajo en una sesión nueva de Claude Code sin perder contexto.
Para retomar: abrir Claude Code en esta carpeta y decir "leé CONTEXTO_PROYECTO.md".

## 1. Qué es
- Sitio de marketing de la app **A.C System** (control de ventas/stock). Repo: `angeljrcurtido2/inventariofacil`, rama `main`.
- Next.js 16.4.0, export estático (`out/`). Netlify despliega solo al hacer push a `main` (netlify.toml: `npm run build`, publish `out`, Node 22).
- Dominios: sitio `https://www.inventariofacil.site` (el apex redirige 301 al www). La app web está en `https://app.inventariofacil.shop` (proyecto distinto, SPA).
- Config central: `src/config/site.ts` (SITE.name "A.C System", url, appUrl, Play Store `com.angeljrcurtido.kontrolx`).
- Artículos: `src/config/blog.ts` (ya publicados) y `src/config/blog-cola.ts` (programados por `fecha`). Un artículo se muestra cuando su fecha es <= `.publicado` (variable `PUBLICAR_HASTA` al compilar).

## 2. Automatización de publicación (local, esta PC siempre encendida)
- Tarea programada de Windows: **`inventariofacil-publicar`**, martes y viernes 09:00, ejecuta `scripts\publicar.ps1`. Con `StartWhenAvailable`. Solo corre con la sesión de usuario iniciada (LogonType Interactive).
- `scripts/publicar.ps1`: `git pull --rebase`, busca la última `fecha` <= hoy en blog.ts + blog-cola.ts, escribe `.publicado`, commit y push. Si quedan <= 4 artículos futuros, llama a `escribir_tanda.ps1`. Log en `scripts/publicar.log` (ignorado por git).
- `scripts/escribir_tanda.ps1`: Claude Code en modo sin pantalla (`claude.exe -p`, solo Read/Edit/Write/Glob/Grep) escribe N=12 artículos a partir de `TEMAS_PENDIENTES.md` siguiendo `scripts/PROMPT_TANDA.md`. Valida (cantidad, fechas, palabras prohibidas, tsc, build), y recién ahí hace commit + push; si algo falla, deshace todo y avisa en el Escritorio.
  - **Importante:** este script aborta si hay archivos modificados o sin seguir (untracked) fuera de `blog-cola.ts` / `TEMAS_PENDIENTES.md`. Mantener el árbol de git limpio (commitear cualquier archivo nuevo, p. ej. este .md).
  - La primera compilación suele frenarse por un aviso de seguridad de Next.js 16.4.0 (versión desactualizada); el script reintenta una vez.
- Estado al 2026-11-02: `.publicado` = 2026-10-30. Próxima corrida: martes 2026-11-03 09:00, debe publicar `codigos-de-barras-en-tu-negocio`. Verificar en `scripts\publicar.log`.
- Prueba sin subir nada: `powershell -File scripts\escribir_tanda.ps1 -N 1 -SoloProbar`.
- Palabras prohibidas en artículos: SIFEN, factura electrónica, sin internet, offline, pasarela, "aumenta tus ventas", garantiz*, y mencionar iOS/iPhone/iPad.

## 3. Diagnóstico SEO (por qué casi no aparece al buscar "inventariofacil")
**Search Console (propiedad de dominio `inventariofacil.site`), vista del 2026-11-02:**
- 13 páginas indexadas, 5 no indexadas, curva de indexadas subiendo.
- 5 no indexadas = 3 "Página con redirección" (variantes http / sin www → 301 al www, es normal) + 2 "Descubierta: actualmente sin indexar" (Google las conoce y aún no las rastreó, normal en sitio nuevo).
- 1 aviso "Indexada aunque bloqueada por robots.txt": el `robots.txt` actual es `Allow: /` + sitemap, no bloquea nada; probablemente es una lectura vieja de Google. **Pendiente ver qué URL es** (Indexación > Páginas > clic en ese motivo).
- Rendimiento: solo 2 clics en total (último ~17/10).

**Técnico OK:** `index,follow`, canonical al www, `robots.txt` y `sitemap.xml` correctos, JSON-LD, redirecciones 301 correctas.

**Causas probables de baja visibilidad:**
1. El sitio se llama "A.C System" en título/og/siteName; "Inventario Fácil" (con espacio) aparece 0 veces y falta en keywords. Google lee "inventariofacil" como "inventario fácil".
2. Término genérico que compite con una app de iPhone llamada "Inventario Facil", plantillas y otras apps.
3. Dominio nuevo (~1 mes), pocos artículos, casi sin enlaces externos.
4. `inventariofacil.shop` (app) devuelve HTML en `/robots.txt` (soft-404) y puede competir con el sitio.

## 4. Hecho el 2026-11-02 (con la extensión de Brave ya conectada)
- Aviso "bloqueada por robots.txt": ya marca 0 páginas (se resolvió solo). Sitemap "Correcto", 15 URLs descubiertas, última lectura 31/10.
- Rendimiento 12-31/10: 59 impresiones, 2 clics, posición media 29; aparece por búsquedas de artículos ("inventario inicial", "cierre de caja"), nunca por la marca.
- Commit `4a6659e`: título "Inventario Fácil | A.C System: ...", descripción, keywords y JSON-LD (alternateName) con "Inventario Fácil". Desplegado en Netlify.
- Solicitada la indexación de la portada en Search Console (URL en Google, título nuevo pendiente de relectura).

- Solicitada también la indexación de /blog. Las únicas 2 URLs "descubiertas sin indexar" son /blog y /privacidad; todos los artículos y rubros ya están indexados.
- IndexNow (Bing/Yandex): `public/f56096266fee73596009014e58431c2c.txt` (llave) + `scripts/indexnow.ps1`, llamado por publicar.ps1 tras cada publicación; registra lo enviado en scripts/indexnow_enviadas.txt (gitignored). Primer envío: 17 URLs, HTTP 202.
- Google no usa IndexNow; a Google lo descubre por el sitemap. No se automatizó "Solicitar indexación" (solo existe en la interfaz de Search Console y exige el navegador conectado).

## 5. Pendientes / ideas
- [ ] Dar de alta el sitio en Bing Webmaster Tools (importar desde Search Console) para ver datos de Bing.
- [ ] Enlaces externos: ficha de Play Store, Facebook, Instagram, Google Business (los hace el usuario).
- [ ] `inventariofacil.shop`: agregar `robots.txt` real y `noindex` (o apuntar al .site). Proyecto aparte; requiere OK.
- [ ] Enlaces externos: ficha de Play Store, Facebook, Instagram, Google Business.
- [ ] Medir con búsquedas de intención: "sistema de ventas Paraguay", "control de stock para almacén", no solo la marca.
- [ ] Decidir si actualizar Next.js (aviso de seguridad de versión 16.4.0). Decisión del usuario; la compilación pide correr `next upgrade --agent=security`, no se hizo.

## 6. Conectar Claude con el navegador (para revisar Search Console)
- El usuario usa **Brave** (basado en Chromium) con la extensión "Claude" instalada con acceso completo.
- No se pudo conectar en la sesión del 2026-11-02: no hay herramientas `mcp__claude-in-chrome__*` y el "native messaging host" de Claude **no está registrado** en el registro de Windows (ni Chrome, ni Brave, ni Chromium).
- La integración viene en Claude Code 2.1.314 (flag `--chrome`), no es un MCP a instalar. Probar:
  1. Terminal: `claude --chrome`, o en VS Code una sesión nueva y `/chrome`.
  2. Brave abierto con la extensión activa y Search Console a la vista.
  3. Si no reconoce Brave, instalar la extensión en Google Chrome.
- Alternativa sin extensión: pegar capturas de Search Console (URL bloqueada por robots.txt y estado de Sitemaps).

## 7. Otros datos útiles
- Credencial de Git guardada (Git Credential Manager, usuario angeljrcurtido2): el push funciona sin pedir clave.
- Commits recientes relevantes: `ddb1ea8` "Publicar contenido programado hasta 2026-10-30", `ea73ccf` reintento de compilación en la tanda.
