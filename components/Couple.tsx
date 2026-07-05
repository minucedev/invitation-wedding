"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import Lightbox from "./Lightbox";
import { getDict, type Locale } from "@/lib/i18n";

const COUPLE_PHOTOS = ["/images/groom.jpg", "/images/bride.jpg"];

export default function Couple({ lang }: { lang: Locale }) {
  const t = getDict(lang).couple;
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section
      className="py-section-gap px-margin-edge bg-surface-container-low relative"
      id="profile"
    >
      <FadeIn className="max-w-container-max mx-auto text-center">
        <h2 className="font-headline-lg text-headline-lg text-primary italic mb-16">
          {t.heading}
        </h2>
        <div className="grid md:grid-cols-2 gap-16 md:gap-8">
          {/* Groom */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIndex(0)}
              aria-label={t.viewPhoto}
              className="w-72 h-[26rem] md:w-[22rem] md:h-[30rem] overflow-hidden mb-8 relative group scale-x-[-1] cursor-zoom-in"
            >
              <div className="absolute inset-0 border border-custom-gold m-2 pointer-events-none z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.groomAlt}
                className="w-full h-full object-cover bg-surface-variant transition-transform duration-700 ease-out group-hover:scale-110"
                src="/images/groom.jpg"
              />
            </button>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              {t.groomName}
            </h3>
            <p className="font-label-caps text-label-caps text-custom-burgundy mb-6 tracking-widest">
              {t.groomTitle}
            </p>
            <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-2">
              <span className="uppercase tracking-widest text-[10px] text-custom-gold mb-1">
                {t.groomFamily}
              </span>
              <p>{t.groomParents}</p>
            </div>
          </div>
          {/* Bride */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIndex(1)}
              aria-label={t.viewPhoto}
              className="w-72 h-[26rem] md:w-[22rem] md:h-[30rem] overflow-hidden mb-8 relative group cursor-zoom-in"
            >
              <div className="absolute inset-0 border border-custom-gold m-2 pointer-events-none z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.brideAlt}
                className="w-full h-full object-cover bg-surface-variant transition-transform duration-700 ease-out group-hover:scale-110"
                src="/images/bride.jpg"
              />
            </button>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              {t.brideName}
            </h3>
            <p className="font-label-caps text-label-caps text-custom-burgundy mb-6 tracking-widest">
              {t.brideTitle}
            </p>
            <div className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-2">
              <span className="uppercase tracking-widest text-[10px] text-custom-gold mb-1">
                {t.brideFamily}
              </span>
              <p>{t.brideParents}</p>
            </div>
          </div>
        </div>
      </FadeIn>

      <Lightbox images={COUPLE_PHOTOS} index={index} setIndex={setIndex} lang={lang} />
    </section>
  );
}
