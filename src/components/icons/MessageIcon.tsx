"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function MessageIcon() {
  return (
    <motion.button
      className="fixed bottom-8 right-8 w-16 h-16 bg-tiscu-navy text-tiscu-bg rounded-full flex items-center justify-center text-2xl z-50 cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 10 }}
    >
      <MessageCircle size={24} />
    </motion.button>
  );
}
