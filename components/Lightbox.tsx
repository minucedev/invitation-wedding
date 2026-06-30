"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

/**
 * Full-screen image lightbox shared by the album Gallery and the love-story
 * section. Opening animates the photo in with a smooth scale-up + fade
 * ("phóng to lên nhìn mượt"). Supports prev/next, click-to-close on the
 * backdrop, and keyboard control (Esc / ← / →).
 */
export default function Lightbox({
  images,
  index,
  setIndex,
}: {
  images: string[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(
    () =>
      setIndex(
        index === null ? null : (index - 1 + images.length) % images.length
      ),
    [index, images.length, setIndex]
  );
  const next = useCallback(
    () =>
      setIndex(index === null ? null : (index + 1) % images.length),
    [index, images.length, setIndex]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Đóng"
            onClick={close}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-4 md:left-8 text-white/80 hover:text-white z-10"
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <span className="material-symbols-outlined text-4xl">
                chevron_left
              </span>
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`Khoảnh khắc cưới ${index + 1}`}
            loading="lazy"
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {images.length > 1 && (
            <button
              className="absolute right-4 md:right-8 text-white/80 hover:text-white z-10"
              aria-label="Ảnh sau"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <span className="material-symbols-outlined text-4xl">
                chevron_right
              </span>
            </button>
          )}

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label-caps text-label-caps tracking-widest text-white/80">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
