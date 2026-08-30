"use client";

import { motion } from "motion/react";

type WorkHeaderProps = {
  children: React.ReactNode;
};

export function WorkHeader({ children }: WorkHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
