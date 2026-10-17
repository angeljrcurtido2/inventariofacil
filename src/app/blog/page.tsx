import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { ARTICULOS } from "@/config/blog";
import { Footer } from "@/components/Sections";
import { HeaderInterno, Migas, OtrosRubros } from "@/components/Interna";

export const metadata: Metadata = {
  title: "Blog: guías para ordenar y hacer crecer tu negocio",
  description: "Guías prácticas para comerciantes de Paraguay: cómo fijar precios, controlar el stock y los vencimientos, cobrar deudas y más.",
  alternates: { canonical: "/blog" },
};

const fechaLarga = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-PY", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  return (
    <>
      <HeaderInterno />
      <main id="contenido" className="mx-auto max-w-5xl px-5 py-12">
        <Migas items={[{ nombre: "Blog", href: "/blog" }]} />
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Blog de {SITE.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-soft">Guías simples y con ejemplos para ordenar tu negocio: precios, stock, caja, deudas y más.</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {ARTICULOS.map((a) => (
            <li key={a.slug} className="border border-line bg-ink-2">
              <a href={`/blog/${a.slug}`} className="flex h-full flex-col p-6 hover:bg-ink">
                <p className="text-xs font-bold uppercase tracking-wide text-brand">{a.categoria} · {a.lectura}</p>
                <h2 className="mt-3 font-display text-2xl font-extrabold leading-snug">{a.titulo}</h2>
                <p className="mt-3 flex-1 text-soft">{a.descripcion}</p>
                <p className="mt-4 text-sm text-muted">{fechaLarga(a.fecha)}</p>
              </a>
            </li>
          ))}
        </ul>
        <OtrosRubros />
      </main>
      <Footer />
    </>
  );
}
