"use client";

import { useState } from "react";
import type { WeddingEvent } from "@/lib/events";
import { googleCalendarUrl } from "@/lib/calendar";
import MapModal from "./MapModal";
import { getDict, type Locale } from "@/lib/i18n";

// Light "ghost" action: icon + label, no boxy border. The label gets a hairline
// underline on hover and the whole thing shifts gold — soft, editorial feel.
const ACTION =
  "group inline-flex items-center gap-1.5 font-label-caps text-label-caps text-custom-burgundy hover:text-custom-gold transition-colors duration-300";
const LABEL =
  "border-b border-transparent pb-0.5 group-hover:border-current transition-colors duration-300";

export default function EventActions({
  event,
  lang,
}: {
  event: WeddingEvent;
  lang: Locale;
}) {
  const t = getDict(lang).eventActions;
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <button type="button" className={ACTION} onClick={() => setMapOpen(true)}>
        <span className="material-symbols-outlined text-base leading-none">
          place
        </span>
        <span className={LABEL}>{t.map}</span>
      </button>

      <span aria-hidden className="hidden sm:block h-3 w-px bg-custom-gold/40" />

      <a
        className={ACTION}
        href={googleCalendarUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined text-base leading-none">
          calendar_add_on
        </span>
        <span className={LABEL}>{t.addCalendar}</span>
      </a>

      <MapModal
        event={event}
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        lang={lang}
      />
    </div>
  );
}
