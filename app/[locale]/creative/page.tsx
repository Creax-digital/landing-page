import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticePage } from "../../../components/practice-page";
import { practiceMetadata } from "../../../lib/metadata";
import { isLocale, locales } from "../../../lib/site-content";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? practiceMetadata(locale, "creative") : {};
}
export default async function CreativePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PracticePage locale={locale} practice="creative" />;
}
