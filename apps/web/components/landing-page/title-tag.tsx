"use client";

import { motion } from "motion/react";

const TitleTag = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4"
    >
      {icon}
      <span className="text-white/90 text-sm">{title}</span>
    </motion.div>
  );
};

export default TitleTag;
