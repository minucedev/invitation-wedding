"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Phase = "cover" | "opening" | "done";

/**
 * Full-screen welcome overlay shown on every page load. The visitor taps the
 * wax seal → the seal breaks, the flap opens, the card slides out, and the
 * overlay fades/zooms into the page. That tap is also the first user gesture,
 * which unlocks the background music (MusicPlayer listens for the first
 * pointerdown).
 *
 * The envelope is built from four clip-path triangles that meet at the centre
 * (top flap + bottom/left/right pocket). Only the top flap animates open; the
 * card slides up out of the static pocket.
 */
export default function EnvelopeIntro() {
  const [phase, setPhase] = useState<Phase>("cover");
  const reduce = useReducedMotion();
  const opening = phase === "opening";
  const animate = opening && !reduce;

  // Lock page scroll while the overlay is up; restore when it's gone.
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  // Very close ivory tones — the depth comes from soft fold shadows (drop-shadow
  // on the flap + a centre crease overlay), not from hard colour jumps. Lit from
  // the upper area like the reference photo (flap lightest, right facet darkest).
  const flapBg = "linear-gradient(165deg, #f7f0e3 0%, #efe7d6 100%)";
  const bottomBg = "linear-gradient(0deg, #ece4d2 0%, #f1e9d8 100%)";
  const leftBg = "linear-gradient(90deg, #f2ebdb 0%, #ece4d2 100%)";
  const rightBg = "linear-gradient(270deg, #e9e1ce 0%, #efe7d5 100%)";

  // Faint paper grain so the surface doesn't read as flat vector.
  const grain =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-9 px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 28%, #f6efe3 0%, #ece2cf 55%, #ded2ba 100%)",
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={opening ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
      transition={{
        duration: reduce ? 0.4 : 0.8,
        delay: animate ? 1.2 : 0,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (phase === "opening") setPhase("done");
      }}
    >
      {/* Invitation line */}
      <motion.p
        className="font-headline-md text-headline-md italic text-custom-burgundy text-center"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -12 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Trân trọng kính mời
      </motion.p>

      {/* Envelope */}
      <div
        className="relative w-[min(88vw,540px,calc(62vh*1.4))] aspect-[7/5]"
        style={{ perspective: 1200 }}
      >
        {/* Back wall + soft cast shadow */}
        <div
          className="absolute inset-0 rounded-[6px]"
          style={{
            background: "linear-gradient(180deg, #f4ecdd 0%, #e9dec9 100%)",
            boxShadow:
              "0 30px 55px -22px rgba(86,66,40,0.5), 0 6px 16px -8px rgba(86,66,40,0.35)",
          }}
        />

        {/* Card sliding out of the envelope */}
        <motion.div
          className="absolute left-[10%] right-[10%] top-[7%] z-10 flex h-[80%] flex-col items-center justify-start gap-2 rounded-[4px] pt-6"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fbf6ec 100%)",
            boxShadow: "0 6px 14px -6px rgba(86,66,40,0.4)",
          }}
          initial={{ y: 0 }}
          animate={{ y: animate ? "-66%" : 0 }}
          transition={{ delay: opening ? 0.5 : 0, duration: 0.9, ease: "easeOut" }}
        >
          <span className="font-headline-md text-[26px] italic text-custom-burgundy">
            T <span className="text-custom-gold">&amp;</span> T
          </span>
          <span className="font-label-caps text-[10px] tracking-[0.3em] text-custom-gold">
            THIỆP MỜI
          </span>
        </motion.div>

        {/* Pocket — bottom / left / right facets, static, hide the card.
            Each casts a faint shadow toward the centre so the seams read as
            creases with depth rather than hard colour edges. */}
        <div
          className="absolute inset-0 z-30"
          style={{
            background: bottomBg,
            clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
            filter: "drop-shadow(0 -3px 4px rgba(96,72,44,0.10))",
          }}
        />
        <div
          className="absolute inset-0 z-30"
          style={{
            background: leftBg,
            clipPath: "polygon(0 0, 0 100%, 50% 50%)",
            filter: "drop-shadow(2px 0 4px rgba(96,72,44,0.08))",
          }}
        />
        <div
          className="absolute inset-0 z-30"
          style={{
            background: rightBg,
            clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
            filter: "drop-shadow(-2px 0 4px rgba(96,72,44,0.08))",
          }}
        />

        {/* Soft crease shadow where all folds converge — hides the hard centre
            seam under/around the seal. */}
        <div
          className="absolute inset-0 z-[35]"
          style={{
            background:
              "radial-gradient(38% 30% at 50% 50%, rgba(86,62,36,0.22) 0%, rgba(86,62,36,0.07) 45%, transparent 70%)",
          }}
        />

        {/* Paper grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[36] rounded-[6px]"
          style={{ backgroundImage: grain, opacity: 0.05, mixBlendMode: "multiply" }}
        />

        {/* Top flap — opens on a hinge along its top edge */}
        <motion.div
          className={`absolute inset-0 ${opening ? "z-[5]" : "z-40"}`}
          style={{ transformOrigin: "top center" }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: animate ? -165 : 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: flapBg,
              clipPath: "polygon(0 0, 100% 0, 50% 50%)",
              filter: "drop-shadow(0 4px 5px rgba(90,68,42,0.22))",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
            }}
          />
        </motion.div>

        {/* Wax seal — also the open button. Centering lives on the wrapper so it
            doesn't fight framer-motion's transform on the button itself; the
            wrapper's drop-shadow gives the seal a soft contact shadow on paper. */}
        <div
          className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 5px 6px rgba(70,18,24,0.4))" }}
        >
          <motion.button
            type="button"
            onClick={() => setPhase("opening")}
            disabled={opening}
            aria-label="Mở thiệp mời"
            className="relative flex h-[4.6rem] w-[4.6rem] md:h-[5.4rem] md:w-[5.4rem] items-center justify-center overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-custom-gold focus-visible:ring-offset-2"
            style={{
              background:
                "radial-gradient(circle at 38% 32%, #93343c 0%, #6f2129 42%, #571a21 78%, #471218 100%)",
              borderRadius: "46% 54% 52% 48% / 51% 46% 54% 49%",
              boxShadow:
                "inset 3px 4px 7px rgba(255,255,255,0.16), inset -3px -4px 8px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.06)",
            }}
            whileHover={opening ? undefined : { scale: 1.05 }}
            animate={
              animate
                ? { y: -42, rotate: -14, opacity: 0, scale: 0.7 }
                : { y: 0, rotate: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeIn" }}
          >
            {/* glossy specular highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-[22%] top-[16%] h-3 w-5 -rotate-[20deg] rounded-full bg-white/35 blur-[3px]"
            />
            {/* faint inner ring (pressed-wax ridge) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[6px] rounded-full"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
            />
            <span
              className="font-headline-md text-lg md:text-xl italic"
              style={{
                color: "#e7c24a",
                textShadow:
                  "0 1px 1px rgba(0,0,0,0.55), 0 -1px 0 rgba(255,255,255,0.12)",
              }}
            >
              T&amp;T
            </span>
          </motion.button>
        </div>
      </div>

      {/* Tap hint */}
      <motion.span
        className="font-label-caps text-[11px] tracking-[0.35em] text-custom-burgundy/70"
        animate={
          opening ? { opacity: 0 } : { opacity: [0.45, 1, 0.45] }
        }
        transition={
          opening
            ? { duration: 0.3 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        CHẠM ĐỂ MỞ
      </motion.span>
    </motion.div>
  );
}
