// Datos del negocio en un solo lugar. Para cambiar nombre, WhatsApp, precio o dominios,
// editá este archivo (o las variables NEXT_PUBLIC_* en Netlify) y volvé a compilar.
export const SITE = {
  name: "A.C System",
  tagline: "Todo tu negocio en una sola app",
  description:
    "Sistema de gestión para comercios en Paraguay: ventas, stock, caja, cobro de deudas, ofertas, flyers y facturas con foto e IA. En celular y computadora, con tus datos seguros en la nube.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.inventariofacil.site",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.inventariofacil.shop",
  playStoreUrl:
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
    "https://play.google.com/store/apps/details?id=com.angeljrcurtido.kontrolx",
  whatsappNumber: "595983312082", // formato internacional, sin + ni espacios
  whatsappDisplay: "0983 312 082",
  whatsappMessage: "Hola, quiero conocer el sistema de gestión para mi negocio",
  price: 100000,
  priceDisplay: "100.000",
  currency: "PYG",
  locale: "es_PY",
} as const;

export const whatsappLink = (mensaje: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
