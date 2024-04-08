"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.div //
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
