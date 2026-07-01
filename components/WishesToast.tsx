"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Wish } from "@/app/api/wishes/route";

const ICONS = ["local_florist", "favorite", "auto_awesome"];
const VISIBLE_MS = 24000; // mỗi lời chúc hiển thị ~24s rồi tự ẩn
const GAP_MS = 4000; // khoảng trống trước khi lời chúc kế tiếp hiện lên
const PAUSE_RECHECK_MS = 1000; // đang rê chuột đọc → hoãn ẩn, kiểm tra lại sau

/**
 * Reads guest wishes from /api/wishes (backed by the RSVP Google Sheet) and
 * shows them one at a time as a gently appearing card toast in the bottom-left
 * corner. Each wish stays for VISIBLE_MS, fades away, then after a GAP_MS blank
 * pause the next wish appears. Pauses on hover; can be dismissed with ×.
 */
export default function WishesToast() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    let active = true;
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((data: { wishes?: Wish[] }) => {
        if (active && Array.isArray(data.wishes)) setWishes(data.wishes);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (wishes.length === 0) return;
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    setVisible(true);

    const scheduleHide = (delay: number) => {
      hideTimer = setTimeout(() => {
        // Khách đang rê chuột đọc → hoãn ẩn, kiểm tra lại sau.
        if (paused.current) {
          scheduleHide(PAUSE_RECHECK_MS);
          return;
        }
        setVisible(false); // chạy animation exit → thẻ biến mất
        nextTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % wishes.length); // để trống GAP_MS rồi hiện lời chúc kế tiếp
        }, GAP_MS);
      }, delay);
    };

    scheduleHide(VISIBLE_MS);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [index, wishes.length]);

  if (hidden || wishes.length === 0) return null;

  const wish = wishes[index];
  const icon = ICONS[index % ICONS.length];

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[calc(100vw-3rem)] max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto bg-white p-6 md:p-8 border border-custom-gold/30 shadow-lg relative group"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <button
            className="absolute top-3 right-3 text-on-surface-variant/60 hover:text-primary transition-colors"
            aria-label="Đóng"
            onClick={() => setHidden(true)}
          >
            <span className="material-symbols-outlined text-lg leading-none">
              close
            </span>
          </button>
          <div className="absolute top-4 right-10 opacity-40 group-hover:opacity-60 transition-opacity">
            <span
              className="material-symbols-outlined text-custom-gold"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
            >
              {icon}
            </span>
          </div>
          <span className="font-label-caps text-[10px] tracking-widest text-custom-gold">
            SỔ LƯU BÚT
          </span>
          <h4 className="font-headline-md text-body-lg font-bold text-primary mt-2 mb-3 pr-6">
            {wish.name}
          </h4>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed italic">
            &ldquo;{wish.message}&rdquo;
          </p>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
