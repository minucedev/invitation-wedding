"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

const STORY_PHOTOS = [
  "/images/gallery/841A1941.jpg",
  "/images/gallery/KHOA1629.jpg",
];

/**
 * The two overlapping love-story photos. Clicking either opens the shared
 * lightbox with a smooth zoom-in; prev/next cycles only between these two.
 */
export default function StoryImages() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIndex(0)}
        aria-label="Xem ảnh cưới"
        className="absolute top-0 right-0 w-3/4 h-[450px] overflow-hidden cursor-zoom-in hover:z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Ảnh cưới của cô dâu và chú rể."
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          src={STORY_PHOTOS[0]}
        />
      </button>
      <button
        onClick={() => setIndex(1)}
        aria-label="Xem ảnh cưới"
        className="absolute bottom-0 left-0 w-2/3 h-[400px] overflow-hidden border-4 border-custom-light shadow-2xl cursor-zoom-in hover:z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Khoảnh khắc nên thơ của cô dâu và chú rể."
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          src={STORY_PHOTOS[1]}
        />
      </button>

      <Lightbox images={STORY_PHOTOS} index={index} setIndex={setIndex} />
    </>
  );
}
