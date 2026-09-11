import { content, htmlLang, localePath, practiceKeys, type Locale, type PracticeKey } from "../lib/site-content";
import { siteEmail, siteName, siteOrigin, siteTelegram } from "../lib/site-config";

// Keep machine-readable facts consistent with the visible copy. Never invent
// ratings, client names, physical addresses, prices, or performance figures.
export function SiteJsonLd({ locale, path = "" }: { locale: Locale; path?: string }) {
  const copy = content[locale];
  const practice = path.slice(1) as PracticeKey;
  const service = practiceKeys.includes(practice) ? copy.practices[practice] : null;
  const url = `${siteOrigin}${localePath(locale, path)}`;
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;
  const pageId = `${url}#webpage`;
  const serviceId = `${url}#service`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: `${siteOrigin}/`,
        logo: `${siteOrigin}/optimized/icon-512.png`,
        description: copy.meta.description,
        email: siteEmail,
        sameAs: [siteTelegram],
        knowsAbout: practiceKeys.map((key) => copy.practices[key].metaTitle),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${siteOrigin}/`,
        name: siteName,
        publisher: { "@id": organizationId },
        inLanguage: Object.values(htmlLang),
      },
      {
        "@type": path === "/work" ? "CollectionPage" : "WebPage",
        "@id": pageId,
        url,
        name: service?.metaTitle ?? (path === "/work" ? copy.work.metaTitle : copy.meta.title),
        description: service?.metaDescription ?? (path === "/work" ? copy.work.metaDescription : copy.meta.description),
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        ...(service ? { mainEntity: { "@id": serviceId } } : {}),
      },
      ...(service ? [{
        "@type": "Service",
        "@id": serviceId,
        url,
        name: service.title,
        description: service.metaDescription,
        serviceType: service.shortTitle,
        provider: { "@id": organizationId },
        mainEntityOfPage: { "@id": pageId },
      }] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
