"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/events";

const pad = (n: number) => String(n).padStart(2, "0");

// Parse the calendar basic-UTC format "YYYYMMDDTHHMMSSZ" into a timestamp (ms).
// Validate strictly so a malformed/typo'd value fails loudly at module-eval
// instead of silently rendering "NaN" in the hero countdown.
function parseUTC(basic: string): number {
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(basic);
  if (!m) {
    throw new Error(
      `Countdown: malformed startUTC "${basic}" (expected YYYYMMDDTHHMMSSZ)`
    );
  }
  const [, y, mo, d, h, mi, s] = m.map(Number);
  const t = Date.UTC(y, mo - 1, d, h, mi, s);
  if (!Number.isFinite(t)) {
    throw new Error(`Countdown: startUTC "${basic}" parsed to NaN`);
  }
  return t;
}

const firstEvent = events[0];
if (!firstEvent) {
  throw new Error("Countdown: lib/events.ts has no events to count down to");
}
const TARGET = parseUTC(firstEvent.startUTC);

// Wedding date shown in the hero, derived from the same source as the countdown
// (events[0]) so the displayed date and the counted-toward date can never
// diverge. Vietnam is UTC+7, so shift the instant by +7h and read the resulting
// wall-clock calendar date.
const VN_OFFSET_MS = 7 * 60 * 60 * 1000;
const vnWeddingDate = new Date(TARGET + VN_OFFSET_MS);
const WEDDING_DAY = pad(vnWeddingDate.getUTCDate());
const WEDDING_MONTH = pad(vnWeddingDate.getUTCMonth() + 1);
const WEDDING_YEAR = vnWeddingDate.getUTCFullYear();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function computeTimeLeft(): TimeLeft {
  const diff = TARGET - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    done: false,
  };
}

const UNITS = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
] as const;

export default function Countdown() {
  // null until mounted so SSR and first client render match (no Date.now() on server).
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(computeTimeLeft());
    const id = setInterval(() => {
      const next = computeTimeLeft();
      setTimeLeft(next);
      if (next.done) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Wedding date */}
      <div className="flex items-center gap-4 text-white/90 font-body-lg text-body-lg tracking-widest">
        <span>{WEDDING_DAY}</span>
        <span className="w-1 h-1 rounded-full bg-custom-gold"></span>
        <span>{WEDDING_MONTH}</span>
        <span className="w-1 h-1 rounded-full bg-custom-gold"></span>
        <span>{WEDDING_YEAR}</span>
      </div>

      {timeLeft?.done ? (
        <p className="font-display-lg text-white text-2xl md:text-3xl italic">
          Hôm nay là ngày trọng đại!
        </p>
      ) : (
        <div className="flex items-start gap-4 md:gap-8">
          {UNITS.map(({ key, label }) => {
            const value = timeLeft ? timeLeft[key] : null;
            const display =
              value === null || !Number.isFinite(value)
                ? "--"
                : key === "days"
                  ? value
                  : pad(value);
            return (
              <div key={key} className="flex flex-col items-center gap-1">
                <span className="text-white text-3xl md:text-4xl font-display-lg tabular-nums leading-none">
                  {display}
                </span>
                <span className="font-label-caps text-label-caps text-white/70 tracking-[0.2em]">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
