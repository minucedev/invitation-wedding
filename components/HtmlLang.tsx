"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Sets the <html lang> attribute on the client for non-default routes. The root
 * layout hard-codes lang="vi" (it can't know the current route on the server),
 * so the /en page mounts this to correct the language for SEO/accessibility.
 * Renders nothing.
 */
export default function HtmlLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
