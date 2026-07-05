"use client";

import { useEffect } from "react";
import { getDict, type Locale } from "@/lib/i18n";

const QR_SRC = "/images/qr-vietqr.png";
const QR_FILENAME = "qr-mung-cuoi-thanh-tuan.png";

export default function WishingWellModal({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Locale;
}) {
  const t = getDict(lang).wishingWell;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Save the QR image. iOS Safari can't do a plain <a download> (it just opens
  // the image), so on mobile we use the native share sheet (Web Share API) which
  // lets the user save to Photos/Files. Desktop & Android fall back to an
  // object-URL download; if everything fails we open the image so it's still
  // reachable. NOTE: revoke is delayed — revoking immediately kills the download
  // navigation on mobile.
  const downloadQR = async () => {
    try {
      const res = await fetch(QR_SRC);
      const blob = await res.blob();
      const file = new File([blob], QR_FILENAME, {
        type: blob.type || "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: t.shareTitle });
          return;
        } catch (err) {
          // User dismissed the share sheet — don't fall through to a download.
          if ((err as Error)?.name === "AbortError") return;
        }
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = QR_FILENAME;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch {
      window.open(QR_SRC, "_blank", "noopener,noreferrer");
    }
  };

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
          aria-label={t.close}
          onClick={onClose}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h3 className="font-headline-md text-headline-md text-primary italic mb-6 text-center">
          {t.heading}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mb-8">
          {t.body}
        </p>
        <div className="bg-surface-container-low p-6 text-center border border-custom-gold/30">
          <p className="font-label-caps text-label-caps mb-2 text-custom-burgundy">
            {t.transferInfo}
          </p>
          <p className="font-body-md text-primary font-medium">
            {t.bank}
          </p>
          <p className="font-body-md text-primary font-medium">
            {t.accountNumber}
          </p>
          <p className="font-body-md text-primary font-medium mb-4">
            {t.accountName}
          </p>
          {/* Tap the QR itself to download too — same action as the button. */}
          <button
            type="button"
            onClick={downloadQR}
            aria-label={t.qrAria}
            className="group block mx-auto cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={t.qrAlt}
              className="w-44 h-44 mx-auto transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-100"
              src={QR_SRC}
            />
          </button>
          <button
            type="button"
            onClick={downloadQR}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 border border-custom-gold text-custom-burgundy hover:bg-custom-burgundy hover:text-custom-gold hover:border-custom-gold hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-300 font-label-caps text-label-caps cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {t.downloadQR}
          </button>
        </div>
      </div>
    </div>
  );
}
