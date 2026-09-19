import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { importanceLevels } from "../data/content";
import { SectionHeading } from "./Section";

const toneClasses = {
  terracotta: {
    dot: "bg-terracotta",
    active: "border-terracotta bg-terracotta-soft text-terracotta",
    bar: "bg-terracotta",
  },
  mustard: {
    dot: "bg-mustard",
    active: "border-mustard bg-mustard-soft text-mustard",
    bar: "bg-mustard",
  },
  sage: {
    dot: "bg-sage",
    active: "border-sage bg-sage-soft text-sage",
    bar: "bg-sage",
  },
};

const barWidth = { high: "92%", medium: "58%", low: "26%" };

export default function ImportanceDemo() {
  const [active, setActive] = useState("high");
  const current = importanceLevels.find((l) => l.id === active);
  const tone = toneClasses[current.tone];

  return (
    <section className="bg-navy-deep py-20 sm:py-24 text-cream">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Know what deserves your time"
          title="Every topic carries a High, Medium or Low tag."
          sub=""
          isDark={true}
        />
        <p className="mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-cream/70">
          Based on how often it returns in the news and how the exam has treated similar topics before.
          Tap a level to see how we'd score today's top story.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {importanceLevels.map((level) => {
            const t = toneClasses[level.tone];
            const isActive = active === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setActive(level.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-all ${
                  isActive ? t.active : "border-cream/15 text-cream/60 hover:border-cream/30"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                {level.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-cream/10 bg-cream/[0.04] p-6"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
              <motion.div
                className={`h-full rounded-full ${tone.bar}`}
                initial={{ width: 0 }}
                animate={{ width: barWidth[active] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/85">{current.body}</p>
            <p className="mt-3 border-t border-cream/10 pt-3 text-[13.5px] italic text-cream/55">
              {current.example}
            </p>
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-[13px] font-medium text-gold-soft">
          We publish our predictions before the exam, and check them openly after.
        </p>
      </div>
    </section>
  );
}
