import { SITE, whatsappLink } from "@/config/site";
import { RUBROS } from "@/config/rubros";
import { ARTICULOS } from "@/config/blog";

/** Encabezado de las páginas internas (rubros y blog): enlaces absolutos, sin anclas de la portada. */
export function HeaderInterno() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-3" aria-label={`${SITE.name}, ir al inicio`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand font-display text-lg font-extrabold text-ink">AC</span>
          <span className="font-display text-xl font-extrabold">{SITE.name}</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium text-soft md:flex">
          <a href="/#funciones" className="hover:text-white">Funciones</a>
          <a href="/sistema-para/farmacias" className="hover:text-white">Para tu negocio</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="/tutoriales" className="hover:text-white">Tutoriales</a>
          <a href="/#precio" className="hover:text-white">Precio</a>
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink hover:bg-white">
          WhatsApp
        </a>
      </div>
    </header>
  );
}

/** Migas de pan (también como datos estructurados para Google). */
export function Migas({ items }: { items: { nombre: string; href: string }[] }) {
  const lista = [{ nombre: "Inicio", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: lista.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.nombre, item: `${SITE.url}${m.href === "/" ? "" : m.href}` })),
  };
  return (
    <>
      <nav aria-label="Ruta" className="text-sm text-muted">
        {lista.map((m, i) => (
          <span key={m.href}>
            {i > 0 && <span className="px-2">/</span>}
            {i < lista.length - 1 ? <a href={m.href} className="hover:text-white">{m.nombre}</a> : <span className="text-soft">{m.nombre}</span>}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}

/** Enlaces a todas las páginas por rubro (refuerza la navegación y los enlaces internos). */
export function OtrosRubros({ actual }: { actual?: string }) {
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-extrabold">Sistema para cada tipo de negocio</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RUBROS.filter((r) => r.slug !== actual).map((r) => (
          <li key={r.slug}>
            <a href={`/sistema-para/${r.slug}`} className="block border border-line bg-ink-2 p-4 hover:border-brand">
              <span className="font-bold">Para {r.nombre}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function UltimosArticulos({ cantidad = 3, excluir }: { cantidad?: number; excluir?: string }) {
  const lista = ARTICULOS.filter((a) => a.slug !== excluir).slice(0, cantidad);
  if (!lista.length) return null;
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-extrabold">Del blog</h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {lista.map((a) => (
          <li key={a.slug} className="border border-line bg-ink-2">
            <a href={`/blog/${a.slug}`} className="block p-5 hover:bg-ink">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">{a.categoria}</p>
              <h3 className="mt-2 font-display text-lg font-extrabold leading-snug">{a.titulo}</h3>
              <p className="mt-2 text-sm text-soft">{a.descripcion}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
