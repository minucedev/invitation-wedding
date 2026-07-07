"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import WishingWellModal from "./WishingWellModal";
import { getDict, type Locale } from "@/lib/i18n";

/**
 * Floating gift-box button, stacked just above the music control in the
 * bottom-right corner. A solid-gold face with a double-gold-ring "medallion"
 * elevation makes it read as the primary call to action (the music button
 * below shares the medallion but stays cream), a gentle periodic bob plus a
 * blinking gold beacon ring draw the eye, and a slim tooltip appears only on
 * hover/focus — no permanent label
 * cluttering the corner. Opens the same WishingWellModal (bank transfer info +
 * QR) used by the inline button in the RSVP section.
 */
export default function GiftFab({ lang }: { lang: Locale }) {
  const t = getDict(lang).rsvp;
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false); // hovered or keyboard-focused

  return (
    <>
      <div
        className="fixed bottom-24 right-6 z-50"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {/* Slim tooltip — only while hovered/focused, so no permanent label. */}
        <AnimatePresence>
          {active && (
            <motion.span
              key="gift-fab-tip"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-custom-gold bg-white px-3 py-1.5 text-[11px] tracking-[0.12em] text-black shadow-md"
            >
              <span className="material-symbols-outlined text-[15px] text-custom-gold">
                card_giftcard
              </span>
              {t.giftFabLabel}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          aria-label={t.giftAria}
          className="fab-medallion relative flex h-14 w-14 items-center justify-center rounded-full bg-custom-gold text-custom-burgundy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-gold focus-visible:ring-offset-2"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          animate={
            reduceMotion ? undefined : { y: [0, 0, -3, 0, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 5,
                  times: [0, 0.75, 0.83, 0.9, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        >
          {/* Blinking beacon: a gold ring that pulses outward and fades, on
              loop, to keep drawing the eye toward the gift box. */}
          {!reduceMotion && (
            <>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-custom-gold"
                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-custom-gold"
                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.6,
                }}
              />
            </>
          )}
          <span className="material-symbols-outlined">card_giftcard</span>
        </motion.button>
      </div>

      <WishingWellModal open={open} onClose={() => setOpen(false)} lang={lang} />
    </>
  );
}
