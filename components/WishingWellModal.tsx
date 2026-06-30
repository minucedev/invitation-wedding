"use client";

import { useEffect } from "react";

export default function WishingWellModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-custom-light p-8 md:p-12 max-w-md w-full border border-custom-gold relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h3 className="font-headline-md text-headline-md text-primary italic mb-6 text-center">
          Hộp Mừng Cưới
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mb-8">
          Sự hiện diện của bạn đã là món quà quý giá nhất với chúng mình. Nếu bạn
          muốn gửi gắm đôi lời chúc phúc, hộp mừng cưới sẽ luôn sẵn sàng trong
          ngày vui.
        </p>
        <div className="bg-surface-container-low p-6 text-center border border-custom-gold/30">
          <p className="font-label-caps text-label-caps mb-2 text-custom-burgundy">
            THÔNG TIN CHUYỂN KHOẢN
          </p>
          <p className="font-body-md text-primary font-medium">
            Ngân hàng: Vietcombank (VCB)
          </p>
          <p className="font-body-md text-primary font-medium">
            Số TK: 1015563470
          </p>
          <p className="font-body-md text-primary font-medium mb-4">
            Chủ TK: NGUYEN THI DIEU THANH
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Mã QR chuyển khoản mừng cưới"
            className="w-44 h-44 mx-auto"
            src="/images/qr-vietqr.png"
          />
          <a
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 border border-custom-gold text-custom-burgundy hover:bg-custom-burgundy hover:text-custom-gold hover:border-custom-gold hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300 font-label-caps text-label-caps cursor-pointer"
            href="/images/qr-vietqr.png"
            download="qr-mung-cuoi-thanh-tuan.png"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Tải mã QR
          </a>
        </div>
      </div>
    </div>
  );
}
