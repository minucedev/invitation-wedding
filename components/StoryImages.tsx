"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import { getDict, type Locale } from "@/lib/i18n";

const STORY_PHOTOS = [
  "/images/gallery/841A1941.jpg",
  "/images/gallery/KHOA1629.jpg",
];

/**
 * The two overlapping love-story photos. Clicking either opens the shared
 * lightbox with a smooth zoom-in; prev/next cycles only between these two.
 */
export default function StoryImages({ lang }: { lang: Locale }) {
  const t = getDict(lang).story;
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIndex(0)}
        aria-label={t.viewPhoto}
        className="absolute top-0 right-0 w-3/4 h-[450px] overflow-hidden cursor-zoom-in hover:z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.alt1}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          src={STORY_PHOTOS[0]}
        />
      </button>
      <button
        onClick={() => setIndex(1)}
        aria-label={t.viewPhoto}
        className="absolute bottom-0 left-0 w-2/3 h-[400px] overflow-hidden border-4 border-custom-light shadow-2xl cursor-zoom-in hover:z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={t.alt2}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          src={STORY_PHOTOS[1]}
        />
      </button>

      <Lightbox images={STORY_PHOTOS} index={index} setIndex={setIndex} lang={lang} />
    </>
  );
}
