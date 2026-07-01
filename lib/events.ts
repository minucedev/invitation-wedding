// Event data for the wedding itinerary, grouped by family side (bride / groom).
// Times are stored as UTC (Vietnam is UTC+07:00) so calendar links are unambiguous.

export type WeddingEvent = {
  id: string;
  /** Which family hosts this event — drives the two-column itinerary layout */
  side: "bride" | "groom";
  /** Vietnamese ceremony name shown as the heading */
  title: string;
  /** Local display time, e.g. "09:00 Sáng" */
  displayTime: string;
  /** Local display date, e.g. "THỨ BẢY, 18.07.2026" */
  displayDate: string;
  /** Lunar (Âm lịch) date shown under the solar date, e.g. "05 THÁNG 06 NĂM BÍNH NGỌ" */
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

// Nhà trai venue — reused by both groom-side events.
const NHA_TRAI = {
  locationName: "Tư Gia Nhà Trai",
  locationDetail: "29 Nguyễn Trãi, Xã Krông Ana, Tỉnh Đắk Lắk",
  address: "29 Nguyễn Trãi, Xã Krông Ana, Tỉnh Đắk Lắk, Việt Nam",
};

export const events: WeddingEvent[] = [
  // ───────── NHÀ GÁI — 18.07.2026, TP. Huế ─────────
  {
    id: "le-vu-quy",
    side: "bride",
    title: "Lễ Vu Quy",
    displayTime: "09:00 Sáng",
    displayDate: "THỨ BẢY, 18.07.2026",
    lunarDate: "05 THÁNG 06 NĂM BÍNH NGỌ",
    locationDetail: "Chu Mạnh Trinh, P. Phú Xuân, TP. Huế",
    address: "Số 1 Chu Mạnh Trinh, Phường Phú Xuân, Thành Phố Huế, Việt Nam",
    // 09:00 (+07) -> 02:00 UTC, ends 11:00 (+07) -> 04:00 UTC
    startUTC: "20260718T020000Z",
    endUTC: "20260718T040000Z",
  },
  {
    id: "tiec-cuoi-nha-gai",
    side: "bride",
    title: "Tiệc Cưới",
    displayTime: "11:00 Trưa",
    displayDate: "THỨ BẢY, 18.07.2026",
    lunarDate: "05 THÁNG 06 NĂM BÍNH NGỌ",
    locationName: "Nhà Hàng Tiệc Cưới Thiên Hương",
    locationDetail: "276 Nguyễn Trãi, P. Phú Xuân, TP. Huế",
    address: "Nhà hàng tiệc cưới Thiên Hương, 276 Nguyễn Trãi, Phường Phú Xuân, Thành Phố Huế, Việt Nam",
    // 11:00 (+07) -> 04:00 UTC, ends 14:00 (+07) -> 07:00 UTC
    startUTC: "20260718T040000Z",
    endUTC: "20260718T070000Z",
  },

  // ───────── NHÀ TRAI — 24.07.2026, Đắk Lắk ─────────
  {
    id: "le-thanh-hon",
    side: "groom",
    title: "Lễ Thành Hôn",
    displayTime: "09:00 Sáng",
    displayDate: "THỨ SÁU, 24.07.2026",
    lunarDate: "11 THÁNG 06 NĂM BÍNH NGỌ",
    ...NHA_TRAI,
    // Override the shared venue: hide the name and drop the house number
    // (display only — `address` from NHA_TRAI still drives the Maps link).
    locationName: undefined,
    locationDetail: "Nguyễn Trãi, Xã Krông Ana, Tỉnh Đắk Lắk",
    // 09:00 (+07) -> 02:00 UTC, ends 11:00 (+07) -> 04:00 UTC
    startUTC: "20260724T020000Z",
    endUTC: "20260724T040000Z",
  },
  {
    id: "tiec-cuoi-nha-trai",
    side: "groom",
    title: "Tiệc Cưới",
    displayTime: "11:00 Trưa",
    displayDate: "THỨ SÁU, 24.07.2026",
    lunarDate: "11 THÁNG 06 NĂM BÍNH NGỌ",
    locationName: "Nhà Hàng Tiệc Cưới Ngọc Lệ 2",
    locationDetail: "Xã Krông Ana, Tỉnh Đắk Lắk",
    address: "Nhà hàng tiệc cưới Ngọc Lệ 2, Xã Krông Ana, Tỉnh Đắk Lắk, Việt Nam",
    // 11:00 (+07) -> 04:00 UTC, ends 14:00 (+07) -> 07:00 UTC
    startUTC: "20260724T040000Z",
    endUTC: "20260724T070000Z",
  },
];
