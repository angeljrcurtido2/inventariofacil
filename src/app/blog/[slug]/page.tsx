import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { ARTICULOS, articuloPorSlug } from "@/config/blog";
import { rubroPorSlug } from "@/config/rubros";
import { TUTORIALES } from "@/config/tutoriales";
import { WhatsAppButton } from "@/components/Buttons";
import { Footer } from "@/components/Sections";
import { HeaderInterno, Migas, UltimosArticulos } from "@/components/Interna";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = articuloPorSlug((await params).slug);
  if (!a) return {};
  return {
    title: a.tituloSeo ?? a.titulo,
    description: a.descripcion,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", url: `/blog/${a.slug}`, title: a.titulo, description: a.descripcion, locale: SITE.locale, publishedTime: a.fecha, modifiedTime: a.actualizado ?? a.fecha },
  };
}

const fechaLarga = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-PY", { day: "numeric", month: "long", year: "numeric" });

export default async function PaginaArticulo({ params }: { params: Promise<{ slug: string }> }) {
  const a = articuloPorSlug((await params).slug);
  if (!a) notFound();
  const rubro = a.rubro ? rubroPorSlug(a.rubro) : undefined;
  const tutorial = a.tutorial ? TUTORIALES.find((t) => t.n === a.tutorial) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.descripcion,
    datePublished: a.fecha,
    dateModified: a.actualizado ?? a.fecha,
    inLanguage: "es-PY",
    mainEntityOfPage: `${SITE.url}/blog/${a.slug}`,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  return (
    <>
      <HeaderInterno />
      <main id="contenido" className="mx-auto max-w-3xl px-5 py-12">
        <Migas items={[{ nombre: "Blog", href: "/blog" }, { nombre: a.titulo, href: `/blog/${a.slug}` }]} />
        <article className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">{a.categoria} · {a.lectura} de lectura</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{a.titulo}</h1>
          <p className="mt-3 text-sm text-muted">{fechaLarga(a.fecha)}{a.actualizado ? ` · Actualizado el ${fechaLarga(a.actualizado)}` : ""}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-soft">
            {a.cuerpo.map((b, i) => {
              if (b.t === "h2") return <h2 key={i} className="pt-4 font-display text-2xl font-extrabold text-white">{b.x}</h2>;
              if (b.t === "p") return <p key={i}>{b.x}</p>;
              if (b.t === "ul") return <ul key={i} className="list-disc space-y-2 pl-6">{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
              if (b.t === "ol") return <ol key={i} className="list-decimal space-y-2 pl-6">{b.items.map((t) => <li key={t}>{t}</li>)}</ol>;
              return <p key={i} className="border-l-4 border-brand bg-ink-2 p-5 text-base"><b className="text-white">Consejo: </b>{b.x}</p>;
            })}
          </div>
        </article>

        {tutorial && (
          <p className="mt-10 border border-line bg-ink-2 p-5 text-base">
            Mirá este paso en video: <a href="/tutoriales" className="font-bold text-brand underline">«{tutorial.titulo}» en nuestros tutoriales</a>.
          </p>
        )}

        <section className="mt-12 border-2 border-brand bg-ink-2 p-8">
          <h2 className="font-display text-2xl font-extrabold">Llevalo a la práctica con {SITE.name}</h2>
          <p className="mt-2 text-soft">Ventas, stock, caja, deudas y reportes en un solo sistema, en tu celular y en la computadora.{rubro ? ` Mirá cómo funciona para ${rubro.nombre}.` : ""}</p>
          <p className="mt-5 flex flex-wrap items-center gap-4">
            <WhatsAppButton label="Quiero conocer el sistema" mensaje={`Hola, leí el artículo "${a.titulo}" y quiero conocer el sistema`} />
            {rubro && <a href={`/sistema-para/${rubro.slug}`} className="font-bold text-brand underline">Sistema para {rubro.nombre}</a>}
          </p>
        </section>

        <UltimosArticulos excluir={a.slug} cantidad={3} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
    </>
  );
}
