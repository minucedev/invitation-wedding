"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the whole page in a gentle fade-in on first load so the entrance
 * feels smooth rather than a hard paint.
 */
export default function PageFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
