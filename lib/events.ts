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
  /** Short description shown under the heading */
  description: string;
  /** Venue name (line 1) */
  locationName: string;
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
    description:
      "Nghi lễ Vu Quy truyền thống được cử hành tại tư gia nhà gái, dâng hương kính nhớ tổ tiên và trao gửi lời chúc phúc giữa hai gia đình. Một khoảnh khắc trang nghiêm và ấm áp.",
    locationName: "Tư Gia Nhà Gái",
    locationDetail: "Số 1 Chu Mạnh Trinh, P. Phú Xuân, TP. Huế",
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
    description:
      "Một buổi tiệc hân hoan với tiệc chiêu đãi và những kỷ niệm vui vầy bên gia đình cùng bạn bè thân thiết.",
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
    description:
      "Lễ Thành Hôn được cử hành tại tư gia nhà trai, ra mắt họ hàng và đón dâu về nhà chồng trong niềm hân hoan của hai họ.",
    ...NHA_TRAI,
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
    description:
      "Buổi tiệc chung vui cùng gia đình nhà trai và bạn bè thân thiết, đón chào nàng dâu mới trong không khí ấm áp và rộn ràng.",
    ...NHA_TRAI,
    // 11:00 (+07) -> 04:00 UTC, ends 14:00 (+07) -> 07:00 UTC
    startUTC: "20260724T040000Z",
    endUTC: "20260724T070000Z",
  },
];
