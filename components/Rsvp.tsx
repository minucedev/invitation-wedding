"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import WishingWellModal from "./WishingWellModal";

const INPUT =
  "border-0 border-b border-custom-gold/50 bg-transparent focus:ring-0 focus:border-custom-burgundy px-0 py-2 font-body-lg text-primary transition-colors";

type Status = "idle" | "submitting" | "success" | "error";

export default function Rsvp() {
  const [wellOpen, setWellOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      attending: String(fd.get("attending") ?? ""),
      guestOf: String(fd.get("guestOf") ?? ""),
      guests: String(fd.get("guests") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""), // honeypot
    };

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.");
    }
  };

  const submitting = status === "submitting";

  return (
    <section className="py-section-gap px-margin-edge bg-custom-shift relative" id="rsvp">
      <FadeIn className="max-w-xl mx-auto bg-white p-8 md:p-16 border border-custom-gold/20 shadow-sm relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-custom-gold"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-custom-gold"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-custom-gold"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-custom-gold"></div>

        <h2 className="font-headline-lg text-headline-lg text-center text-primary italic mb-12">
          Xác Nhận Tham Dự
        </h2>

        {status === "success" ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-custom-gold text-5xl mb-4">
              favorite
            </span>
            <p className="font-headline-md text-headline-md text-custom-burgundy italic mb-4">
              Cảm ơn bạn!
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Phản hồi của bạn đã được ghi nhận. Hẹn gặp bạn trong ngày vui của
              chúng mình.
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                HỌ VÀ TÊN
              </label>
              <input
                className={INPUT}
                name="fullName"
                placeholder="Nguyễn Văn A"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                EMAIL <span className="lowercase tracking-normal opacity-60">(tuỳ chọn)</span>
              </label>
              <input
                className={INPUT}
                name="email"
                placeholder="ban@email.com"
                type="email"
              />
            </div>

            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] w-px h-px opacity-0"
            />

            <div className="flex flex-col gap-4 mt-4">
              <label className="font-label-caps text-label-caps text-on-surface-variant">
                BẠN CÓ THAM DỰ?
              </label>
              <div className="flex gap-4">
                {/* Arbitrary hex values (not the custom-* CSS classes) so the
                    has-[:checked]/hover/opacity variants actually generate styles. */}
                <label className="flex-1 border border-[#D4AF37]/50 p-4 text-center cursor-pointer transition-all hover:border-[#6A1E25] hover:bg-[#6A1E25]/5 has-[:checked]:border-[#6A1E25] has-[:checked]:bg-[#6A1E25]/10 has-[:checked]:shadow-sm">
                  <input
                    className="hidden peer"
                    name="attending"
                    type="radio"
                    value="yes"
                    required
                  />
                  <span className="font-body-md text-primary peer-checked:text-[#6A1E25] peer-checked:font-medium">
                    Hân Hạnh Tham Dự
                  </span>
                </label>
                <label className="flex-1 border border-[#D4AF37]/50 p-4 text-center cursor-pointer transition-all hover:border-[#6A1E25] hover:bg-[#6A1E25]/5 has-[:checked]:border-[#6A1E25] has-[:checked]:bg-[#6A1E25]/10 has-[:checked]:shadow-sm">
                  <input
                    className="hidden peer"
                    name="attending"
                    type="radio"
                    value="no"
                  />
                  <span className="font-body-md text-primary peer-checked:text-[#6A1E25] peer-checked:font-medium">
                    Rất Tiếc Vắng Mặt
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                KHÁCH MỜI CỦA
              </label>
              <select
                className={INPUT}
                name="guestOf"
                defaultValue="Khách của Cô dâu"
              >
                <option value="Khách của Cô dâu">Khách của Cô dâu</option>
                <option value="Khách của Chú rể">Khách của Chú rể</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                SỐ LƯỢNG KHÁCH
              </label>
              <select className={INPUT} name="guests" defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="flex flex-col mt-4">
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                LỜI CHÚC <span className="lowercase tracking-normal opacity-60">(tuỳ chọn)</span>
              </label>
              <textarea
                className={`${INPUT} resize-none`}
                name="message"
                rows={3}
                maxLength={1000}
                placeholder="Gửi đôi lời chúc phúc đến cô dâu chú rể..."
              />
            </div>

            {status === "error" && (
              <p className="font-body-md text-body-md text-error text-center -mt-2">
                {errorMsg}
              </p>
            )}

            <button
              className="mt-8 bg-custom-burgundy text-white font-label-caps text-label-caps py-4 px-8 hover:bg-opacity-90 transition-all duration-300 tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "ĐANG GỬI..." : "GỬI PHẢN HỒI"}
            </button>
          </form>
        )}

        <div className="mt-16 pt-8 hairline-t flex flex-col items-center">
          <button
            type="button"
            onClick={() => setWellOpen(true)}
            aria-label="Mở hộp mừng cưới"
            className="group flex flex-col items-center outline-none"
          >
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-custom-gold bg-custom-light transition-all duration-500 group-hover:bg-custom-burgundy group-hover:border-custom-burgundy group-hover:-translate-y-0.5 group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-custom-gold group-focus-visible:ring-offset-2">
              <span className="absolute inset-0 rounded-full border border-custom-gold animate-pulse-slow scale-110 opacity-50"></span>
              <span className="material-symbols-outlined text-custom-gold group-hover:text-white transition-colors duration-500">
                redeem
              </span>
            </span>
            <span className="mt-5 flex items-center gap-3 font-label-caps text-label-caps tracking-[0.35em] text-custom-gold transition-colors duration-500 group-hover:text-custom-burgundy">
              <span className="h-px w-5 bg-custom-gold/50 transition-colors duration-500 group-hover:bg-custom-burgundy/50"></span>
              QUÀ CƯỚI
              <span className="h-px w-5 bg-custom-gold/50 transition-colors duration-500 group-hover:bg-custom-burgundy/50"></span>
            </span>
          </button>
        </div>
      </FadeIn>

      <WishingWellModal open={wellOpen} onClose={() => setWellOpen(false)} />
    </section>
  );
}
