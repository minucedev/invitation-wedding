"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GridImage = { src: string; width: number; height: number };

/**
 * Renders a masonry grid (curated subset, full uncropped images like the
 * original index.html) plus a full-screen lightbox to browse every photo.
 */
export default function GalleryView({
  gridImages,
  allImages,
}: {
  gridImages: GridImage[];
  allImages: string[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i - 1 + allImages.length) % allImages.length
      ),
    [allImages.length]
  );
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? i : (i + 1) % allImages.length
      ),
    [allImages.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-16">
        {gridImages.map((img) => (
          <button
            key={img.src}
            onClick={() => setLightboxIndex(allImages.indexOf(img.src))}
            className="block w-full break-inside-avoid overflow-hidden group"
            aria-label="Xem ảnh"
          >
            <Image
              src={img.src}
              alt="Khoảnh khắc cưới"
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => setLightboxIndex(0)}
          className="relative w-24 h-24 rounded-full border border-custom-gold flex items-center justify-center group hover:bg-custom-gold/10 transition-colors duration-500"
        >
          <span className="material-symbols-outlined text-custom-gold text-3xl group-hover:scale-110 transition-transform duration-300">
            add
          </span>
          <div className="absolute inset-0 rounded-full border border-custom-gold animate-pulse-slow scale-110 opacity-50"></div>
        </button>
        <span className="mt-6 font-label-caps text-label-caps tracking-widest text-custom-gold">
          XEM THÊM KHOẢNH KHẮC TÌNH YÊU
        </span>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Đóng"
            onClick={close}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={allImages[lightboxIndex]}
            alt={`Khoảnh khắc cưới ${lightboxIndex + 1}`}
            loading="lazy"
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

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

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label-caps text-label-caps tracking-widest text-white/80">
            {lightboxIndex + 1} / {allImages.length}
          </span>
        </div>
      )}
    </>
  );
}
