import type { ReactNode } from "react";
import {
  content,
  htmlLang,
  localeLabels,
  localePath,
  locales,
  practiceKeys,
  type Locale,
} from "../lib/site-content";
import { LocaleDocument } from "./locale-document";
import { MotionController } from "./motion-controller";
import { MobileMenu } from "./mobile-menu";
import { SiteJsonLd } from "./json-ld";
import { siteEmail, siteTelegram } from "../lib/site-config";

const telegramUrl = siteTelegram;
const emailAddress = siteEmail;

export function SiteHeader({ locale, path = "" }: { locale: Locale; path?: string }) {
  const copy = content[locale];

  return (
    <header className="site-header">
      <a className="brand" href={localePath(locale)} aria-label="CREAX.digital">
        CREAX<span>.digital</span>
      </a>

      <nav className="desktop-nav" aria-label={copy.nav.menu}>
        <a href={`${localePath(locale)}#practices`}>{copy.nav.practices}</a>
        <a href={localePath(locale, "/work")}>{copy.nav.work}</a>
        <a href={`${localePath(locale)}#method`}>{copy.nav.method}</a>
      </nav>

      <div className="header-actions">
        <div className="language-switcher" aria-label={copy.nav.language}>
          {locales.map((item) => (
            <a
              aria-current={item === locale ? "page" : undefined}
              href={localePath(item, path)}
              hrefLang={htmlLang[item]}
              lang={htmlLang[item]}
              key={item}
            >
              {localeLabels[item]}
            </a>
          ))}
        </div>
        <a className="header-cta" href="#contact">
          {copy.nav.contact}
        </a>
      </div>

      <MobileMenu label={copy.nav.menu}>
          <a href={`${localePath(locale)}#practices`}>{copy.nav.practices}</a>
          <a href={localePath(locale, "/work")}>{copy.nav.work}</a>
          <a href={`${localePath(locale)}#method`}>{copy.nav.method}</a>
          <a href="#contact">{copy.nav.contact}</a>
          <div className="mobile-languages" aria-label={copy.nav.language}>
            {locales.map((item) => (
              <a
                aria-current={item === locale ? "page" : undefined}
                href={localePath(item, path)}
                hrefLang={htmlLang[item]}
                lang={htmlLang[item]}
                key={item}
              >
                {localeLabels[item]}
              </a>
            ))}
          </div>
      </MobileMenu>
    </header>
  );
}

export function ContactSection({ locale }: { locale: Locale }) {
  const copy = content[locale].contact;
  return (
    <section className="contact-section" id="contact" data-reveal>
      <div className="contact-signal" aria-hidden="true">
        <span className="contact-ring contact-ring--outer" />
        <span className="contact-ring contact-ring--middle" />
        <span className="contact-ring contact-ring--inner" />
        <span className="contact-sweep" />
        <span className="contact-beacon contact-beacon--one" />
        <span className="contact-beacon contact-beacon--two" />
        <span className="contact-beacon contact-beacon--three" />
        <span className="contact-core">CREAX</span>
      </div>
      <div className="contact-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.lead}</p>
        <div className="button-row">
          <a className="button button--primary" href={telegramUrl}>
            {copy.telegram}
            <span aria-hidden="true">↗</span>
          </a>
          <a className="button" href={`mailto:${emailAddress}`}>
            {copy.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand" href={localePath(locale)}>
          CREAX<span>.digital</span>
        </a>
        <p>{copy.footer.statement}</p>
      </div>
      <div className="footer-column">
        <p>{copy.footer.practices}</p>
        {practiceKeys.map((key) => (
          <a href={localePath(locale, `/${key}`)} key={key}>
            {copy.practices[key].shortTitle}
          </a>
        ))}
      </div>
      <div className="footer-column">
        <p>{copy.footer.contacts}</p>
        <a href={telegramUrl}>Telegram</a>
        <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {copy.footer.legal}</span>
        <span>Moscow · Remote worldwide</span>
      </div>
    </footer>
  );
}

export function SiteShell({
  locale,
  path = "",
  children,
}: {
  locale: Locale;
  path?: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteJsonLd locale={locale} path={path} />
      <LocaleDocument locale={locale} />
      <MotionController />
      <a className="skip-link" href="#main-content">
        {{ ru: "Перейти к содержанию", en: "Skip to content", "zh-hans": "跳转到主要内容" }[locale]}
      </a>
      <SiteHeader locale={locale} path={path} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
