"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export type GridImage = { src: string; width: number; height: number };

/**
 * Renders a masonry grid (curated subset, full uncropped images like the
 * original index.html) plus a full-screen lightbox to browse every photo.
 */
export default function GalleryView({
  gridImages,
  mobileImages,
  allImages,
}: {
  gridImages: GridImage[];
  mobileImages: GridImage[];
  allImages: string[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const renderItem = (img: GridImage) => (
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
  );

  return (
    <>
      {/* Mobile: curated short-list. Tablet/desktop: full evenly-spaced grid. */}
      <div className="columns-1 gap-4 space-y-4 mb-16 md:hidden">
        {mobileImages.map(renderItem)}
      </div>
      <div className="hidden md:block md:columns-2 lg:columns-3 gap-4 space-y-4 mb-16">
        {gridImages.map(renderItem)}
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

      <Lightbox
        images={allImages}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
      />
    </>
  );
}
