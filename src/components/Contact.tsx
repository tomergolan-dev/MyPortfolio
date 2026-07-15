"use client";

import { Download, Mail, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";
import { whatsappUrlFrom } from "@/lib/whatsapp";
import type { SectionWithChildren } from "@/lib/data/sections";
import type { SiteSettings } from "@/types/database";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contact({
  section,
  settings,
}: {
  section: SectionWithChildren;
  settings: SiteSettings;
}) {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-3xl border border-white/10 bg-surface px-6 py-10 shadow-2xl shadow-black/30 sm:px-12 sm:py-14"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
          <div>
            <SectionHeading eyebrow="Contact" title={section.title} />
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              {section.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <a
                href={settings.resume_url ?? "#"}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <InfoTile icon={Mail} label="Email" value={settings.email} href={`mailto:${settings.email}`} />
            <InfoTile
              icon={LinkedinIcon}
              label="LinkedIn"
              value={settings.linkedin_handle}
              href={settings.linkedin_url}
            />
            <InfoTile
              icon={GithubIcon}
              label="GitHub"
              value={settings.github_handle}
              href={settings.github_url}
            />
            <InfoTile
              icon={WhatsAppIcon}
              label="WhatsApp"
              value={settings.whatsapp}
              href={whatsappUrlFrom(settings.whatsapp)}
            />
            <InfoTile icon={MapPin} label="Location" value={settings.location} />
          </motion.div>
        </div>
        <div className="mt-12 h-px bg-white/10" />
        <p className="mt-6 text-center text-xs uppercase tracking-widest text-slate-500 sm:text-left">
          © {new Date().getFullYear()} {settings.name} · Portfolio
        </p>
      </motion.div>
    </section>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <motion.div
      variants={item}
      whileHover={{ y: -3 }}
      className="flex h-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-ide-blue/30"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-ide-blue">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
        <p className="whitespace-nowrap text-[13px] font-medium text-white">{value}</p>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
