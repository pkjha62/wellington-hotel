"use client";

import { motion } from "framer-motion";

export default function MotionArticle({
  children,
  className,
  direction,
}: {
  children: React.ReactNode;
  className?: string;
  direction: "left" | "right";
}) {
  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}
