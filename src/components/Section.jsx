export function SectionEyebrow({ children, no, isDark }) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11.5px] font-medium uppercase tracking-[0.22em] ${
        isDark ? "text-paper/70" : "text-ink-soft"
      }`}
    >
      <span className="h-2 w-2 shrink-0 bg-vermilion" />
      {no && <span className={`shrink-0 whitespace-nowrap ${isDark ? "text-paper" : "text-ink"}`}>§ {no}</span>}
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({ no, eyebrow, title, sub, align = "left", isDark = false }) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {(eyebrow || no) && (
        <div className={isCenter ? "flex justify-center" : ""}>
          <SectionEyebrow no={no} isDark={isDark}>
            {eyebrow}
          </SectionEyebrow>
        </div>
      )}
      <h2
        className={`font-display mt-5 text-[2.1rem] sm:text-5xl leading-[1.04] ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 text-[19px] leading-relaxed ${isDark ? "text-paper/80" : "text-ink-soft"}`}>{sub}</p>
      )}
    </div>
  );
}
