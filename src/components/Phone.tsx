import Image from "next/image";

/** Marco de celular con captura real de la app. Las capturas son 480×1040. */
export function Phone({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2.4rem] border-[6px] border-[#2a3140] bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10 ${className}`}>
      <Image src={src} alt={alt} width={480} height={1040} priority={priority} sizes="(max-width: 768px) 60vw, 300px" className="block h-auto w-full" />
    </div>
  );
}
