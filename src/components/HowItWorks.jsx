import { useState } from "react";
import { motion } from "framer-motion";
import { steps } from "../data/content";
import { SectionHeading } from "./Section";
import RevisionQuiz from "./RevisionQuiz";

export default function HowItWorks() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading title="From newspaper to memory, in three steps." />

        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <motion.button
                key={s.n}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                  hovered === i
                    ? "border-navy/15 bg-cream shadow-soft"
                    : "border-transparent hover:bg-cream/50"
                }`}
              >
                <span
                  className={`font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-medium transition-colors ${
                    hovered === i ? "bg-navy text-cream" : "bg-cream-deep text-navy"
                  }`}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[19px] text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center">
            <RevisionQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}
