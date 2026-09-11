import type { Metadata } from "next";
import { LanguageGateway } from "../components/language-gateway";
import { localizedAlternates } from "../lib/site-content";

export const metadata: Metadata = {
  title: { absolute: "CREAX.digital — Choose your language / Выберите язык / 选择语言" },
  description: "Explore CREAX.digital in Russian, English or Simplified Chinese: AI content production, websites, mini apps, CRM and business automation.",
  alternates: { canonical: "/", languages: localizedAlternates() },
  openGraph: {
    type: "website",
    url: "/",
    title: "CREAX.digital — Choose your language",
    description: "Explore our services in Russian, English or Simplified Chinese.",
    images: [{ url: "/optimized/og.jpg", width: 1200, height: 630, alt: "CREAX.digital" }],
  },
};

export default function LanguagePage() {
  return <LanguageGateway />;
}
