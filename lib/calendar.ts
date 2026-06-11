import type { WeddingEvent } from "./events";

const CAL_DETAILS =
  "Lễ cưới của Thanh & Tuấn — 24.12.2026. Rất hân hạnh được đón tiếp sự hiện diện của bạn.";

/** Google Calendar "add event" template link (opens prefilled new-event form). */
export function googleCalendarUrl(e: WeddingEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} — Thanh & Tuấn`,
    dates: `${e.startUTC}/${e.endUTC}`,
    details: CAL_DETAILS,
    location: e.address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Builds an .ics data URI for Apple Calendar / Outlook download. */
export function icsDataUri(e: WeddingEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Thanh & Tuan Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${e.id}@thanh-tuan-wedding`,
    `DTSTART:${e.startUTC}`,
    `DTEND:${e.endUTC}`,
    `SUMMARY:${escapeIcs(`${e.title} — Thanh & Tuấn`)}`,
    `DESCRIPTION:${escapeIcs(CAL_DETAILS)}`,
    `LOCATION:${escapeIcs(e.address)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf8,${encodeURIComponent(
    lines.join("\r\n")
  )}`;
}

/** Google Maps search link for the venue address. */
export function mapsUrl(e: WeddingEvent): string {
  const params = new URLSearchParams({ api: "1", query: e.address });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
