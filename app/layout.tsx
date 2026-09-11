import type { Metadata } from "next";
import { siteOrigin } from "../lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "CREAX.digital — AI-агентство цифровых решений",
    template: "%s | CREAX.digital",
  },
  description: "AI-контент, digital-продукты и автоматизация для бизнеса.",
  applicationName: "CREAX.digital",
  category: "business",
  creator: "CREAX.digital",
  publisher: "CREAX.digital",
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/optimized/icon-48.png", sizes: "48x48", type: "image/png" }],
    shortcut: "/optimized/icon-48.png",
    apple: [{ url: "/optimized/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var p=location.pathname.split('/')[1];document.documentElement.lang=p==='zh-hans'?'zh-Hans':p==='ru'?'ru':'en'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
