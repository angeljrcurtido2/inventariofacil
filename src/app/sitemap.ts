import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { RUBROS } from "@/config/rubros";
import { ARTICULOS } from "@/config/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: SITE.url, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/tutoriales`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, lastModified: new Date(ARTICULOS[0]?.fecha ?? ahora), changeFrequency: "weekly", priority: 0.8 },
    ...RUBROS.map((r) => ({ url: `${SITE.url}/sistema-para/${r.slug}`, lastModified: ahora, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...ARTICULOS.map((a) => ({ url: `${SITE.url}/blog/${a.slug}`, lastModified: new Date(a.actualizado ?? a.fecha), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${SITE.url}/privacidad`, lastModified: ahora, changeFrequency: "yearly", priority: 0.3 },
  ];
}
