// Artículos del blog (/blog/<slug>). Para publicar uno nuevo: agregá un objeto al INICIO de la lista, con su fecha real,
// y volvé a compilar. Escribí para una persona con un negocio, no para Google: respondé una pregunta concreta, con ejemplos.
export type Bloque =
  | { t: "h2"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "tip"; x: string };

export type Articulo = {
  slug: string;
  titulo: string;
  tituloSeo?: string; // título corto (≤ 50 caracteres) para la pestaña y Google
  descripcion: string;
  fecha: string; // AAAA-MM-DD
  actualizado?: string;
  lectura: string; // "6 min"
  categoria: string;
  rubro?: string; // slug de /sistema-para/<rubro> para enlazar
  tutorial?: number; // n.º del video de /tutoriales que acompaña
  cuerpo: Bloque[];
};

export const ARTICULOS: Articulo[] = [
  {
    slug: "controlar-el-fiado",
    tituloSeo: "Cómo controlar el fiado en tu negocio",
    titulo: "Cómo controlar el fiado en tu negocio sin perder plata",
    descripcion: "Reglas simples para dar crédito a tus clientes, anotar cada deuda y cobrar a tiempo, sin cuaderno y sin discusiones.",
    fecha: "2026-10-17",
    lectura: "6 min",
    categoria: "Cobros y deudas",
    rubro: "almacenes",
    cuerpo: [
      { t: "p", x: "El fiado mantiene clientes, pero mal llevado se come la ganancia: se olvidan montos, se pierden cuadernos y se cobra tarde o nunca. La buena noticia es que con unas pocas reglas y un registro ordenado el fiado deja de ser un problema." },
      { t: "h2", x: "1. Decidí a quién le fiás" },
      { t: "p", x: "No todos los clientes merecen el mismo crédito. Pensá en cuánto hace que te compran, si pagaron bien antes y si los conocés. A un cliente nuevo, empezá con un monto chico." },
      { t: "ul", items: ["Poné un límite por cliente y respetalo.", "No des más crédito a quien ya tiene una deuda vencida.", "Anotá siempre el nombre completo y un teléfono para avisarle."] },
      { t: "h2", x: "2. Anotá cada fiado en el momento" },
      { t: "p", x: "La deuda que no se anota se olvida. Registrala cuando se hace la venta, con la fecha, los productos y el monto. Así, cuando el cliente pregunta cuánto debe, la respuesta está a un toque." },
      { t: "h2", x: "3. Acordá cuándo y cómo se paga" },
      { t: "p", x: "Una deuda sin fecha es una deuda eterna. Acordá un día de pago, o dividila en cuotas si el monto es grande. Con cuotas, el cliente paga de a poco y vos sabés cuándo te toca cobrar." },
      { t: "ul", items: ["Para montos chicos: un solo pago en una fecha clara.", "Para montos grandes: cuotas semanales o mensuales.", "Permití pagos parciales y anotá cada uno."] },
      { t: "h2", x: "4. Cobrá a tiempo y sin vergüenza" },
      { t: "p", x: "Avisá un día antes del vencimiento por WhatsApp, con un mensaje amable y el monto exacto. Si la deuda ya venció, no esperes semanas: cuanto más se demora, más difícil es cobrar." },
      { t: "tip", x: "Una vez por semana, mirá la lista de clientes con deuda vencida y mandá un mensaje a cada uno. Diez minutos que valen mucho." },
      { t: "h2", x: "5. Dejá de usar el cuaderno" },
      { t: "p", x: "El cuaderno se pierde, se moja, y no suma solo. Un sistema te muestra cuánto te debe cada cliente, cuáles cuotas están vencidas y cuánto cobraste, sin hacer cuentas a mano." },
      { t: "p", x: "En A.C System registrás la venta a crédito con sus cuotas, anotás cada pago —total o parcial— y ves en una pantalla todo lo que te deben tus clientes y lo que ya venció." },
    ],
  },
  {
    slug: "precio-de-venta-margen-ganancia",
    tituloSeo: "Cómo calcular el precio de venta (con ejemplos)",
    titulo: "Cómo calcular el precio de venta de un producto (con ejemplos en guaraníes)",
    descripcion: "La diferencia entre margen y recargo, la fórmula para no equivocarte y ejemplos con números para fijar el precio de venta de tus productos.",
    fecha: "2026-10-17",
    lectura: "7 min",
    categoria: "Precios y ganancia",
    rubro: "kioscos",
    cuerpo: [
      { t: "p", x: "Poner el precio \"a ojo\" es una de las causas más comunes de que un negocio venda mucho y gane poco. Para fijar un precio con cabeza solo necesitás saber cuánto te cuesta el producto y cuánto querés ganar. Veamos cómo." },
      { t: "h2", x: "Primero, el costo real" },
      { t: "p", x: "El costo es lo que pagás por el producto puesto en tu negocio: el precio de la factura del proveedor, más el flete si lo pagás vos. Si el proveedor te hace un descuento, usá el precio ya descontado." },
      { t: "h2", x: "Recargo o margen: no son lo mismo" },
      { t: "p", x: "Mucha gente confunde estas dos formas de calcular la ganancia, y por eso terminan ganando menos de lo que creen." },
      { t: "ul", items: ["Recargo: el porcentaje que le sumás al costo. Costo 7.000 Gs. + 30 % = 9.100 Gs.", "Margen: el porcentaje del precio de venta que es ganancia. Para ganar 30 % del precio, el cálculo es distinto (ver abajo)."] },
      { t: "h2", x: "La fórmula del recargo" },
      { t: "p", x: "Precio de venta = costo × (1 + recargo). Es la más fácil y la que usa casi todo el mundo." },
      { t: "ul", items: ["Costo 7.000 Gs., recargo 30 %: 7.000 × 1,30 = 9.100 Gs.", "Costo 12.500 Gs., recargo 25 %: 12.500 × 1,25 = 15.625 Gs. (redondeá a 15.700 o 16.000)."] },
      { t: "h2", x: "La fórmula del margen" },
      { t: "p", x: "Precio de venta = costo ÷ (1 − margen). Sirve cuando querés que la ganancia sea un porcentaje de lo que cobrás." },
      { t: "ul", items: ["Costo 7.000 Gs., margen 30 %: 7.000 ÷ 0,70 = 10.000 Gs.", "Con ese precio, de cada 10.000 Gs. que cobrás, 3.000 son ganancia."] },
      { t: "tip", x: "Con el mismo 30 %, el recargo te da 9.100 Gs. y el margen 10.000 Gs. Antes de comparar tus números con los de otro negocio, fijate cuál de los dos están usando." },
      { t: "h2", x: "No te olvides del IVA" },
      { t: "p", x: "En Paraguay el precio que ve el cliente normalmente ya incluye el IVA (10 % o 5 % según el producto, o exento). Decidí si tus precios van con IVA incluido y calculá tu ganancia sobre lo que realmente te queda, no sobre lo que cobrás." },
      { t: "h2", x: "Redondeá y revisá" },
      { t: "ul", items: ["Redondeá a números cómodos para dar vuelto: 9.100 pasa a 9.500 o 10.000.", "Revisá tus precios cuando cambia el costo: un producto que subió 10 % para vos tiene que subir en tu estante.", "Mirá qué productos dejan más ganancia y cuáles solo \"mueven\" la caja."] },
      { t: "p", x: "En A.C System cargás el costo y el porcentaje de ganancia, el sistema te sugiere el precio y vos lo ajustás. Y los reportes te muestran cuánto ganaste en cada período, para saber si tus precios están bien." },
    ],
  },
  {
    slug: "controlar-vencimientos-farmacia",
    tituloSeo: "Controlar vencimientos en una farmacia",
    titulo: "Cómo controlar los vencimientos en una farmacia y evitar pérdidas",
    descripcion: "Método simple para no perder mercadería por vencimiento: lotes, primero en vencer primero en salir, y revisiones periódicas.",
    fecha: "2026-10-17",
    lectura: "6 min",
    categoria: "Farmacias",
    rubro: "farmacias",
    cuerpo: [
      { t: "p", x: "En una farmacia, un producto vencido es plata perdida y, además, un riesgo. Sin un método, es fácil que una caja quede olvidada al fondo del estante hasta que ya no se pueda vender. Estos pasos ayudan a evitarlo." },
      { t: "h2", x: "1. Registrá el lote y el vencimiento cuando comprás" },
      { t: "p", x: "El mejor momento para controlar un vencimiento es cuando entra la mercadería. Anotá el número de lote y la fecha de vencimiento de cada compra. Si no se registra al entrar, después es muy difícil saber qué vence cuándo." },
      { t: "h2", x: "2. Aplicá el método PEPS (FEFO)" },
      { t: "p", x: "Primero que vence, primero que sale. Cuando entra mercadería nueva del mismo producto, la que vence antes se coloca adelante y se vende primero." },
      { t: "ul", items: ["Acomodá el estante con lo más próximo a vencer al frente.", "Al reponer, no mezcles lotes sin ordenar por fecha.", "Avisale al personal de mostrador cuál lote tiene que salir primero."] },
      { t: "h2", x: "3. Revisá en fechas fijas" },
      { t: "p", x: "Elegí un día del mes para revisar lo que vence en los próximos tres meses. Con esa lista tenés tiempo para ofrecer un descuento, cambiarlo con el proveedor si lo permite o destinarlo según corresponda." },
      { t: "ul", items: ["Productos que vencen en menos de 90 días: promocionalos o devolvelos al proveedor si lo acepta.", "Productos ya vencidos: retiralos del estante y registralos según la normativa que corresponda a tu farmacia."] },
      { t: "h2", x: "4. Fijá un stock mínimo" },
      { t: "p", x: "Comprar de más también genera vencidos. Definí cuánto necesitás de cada producto y reponé cuando baje de ese mínimo, sin llenar el depósito \"por las dudas\"." },
      { t: "tip", x: "Los productos de poca rotación son los que más se vencen. Comprá menos cantidad y con más frecuencia." },
      { t: "h2", x: "5. Dejá que el sistema te avise" },
      { t: "p", x: "Revisar a mano cientos de productos lleva horas. A.C System guarda el lote y el vencimiento de cada compra y te muestra en una pantalla lo vencido, lo que vence pronto y lo que está por debajo del stock mínimo." },
      { t: "p", x: "Además, para los productos que se venden con receta, el sistema te lo recuerda al momento de la venta, y podés vender por caja, blíster o unidad con el stock siempre al día." },
    ],
  },
  {
    slug: "inventario-inicial-paso-a-paso",
    tituloSeo: "Cómo hacer el inventario inicial de tu negocio",
    titulo: "Cómo hacer el inventario inicial de tu negocio, paso a paso",
    descripcion: "Guía para contar tu mercadería, ordenarla y cargarla por primera vez en un sistema, sin volverte loco ni perder tiempo.",
    fecha: "2026-10-17",
    lectura: "7 min",
    categoria: "Primeros pasos",
    tutorial: 5,
    cuerpo: [
      { t: "p", x: "El inventario inicial es el punto de partida: saber exactamente qué tenés, cuánto y a qué precio. Hacerlo bien una vez te ahorra problemas durante años. No hace falta contar todo en un día; lo importante es hacerlo con orden." },
      { t: "h2", x: "Antes de empezar" },
      { t: "ul", items: ["Elegí un momento tranquilo: antes de abrir, después de cerrar, o un día de poco movimiento.", "Dividí el local en zonas (estante 1, heladera, depósito) y contá una zona por vez.", "Si podés, contá de a dos: una persona cuenta, la otra anota."] },
      { t: "h2", x: "Paso 1: ordená tus categorías" },
      { t: "p", x: "Agrupá los productos en categorías simples: bebidas, limpieza, golosinas, herramientas, medicamentos. Pocas categorías claras valen más que muchas confusas." },
      { t: "h2", x: "Paso 2: para cada producto, anotá cinco datos" },
      { t: "ol", items: ["Nombre claro (el mismo que vas a buscar al vender).", "Cuánto te costó (precio de compra).", "A cuánto lo vendés.", "Cuántas unidades tenés.", "Fecha de vencimiento, si tiene."] },
      { t: "h2", x: "Paso 3: pensá en cómo lo vendés" },
      { t: "p", x: "Un mismo producto puede venderse por caja, por pack o por unidad. Anotá cuántas unidades trae cada presentación y el precio de cada una, así después vendés sin hacer cuentas." },
      { t: "h2", x: "Paso 4: cargalo en el sistema" },
      { t: "p", x: "Cargá cada producto con su cantidad como una compra inicial. Así el stock queda registrado desde el primer día, y no se mezcla con tus compras reales." },
      { t: "tip", x: "Si tenés muchos productos, empezá por los 50 que más vendés. Con eso ya cubrís la mayor parte de tus ventas, y el resto lo vas sumando." },
      { t: "h2", x: "Paso 5: controlá y ajustá" },
      { t: "p", x: "A la semana, comparar lo que dice el sistema con lo que hay en el estante te permite detectar errores de carga o faltantes a tiempo." },
      { t: "p", x: "Mirá en video cómo cargar tu inventario paso a paso en A.C System, desde Nueva compra, en nuestra sección de tutoriales." },
    ],
  },
];

export const articuloPorSlug = (slug: string) => ARTICULOS.find((a) => a.slug === slug);
