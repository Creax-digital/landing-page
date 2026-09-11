import type { MetadataRoute } from "next";
import { localizedAlternates, localePath, locales, practiceKeys } from "../lib/site-content";
import { siteOrigin } from "../lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...practiceKeys.map((key) => `/${key}`), "/work"];
  const alternates = (route = "") => ({ languages: Object.fromEntries(
    Object.entries(localizedAlternates(route)).map(([language, path]) => [language, `${siteOrigin}${path}`]),
  ) });
  return [
    {
      url: `${siteOrigin}/`,
      alternates: alternates(),
    },
    ...locales.flatMap((locale) =>
      routes.map((route) => ({
        url: `${siteOrigin}${localePath(locale, route)}`,
        alternates: alternates(route),
      })),
    ),
  ];
}
