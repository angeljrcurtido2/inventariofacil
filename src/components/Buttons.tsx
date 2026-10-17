import { Icon } from "./Icon";
import { SITE, whatsappLink } from "@/config/site";

export function WhatsAppButton({ label = "Escribinos por WhatsApp", mensaje, className = "" }: { label?: string; mensaje?: string; className?: string }) {
  return (
    <a
      href={whatsappLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <Icon name="chat" size={22} />
      {label}
    </a>
  );
}

export function PlayStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Descargar la app en Google Play"
      className={`inline-flex min-h-12 items-center gap-3 rounded-xl border-2 border-[#a6a6a6] bg-black px-5 py-2 transition hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="3.8,2.2 13.2,12 3.8,21.8" fill="#00C3FF" />
        <polygon points="3.8,2.2 13.2,12 16.6,8.6 5.6,2.6" fill="#00E676" />
        <polygon points="16.6,8.6 20.8,11 20.8,13 16.6,15.4 13.2,12" fill="#FFCE00" />
        <polygon points="3.8,21.8 13.2,12 16.6,15.4 5.6,21.4" fill="#FF3A44" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-bold uppercase tracking-wider text-mist">Disponible en</span>
        <span className="font-display text-xl font-extrabold text-white">Google Play</span>
      </span>
    </a>
  );
}
