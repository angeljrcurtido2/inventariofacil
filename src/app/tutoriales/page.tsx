import type { Metadata } from "next";
import { SITE, whatsappLink } from "@/config/site";
import { TUTORIALES } from "@/config/tutoriales";
import { VideoYouTube } from "@/components/VideoYouTube";
import { WhatsAppButton } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Tutoriales en video",
  description: `Aprendé a usar ${SITE.name} paso a paso: cargar tu negocio, abrir la caja, vender por caja, pack o kilo, y cerrar el día.`,
  alternates: { canonical: "/tutoriales" },
};

export default function Tutoriales() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": TUTORIALES.filter((t) => t.id).map((t) => ({
      "@type": "VideoObject",
      name: `${SITE.name}: ${t.titulo}`,
      description: t.detalle,
      thumbnailUrl: `https://i.ytimg.com/vi/${t.id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${t.id}`,
      uploadDate: "2026-10-14",
    })),
  };
  return (
    <main id="contenido" className="mx-auto max-w-6xl px-5 py-16">
      <a href="/" className="text-sm font-bold text-brand">← Volver al inicio</a>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Aprendé a usar {SITE.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-soft">
        Videos cortos, paso a paso, en el orden en que conviene hacerlo. Mirá el primero y andá avanzando a tu ritmo.
      </p>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TUTORIALES.map((t) => (
          <li key={t.n} className="flex flex-col border border-line bg-ink-2">
            {t.id ? (
              <VideoYouTube id={t.id} titulo={t.titulo} />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-ink text-sm font-bold uppercase tracking-wide text-muted">Próximamente</div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-brand">Video {t.n} · {t.duracion}</p>
              <h2 className="font-display text-xl font-extrabold">{t.titulo}</h2>
              <p className="text-sm text-soft">{t.detalle}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="mt-16 border border-line bg-ink-2 p-8">
        <h2 className="font-display text-2xl font-extrabold">¿Te quedó alguna duda?</h2>
        <p className="mt-2 text-soft">Escribinos y te ayudamos a empezar con tu negocio.</p>
        <p className="mt-5"><WhatsAppButton label="Escribir por WhatsApp" mensaje="Hola, vi los tutoriales y tengo una consulta" /></p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
