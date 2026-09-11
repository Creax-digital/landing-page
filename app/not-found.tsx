import { htmlLang, localePath, locales } from "../lib/site-content";

export default function NotFound() {
  return (
    <main className="language-gateway">
      <div className="gateway-grid" aria-hidden="true" />
      <div className="gateway-shell">
        <a className="brand brand--gateway" href="/">CREAX<span>.digital</span></a>
        <div className="gateway-copy">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p><span lang="ru">Страница не найдена.</span> <span lang="zh-Hans">页面未找到。</span></p>
        </div>
        <div className="language-options" aria-label="Return to the home page">
          {locales.map((locale) => (
            <a className="language-option" href={localePath(locale)} lang={htmlLang[locale]} hrefLang={htmlLang[locale]} key={locale}>
              <span>{{ ru: "На главную", en: "Home page", "zh-hans": "返回首页" }[locale]}</span>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
