import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { importanceLevels } from "../data/content";
import { SectionHeading } from "./Section";

// tone → colours that read on the ink-black background
const toneClasses = {
  terracotta: { fill: "bg-vermilion", text: "text-vermilion", border: "border-vermilion", active: "bg-vermilion text-paper-hi border-vermilion" },
  mustard: { fill: "bg-marker", text: "text-marker", border: "border-marker", active: "bg-marker text-ink border-marker" },
  sage: { fill: "bg-mint", text: "text-mint", border: "border-mint", active: "bg-mint text-ink border-mint" },
};

const SEGMENTS = 12;
const filled = { high: 11, medium: 7, low: 3 };

export default function ImportanceDemo() {
  const [active, setActive] = useState("high");
  const current = importanceLevels.find((l) => l.id === active);
  const tone = toneClasses[current.tone];

  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              no="05"
              eyebrow="Know what deserves your time"
              title="Every topic carries a High, Medium or Low tag."
              isDark
            />
            <p className="mt-6 max-w-lg text-[19px] leading-relaxed text-paper/75">
              Based on how often it returns in the news and how the exam has treated similar topics before. Tap a level to
              see how we'd score today's top story.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {importanceLevels.map((level) => {
                const t = toneClasses[level.tone];
                const isActive = active === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setActive(level.id)}
                    className={`flex items-center gap-2.5 border-2 px-5 py-2.5 font-mono text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive ? t.active : "border-paper/25 text-paper/70 hover:border-paper/60"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 ${isActive ? "bg-ink" : t.fill}`} />
                    {level.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-10 border-l-4 border-marker pl-4 text-[17px] italic text-marker">
              We publish our predictions before the exam, and check them openly after.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="relative self-start border-2 border-paper/30 bg-paper/[0.05] p-7 sm:p-9"
            >
              {/* rubber stamp */}
              <div
                key={`stamp-${active}`}
                className={`stamp-in absolute -top-7 right-5 border-[3px] ${tone.border} ${tone.text} bg-ink px-4 py-1 font-display text-[2rem] uppercase leading-none tracking-[0.06em]`}
              >
                {current.label}
              </div>

              <p className="font-mono text-[11.5px] uppercase tracking-[0.22em] text-paper/55">Importance gauge</p>
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: SEGMENTS }).map((_, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    initial={{ scaleY: 0.3, opacity: 0.3 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.035 }}
                    className={`h-9 flex-1 origin-bottom ${i < filled[active] ? tone.fill : "bg-paper/12"}`}
                  />
                ))}
              </div>

              <p className="mt-7 text-[21px] leading-[1.45] text-paper">{current.body}</p>
              <p className="mt-5 border-t border-paper/25 pt-4 text-[17px] italic text-paper/60">{current.example}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
