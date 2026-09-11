"use client";

import { useEffect, useState } from "react";
import { htmlLang, localePath, type Locale } from "../lib/site-content";

const validLocales: Locale[] = ["ru", "en", "zh-hans"];

function detectLocale(): Locale {
  const values = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const value of values) {
    const language = value.toLowerCase();
    if (language.startsWith("zh")) return "zh-hans";
    if (language.startsWith("ru")) return "ru";
    if (language.startsWith("en")) return "en";
  }

  return "en";
}

export function LanguageGateway() {
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    document.documentElement.lang = "en";
    let saved: Locale | null = null;
    try {
      saved = window.localStorage.getItem("creax-language") as Locale | null;
    } catch {
      // Private/restricted browsers can still use the language picker.
    }
    if (saved && validLocales.includes(saved)) {
      window.location.replace(localePath(saved));
      return;
    }
    const frame = window.requestAnimationFrame(() => setSuggested(detectLocale()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const options: { locale: Locale; name: string; description: string }[] = [
    { locale: "ru", name: "Русский", description: "Российская версия сайта" },
    { locale: "en", name: "English", description: "International website" },
    { locale: "zh-hans", name: "简体中文", description: "中国市场版本" },
  ];

  return (
    <main className="language-gateway">
      <div className="gateway-grid" aria-hidden="true" />
      <div className="gateway-shell">
        <a className="brand brand--gateway" href="/" aria-label="CREAX.digital">
          CREAX<span>.digital</span>
        </a>
        <div className="gateway-copy">
          <p className="eyebrow">AI-NATIVE DIGITAL AGENCY</p>
          <h1>Choose your language</h1>
          <p>We will remember your choice. You can switch language at any time.</p>
        </div>
        <div className="language-options" aria-label="Choose website language">
          {options.map((option) => (
            <a
              className={`language-option${suggested === option.locale ? " is-suggested" : ""}`}
              href={localePath(option.locale)}
              hrefLang={htmlLang[option.locale]}
              lang={htmlLang[option.locale]}
              key={option.locale}
              onClick={() => {
                try {
                  window.localStorage.setItem("creax-language", option.locale);
                } catch {
                  // The selected URL remains the source of truth.
                }
              }}
            >
              <span>{option.name}</span>
              <small>{option.description}</small>
              {suggested === option.locale ? <em>Suggested</em> : null}
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <p className="gateway-note">
          Language is suggested from your browser settings—never forced by region.
        </p>
      </div>
    </main>
  );
}
