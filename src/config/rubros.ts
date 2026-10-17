// Páginas por tipo de negocio (/sistema-para/<slug>). Cada una responde a lo que busca la gente
// ("sistema para farmacia Paraguay") y solo promete lo que el sistema hace hoy.
export type Rubro = {
  slug: string;
  nombre: string; // "farmacias"
  titulo: string; // <title> (sin el sufijo del sitio)
  descripcion: string; // meta description (≈150 caracteres)
  h1: string;
  intro: string;
  dolores: string[];
  soluciones: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  mensaje: string; // texto que llega por WhatsApp
  articulos: string[]; // slugs de blog relacionados
};

export const RUBROS: Rubro[] = [
  {
    slug: "farmacias",
    nombre: "farmacias",
    titulo: "Sistema para farmacias en Paraguay",
    descripcion: "Controlá lotes, vencimientos, stock mínimo y ventas con receta en tu farmacia. Celular y computadora, en la nube. Desde 100.000 Gs. por mes.",
    h1: "Sistema para farmacias en Paraguay",
    intro: "En una farmacia el problema no es solo vender: es saber qué se vence, qué falta y qué se vendió con receta. A.C System te lo muestra todo en una pantalla, sin planillas.",
    dolores: [
      "Productos que se vencen en el estante porque nadie se acordó de revisarlos.",
      "Cajas, blísteres y unidades sueltas que no coinciden con el stock del sistema.",
      "Ventas con receta que quedan sin registro.",
      "No saber cuánto stock queda hasta que el cliente ya está en el mostrador.",
    ],
    soluciones: [
      { t: "Lotes y fechas de vencimiento", d: "Cada compra queda con su lote y su vencimiento, y el sistema te avisa cuáles están vencidos o por vencer." },
      { t: "Alertas de inventario", d: "Una pantalla con lo vencido, lo que vence pronto y lo que está por debajo del stock mínimo, para que repongas a tiempo." },
      { t: "Cajas, blísteres y unidades", d: "Vendé la caja o la unidad suelta con su propio precio; el stock se descuenta bien en cualquier presentación." },
      { t: "Ventas con receta", d: "Marcás los productos que se venden con receta y el sistema te lo recuerda al venderlos." },
      { t: "Caja y cuadre del día", d: "Abrí y cerrá la caja y verificá que el efectivo cierre. Ves ingresos y egresos por fecha." },
      { t: "Celular y computadora", d: "La misma cuenta en la app Android y en la web, con tus datos en la nube." },
    ],
    faq: [
      { q: "¿Controla los vencimientos?", a: "Sí. Cargás la fecha de vencimiento de cada lote al comprar, y el sistema te muestra qué está vencido y qué vence pronto." },
      { q: "¿Puedo vender por caja y por unidad?", a: "Sí. Cada producto puede tener precio por caja, por pack o blíster y por unidad suelta, y el stock se descuenta según lo que vendas." },
      { q: "¿Sirve si ya tengo mi lista de productos en otro sistema?", a: "Consultanos por WhatsApp: según el sistema que uses hoy, vemos cómo pasar tus productos para que no cargues todo de nuevo." },
    ],
    mensaje: "Hola, tengo una farmacia y quiero conocer el sistema",
    articulos: ["controlar-vencimientos-farmacia", "inventario-inicial-paso-a-paso"],
  },
  {
    slug: "almacenes",
    nombre: "almacenes y despensas",
    titulo: "Sistema para almacén y despensa en Paraguay",
    descripcion: "Vendé por unidad, caja o kilo, controlá el fiado y cerrá la caja sin diferencias. Sistema para almacenes y despensas, en celular y PC.",
    h1: "Sistema para almacenes y despensas",
    intro: "Un almacén vende de todo: bebidas por pack, fiambres por kilo, golosinas por unidad. A.C System maneja cada forma de vender y te dice cuánto ganás de verdad.",
    dolores: [
      "El cuaderno del fiado: quién debe, cuánto y desde cuándo.",
      "Productos que se venden por caja, por pack y por unidad, cada uno con su precio.",
      "Cobrar por kilo o por gramo sin hacer cuentas a mano.",
      "Llegar a fin de día y que la caja no cierre.",
    ],
    soluciones: [
      { t: "Caja, pack y unidad", d: "Un mismo producto con precio por caja, por pack y por unidad suelta. El sistema descuenta el stock correcto." },
      { t: "Ofertas \"3 por un precio\"", d: "Cargás la oferta una vez y se aplica sola en la venta, con el descuento a la vista." },
      { t: "Venta por kilo y gramos", d: "Carnes, fiambres, pan y frutas, cobrados por peso." },
      { t: "Fiado y cobro de deudas", d: "Ventas a crédito con cuotas, pagos parciales y la lista de lo que te deben tus clientes." },
      { t: "Caja y cuadre", d: "Abrí la caja con el efectivo inicial y cerrala al final del día para ver si cuadra." },
      { t: "Flyers para WhatsApp", d: "Armá un flyer de oferta con la foto y el precio del producto en un minuto." },
    ],
    faq: [
      { q: "¿Puedo vender a crédito (fiado)?", a: "Sí. Registrás la venta a crédito con las cuotas, y después cobrás los pagos y ves lo que cada cliente debe." },
      { q: "¿Cobra por kilo?", a: "Sí, podés vender productos por kilo y por gramo." },
      { q: "¿Necesito una computadora?", a: "No necesariamente: la app funciona en el celular Android, y también tenés la versión web para la computadora." },
    ],
    mensaje: "Hola, tengo un almacén y quiero conocer el sistema",
    articulos: ["controlar-el-fiado", "precio-de-venta-margen-ganancia"],
  },
  {
    slug: "ferreterias",
    nombre: "ferreterías",
    titulo: "Sistema para ferretería en Paraguay",
    descripcion: "Controlá miles de productos, compras a proveedores, ventas por caja o unidad y cuentas a crédito en tu ferretería. Celular y computadora.",
    h1: "Sistema para ferreterías",
    intro: "Una ferretería maneja muchísimos productos, proveedores y clientes con cuenta. A.C System te ayuda a tener todo ordenado y a no quedarte sin lo que más se vende.",
    dolores: [
      "Cientos de productos y no saber cuánto queda de cada uno.",
      "Precios que cambian con cada compra al proveedor.",
      "Clientes con cuenta corriente y cobros pendientes.",
      "Cargar la mercadería a mano, producto por producto.",
    ],
    soluciones: [
      { t: "Productos ilimitados", d: "Cargá todo tu catálogo, con foto, código de barras y categoría." },
      { t: "Escáner de códigos", d: "Usá la cámara del celular como lector de códigos de barras para vender y cargar productos." },
      { t: "Compras y proveedores", d: "Registrá cada compra con su factura, y el stock se actualiza solo. Ves cuánto le debés a cada proveedor." },
      { t: "Factura de compra con foto e IA", d: "Sacale foto a la factura y los productos se cargan solos, sin tipear." },
      { t: "Ventas a crédito y cobros", d: "Cuotas, pagos parciales y la lista de clientes que te deben." },
      { t: "Reportes", d: "Ventas, ganancias, ingresos y egresos por período, con gráficos y PDF." },
    ],
    faq: [
      { q: "¿Cuántos productos puedo cargar?", a: "Los productos son ilimitados en tu base de datos, sin pagar de más." },
      { q: "¿Puedo leer códigos de barras con el celular?", a: "Sí, la app usa la cámara como escáner para vender y para cargar productos." },
      { q: "¿Se puede cargar una factura de compra con una foto?", a: "Sí. Le sacás foto a la factura y el sistema carga los productos; vos revisás y confirmás." },
    ],
    mensaje: "Hola, tengo una ferretería y quiero conocer el sistema",
    articulos: ["inventario-inicial-paso-a-paso", "precio-de-venta-margen-ganancia"],
  },
  {
    slug: "kioscos",
    nombre: "kioscos y minimercados",
    titulo: "Sistema para kiosco y minimercado en Paraguay",
    descripcion: "Vendé en segundos con tickets, escaneá códigos de barras con el celular y cerrá la caja sin diferencias. Ideal para kioscos y minimercados.",
    h1: "Sistema para kioscos y minimercados",
    intro: "En un kiosco se vende rápido y por poco monto, y las pérdidas chicas se acumulan. A.C System te permite vender en segundos y saber cuánto queda en caja y en stock.",
    dolores: [
      "Vender rápido sin equivocarse en el vuelto.",
      "No saber qué productos dejan más ganancia.",
      "Faltantes de mercadería sin darte cuenta.",
      "La caja que no cierra a fin de día.",
    ],
    soluciones: [
      { t: "Ventas y tickets en segundos", d: "Al contado o a crédito, con ticket listo para imprimir o mandar por WhatsApp." },
      { t: "Escáner de códigos", d: "La cámara del celular lee el código de barras del producto." },
      { t: "Ofertas por cantidad", d: "Promos como \"3 por un precio\" que se aplican solas." },
      { t: "Caja y cuadre", d: "Abrí y cerrá la caja, y mirá los ingresos y egresos del día." },
      { t: "Reportes de ganancia", d: "Qué vendiste y cuánto ganaste, por período." },
      { t: "Con tu celular", d: "Para empezar alcanza con un celular Android; no necesitás equipos especiales." },
    ],
    faq: [
      { q: "¿Necesito una impresora?", a: "No es obligatorio: el ticket se puede compartir por WhatsApp. Si tenés impresora, también se puede imprimir." },
      { q: "¿Funciona en el celular?", a: "Sí, hay app para Android en Google Play y también versión web." },
    ],
    mensaje: "Hola, tengo un kiosco y quiero conocer el sistema",
    articulos: ["precio-de-venta-margen-ganancia", "controlar-el-fiado"],
  },
  {
    slug: "tiendas-de-ropa",
    nombre: "tiendas de ropa y accesorios",
    titulo: "Sistema para tienda de ropa en Paraguay",
    descripcion: "Controlá tu stock por color, vendé con foto de cada producto y armá ofertas y flyers para WhatsApp. Sistema para tiendas, en celular y PC.",
    h1: "Sistema para tiendas de ropa y accesorios",
    intro: "En una tienda el mismo artículo viene en varios colores y se vende mucho por WhatsApp e Instagram. A.C System lleva el stock de cada color y te ayuda a promocionar.",
    dolores: [
      "No saber cuántas unidades quedan de cada color.",
      "Armar los flyers de oferta a mano, uno por uno.",
      "Ventas a cuotas y clientes que pagan de a poco.",
      "Fotos de productos desordenadas.",
    ],
    soluciones: [
      { t: "Stock por color", d: "Repartí las unidades por color en la compra y en la venta; el sistema descuenta de cada uno." },
      { t: "Foto de cada producto", d: "Subí la foto una vez y se usa en el catálogo y en los flyers." },
      { t: "Flyers de oferta", d: "Elegí una plantilla, quitá el fondo de la foto, poné tu logo y agregá tus textos. Listo para WhatsApp." },
      { t: "Ventas a crédito", d: "Cuotas, pagos parciales y seguimiento de lo que te deben." },
      { t: "Promociones", d: "Precios promo por unidad, caja o pack, y ofertas por cantidad." },
      { t: "Celular y computadora", d: "Vendé desde el local o desde donde estés, con la misma cuenta." },
    ],
    faq: [
      { q: "¿Lleva el stock por color?", a: "Sí, podés repartir el stock por color (o por sabor) al comprar y al vender." },
      { q: "¿Puedo hacer flyers con mi logo?", a: "Sí. En Publicidad armás el flyer con la foto, el precio y tu logo, y lo descargás o lo mandás por WhatsApp." },
    ],
    mensaje: "Hola, tengo una tienda de ropa y quiero conocer el sistema",
    articulos: ["precio-de-venta-margen-ganancia", "controlar-el-fiado"],
  },
];

export const rubroPorSlug = (slug: string) => RUBROS.find((r) => r.slug === slug);
