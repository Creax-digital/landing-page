import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkPage } from "../../../components/work-page";
import { workMetadata } from "../../../lib/metadata";
import { isLocale, locales } from "../../../lib/site-content";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? workMetadata(locale) : {};
}
export default async function SelectedWorkPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WorkPage locale={locale} />;
}
