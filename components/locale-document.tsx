"use client";

import { useEffect } from "react";
import type { Locale } from "../lib/site-content";
import { htmlLang } from "../lib/site-content";

export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
    try {
      window.localStorage.setItem("creax-language", locale);
    } catch {
      // Language navigation also works when browser storage is unavailable.
    }
  }, [locale]);

  return null;
}
