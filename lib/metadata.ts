import type { Metadata } from "next";
import {
  content,
  localizedAlternates,
  localePath,
  ogLocales,
  type Locale,
  type PracticeKey,
} from "./site-content";

export function localeMetadata(locale: Locale): Metadata {
  const copy = content[locale];
  const path = localePath(locale);
  return {
    title: { absolute: copy.meta.title },
    description: copy.meta.description,
    alternates: { canonical: path, languages: localizedAlternates() },
    openGraph: {
      type: "website",
      url: path,
      siteName: "CREAX.digital",
      locale: ogLocales[locale],
      title: copy.meta.title,
      description: copy.meta.description,
      images: [{ url: "/optimized/og.jpg", width: 1200, height: 630, alt: "CREAX.digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/optimized/og.jpg"],
    },
  };
}

export function practiceMetadata(locale: Locale, practice: PracticeKey): Metadata {
  const copy = content[locale].practices[practice];
  const route = `/${practice}`;
  const path = localePath(locale, route);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: path, languages: localizedAlternates(route) },
    openGraph: {
      type: "website",
      url: path,
      siteName: "CREAX.digital",
      locale: ogLocales[locale],
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [{ url: "/optimized/og.jpg", width: 1200, height: 630, alt: "CREAX.digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: ["/optimized/og.jpg"],
    },
  };
}

export function workMetadata(locale: Locale): Metadata {
  const copy = content[locale].work;
  const route = "/work";
  const path = localePath(locale, route);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: path, languages: localizedAlternates(route) },
    openGraph: {
      type: "website",
      url: path,
      siteName: "CREAX.digital",
      locale: ogLocales[locale],
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [{ url: "/optimized/og.jpg", width: 1200, height: 630, alt: "CREAX.digital" }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: ["/optimized/og.jpg"],
    },
  };
}
