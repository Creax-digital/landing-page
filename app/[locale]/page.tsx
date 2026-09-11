import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "../../components/home-page";
import { localeMetadata } from "../../lib/metadata";
import { isLocale, locales } from "../../lib/site-content";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? localeMetadata(locale) : {};
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
