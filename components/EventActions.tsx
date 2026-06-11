"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingEvent } from "@/lib/events";
import { googleCalendarUrl } from "@/lib/calendar";
import MapModal from "./MapModal";

const BTN =
  "font-label-caps text-label-caps border border-primary px-4 sm:px-5 py-3 inline-flex items-center gap-1.5 whitespace-nowrap hover:text-custom-burgundy hover:border-custom-burgundy transition-colors duration-300";

export default function EventActions({ event }: { event: WeddingEvent }) {
  const [open, setOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="flex flex-nowrap items-center gap-3">
      <button className={BTN} onClick={() => setMapOpen(true)}>
        <span className="material-symbols-outlined text-base leading-none">
          place
        </span>
        XEM BẢN ĐỒ
      </button>

      <div className="relative" ref={ref}>
        <button
          className={BTN}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          THÊM VÀO LỊCH
          <span className="material-symbols-outlined text-base leading-none">
            expand_more
          </span>
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-2 z-30 w-56 bg-custom-light border border-custom-gold shadow-lg flex flex-col">
            <a
              className="px-5 py-4 font-label-caps text-label-caps text-primary hover:bg-custom-gold/10 hover:text-custom-burgundy transition-colors"
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              GOOGLE CALENDAR
            </a>
          </div>
        )}
      </div>

      <MapModal
        event={event}
        open={mapOpen}
        onClose={() => setMapOpen(false)}
      />
    </div>
  );
}
