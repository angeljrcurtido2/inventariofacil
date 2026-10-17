# A.C System — sitio de presentación (Next.js 16 + TypeScript + Tailwind 4)

Sitio estático (`output: "export"`): no necesita servidor. Se publica la carpeta `out/` en Netlify,
Cloudflare Pages, Vercel o cualquier hosting estático.

## Comandos
- `npm run dev` — desarrollo en http://localhost:3000
- `npm run build` — genera `out/` (HTML, CSS y JS ya optimizados)

## Qué editar
- `src/config/site.ts` — nombre, WhatsApp, precio, dominio del sitio, dominio de la web de la app y link de Google Play.
  También se pueden cambiar con variables de entorno: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`.
- `src/components/Sections.tsx` — textos de cada sección y las preguntas frecuentes (también alimentan el JSON-LD).
- `src/app/privacidad/page.tsx` — política de privacidad (texto base, conviene que lo revise un profesional).
- `src/app/opengraph-image.png` — imagen que se ve al compartir el link en WhatsApp/Facebook (1200×630).
- `public/img/` — capturas de la app en webp.

## SEO incluido
Metadatos y Open Graph, `lang="es-PY"`, canonical, `sitemap.xml`, `robots.txt`, manifest, JSON-LD
(Organization, WebSite, SoftwareApplication con precio y FAQPage), encabezados semánticos y cero JavaScript propio.
Lighthouse (móvil, prueba local sin compresión): Accesibilidad 100, Buenas prácticas 100, SEO 100.

## Publicar en Netlify
Con Git: Build command `npm run build`, Publish directory `out`.
Sin Git: arrastrar la carpeta `out/` a Netlify → Deploys.
