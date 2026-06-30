// Placeholder event data for the wedding itinerary.
// Times are stored as UTC (Vietnam is UTC+07:00) so calendar links are unambiguous.
// Replace venue names / addresses with the real details when confirmed.

export type WeddingEvent = {
  id: string;
  /** Vietnamese ceremony name shown as the heading */
  title: string;
  /** Local display time, e.g. "09:00 AM" */
  displayTime: string;
  /** Local display date, e.g. "24 DECEMBER 2026" */
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

export const events: WeddingEvent[] = [
  {
    id: "le-vu-quy",
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
    id: "tiec-cuoi",
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
];
