type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className={`h-px w-6 ${light ? "bg-white/40" : "bg-stone-900/30"}`} />
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            light ? "text-white/60" : "text-stone-500"
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed ${
            light ? "text-white/70" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
