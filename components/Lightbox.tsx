"use client";

import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_ZOOM = 4;
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const dist = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => Math.hypot(a.x - b.x, a.y - b.y);

/**
 * Full-screen image lightbox shared by the album Gallery and the love-story
 * section. Opening animates the photo in with a smooth scale-up + fade.
 *
 * Cử chỉ chạm (hoạt động trên cả điện thoại và laptop qua Pointer Events):
 *  - Vuốt trái/phải để chuyển ảnh (không cần bấm nút).
 *  - Nháy đúp / double-click để phóng to (nháy lần nữa để thu về).
 *  - Chụm/xòe hai ngón (pinch) để zoom mượt, kéo để di chuyển ảnh khi đang zoom.
 *  - Bàn phím: Esc / ← / →.
 */
export default function Lightbox({
  images,
  index,
  setIndex,
}: {
  images: string[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(
    () =>
      setIndex(
        index === null ? null : (index - 1 + images.length) % images.length
      ),
    [index, images.length, setIndex]
  );
  const next = useCallback(
    () => setIndex(index === null ? null : (index + 1) % images.length),
    [index, images.length, setIndex]
  );

  // Transform của ảnh (scale + pan) điều khiển bằng motion values.
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [zoomed, setZoomed] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({
    startDist: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
    downX: 0,
    downY: 0,
    moved: false,
    lastTap: 0,
  });

  const resetView = useCallback(() => {
    animate(scale, 1, { type: "spring", stiffness: 260, damping: 30 });
    animate(x, 0, { type: "spring", stiffness: 260, damping: 30 });
    animate(y, 0, { type: "spring", stiffness: 260, damping: 30 });
    setZoomed(false);
  }, [scale, x, y]);

  // Khi đổi ảnh: reset zoom và chạy hiệu ứng phóng to nhẹ cho mượt.
  useEffect(() => {
    if (index === null) return;
    x.set(0);
    y.set(0);
    setZoomed(false);
    scale.set(0.92);
    const controls = animate(scale, 1, { duration: 0.3, ease: "easeOut" });
    return () => controls.stop();
  }, [index, scale, x, y]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  const clampPan = (nx: number, ny: number, s: number) => {
    const el = imgRef.current;
    const maxX = el ? (el.clientWidth * (s - 1)) / 2 : 0;
    const maxY = el ? (el.clientHeight * (s - 1)) / 2 : 0;
    return { px: clamp(nx, -maxX, maxX), py: clamp(ny, -maxY, maxY) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 2) {
      gesture.current.startDist = dist(pts[0], pts[1]);
      gesture.current.startScale = scale.get();
    } else {
      gesture.current.startX = x.get();
      gesture.current.startY = y.get();
      gesture.current.downX = e.clientX;
      gesture.current.downY = e.clientY;
      gesture.current.moved = false;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];

    // Pinch-zoom bằng 2 ngón.
    if (pts.length === 2) {
      const d = dist(pts[0], pts[1]);
      const s = clamp(
        gesture.current.startScale * (d / gesture.current.startDist),
        1,
        MAX_ZOOM
      );
      scale.set(s);
      setZoomed(s > 1.01);
      return;
    }

    const dx = e.clientX - gesture.current.downX;
    const dy = e.clientY - gesture.current.downY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) gesture.current.moved = true;

    if (scale.get() > 1.01) {
      // Đang zoom → kéo để di chuyển ảnh.
      const { px, py } = clampPan(
        gesture.current.startX + dx,
        gesture.current.startY + dy,
        scale.get()
      );
      x.set(px);
      y.set(py);
    } else {
      // Chưa zoom → kéo ngang để chuyển ảnh (kèm phản hồi trực quan).
      x.set(dx * 0.9);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const hadTwo = pointers.current.size >= 2;
    pointers.current.delete(e.pointerId);
    const s = scale.get();

    // Còn ngón khác đang chạm (vừa nhả 1 ngón của pinch) → chưa xử lý.
    if (pointers.current.size > 0) return;

    if (s > 1.01) {
      // Giữ nguyên trạng thái zoom, chỉ chốt lại vùng pan hợp lệ.
      const { px, py } = clampPan(x.get(), y.get(), s);
      x.set(px);
      y.set(py);
      return;
    }

    // Nếu vừa pinch về ~1 thì coi như reset, không tính vuốt/nháy.
    if (hadTwo) {
      resetView();
      return;
    }

    const dx = e.clientX - gesture.current.downX;

    // Vuốt ngang đủ xa → chuyển ảnh.
    if (images.length > 1 && dx <= -60) {
      next();
      return;
    }
    if (images.length > 1 && dx >= 60) {
      prev();
      return;
    }

    // Không đủ để vuốt → trả ảnh về giữa.
    animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });

    // Phát hiện nháy đúp (double-tap / double-click) để zoom.
    if (!gesture.current.moved) {
      const now = e.timeStamp;
      if (now - gesture.current.lastTap < 300) {
        gesture.current.lastTap = 0;
        animate(scale, 2.2, { type: "spring", stiffness: 260, damping: 26 });
        setZoomed(true);
      } else {
        gesture.current.lastTap = now;
      }
    }
  };

  const onPointerCancel = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0 && scale.get() <= 1.01) resetView();
  };

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <button
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 active:scale-95"
            aria-label="Đóng"
            onClick={close}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {images.length > 1 && (
            <button
              className="absolute left-2 md:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 active:scale-95 md:h-14 md:w-14"
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl">
                arrow_back_ios_new
              </span>
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            ref={imgRef}
            src={images[index]}
            alt={`Khoảnh khắc cưới ${index + 1}`}
            loading="lazy"
            draggable={false}
            className={`max-h-[85vh] max-w-[90vw] touch-none select-none object-contain ${
              zoomed ? "cursor-grab" : "cursor-zoom-in"
            }`}
            style={{ scale, x, y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          />

          {images.length > 1 && (
            <button
              className="absolute right-2 md:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 active:scale-95 md:h-14 md:w-14"
              aria-label="Ảnh sau"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl">
                arrow_forward_ios
              </span>
            </button>
          )}

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label-caps text-label-caps tracking-widest text-white/80">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
