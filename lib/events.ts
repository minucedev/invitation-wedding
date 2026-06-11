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
    id: "le-gia-tien",
    title: "Lễ Gia Tiên",
    displayTime: "09:00 Sáng",
    displayDate: "24 THÁNG 12, 2026",
    description:
      "Nghi lễ gia tiên truyền thống, dâng hương kính nhớ tổ tiên và trao gửi lời chúc phúc giữa hai gia đình. Một khoảnh khắc trang nghiêm và ấm áp.",
    locationName: "Tư Gia Nhà Gái",
    locationDetail: "TP. Hồ Chí Minh",
    address: "Tư Gia Nhà Gái, TP. Hồ Chí Minh, Việt Nam",
    // 09:00 (+07) -> 02:00 UTC, ends 11:00 (+07) -> 04:00 UTC
    startUTC: "20261224T020000Z",
    endUTC: "20261224T040000Z",
  },
  {
    id: "tiec-cuoi",
    title: "Tiệc Cưới",
    displayTime: "18:00 Tối",
    displayDate: "24 THÁNG 12, 2026",
    description:
      "Một buổi tối hân hoan với tiệc chiêu đãi và những kỷ niệm vui vầy bên gia đình cùng bạn bè thân thiết.",
    locationName: "The Grand Lotus Hotel",
    locationDetail: "Sảnh Tiệc Lớn, Tầng 2",
    address: "The Grand Lotus Hotel, Sảnh Tiệc Lớn Tầng 2, TP. Hồ Chí Minh, Việt Nam",
    // 18:00 (+07) -> 11:00 UTC, ends 21:00 (+07) -> 14:00 UTC
    startUTC: "20261224T110000Z",
    endUTC: "20261224T140000Z",
  },
];
