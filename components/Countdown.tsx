"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/events";

const pad = (n: number) => String(n).padStart(2, "0");
const DAY = 86_400_000;

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
type DateParts = ReturnType<typeof vnDateParts>;

// Midnight (00:00 VN time) of the day that contains `target`, as a UTC timestamp.
function vnMidnight(target: number): number {
  const shifted = target + VN_OFFSET_MS; // vào "không gian VN"
  return Math.floor(shifted / DAY) * DAY - VN_OFFSET_MS;
}

// Two milestones: the 18/7 ceremony (events[0]) and the 24/7 one (le-thanh-hon).
const firstEvent = events[0];
if (!firstEvent) {
  throw new Error("Countdown: lib/events.ts has no events to count down to");
}
const secondEvent =
  events.find((e) => e.id === "le-thanh-hon") ?? events[events.length - 1];

const TARGET_1 = parseUTC(firstEvent.startUTC);
const TARGET_2 = parseUTC(secondEvent.startUTC);

// Ranh giới theo ngày (giờ VN) của từng lễ.
const DAY1_START = vnMidnight(TARGET_1); // 18/7 00:00 VN
const DAY1_END = DAY1_START + DAY; //        19/7 00:00 VN
const DAY2_START = vnMidnight(TARGET_2); // 24/7 00:00 VN
const DAY2_END = DAY2_START + DAY; //        25/7 00:00 VN

const DATE_1 = vnDateParts(TARGET_1);
const DATE_2 = vnDateParts(TARGET_2);

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Dòng thời gian (giờ VN):
 *  - Trước ngày 18/7 → đếm ngược tới 18/7.
 *  - Trong ngày 18/7 → thông điệp chúc mừng (ẩn lịch + đồng hồ).
 *  - 19/7 → trước 24/7 → đếm ngược tới 24/7.
 *  - Trong ngày 24/7 → thông điệp chúc mừng.
 *  - Từ 25/7 trở đi → "đã qua N ngày" + lời cảm ơn.
 */
type Phase =
  | { kind: "countdown"; date: DateParts; timeLeft: TimeLeft }
  | { kind: "celebrate"; date: DateParts }
  | { kind: "after"; daysSince: number };

function computeTimeLeft(target: number, now: number): TimeLeft {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function computePhase(now: number): Phase {
  if (now < DAY1_START) {
    return { kind: "countdown", date: DATE_1, timeLeft: computeTimeLeft(TARGET_1, now) };
  }
  if (now < DAY1_END) {
    return { kind: "celebrate", date: DATE_1 };
  }
  if (now < DAY2_START) {
    return { kind: "countdown", date: DATE_2, timeLeft: computeTimeLeft(TARGET_2, now) };
  }
  if (now < DAY2_END) {
    return { kind: "celebrate", date: DATE_2 };
  }
  // Số ngày kể từ ngày cưới chính (24/7); 25/7 = 1 ngày.
  return { kind: "after", daysSince: Math.max(1, Math.floor((now - DAY2_START) / DAY)) };
}

const UNITS = [
  { key: "days", label: "Ngày" },
  { key: "hours", label: "Giờ" },
  { key: "minutes", label: "Phút" },
  { key: "seconds", label: "Giây" },
] as const;

// Cho phép xem trước từng mốc thời gian khi QA: ?preview=2026-07-18T10:00:00
// Trả về độ lệch (ms) so với thời gian thật; 0 nếu không có/không hợp lệ.
function previewOffset(): number {
  if (typeof window === "undefined") return 0;
  const raw = new URLSearchParams(window.location.search).get("preview");
  if (!raw) return 0;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t - Date.now() : 0;
}

export default function Countdown() {
  // null until mounted so SSR and first client render match (no Date.now() on server).
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const offset = previewOffset();
    const tick = () => setPhase(computePhase(Date.now() + offset));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Trước khi mount: giữ khung lịch + đồng hồ "--" để không lệch hydrate.
  if (!phase) {
    return (
      <div className="flex flex-col items-center gap-5">
        <DateRow date={DATE_1} />
        <ClockRow timeLeft={null} />
      </div>
    );
  }

  if (phase.kind === "celebrate") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-display-lg italic text-white text-3xl md:text-5xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Hôm nay là ngày trọng đại! 🤍
        </p>
        <p className="font-label-caps text-white/85 tracking-[0.3em] text-[11px] md:text-sm">
          CHÚC MỪNG NGÀY CHUNG ĐÔI THANH &amp; TUẤN
        </p>
      </div>
    );
  }

  if (phase.kind === "after") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-display-lg italic text-white text-2xl md:text-4xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Chúng mình đã chính thức về chung một nhà 🤍
        </p>
        <p className="font-label-caps text-custom-gold tracking-[0.3em] text-[11px] md:text-sm">
          ĐÃ QUA {phase.daysSince} NGÀY KỂ TỪ NGÀY TRỌNG ĐẠI
        </p>
        <p className="font-body text-white/80 text-sm md:text-base italic max-w-md">
          Cảm ơn mọi người đã đến chung vui cùng chúng mình.
        </p>
      </div>
    );
  }

  // kind === "countdown"
  return (
    <div className="flex flex-col items-center gap-5">
      <DateRow date={phase.date} />
      <ClockRow timeLeft={phase.timeLeft} />
    </div>
  );
}

function DateRow({ date }: { date: DateParts }) {
  return (
    <div className="flex items-center gap-4 md:gap-6 text-white font-display-lg italic text-3xl md:text-5xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      <span>{date.day}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-custom-gold"></span>
      <span>{date.month}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-custom-gold"></span>
      <span>{date.year}</span>
    </div>
  );
}

function ClockRow({ timeLeft }: { timeLeft: TimeLeft | null }) {
  return (
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
  );
}
