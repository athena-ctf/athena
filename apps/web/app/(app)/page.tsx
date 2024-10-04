"use client";

import { getConfig } from "@repo/config";
import type { CtfConfig } from "@repo/config/schema";
import { LampHeader } from "@/components/lamp-header";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [config, setConfig] = useState<CtfConfig | null>(null);

  useEffect(() => {
    getConfig().then((config) => setConfig(config));
  }, []);

  return (
    <LampHeader>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center font-mono text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        {config?.ctf.name}
      </motion.h1>
    </LampHeader>
  );
}
