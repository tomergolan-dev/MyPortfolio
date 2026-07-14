import { Download, Mail, MapPin } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { contactSection, profile, whatsappUrl } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <div className="rounded-3xl bg-navy px-6 py-10 sm:px-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <SectionHeading eyebrow={contactSection.eyebrow} title={contactSection.title} light />
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              {contactSection.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#faf8f4] px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white"
              >
                <Mail className="h-4 w-4" />
                Email me
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoTile icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoTile
              icon={LinkedinIcon}
              label="LinkedIn"
              value={profile.social.linkedinHandle}
              href={profile.social.linkedin}
            />
            <InfoTile
              icon={GithubIcon}
              label="GitHub"
              value={profile.social.githubHandle}
              href={profile.social.github}
            />
            <InfoTile
              icon={WhatsAppIcon}
              label="WhatsApp"
              value={profile.whatsapp}
              href={whatsappUrl}
            />
            <InfoTile icon={MapPin} label="Location" value={profile.location} />
          </div>
        </div>
        <div className="mt-12 h-px bg-white/10" />
        <p className="mt-6 text-center text-xs uppercase tracking-widest text-white/40 sm:text-left">
          © {new Date().getFullYear()} {profile.name} · Portfolio
        </p>
      </div>
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
    <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
