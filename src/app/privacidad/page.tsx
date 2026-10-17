import type { Metadata } from "next";
import { SITE, whatsappLink } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${SITE.name} trata los datos de sus usuarios.`,
  alternates: { canonical: "/privacidad" },
};

// Texto base: conviene que lo revise un profesional antes de usarlo como documento legal.
export default function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <a href="/" className="text-sm font-bold text-brand">← Volver al inicio</a>
      <h1 className="mt-6 font-display text-4xl font-extrabold">Política de privacidad</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-soft">
        <p>{SITE.name} es un sistema de gestión para comercios. Esta página explica qué datos se guardan y cómo se usan.</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Datos que guardamos</h2>
        <p>Los datos de tu cuenta (nombre, usuario, correo y teléfono) y la información que cargás en el sistema: productos, ventas, compras, clientes, proveedores, caja y personal.</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Cómo los usamos</h2>
        <p>Solo para que el sistema funcione y para darte soporte. No vendemos tus datos ni los compartimos con terceros con fines publicitarios. La información de cada cuenta está separada y solo la ve el titular y los usuarios que él autorice.</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Fotos y funciones con IA</h2>
        <p>Cuando usás una función con foto, como cargar una factura o un producto, la imagen se envía para extraer los datos y se usa solo para esa tarea. La cámara del celular solo se usa para escanear códigos de barras y tomar esas fotos.</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Seguridad y eliminación</h2>
        <p>Tus datos se almacenan en la nube con acceso protegido por usuario y contraseña. Podés pedir la baja de tu cuenta y de tus datos escribiéndonos.</p>
        <h2 className="font-display text-2xl font-extrabold text-white">Contacto</h2>
        <p>Por cualquier consulta escribinos por <a className="font-bold text-brand underline" href={whatsappLink("Hola, tengo una consulta sobre privacidad")}>WhatsApp al {SITE.whatsappDisplay}</a>.</p>
      </div>
    </main>
  );
}
