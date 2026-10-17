"use client";
import { useState } from "react";

// El reproductor de YouTube recién se carga cuando la persona toca la miniatura: la página sigue liviana.
export function VideoYouTube({ id, titulo }: { id: string; titulo: string }) {
  const [activo, setActivo] = useState(false);
  if (activo) {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={titulo}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" onClick={() => setActivo(true)} className="group relative block aspect-video w-full overflow-hidden bg-ink-2" aria-label={`Reproducir: ${titulo}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink shadow-lg transition group-hover:scale-110">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </span>
    </button>
  );
}
