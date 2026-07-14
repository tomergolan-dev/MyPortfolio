"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappUrlFrom } from "@/lib/whatsapp";
import type { SiteSettings } from "@/types/database";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 pb-24 pt-20 sm:pt-28 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl text-center lg:text-left"
        >
          <motion.p variants={item} className="text-sm font-medium tracking-wide text-ide-blue">
            Hi, I&apos;m {settings.name}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-ide-blue/30 bg-ide-blue/10 px-4 py-1.5 text-xs font-medium tracking-wide text-ide-blue"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {settings.role}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            {settings.hero_headline}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {settings.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:scale-105"
            >
              {settings.hero_primary_label}
            </a>
            <a
              href="#contact"
              className="group text-sm font-medium text-slate-200 transition-colors hover:text-ide-cyan"
            >
              {settings.hero_secondary_label}
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={whatsappUrlFrom(settings.whatsapp)}
              aria-label="Message me on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {settings.profile_image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="group relative w-fit shrink-0"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-400/40 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#12151f] p-3 shadow-2xl">
              <div className="mb-3 flex items-center gap-1.5 px-1">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 truncate font-mono text-xs text-white/40">profile.jpg</span>
              </div>
              <Image
                src={settings.profile_image_url}
                alt={settings.name}
                width={340}
                height={340}
                className="h-56 w-56 rounded-2xl object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
