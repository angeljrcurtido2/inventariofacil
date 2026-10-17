import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { WhatsAppButton } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "¡Gracias por escribirnos!",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gracias" },
};

export default function Gracias() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-6 px-5 py-16">
      <span className="flex h-14 w-14 items-center justify-center bg-brand text-ink">
        <Icon name="check" size={32} />
      </span>
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">¡Recibimos tus datos!</h1>
      <p className="text-lg text-soft">Nos vamos a comunicar con vos muy pronto. Si querés avanzar más rápido, escribinos ahora por WhatsApp.</p>
      <div className="flex flex-wrap items-center gap-4">
        <WhatsAppButton />
        <a href="/" className="text-sm font-bold text-brand underline">Volver al inicio</a>
      </div>
    </main>
  );
}
