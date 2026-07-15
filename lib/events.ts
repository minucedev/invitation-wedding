// Event data for the wedding itinerary, grouped by family side (bride / groom).
// Times are stored as UTC (Vietnam is UTC+07:00) so calendar links are unambiguous.
//
// Locale-invariant fields (id/side/address/startUTC/endUTC) live once on the base
// record; the display strings that differ by language (title/time/date/location)
// are provided per-locale under `vi` / `en`. `getEvents(lang)` flattens a base
// record + the chosen locale into the `WeddingEvent` shape the UI consumes.

import type { Locale } from "./i18n";

export type WeddingEvent = {
  id: string;
  /** Which family hosts this event — drives the two-column itinerary layout */
  side: "bride" | "groom";
  /** Ceremony name shown as the heading */
  title: string;
  /** Local display time, e.g. "09:00 Sáng" / "9:00 AM" */
  displayTime: string;
  /** Local display date, e.g. "THỨ BẢY, 18.07.2026" */
  displayDate: string;
  /** Lunar (Âm lịch) date shown under the solar date */
  lunarDate: string;
  /** Short description shown under the heading (omitted to hide it) */
  description?: string;
  /** Venue name (line 1) — omitted to hide it */
  locationName?: string;
  /** Venue detail (line 2) */
  locationDetail: string;
  /** Full address used for the Google Maps query */
  address: string;
  /** Calendar start/end in UTC basic format: YYYYMMDDTHHMMSSZ */
  startUTC: string;
  endUTC: string;
};

/** The per-language display fields for one event. */
type LocalizedEvent = {
  title: string;
  displayTime: string;
  displayDate: string;
  lunarDate: string;
  locationName?: string;
  locationDetail: string;
};

/** Locale-invariant fields + a translation for each language. */
type EventBase = {
  id: string;
  side: "bride" | "groom";
  address: string;
  startUTC: string;
  endUTC: string;
  vi: LocalizedEvent;
  en: LocalizedEvent;
};

const eventBases: EventBase[] = [
  // ───────── NHÀ GÁI — 18.07.2026, TP. Huế ─────────
  {
    id: "le-dinh-hon",
    side: "bride",
    // Tư gia — địa chỉ riêng, không hiển thị bản đồ (address rỗng ẩn nút map).
    address: "",
    // 08:40 (+07) -> 01:40 UTC, ends 09:00 (+07) -> 02:00 UTC
    startUTC: "20260718T014000Z",
    endUTC: "20260718T020000Z",
    vi: {
      title: "Lễ Đính Hôn",
      displayTime: "08:40 Sáng",
      displayDate: "THỨ BẢY, 18.07.2026",
      lunarDate: "05 THÁNG 06 NĂM BÍNH NGỌ",
      locationDetail: "Được cử hành tại tư gia",
    },
    en: {
      title: "Engagement Ceremony",
      displayTime: "8:40 AM",
      displayDate: "SATURDAY, JULY 18, 2026",
      lunarDate: "LUNAR: DAY 5, MONTH 6 (BÍNH NGỌ)",
      locationDetail: "Private residence",
    },
  },
  {
    id: "le-vu-quy",
    side: "bride",
    // Tư gia — địa chỉ riêng, không hiển thị bản đồ.
    address: "",
    // 09:00 (+07) -> 02:00 UTC, ends 11:00 (+07) -> 04:00 UTC
    startUTC: "20260718T020000Z",
    endUTC: "20260718T040000Z",
    vi: {
      title: "Lễ Vu Quy",
      displayTime: "09:00 Sáng",
      displayDate: "THỨ BẢY, 18.07.2026",
      lunarDate: "05 THÁNG 06 NĂM BÍNH NGỌ",
      locationDetail: "Được cử hành tại tư gia",
    },
    en: {
      title: "Bride's Farewell Ceremony",
      displayTime: "9:00 AM",
      displayDate: "SATURDAY, JULY 18, 2026",
      lunarDate: "LUNAR: DAY 5, MONTH 6 (BÍNH NGỌ)",
      locationDetail: "Private residence",
    },
  },
  {
    id: "tiec-cuoi-nha-gai",
    side: "bride",
    address:
      "Nhà hàng tiệc cưới Thiên Hương, 276 Nguyễn Trãi, Phường Phú Xuân, Thành Phố Huế, Việt Nam",
    // 11:00 (+07) -> 04:00 UTC, ends 14:00 (+07) -> 07:00 UTC
    startUTC: "20260718T040000Z",
    endUTC: "20260718T070000Z",
    vi: {
      title: "Tiệc Cưới",
      displayTime: "11:00 Trưa",
      displayDate: "THỨ BẢY, 18.07.2026",
      lunarDate: "05 THÁNG 06 NĂM BÍNH NGỌ",
      locationName: "Nhà Hàng Tiệc Cưới Thiên Hương",
      locationDetail: "276 Nguyễn Trãi, P. Phú Xuân, TP. Huế",
    },
    en: {
      title: "Wedding Reception",
      displayTime: "11:00 AM",
      displayDate: "SATURDAY, JULY 18, 2026",
      lunarDate: "LUNAR: DAY 5, MONTH 6 (BÍNH NGỌ)",
      locationName: "Thiên Hương Wedding Restaurant",
      locationDetail: "276 Nguyễn Trãi, Phú Xuân Ward, Huế City",
    },
  },

  // ───────── NHÀ TRAI — 24.07.2026, Đắk Lắk ─────────
  {
    id: "le-thanh-hon",
    side: "groom",
    // Tư gia — địa chỉ riêng, không hiển thị bản đồ.
    address: "",
    // 10:00 (+07) -> 03:00 UTC, ends 11:00 (+07) -> 04:00 UTC
    startUTC: "20260724T030000Z",
    endUTC: "20260724T040000Z",
    vi: {
      title: "Lễ Thành Hôn",
      displayTime: "10:00 Sáng",
      displayDate: "THỨ SÁU, 24.07.2026",
      lunarDate: "11 THÁNG 06 NĂM BÍNH NGỌ",
      locationDetail: "Được cử hành tại tư gia",
    },
    en: {
      title: "Wedding Ceremony",
      displayTime: "10:00 AM",
      displayDate: "FRIDAY, JULY 24, 2026",
      lunarDate: "LUNAR: DAY 11, MONTH 6 (BÍNH NGỌ)",
      locationDetail: "Private residence",
    },
  },
  {
    id: "tiec-cuoi-nha-trai",
    side: "groom",
    address:
      "Nhà hàng tiệc cưới Ngọc Lệ 2, Xã Krông Ana, Tỉnh Đắk Lắk, Việt Nam",
    // 11:00 (+07) -> 04:00 UTC, ends 14:00 (+07) -> 07:00 UTC
    startUTC: "20260724T040000Z",
    endUTC: "20260724T070000Z",
    vi: {
      title: "Tiệc Cưới",
      displayTime: "11:00 Trưa",
      displayDate: "THỨ SÁU, 24.07.2026",
      lunarDate: "11 THÁNG 06 NĂM BÍNH NGỌ",
      locationName: "Nhà Hàng Tiệc Cưới Ngọc Lệ 2",
      locationDetail: "Xã Krông Ana, Tỉnh Đắk Lắk",
    },
    en: {
      title: "Wedding Reception",
      displayTime: "11:00 AM",
      displayDate: "FRIDAY, JULY 24, 2026",
      lunarDate: "LUNAR: DAY 11, MONTH 6 (BÍNH NGỌ)",
      locationName: "Ngọc Lệ 2 Wedding Restaurant",
      locationDetail: "Krông Ana Commune, Đắk Lắk Province",
    },
  },
];

/** Build the itinerary events for the given language. */
export function getEvents(lang: Locale): WeddingEvent[] {
  return eventBases.map(({ id, side, address, startUTC, endUTC, ...loc }) => ({
    id,
    side,
    address,
    startUTC,
    endUTC,
    ...loc[lang],
  }));
}

// Backwards-compatible default export (Vietnamese). Used by the Countdown, which
// only reads locale-invariant fields (id / startUTC) for its date math.
export const events: WeddingEvent[] = getEvents("vi");
