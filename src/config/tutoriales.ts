// Videos guía de YouTube. Para sumar uno: agregá una línea con su id (lo que va después de youtu.be/).
// Sin `id` el video se muestra como "Próximamente".
export type Tutorial = { n: number; id?: string; titulo: string; detalle: string; duracion: string };

export const TUTORIALES: Tutorial[] = [
  { n: 1, id: "wSnNqBIc6UA", titulo: "Entrar al sistema", detalle: "Cómo ingresar con tu usuario y moverte por el menú.", duracion: "1:29" },
  { n: 2, id: "Jjd8s0mBah0", titulo: "Cargar el facturador", detalle: "Los datos de tu negocio y tu timbrado, para facturas y tickets.", duracion: "2:09" },
  { n: 3, id: "5OMTpD-l0h4", titulo: "Abrir la caja", detalle: "Cómo abrir la caja con el efectivo con el que empezás el día.", duracion: "1:14" },
  { n: 4, id: "UU_ASF4qOcM", titulo: "Categorías y proveedores", detalle: "Lo primero que necesitás antes de cargar tu mercadería.", duracion: "2:02" },
  { n: 5, id: "xCObjq0JNoE", titulo: "Cargar el inventario", detalle: "Tu stock inicial, producto por producto, desde Nueva compra.", duracion: "3:39" },
  { n: 6, id: "jzRSuoDl7i8", titulo: "Tu primera venta", detalle: "Una venta al contado, con vuelto y ticket.", duracion: "2:11" },
  { n: 7, id: "zqKDeUVVroM", titulo: "Productos por caja", detalle: "Vender cajas, packs y unidades sueltas, con oferta por cantidad.", duracion: "6:06" },
  { n: 8, id: "n1GQiJSyPdw", titulo: "Pack de bebidas y ofertas", detalle: "Packs con precio propio y la oferta “3 por …”.", duracion: "5:32" },
  { n: 9, titulo: "Venta por kilo y gramos", detalle: "Carnes, pan, fiambres y frutas, cobrados por peso.", duracion: "5:27" },
  { n: 10, id: "uqS9YacnzwM", titulo: "Artículos con colores", detalle: "Repartí el stock por color o sabor, en la compra y en la venta.", duracion: "6:18" },
  { n: 11, id: "s2w0KoiBWPY", titulo: "Cerrar la caja", detalle: "El arqueo al terminar el día, para que el dinero cuadre.", duracion: "1:53" },
];
