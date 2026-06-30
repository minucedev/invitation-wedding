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

// Vietnam is UTC+7. Shift an instant by +7h and read the resulting wall-clock
// calendar date so the displayed DD/MM/YYYY matches the local ceremony date.
const VN_OFFSET_MS = 7 * 60 * 60 * 1000;
function vnDateParts(target: number) {
  const d = new Date(target + VN_OFFSET_MS);
  return {
    day: pad(d.getUTCDate()),
    month: pad(d.getUTCMonth() + 1),
    year: d.getUTCFullYear(),
  };
}

// Two milestones: the 18/7 ceremony (events[0]) and the 24/7 one (le-thanh-hon).
// Until the 18/7 day is over we count toward 18/7; after that we switch to 24/7.
const firstEvent = events[0];
if (!firstEvent) {
  throw new Error("Countdown: lib/events.ts has no events to count down to");
}
const secondEvent =
  events.find((e) => e.id === "le-thanh-hon") ?? events[events.length - 1];

const TARGET_1 = parseUTC(firstEvent.startUTC);
const TARGET_2 = parseUTC(secondEvent.startUTC);
// End of the 18/7 day in VN time = 19/7 00:00 (+07) = 18/7 17:00 UTC.
const DAY1_END = parseUTC("20260718T170000Z");

const DATE_1 = vnDateParts(TARGET_1);
const DATE_2 = vnDateParts(TARGET_2);

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

type Phase = { date: ReturnType<typeof vnDateParts>; timeLeft: TimeLeft };

function computeTimeLeft(target: number, now: number): TimeLeft {
  const diff = target - now;
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

// Before the 18/7 day ends → count toward 18/7; afterwards → count toward 24/7.
function computePhase(now: number): Phase {
  if (now < DAY1_END) {
    return { date: DATE_1, timeLeft: computeTimeLeft(TARGET_1, now) };
  }
  return { date: DATE_2, timeLeft: computeTimeLeft(TARGET_2, now) };
}

const UNITS = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
] as const;

export default function Countdown() {
  // null until mounted so SSR and first client render match (no Date.now() on server).
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    setPhase(computePhase(Date.now()));
    const id = setInterval(() => setPhase(computePhase(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const date = phase?.date ?? DATE_1;
  const timeLeft = phase?.timeLeft ?? null;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Wedding date — the visual focal point */}
      <div className="flex items-center gap-4 md:gap-6 text-white font-display-lg italic text-3xl md:text-5xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
        <span>{date.day}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-custom-gold"></span>
        <span>{date.month}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-custom-gold"></span>
        <span>{date.year}</span>
      </div>

      {timeLeft?.done ? (
        <p className="font-display-lg text-white text-xl md:text-2xl italic">
          Hôm nay là ngày trọng đại!
        </p>
      ) : (
        <div className="flex items-start gap-3 md:gap-5">
          {UNITS.map(({ key, label }) => {
            const value = timeLeft ? timeLeft[key] : null;
            const display =
              value === null || !Number.isFinite(value)
                ? "--"
                : key === "days"
                  ? value
                  : pad(value);
            return (
              <div key={key} className="flex flex-col items-center gap-0.5">
                <span className="text-white/90 text-lg md:text-xl font-display-lg tabular-nums leading-none">
                  {display}
                </span>
                <span className="font-label-caps text-[9px] md:text-[10px] text-white/60 tracking-[0.2em]">
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
