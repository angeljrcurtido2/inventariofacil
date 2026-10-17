# Calendario de contenido — inventariofacil.site

Objetivo: que Google vea un sitio **vivo, útil y creciendo**. Lo que importa es la constancia, no el volumen.

## Ritmo mínimo (lo que no se negocia)

| Frecuencia | Qué | Tiempo aprox. |
|---|---|---|
| **1 artículo por semana** (mínimo 2 al mes) | Blog: una pregunta concreta de un comerciante, con ejemplos | 1 a 2 h |
| **1 video por mes** | Tutorial o caso de un rubro, público en YouTube, con link al sitio | ya los tenemos |
| **Cada mes** | Una página nueva por rubro o por tema (cuando haya algo que decir) | 2 h |
| **Cada 3 meses** | Actualizar los 3 artículos que más visitas tengan (fecha de «Actualizado» y datos) | 1 h |
| **Todos los lunes** (10 min) | Search Console: ¿hay errores? ¿qué búsquedas traen gente? | 10 min |
| **Cada mes** (30 min) | Ver qué páginas reciben visitas y qué preguntas hace la gente por WhatsApp → eso es el próximo artículo | 30 min |

## Cómo publicar un artículo (3 pasos)

1. Abrí `src/config/blog.ts` y agregá un objeto NUEVO AL PRINCIPIO de la lista `ARTICULOS` (con su fecha de hoy).
2. `npm run build` en la carpeta `landing` y subí la carpeta `out/` al hosting (Netlify).
3. En Search Console: «Inspección de URL» → pegá la dirección del artículo nuevo → «Solicitar indexación».

El sitemap y los enlaces internos se actualizan solos.

## Reglas para cada artículo

- Responde UNA pregunta que la gente se hace de verdad («¿cómo calculo el precio de venta?»), no «hablar del sistema».
- 600 a 1.000 palabras, con ejemplos en guaraníes y listas cortas.
- Título corto (≤ 50 caracteres en `tituloSeo`) y descripción de 140 a 155 caracteres.
- Enlaza a la página de su rubro y, si hay, al video de `/tutoriales`.
- Termina con una invitación clara (WhatsApp). Nunca prometas algo que el sistema no hace.

## Próximos 12 artículos (uno por semana)

1. Cómo hacer el cierre de caja diario sin diferencias
2. Qué es el stock mínimo y cómo calcularlo
3. Cómo hacer ofertas «3 por un precio» sin perder ganancia
4. Cómo armar un flyer de oferta para WhatsApp (con tu logo)
5. Códigos de barras: cómo asignarlos y leerlos con el celular
6. Cómo vender por kilo y por gramo en un almacén
7. Cómo organizar las compras a proveedores y sus deudas
8. Cómo saber cuáles son tus productos más rentables
9. IVA 10 %, 5 % y exentas: cómo cargar los precios
10. Cómo controlar el stock por color en una tienda
11. Cómo llevar la asistencia y los sueldos de tus empleados
12. Errores comunes al llevar el inventario (y cómo evitarlos)

## Fuera del sitio (también suma)

- **YouTube:** pasar los videos de «no listado» a **público**, con título claro («Cómo hacer tu primera venta | A.C System») y el link a inventariofacil.site en la descripción.
- **Google Business Profile:** completar y pedir reseñas a clientes contentos.
- **Facebook / Instagram / grupos de WhatsApp:** compartir cada artículo nuevo con una frase útil, no solo el link.
- **Enlaces:** pedir que mencionen tu sitio a cámaras de comercio, proveedores amigos y clientes que tengan web.

## Expectativas realistas

- Semanas 1-4: Google descubre y empieza a indexar.
- Meses 2-3: aparecen las primeras búsquedas específicas.
- Meses 4-6: con constancia, las páginas por rubro y los mejores artículos empiezan a posicionar.
- Si se corta la constancia, se frena todo. Mejor 1 artículo por semana todo el año que 10 en un mes y nada después.
