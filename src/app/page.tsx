import { Contacto, CtaFinal, FAQ, Footer, Funciones, Header, Hero, Pasos, Plataformas, Precio, Preguntas, VideoDemo } from "@/components/Sections";
import { SITE } from "@/config/site";
import { RUBROS } from "@/config/rubros";
import { UltimosArticulos } from "@/components/Interna";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organizacion`,
      name: SITE.name,
      url: SITE.url,
      areaServed: { "@type": "Country", name: "Paraguay" },
      contactPoint: { "@type": "ContactPoint", telephone: `+${SITE.whatsappNumber}`, contactType: "customer service", availableLanguage: "es" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#sitio`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "es-PY",
      publisher: { "@id": `${SITE.url}/#organizacion` },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, Web",
      description: SITE.description,
      url: SITE.url,
      downloadUrl: SITE.playStoreUrl,
      inLanguage: "es",
      offers: { "@type": "Offer", price: String(SITE.price), priceCurrency: SITE.currency, availability: "https://schema.org/InStock", url: `${SITE.url}/#precio` },
    },
    {
      "@type": "VideoObject",
      name: `${SITE.name}: sistema de ventas, stock y caja en el celular y en la web`,
      description: "Recorrido por las pantallas principales del sistema: ventas, productos, caja, cobro de deudas, ingresos y egresos, y flyers de ofertas.",
      thumbnailUrl: `${SITE.url}/video/poster.webp`,
      contentUrl: `${SITE.url}/video/anuncio.mp4`,
      uploadDate: "2026-10-14",
      duration: "PT61S",
      inLanguage: "es",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="contenido">
        <Hero />
        <Funciones />
        <section id="rubros" className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Pensado para tu tipo de negocio</h2>
            <p className="mt-4 max-w-2xl text-lg text-soft">Mirá cómo te ayuda el sistema según lo que vendés.</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RUBROS.map((r) => (
                <li key={r.slug}>
                  <a href={`/sistema-para/${r.slug}`} className="flex h-full flex-col border border-line bg-ink-2 p-6 hover:border-brand">
                    <span className="font-display text-xl font-extrabold">Para {r.nombre}</span>
                    <span className="mt-2 text-soft">{r.intro.split(". ")[0]}.</span>
                    <span className="mt-4 text-sm font-bold text-brand">Ver cómo funciona →</span>
                  </a>
                </li>
              ))}
            </ul>
            <UltimosArticulos cantidad={3} />
          </div>
        </section>
        <VideoDemo />
        <Plataformas />
        <Pasos />
        <Precio />
        <Preguntas />
        <Contacto />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
