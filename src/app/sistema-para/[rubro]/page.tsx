import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { RUBROS, rubroPorSlug } from "@/config/rubros";
import { ARTICULOS } from "@/config/blog";
import { WhatsAppButton } from "@/components/Buttons";
import { Icon } from "@/components/Icon";
import { Footer } from "@/components/Sections";
import { HeaderInterno, Migas, OtrosRubros } from "@/components/Interna";

export const dynamicParams = false;

export function generateStaticParams() {
  return RUBROS.map((r) => ({ rubro: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ rubro: string }> }): Promise<Metadata> {
  const r = rubroPorSlug((await params).rubro);
  if (!r) return {};
  return {
    title: r.titulo,
    description: r.descripcion,
    alternates: { canonical: `/sistema-para/${r.slug}` },
    openGraph: { type: "website", url: `/sistema-para/${r.slug}`, title: r.titulo, description: r.descripcion, locale: SITE.locale },
  };
}

export default async function PaginaRubro({ params }: { params: Promise<{ rubro: string }> }) {
  const r = rubroPorSlug((await params).rubro);
  if (!r) notFound();
  const articulos = ARTICULOS.filter((a) => r.articulos.includes(a.slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `${SITE.name} para ${r.nombre}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Android, Web",
        description: r.descripcion,
        url: `${SITE.url}/sistema-para/${r.slug}`,
        inLanguage: "es",
        offers: { "@type": "Offer", price: String(SITE.price), priceCurrency: SITE.currency, availability: "https://schema.org/InStock" },
      },
      { "@type": "FAQPage", mainEntity: r.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return (
    <>
      <HeaderInterno />
      <main id="contenido" className="mx-auto max-w-6xl px-5 py-12">
        <Migas items={[{ nombre: `Para ${r.nombre}`, href: `/sistema-para/${r.slug}` }]} />
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{r.h1}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">{r.intro}</p>
        <p className="mt-8 flex flex-wrap items-center gap-4">
          <WhatsAppButton label="Quiero verlo funcionando" mensaje={r.mensaje} />
          <span className="text-sm text-muted">Desde {SITE.priceDisplay} Gs. por mes · App Android y versión web</span>
        </p>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold">¿Te pasa esto en tu negocio?</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {r.dolores.map((d) => (
              <li key={d} className="border border-line bg-ink-2 p-5 text-soft">{d}</li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold">Cómo te ayuda {SITE.name}</h2>
          <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {r.soluciones.map((s) => (
              <li key={s.t} className="bg-ink-2 p-6">
                <Icon name="check" size={26} className="text-brand" />
                <h3 className="mt-3 font-display text-xl font-extrabold">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-soft">{s.d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold">Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-line border border-line">
            {r.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold">
                  {f.q}
                  <span className="faq-plus text-2xl text-brand transition" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {articulos.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-extrabold">Guías para {r.nombre}</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {articulos.map((a) => (
                <li key={a.slug} className="border border-line bg-ink-2">
                  <a href={`/blog/${a.slug}`} className="block p-5 hover:bg-ink">
                    <h3 className="font-display text-lg font-extrabold leading-snug">{a.titulo}</h3>
                    <p className="mt-2 text-sm text-soft">{a.descripcion}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 border-2 border-brand bg-ink-2 p-8">
          <h2 className="font-display text-3xl font-extrabold">Probalo en tu negocio</h2>
          <p className="mt-2 text-soft">Escribinos y te mostramos el sistema con ejemplos de tu rubro. Te ayudamos a cargar tus productos y a hacer tu primera venta.</p>
          <p className="mt-5"><WhatsAppButton label={`WhatsApp ${SITE.whatsappDisplay}`} mensaje={r.mensaje} /></p>
        </section>

        <OtrosRubros actual={r.slug} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
    </>
  );
}
