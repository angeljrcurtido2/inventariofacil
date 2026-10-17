import { Icon } from "./Icon";
import { Phone } from "./Phone";
import { PlayStoreBadge, WhatsAppButton } from "./Buttons";
import { SITE, whatsappLink } from "@/config/site";

export const FAQ = [
  {
    q: "¿Qué es A.C System?",
    a: "Es un sistema de gestión para comercios: registrás ventas, compras, stock, caja y deudas de clientes desde el celular o la computadora. Todo queda guardado en la nube y lo ves en tiempo real.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: `El plan mensual cuesta ${SITE.priceDisplay} Gs. e incluye 1 usuario, productos ilimitados y todas las funciones. Si necesitás más usuarios, escribinos por WhatsApp y te pasamos el detalle.`,
  },
  {
    q: "¿Puedo usarlo en el celular y en la computadora?",
    a: "Sí. Tenés la app para Android en Google Play y también la versión web, que funciona desde cualquier navegador. Usás la misma cuenta en los dos.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Tus datos se guardan en la nube, no en tu equipo. Si se te rompe o pierde el celular o la computadora, entrás desde otro dispositivo y tu información sigue ahí.",
  },
  {
    q: "¿Qué quiere decir productos ilimitados?",
    a: "Que podés guardar todos los productos que necesites en tu base de datos sin pagar de más. Tu catálogo puede crecer sin límite práctico.",
  },
  {
    q: "¿Atienden en todo el país?",
    a: "Sí, tenemos cobertura a nivel nacional. Te ayudamos a empezar por WhatsApp, sin importar en qué ciudad estés.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Escribinos por WhatsApp, te creamos tu cuenta y te mostramos cómo cargar tus productos y hacer tu primera venta. En poco tiempo ya estás vendiendo.",
  },
];

const FUNCIONES = [
  { icon: "cart", t: "Ventas y tickets", d: "Vendé en segundos al contado o a crédito. Ticket listo para imprimir o compartir por WhatsApp." },
  { icon: "box", t: "Compras y stock", d: "Controlá tu mercadería con lotes, presentaciones por unidad, pack o caja, y alertas de stock." },
  { icon: "cash", t: "Caja y cuadre", d: "Abrí y cerrá caja, mirá ingresos y egresos y verificá que el cuadre cierre sin sorpresas." },
  { icon: "dollar", t: "Cobro de deudas", d: "Seguí lo que te deben tus clientes, registrá pagos parciales y mirá las cuotas vencidas." },
  { icon: "tag", t: "Ofertas y flyers", d: "Armá ofertas del tipo \"3 por un precio\" y generá el flyer del producto con su foto, listo para compartir por WhatsApp." },
  { icon: "camera", t: "Facturas con foto e IA", d: "Sacale foto a la factura de compra y los productos se cargan solos, sin tipear." },
  { icon: "barcode", t: "Escáner de códigos", d: "Usá la cámara del celular como lector de códigos de barras para vender y cargar productos." },
  { icon: "users", t: "Personal y sueldos", d: "Empleados, asistencia, horas extras, liquidaciones y permisos por usuario." },
  { icon: "chart", t: "Reportes", d: "Ventas, ganancias, ingresos y egresos por período, con gráficos y reportes en PDF." },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${SITE.name}, ir al inicio`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand font-display text-lg font-extrabold text-ink">AC</span>
          <span className="font-display text-xl font-extrabold">{SITE.name}</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium text-soft md:flex">
          <a href="#funciones" className="hover:text-white">Funciones</a>
          <a href="#plataformas" className="hover:text-white">En tu celular y PC</a>
          <a href="/sistema-para/farmacias" className="hover:text-white">Para tu negocio</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="/tutoriales" className="hover:text-white">Tutoriales</a>
          <a href="#precio" className="hover:text-white">Precio</a>
          <a href="#preguntas" className="hover:text-white">Preguntas</a>
          <a href="#contacto" className="hover:text-white">Contacto</a>
        </nav>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-ink hover:bg-white">
          WhatsApp
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <p className="mb-5 inline-block border border-brand px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            Para comercios de todo Paraguay
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Todo tu negocio <span className="text-brand">en una sola app.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
            Ventas, stock, caja y cobro de deudas en un solo sistema. Usalo en tu celular o en la computadora, con tus datos seguros en la nube y productos ilimitados.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppButton />
            <PlayStoreBadge />
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-soft">
            <li className="flex items-center gap-2"><Icon name="check" size={18} className="text-brand" />Datos seguros en la nube</li>
            <li className="flex items-center gap-2"><Icon name="check" size={18} className="text-brand" />Celular y computadora</li>
            <li className="flex items-center gap-2"><Icon name="check" size={18} className="text-brand" />Cobertura nacional</li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="absolute -right-10 top-10 h-80 w-80 rounded-full bg-brand/90" />
          <Phone src="/img/app-inicio.webp" alt="Pantalla de inicio de la app con ventas, deudas y ganancias" priority className="relative z-10 mx-auto w-64 sm:w-72" />
          <Phone src="/img/app-caja.webp" alt="Pantalla de movimientos de caja de la app" className="absolute -left-4 bottom-[-2rem] z-20 hidden w-40 -rotate-6 sm:block" />
        </div>
      </div>
    </section>
  );
}

export function Funciones() {
  return (
    <section id="funciones" className="border-t border-line bg-ink-2 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Todo lo que necesitás para manejar tu comercio</h2>
        <p className="mt-4 max-w-2xl text-lg text-soft">Un solo sistema en lugar de cuadernos, planillas y mensajes sueltos.</p>
        <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map((f) => (
            <li key={f.t} className="bg-ink-2 p-7">
              <Icon name={f.icon} size={34} className="text-brand" />
              <h3 className="mt-5 font-display text-2xl font-extrabold">{f.t}</h3>
              <p className="mt-2 leading-relaxed text-soft">{f.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export function VideoDemo() {
  return (
    <section id="video" className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Mirá el sistema funcionando</h2>
          <p className="mt-4 max-w-xl text-lg text-soft">Ventas, promos, stock, caja y lector de códigos con la cámara del celular, en la app y en la web, con la misma cuenta.</p>
          <p className="mt-6"><WhatsAppButton label="Quiero verlo en mi negocio" mensaje="Hola, vi el video y quiero ver el sistema funcionando" /></p>
        </div>
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] border-[6px] border-line bg-black shadow-2xl shadow-black/60">
          <video
            controls
            playsInline
            preload="none"
            poster="/video/poster.webp"
            width={720}
            height={1280}
            className="block h-auto w-full"
            aria-label="Video que muestra las pantallas principales del sistema"
          >
            <source src="/video/anuncio.webm" type="video/webm" />
            <source src="/video/anuncio.mp4" type="video/mp4" />
            Tu navegador no puede reproducir el video.
          </video>
        </div>
      </div>
    </section>
  );
}

export function Plataformas() {
  const items = [
    { icon: "phone", t: "En tu celular", d: "App para Android en Google Play. Vendé, cobrá y escaneá códigos desde el mostrador." },
    { icon: "pc", t: "En la computadora", d: "Versión web que funciona desde cualquier navegador, sin instalar nada." },
    { icon: "cloud", t: "Datos seguros en la nube", d: "Tu información no depende de un solo equipo. Si se rompe, no perdés nada." },
    { icon: "globe", t: "Cobertura en todo el país", d: "Te acompañamos desde el primer día, estés en la ciudad que estés." },
  ];
  return (
    <section id="plataformas" className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div aria-hidden="true" className="absolute -left-8 top-8 h-72 w-72 rounded-full bg-brand/90" />
          <Phone src="/img/app-catalogo.webp" alt="Catálogo de productos con foto, stock y precio en la app" className="relative z-10 mx-auto w-64" />
        </div>
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Tu negocio, donde estés</h2>
          <p className="mt-4 max-w-xl text-lg text-soft">Empezás en el celular, seguís en la computadora y la información siempre está al día.</p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {items.map((i) => (
              <li key={i.t} className="flex gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center border-2 border-brand text-brand"><Icon name={i.icon} size={24} /></span>
                <div>
                  <h3 className="font-display text-xl font-extrabold">{i.t}</h3>
                  <p className="mt-1 text-soft">{i.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Pasos() {
  const pasos = [
    { n: "01", t: "Escribinos por WhatsApp", d: "Contanos qué vendés y cómo trabajás." },
    { n: "02", t: "Creamos tu cuenta", d: "La dejamos lista para que empieces el mismo día." },
    { n: "03", t: "Cargá y vendé", d: "Te mostramos cómo cargar productos y hacer tu primera venta." },
  ];
  return (
    <section className="border-y border-line bg-ink-2 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Empezá en tres pasos</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} className="border-t-4 border-brand pt-5">
              <span className="font-display text-5xl font-extrabold text-brand">{p.n}</span>
              <h3 className="mt-3 font-display text-2xl font-extrabold">{p.t}</h3>
              <p className="mt-2 text-soft">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Precio() {
  const incluye = [
    "1 usuario incluido",
    "Productos ilimitados en tu base de datos",
    "Ventas, compras, stock y caja",
    "Cobro de deudas y ofertas",
    "Facturas con foto e IA y escáner de códigos",
    "Celular y computadora con la misma cuenta",
  ];
  return (
    <section id="precio" className="py-20">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-center font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Un precio simple</h2>
        <div className="mt-12 grid overflow-hidden border-2 border-brand md:grid-cols-[1fr_1.1fr]">
          <div className="bg-brand p-8 text-ink">
            <p className="text-sm font-bold uppercase tracking-widest">Plan mensual</p>
            <p className="mt-4 flex items-end gap-2">
              <span className="font-display text-6xl font-extrabold leading-none tracking-tighter sm:text-7xl">{SITE.priceDisplay}</span>
              <span className="pb-2 font-display text-xl font-extrabold leading-tight">Gs.<br />por mes</span>
            </p>
            <p className="mt-4 font-medium">Usuarios adicionales: consultanos por WhatsApp.</p>
          </div>
          <div className="p-8">
            <ul className="space-y-3">
              {incluye.map((t) => (
                <li key={t} className="flex gap-3"><Icon name="check" size={22} className="mt-0.5 flex-none text-brand" />{t}</li>
              ))}
            </ul>
            <WhatsAppButton label="Quiero empezar" mensaje="Hola, quiero contratar el plan mensual del sistema" className="mt-8 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Preguntas() {
  return (
    <section id="preguntas" className="border-t border-line bg-ink-2 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Preguntas frecuentes</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-bold">
                {f.q}
                <Icon name="plus" size={24} className="faq-plus flex-none text-brand transition-transform" />
              </summary>
              <p className="mt-3 leading-relaxed text-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}


const CAMPO = "w-full border-2 border-line bg-ink px-4 py-3 text-base text-mist placeholder:text-muted focus:border-brand focus:outline-none";

export function Contacto() {
  return (
    <section id="contacto" className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Dejanos tus datos y te llamamos</h2>
          <p className="mt-4 text-lg text-soft">Completá el formulario y nos comunicamos con vos para mostrarte el sistema y ayudarte a empezar. También podés escribirnos directo por WhatsApp.</p>
          <p className="mt-6"><WhatsAppButton label={`WhatsApp ${SITE.whatsappDisplay}`} /></p>
        </div>
        {/* Netlify Forms: Netlify detecta este formulario al publicar y guarda cada envío (y avisa por correo si lo activás en Forms > Notifications). */}
        <form name="contacto" method="POST" action="/gracias" data-netlify="true" netlify-honeypot="campo-trampa" className="space-y-5 border-2 border-line bg-ink-2 p-6 sm:p-8">
          <input type="hidden" name="form-name" value="contacto" />
          <p className="hidden"><label>No completar: <input name="campo-trampa" tabIndex={-1} autoComplete="off" /></label></p>
          <div>
            <label htmlFor="nombre" className="mb-2 block text-sm font-bold">Nombre y apellido</label>
            <input id="nombre" name="nombre" type="text" required autoComplete="name" className={CAMPO} placeholder="Ej: María González" />
          </div>
          <div>
            <label htmlFor="telefono" className="mb-2 block text-sm font-bold">Número de teléfono (WhatsApp)</label>
            <input id="telefono" name="telefono" type="tel" required inputMode="tel" autoComplete="tel" pattern="[0-9 +()\-]{7,20}" className={CAMPO} placeholder="Ej: 0981 123 456" />
          </div>
          <div>
            <label htmlFor="correo" className="mb-2 block text-sm font-bold">Correo electrónico <span className="font-normal text-muted">(opcional)</span></label>
            <input id="correo" name="correo" type="email" autoComplete="email" className={CAMPO} placeholder="tucorreo@ejemplo.com" />
          </div>
          <div>
            <label htmlFor="rubro" className="mb-2 block text-sm font-bold">¿Qué tipo de negocio tenés? <span className="font-normal text-muted">(opcional)</span></label>
            <input id="rubro" name="rubro" type="text" className={CAMPO} placeholder="Ej: almacén, ferretería, farmacia" />
          </div>
          <div>
            <label htmlFor="mensaje" className="mb-2 block text-sm font-bold">Mensaje <span className="font-normal text-muted">(opcional)</span></label>
            <textarea id="mensaje" name="mensaje" rows={3} className={CAMPO} placeholder="Contanos qué necesitás" />
          </div>
          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brand px-7 py-3.5 text-base font-bold text-ink transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Quiero que me contacten
          </button>
          <p className="text-xs text-muted">Usamos tus datos solo para contactarte por este pedido. <a href="/privacidad" className="underline">Política de privacidad</a>.</p>
        </form>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="bg-brand py-16 text-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Ordená tu negocio hoy</h2>
          <p className="mt-2 text-lg font-medium">Escribinos y te ayudamos a empezar.</p>
        </div>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center gap-3 bg-ink px-8 py-4 font-display text-2xl font-extrabold text-brand hover:bg-white hover:text-ink">
          <Icon name="chat" size={26} />
          {SITE.whatsappDisplay}
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {SITE.name}. Sistema de gestión para comercios.</p>
        <nav aria-label="Pie de página" className="flex gap-6">
          <a href={SITE.appUrl} className="hover:text-white">Ingresar a la web</a>
          <a href={SITE.playStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Play</a>
          <a href="/blog" className="hover:text-white">Blog</a>
          <a href="/tutoriales" className="hover:text-white">Tutoriales</a>
          <a href="/privacidad" className="hover:text-white">Privacidad</a>
        </nav>
      </div>
    </footer>
  );
}
