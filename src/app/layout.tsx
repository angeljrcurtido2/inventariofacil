import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["700", "800"], display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"], display: "swap" });

const titulo = `${SITE.name} | Sistema de ventas, stock y caja para tu negocio en Paraguay`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: titulo, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "sistema de ventas Paraguay",
    "sistema de gestión para comercios",
    "control de stock",
    "sistema de inventario",
    "sistema de caja",
    "facturación Paraguay",
    "software para almacén",
    "software para ferretería",
    "cobro de deudas",
    "app de ventas en la nube",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: titulo,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: titulo, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0e1116",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PY" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-ink">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
