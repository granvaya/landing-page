export function SectionEyebrow({ children, isDark }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] uppercase ${isDark ? "text-cream/70" : "text-navy/70"}`}>
      <span className="h-[6px] w-[6px] rounded-full bg-gold" />
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub, align = "left", isDark = false }) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && <SectionEyebrow isDark={isDark}>{eyebrow}</SectionEyebrow>}
      <h2 className={`font-display mt-3 text-3xl sm:text-4xl font-medium leading-[1.15] ${isDark ? "text-cream" : "text-ink"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-[17px] leading-relaxed ${isDark ? "text-cream/80" : "text-ink-soft"}`}>{sub}</p>}
    </div>
  );
}
