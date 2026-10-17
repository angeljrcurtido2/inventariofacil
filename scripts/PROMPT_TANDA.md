Trabajás en el repositorio del sitio inventariofacil.site (carpeta actual). Tu única tarea: escribir una tanda de artículos nuevos para el blog.

LEÉ PRIMERO, en este orden:
1. HECHOS_DEL_SISTEMA.md (es la ÚNICA fuente de lo que el sistema hace; respetala al pie de la letra).
2. src/config/blog.ts (el tipo `Articulo` y los bloques permitidos) y src/config/blog-cola.ts (el estilo de los artículos ya escritos; imitá su tono, estructura y longitud).
3. TEMAS_PENDIENTES.md.

HACÉ:
- Tomá los primeros {N} temas de la sección PENDIENTES de TEMAS_PENDIENTES.md y escribí un artículo por cada uno.
- Agregalos AL FINAL del arreglo `COLA` de src/config/blog-cola.ts, en ese orden, con exactamente estas fechas (campo `fecha`, una por artículo): {FECHAS}.
- Mové esos temas de PENDIENTES a USADOS en TEMAS_PENDIENTES.md (agregando al lado el slug del artículo).

REGLAS DE CONTENIDO (obligatorias):
- Voseo paraguayo cercano («tocá», «cargá», «mirá»). Sin jerga técnica.
- Cada artículo: entre 450 y 800 palabras en total, con al menos 4 bloques `h2`, listas cortas, ejemplos con guaraníes (Gs.) y cuentas simples que sean correctas (verificá cada operación).
- Resolvé de verdad la pregunta del tema; el sistema aparece solo en el último bloque o dos, como ayuda. Nada de publicidad forzada.
- Solo afirmá funciones que figuren en «Sí hace» de HECHOS_DEL_SISTEMA.md. No afirmes nada de la lista «NO afirmar».
- No inventes estadísticas, estudios, leyes, nombres de empresas ni promesas de resultados.
- Impuestos, sueldos y normativa: solo en términos generales y con «consultá con tu contador».
- Campos: `slug` único en kebab-case sin tildes; `tituloSeo` de 50 caracteres o menos; `titulo` natural; `descripcion` de 120 a 155 caracteres; `lectura` ("5 min" a "7 min"); `categoria` corta; `rubro` solo si es uno de: almacenes, farmacias, ferreterias, kioscos, tiendas-de-ropa; `tutorial` solo si es un número de 1 a 11 que corresponda de verdad.
- Terminá cada artículo con un bloque `p` que invite a probar el sistema sin exagerar.

NO HAGAS:
- No toques ningún otro archivo (solo src/config/blog-cola.ts y TEMAS_PENDIENTES.md).
- No ejecutes git, npm ni comandos: el script que te llamó valida y publica.
- No cambies artículos existentes ni sus fechas.

Al terminar, respondé con una línea: la cantidad de artículos agregados y sus slugs.
