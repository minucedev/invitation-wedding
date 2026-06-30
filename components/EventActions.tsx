"use client";

import { useState } from "react";
import type { WeddingEvent } from "@/lib/events";
import { googleCalendarUrl } from "@/lib/calendar";
import MapModal from "./MapModal";

const BTN =
  "font-label-caps text-label-caps border border-primary px-4 sm:px-5 py-3 inline-flex items-center gap-1.5 whitespace-nowrap hover:text-custom-burgundy hover:border-custom-burgundy transition-colors duration-300";

export default function EventActions({ event }: { event: WeddingEvent }) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
      <button className={BTN} onClick={() => setMapOpen(true)}>
        <span className="material-symbols-outlined text-base leading-none">
          place
        </span>
        XEM BẢN ĐỒ
      </button>

      <a
        className={BTN}
        href={googleCalendarUrl(event)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined text-base leading-none">
          calendar_add_on
        </span>
        THÊM VÀO LỊCH
      </a>

      <MapModal event={event} open={mapOpen} onClose={() => setMapOpen(false)} />
    </div>
  );
}
