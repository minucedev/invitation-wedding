"use client";

import { useEffect } from "react";
import type { WeddingEvent } from "@/lib/events";
import { mapsUrl } from "@/lib/calendar";
import { getDict, type Locale } from "@/lib/i18n";

export default function MapModal({
  event,
  open,
  onClose,
  lang,
}: {
  event: WeddingEvent;
  open: boolean;
  onClose: () => void;
  lang: Locale;
}) {
  const t = getDict(lang).mapModal;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    event.address
  )}&output=embed`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-custom-light p-6 md:p-8 max-w-2xl w-full border border-custom-gold relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
          aria-label={t.close}
          onClick={onClose}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h3 className="font-headline-md text-headline-md text-primary italic mb-2 pr-8">
          {event.locationName}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          {event.locationDetail}
        </p>
        <div className="aspect-video w-full border border-custom-gold/30 overflow-hidden">
          <iframe
            title={`Map of ${event.locationName}`}
            src={embedSrc}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          className="mt-6 inline-flex items-center gap-2 font-label-caps text-label-caps text-custom-burgundy hover:text-primary transition-colors"
          href={mapsUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-outlined text-base leading-none">
            open_in_new
          </span>
          {t.openInMaps}
        </a>
      </div>
    </div>
  );
}
