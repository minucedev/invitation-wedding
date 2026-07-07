// Central translation dictionary for the two language versions of the site.
// `/`   renders with lang="vi" (the original Vietnamese copy, unchanged).
// `/en` renders with lang="en" (English translation).
//
// The Vietnamese object `vi` is the source of truth for the shape: `Dictionary`
// is derived from it, so `en` must provide every key with a matching type — a
// missing translation is a compile error.

export type Locale = "vi" | "en";

const vi = {
  meta: {
    title: "Thanh & Tuấn — Thiệp Cưới",
    description:
      "Trân trọng kính mời bạn đến chung vui trong ngày cưới của Thanh & Tuấn — 18.07.2026.",
  },
  nav: {
    links: [
      { href: "#story", label: "Chuyện Tình" },
      { href: "#profile", label: "Dâu & Rể" },
      { href: "#events", label: "Sự Kiện" },
      { href: "#album", label: "Khoảnh Khắc" },
      { href: "#welcome", label: "Lời Ngỏ" },
    ],
    rsvp: "Xác Nhận",
    toggleMenu: "Mở menu",
  },
  hero: {
    kicker: "LỄ VU QUY & THÀNH HÔN",
    names: "Thanh & Tuấn",
    scrollDown: "KÉO XUỐNG",
  },
  countdown: {
    units: { days: "Ngày", hours: "Giờ", minutes: "Phút", seconds: "Giây" },
    celebrateTitle: "Hôm nay là ngày trọng đại! 🤍",
    celebrateSubtitle: "CHÚC MỪNG NGÀY CHUNG ĐÔI THANH & TUẤN",
    afterTitle: "Chúng mình đã chính thức về chung một nhà 🤍",
    afterSubtitle: "ĐÃ QUA {n} NGÀY KỂ TỪ NGÀY TRỌNG ĐẠI",
    afterThanks: "Cảm ơn mọi người đã đến chung vui cùng chúng mình.",
  },
  story: {
    heading: "Chuyện tụi mình",
    paragraphs: [
      "Có những tình yêu đến thật khẽ, không ồn ào, không vội vã, chỉ là hai người gặp nhau giữa cuộc đời rộng dài rồi bỗng thấy lòng mình dịu lại.",
      "Từ những điều bình dị, chúng mình đã cùng gom góp yêu thương, chọn tin nhau, thương nhau và bước về phía nhau bằng tất cả sự dịu dàng.",
      "Hôm nay, khi cùng nhau bước sang một chương mới, chúng mình mong được đón nhận những lời chúc phúc yêu thương từ gia đình, bạn bè và những người thân quý.",
    ],
    viewPhoto: "Xem ảnh cưới",
    alt1: "Ảnh cưới của cô dâu và chú rể.",
    alt2: "Khoảnh khắc nên thơ của cô dâu và chú rể.",
  },
  couple: {
    heading: "Chú Rể & Cô Dâu",
    groomName: "Lê Văn Tuấn",
    groomTitle: "ÚT NAM",
    groomFamily: "Nhà Trai",
    groomParents: "Ông: Lê Huấn & Bà: Hồ Thị Lan",
    groomAlt:
      "Chân dung chú rể trong bộ vest lịch lãm, ánh sáng tương phản nhẹ, phong cách sang trọng tinh tế.",
    brideName: "Nguyễn Thị Diệu Thanh",
    brideTitle: "QUÝ NỮ",
    brideFamily: "Nhà Gái",
    brideParents: "Ông: Nguyễn Quốc Linh & Bà: Phan Thị Diệu Khương",
    brideAlt:
      "Chân dung cô dâu trong tà áo dài lụa trắng ngà tối giản, ánh sáng tự nhiên dịu dàng, nét đẹp vượt thời gian.",
    viewPhoto: "Xem ảnh",
  },
  itinerary: {
    heading: "Chương Trình",
    brideSide: "Nhà Gái",
    groomSide: "Nhà Trai",
  },
  eventActions: {
    map: "Bản đồ",
    addCalendar: "Thêm lịch",
  },
  mapModal: {
    openInMaps: "MỞ TRONG GOOGLE MAPS",
    close: "Đóng",
  },
  gallery: {
    heading: "Khoảnh Khắc Yêu Thương",
    viewMore: "XEM THÊM KHOẢNH KHẮC TÌNH YÊU",
    viewPhoto: "Xem ảnh",
    alt: "Khoảnh khắc cưới",
  },
  lightbox: {
    close: "Đóng",
    prev: "Ảnh trước",
    next: "Ảnh sau",
    alt: "Khoảnh khắc cưới {n}",
  },
  welcome: {
    heading: "Lời Tri Ân",
    quote:
      "Sự hiện diện và tình cảm của mọi người sẽ là niềm vui thật lớn, là điều khiến ngày trọng đại của chúng mình trở nên trọn vẹn, ấm áp và đáng nhớ hơn bao giờ hết.",
  },
  rsvp: {
    heading: "Xác Nhận Tham Dự",
    successTitle: "Cảm ơn bạn!",
    successBody:
      "Phản hồi của bạn đã được ghi nhận. Hẹn gặp bạn trong ngày vui của chúng mình.",
    fullNameLabel: "HỌ VÀ TÊN",
    fullNamePlaceholder: "Nguyễn Văn A",
    emailLabel: "EMAIL",
    optional: "(tuỳ chọn)",
    emailPlaceholder: "ban@email.com",
    attendingLabel: "BẠN CÓ THAM DỰ?",
    attendingYes: "Hân Hạnh Tham Dự",
    attendingNo: "Rất Tiếc Vắng Mặt",
    guestOfLabel: "KHÁCH MỜI CỦA",
    guestOfBride: "Khách của Cô dâu",
    guestOfGroom: "Khách của Chú rể",
    guestsLabel: "SỐ LƯỢNG KHÁCH",
    messageLabel: "LỜI CHÚC",
    messagePlaceholder: "Gửi đôi lời chúc phúc đến cô dâu chú rể...",
    submitIdle: "GỬI PHẢN HỒI",
    submitting: "ĐANG GỬI...",
    errorGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    errorNetwork: "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.",
    giftButton: "HỘP QUÀ CƯỚI",
    giftAria: "Mở hộp mừng cưới",
    giftFabLabel: "Hộp quà cưới",
  },
  wishingWell: {
    heading: "Hộp Mừng Cưới",
    body: "Sự hiện diện của bạn đã là món quà quý giá nhất với chúng mình. Nếu bạn muốn gửi gắm đôi lời chúc phúc, hộp mừng cưới sẽ luôn sẵn sàng trong ngày vui.",
    transferInfo: "THÔNG TIN CHUYỂN KHOẢN",
    bank: "Ngân hàng: Vietcombank (VCB)",
    accountNumber: "Số TK: 1015563470",
    accountName: "Chủ TK: NGUYEN THI DIEU THANH",
    downloadQR: "Tải mã QR",
    close: "Đóng",
    qrAria: "Tải mã QR chuyển khoản",
    qrAlt: "Mã QR chuyển khoản mừng cưới",
    shareTitle: "Mã QR mừng cưới",
  },
  footer: {
    names: "Thanh & Tuấn",
    gift: "Quà Cưới",
    contact: "Liên Hệ",
    map: "Bản Đồ",
    credit: "© 2026 · Thực hiện với yêu thương",
  },
  envelope: {
    invite: "Trân trọng kính mời",
    cardLabel: "THIỆP MỜI",
    tapHint: "CHẠM ĐỂ MỞ",
    openAria: "Mở thiệp mời",
  },
  wishesToast: {
    guestbook: "SỔ LƯU BÚT",
    close: "Đóng",
  },
  musicPlayer: {
    play: "Bật nhạc nền",
    pause: "Tắt nhạc nền",
  },
};

export type Dictionary = typeof vi;

// English translation. Typed as `Dictionary` so the compiler flags any key that
// is missing or has the wrong shape relative to the Vietnamese source.
const en: Dictionary = {
  meta: {
    title: "Thanh & Tuấn — Wedding Invitation",
    description:
      "You are cordially invited to celebrate the wedding of Thanh & Tuấn — July 18, 2026.",
  },
  nav: {
    links: [
      { href: "#story", label: "Our Story" },
      { href: "#profile", label: "Bride & Groom" },
      { href: "#events", label: "Events" },
      { href: "#album", label: "Moments" },
      { href: "#welcome", label: "A Note" },
    ],
    rsvp: "RSVP",
    toggleMenu: "Toggle menu",
  },
  hero: {
    kicker: "A WEDDING CELEBRATION",
    names: "Thanh & Tuấn",
    scrollDown: "SCROLL DOWN",
  },
  countdown: {
    units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    celebrateTitle: "Today is the big day! 🤍",
    celebrateSubtitle: "CELEBRATING THANH & TUẤN'S WEDDING DAY",
    afterTitle: "We are officially married 🤍",
    afterSubtitle: "{n} DAYS SINCE THE BIG DAY",
    afterThanks: "Thank you all for celebrating with us.",
  },
  story: {
    heading: "Our Story",
    paragraphs: [
      "Some loves arrive softly — no fanfare, no hurry — just two people meeting amid life's vastness and suddenly feeling their hearts grow calm.",
      "From the simplest of moments, we gathered up love, chose to trust and cherish one another, and walked toward each other with all our tenderness.",
      "Today, as we begin a new chapter together, we would be honored to receive the loving blessings of our family, friends, and dear ones.",
    ],
    viewPhoto: "View wedding photo",
    alt1: "A wedding photo of the bride and groom.",
    alt2: "A poetic moment of the bride and groom.",
  },
  couple: {
    heading: "Groom & Bride",
    groomName: "Lê Văn Tuấn",
    groomTitle: "THE GROOM",
    groomFamily: "The Groom's Family",
    groomParents: "Mr. Lê Huấn & Mrs. Hồ Thị Lan",
    groomAlt:
      "Portrait of the groom in an elegant suit, soft contrast lighting, refined and sophisticated.",
    brideName: "Nguyễn Thị Diệu Thanh",
    brideTitle: "THE BRIDE",
    brideFamily: "The Bride's Family",
    brideParents: "Mr. Nguyễn Quốc Linh & Mrs. Phan Thị Diệu Khương",
    brideAlt:
      "Portrait of the bride in a minimalist ivory silk áo dài, soft natural light, timeless beauty.",
    viewPhoto: "View photo",
  },
  itinerary: {
    heading: "Order of Events",
    brideSide: "The Bride's Family",
    groomSide: "The Groom's Family",
  },
  eventActions: {
    map: "Map",
    addCalendar: "Add to calendar",
  },
  mapModal: {
    openInMaps: "OPEN IN GOOGLE MAPS",
    close: "Close",
  },
  gallery: {
    heading: "Cherished Moments",
    viewMore: "VIEW MORE LOVELY MOMENTS",
    viewPhoto: "View photo",
    alt: "Wedding moment",
  },
  lightbox: {
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    alt: "Wedding moment {n}",
  },
  welcome: {
    heading: "With Gratitude",
    quote:
      "Your presence and warmth will be our greatest joy — the very thing that makes our special day complete, warm, and more memorable than ever.",
  },
  rsvp: {
    heading: "RSVP",
    successTitle: "Thank you!",
    successBody:
      "Your response has been recorded. We look forward to celebrating this joyful day with you.",
    fullNameLabel: "FULL NAME",
    fullNamePlaceholder: "John Smith",
    emailLabel: "EMAIL",
    optional: "(optional)",
    emailPlaceholder: "you@email.com",
    attendingLabel: "WILL YOU ATTEND?",
    attendingYes: "Joyfully Accept",
    attendingNo: "Regretfully Decline",
    guestOfLabel: "GUEST OF",
    guestOfBride: "The Bride",
    guestOfGroom: "The Groom",
    guestsLabel: "NUMBER OF GUESTS",
    messageLabel: "YOUR WISHES",
    messagePlaceholder: "Send a few words of blessing to the couple...",
    submitIdle: "SEND RESPONSE",
    submitting: "SENDING...",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Couldn't connect. Please check your network and try again.",
    giftButton: "WEDDING GIFT BOX",
    giftAria: "Open the wedding gift box",
    giftFabLabel: "Wedding gift",
  },
  wishingWell: {
    heading: "Wedding Gift",
    body: "Your presence is already the most precious gift to us. Should you wish to share a blessing, our gift box will always be ready on our special day.",
    transferInfo: "BANK TRANSFER DETAILS",
    bank: "Bank: Vietcombank (VCB)",
    accountNumber: "Account No.: 1015563470",
    accountName: "Account Name: NGUYEN THI DIEU THANH",
    downloadQR: "Download QR",
    close: "Close",
    qrAria: "Download the transfer QR code",
    qrAlt: "Wedding gift bank-transfer QR code",
    shareTitle: "Wedding gift QR code",
  },
  footer: {
    names: "Thanh & Tuấn",
    gift: "Wedding Gift",
    contact: "Contact",
    map: "Map",
    credit: "© 2026 · Made with love",
  },
  envelope: {
    invite: "You are cordially invited",
    cardLabel: "INVITATION",
    tapHint: "TAP TO OPEN",
    openAria: "Open the invitation",
  },
  wishesToast: {
    guestbook: "GUESTBOOK",
    close: "Close",
  },
  musicPlayer: {
    play: "Play background music",
    pause: "Pause background music",
  },
};

const dictionaries: Record<Locale, Dictionary> = { vi, en };

/** Returns the full translation dictionary for the given language. */
export function getDict(lang: Locale): Dictionary {
  return dictionaries[lang];
}
